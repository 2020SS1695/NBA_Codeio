import User from "#src/models/user.model.js"
import { Request, Response } from "express"
import { getAccessToken, getToken } from "#src/services/auth.service.js"
import UserModel from "#src/models/user.model.js"
import bcrypt from "bcrypt"
import { RoleToCode, Roles } from "#src/constants/roles.js"
import College from "#src/models/college.model"

export async function signup(req: Request, res: Response) {
    // TODO: update this function to use the correct role datatype
    const { name, email, password, role } = req.body

    if(!name || !email || !password || !role) {
        return res.status(400).json({ // Bad Request
            message: "Missing required fields"
        })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    // TODO: handle errors here, like duplicate email and role not in enum, email not matching regex, etc.
    // TODO: for duplicate send a 409 (Conflict) status code
    // TODO: if server error then send a 500 (Internal Server Error) status code
    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
    })

    const userRole = newUser.role
    const userRoleCode = RoleToCode[userRole]

    const accessToken = getAccessToken({ 
        id: newUser._id,
        email: newUser.email,
        role: userRoleCode
    })

    const refreshToken = getToken(
        { id: newUser._id },
        process.env.REFRESH_TOKEN_SECRET!,
        process.env.REFRESH_TOKEN_EXPIRES_IN!
    )

    newUser.refreshToken = refreshToken
    await newUser.save()

    // maxAge is in milliseconds
    res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24  })

    res.status(201).json({ // Created
        message: "User created successfully",
        data: {
            accessToken,
            role: userRoleCode,
            email,
        }
    })
}

export async function logout(req: Request, res: Response) {
    const refreshToken = req.cookies.jwt

    if (!refreshToken) {
        return res.sendStatus(204) // No Content
    }

    const foundUser = await UserModel.findOne({ refreshToken: refreshToken }).exec()

    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" })

    if (!foundUser) {
        return res.sendStatus(204) // No Content
    }

    foundUser.refreshToken = ""
    await foundUser.save()

    res.sendStatus(204) // No Content
}


export async function login(req: Request, res: Response) { 
    const { email, password } = req.body

    // TODO: remove this
    // if(email === "admin@nba.com" && password === "admin123") { const token = getToken({ id: "-1" })
    //     const role = "admin"

    //     res.status(200).json({ // OK
    //         message: "Login successful",
    //         data: {
    //             token,
    //             role,
    //         }
    //     })

    //     return
    // }

    const foundUser = await User.findOne({ email }).select("+password").exec()

    if (!foundUser) {
        return res.status(401).json({ // Unauthorized
            message: "Invalid email",
        })
    }

    const isPasswordValid = await foundUser.checkPassword(password)

    if (!isPasswordValid) {
        return res.status(401).json({ // Unauthorized
            message: "Invalid password",
        })
    }

    const role: Roles = foundUser.role
    const roleCode: number = RoleToCode[role]

    const accessToken = getAccessToken({
        id: foundUser._id,
        email: foundUser.email,
        role: roleCode
    })

    const refreshToken = getToken(
        { id: foundUser._id },
        process.env.REFRESH_TOKEN_SECRET!,
        process.env.REFRESH_TOKEN_EXPIRES_IN!
    )

    foundUser.refreshToken = refreshToken
    await foundUser.save()

    // maxAge is in milliseconds
    res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 })

    const college = await College.findOne({ user: foundUser._id })

    res.status(200).json({ // OK
        message: "Login successful",
        data: {
            accessToken,
            role: roleCode,
            email,
            collegeName: college?.name
        }
    })
}