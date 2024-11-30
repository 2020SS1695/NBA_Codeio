import { getAccessToken, validateToken } from "#src/services/auth.service.js"
import type { Request, Response } from "express"
import UserModel from "#src/models/user.model.js"
import { RoleToCode } from "#src/constants/roles.js"
import College from "#src/models/college.model"

// TODO: can we also give a new refresh token? so that the user can stay logged in forever (if they keep using the app)
export async function handleRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.jwt

    if (!refreshToken) {
        return res.sendStatus(401) // Unauthorized
    }

    const foundUser = await UserModel.findOne({ refreshToken: refreshToken }).exec()

    if (!foundUser) {
        return res.sendStatus(403) // Forbidden
    }

    interface Decoded {
        id: string
    }

    validateToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        async (err, decoded) => {
            if (err || foundUser._id.toString() !== (decoded as Decoded).id) {
                res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none"  })
                return res.sendStatus(403) // Forbidden
            }

            const role = foundUser.role
            const roleCode = RoleToCode[role]

            const accessToken = getAccessToken({ 
                id: foundUser._id,
                email: foundUser.email,
                role: roleCode
            })

            const college = await College.findOne({ user: foundUser._id })

            res.status(200).json({
                message: "Access token refreshed successfully",
                data: {
                    accessToken,
                    email: foundUser.email,
                    role: roleCode,
                    collegeName: college?.name
                }
            })
        }
    )
}