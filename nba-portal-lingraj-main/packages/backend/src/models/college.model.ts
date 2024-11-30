import mongoose from "mongoose"
import { programSchema } from "#src/models/program.model.js"

// TODO: is category a college property or a program property?
const collegeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Number,
        required: true,
        enum: [1, 2, 3],
    },
    programs: [programSchema],
    type: {
        type: String,
        required: true,
        enum: ["government", "private"],
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
})

const College = mongoose.model("college", collegeSchema)

export default College

export { collegeSchema }