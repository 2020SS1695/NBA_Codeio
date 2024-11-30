import { fetchEvaluators, fetchCollegeNames, fetchEvaluations } from '#src/controllers/fetch.controller.js'
import express from 'express'

const router = express.Router()

router
    .get("/evaluators", fetchEvaluators)
    .get("/collegeNames", fetchCollegeNames)
    .get("/evaluations", fetchEvaluations)

export default router