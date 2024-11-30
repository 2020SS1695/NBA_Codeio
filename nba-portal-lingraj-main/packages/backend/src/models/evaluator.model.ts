import mongoose from "mongoose"

const evaluatorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "college",
    },
    category: {
        type: Number,
        required: false,
        enum: [1, 2, 3],
    },
    hIndex: {
        type: Number,
        required: true,
    },
})

evaluatorSchema.pre("save", function (next) {
    if (this.hIndex >= 15) {
        this.category = 1
    } else if (this.hIndex >= 10) {
        this.category = 2
    } else if (this.hIndex >= 5) {
        this.category = 3
    } else {
        throw new Error("hIndex must be at least 5")
    }

    next()
})

const Evaluator = mongoose.model("evaluator", evaluatorSchema)

export default Evaluator

// TODO: make a database trigger to update the category based on other properties