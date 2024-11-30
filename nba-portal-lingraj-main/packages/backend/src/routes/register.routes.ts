import { registerCollege, registerEvaluator, registerEvaluation, unRegisterEvaluation } from "#src/controllers/register.controller"
import express from "express"

const router = express.Router()

router
    .post("/college", registerCollege)
    .post("/evaluator", registerEvaluator)
    .post("/evaluation", registerEvaluation)
    .post("/evaluation/unregister", unRegisterEvaluation)

export default router