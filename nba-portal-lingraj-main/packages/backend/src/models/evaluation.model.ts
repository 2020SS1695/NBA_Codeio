import mongoose from "mongoose"

const evaluationSchema = new mongoose.Schema({
    evaluator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    visitDate: {
        type: Date,
        required: true,
    },
    // scores: {
    //     type: [Number],
    //     required: true,
    // },
    // comments: {
    //     type: String,
    //     required: true,
    // },
})

const EvaluationModel = mongoose.model("evaluation", evaluationSchema)

export default EvaluationModel