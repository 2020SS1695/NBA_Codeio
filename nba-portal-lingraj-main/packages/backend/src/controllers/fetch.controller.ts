import { Request, Response } from "express"
import User from "#src/models/user.model"
import Evaluator from "#src/models/evaluator.model"
import College from "#src/models/college.model"
import Evaluation from "#src/models/evaluation.model"

export async function fetchEvaluators(req: Request, res: Response) {
    const evaluatorsRaw = await Evaluator.find({}).exec()

    const evaluators = []

    for (let i = 0; i < evaluatorsRaw.length; i++) {
        const evaluator = evaluatorsRaw[i]

        const user = await User.findOne({ "_id": evaluator.user })
        const college = await College.findOne({ "_id": evaluator.college })
        const evaluation = await Evaluation.findOne({ "evaluator": evaluator._id })
        const evaluationCollege = await College.findOne({ "_id": evaluation?.college })

        const retEvaluator: any = {
            id: evaluator._id,
            name: evaluator.name,
            email: user?.email,
            college: college?.name,
            allocated: false,
        }

        if (evaluation) {
            retEvaluator.date = evaluation.visitDate
            retEvaluator.allocated = true
            retEvaluator.allotedCollege = evaluationCollege?.name
        }

        evaluators.push(retEvaluator)
    }

    res.json(evaluators)
}

export async function fetchEvaluations(req: Request, res: Response) {
    const evaluationsRaw = await Evaluation.find({}).exec()

    const evaluations = []

    for (let i = 0; i < evaluationsRaw.length; i++) {
        const evaluation = evaluationsRaw[i]

        const evaluator = await Evaluator.findOne({ "_id": evaluation.evaluator })
        const college = await College.findOne({ "_id": evaluator?.college })
        const allotedCollege = await College.findOne({ "_id": evaluation.college })

        const user = await User.findOne({ "_id": evaluator?.user })

        evaluations.push({
            id: evaluation._id,
            name: evaluator?.name,
            email: user?.email,
            college: college?.name,
            allotedCollege: allotedCollege?.name,
            date: evaluation.visitDate
        })
    }

    res.json(evaluations)
}

export async function fetchCollegeNames(req: Request, res: Response) {
    const collegesRaw = await College.find({}).exec()
    const colleges = collegesRaw.map(college => college.name)
    res.json(colleges)
}