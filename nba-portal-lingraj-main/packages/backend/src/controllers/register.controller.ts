import { Request, Response } from 'express'
import bcrypt from "bcrypt"
import User from "#src/models/user.model.js"
import College from '#src/models/college.model'
import Evaluator from '#src/models/evaluator.model'
import Evaluation from '#src/models/evaluation.model'

export async function registerCollege(req: Request, res: Response) {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({ // Bad Request
            message: "Missing email or password",
        })
    }

    const password = "password"

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: "college",
    })

    await College.create({
        user: newUser._id,
        name: name,
        category: 1,
        programs: [],
        type: "private",
        city: "city",
        address: "address",
        pincode: 123456,
    })
}

export async function registerEvaluator(req: Request, res: Response) {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).json({ // Bad Request
            message: "Missing email or password",
        })
    }

    const password = "password"

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: "evaluator",
    })
    
    const collegeUser = await User.findOne({ refreshToken: req.cookies.jwt })
    const college = await College.findOne({ user: collegeUser?._id })

    await Evaluator.create({
        user: newUser._id,
        name: name,
        hIndex: 5,
        college: college?._id,
    })
}

export async function registerEvaluation(req: Request, res: Response) {
    const { evaluatorId, collegeName, visitDate } = req.body

    const college = await College.findOne({ name: collegeName })

    await Evaluation.create({
        evaluator: evaluatorId,
        college: college?._id,
        visitDate: visitDate,
    })
}

export async function unRegisterEvaluation(req: Request, res: Response) {
    const { evaluatorId, collegeName } = req.body

    const college = await College.findOne({ name: collegeName })

    await Evaluation.deleteOne({
        evaluator: evaluatorId,
        college: college?._id,
    })
}