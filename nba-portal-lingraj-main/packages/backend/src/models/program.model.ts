import mongoose from "mongoose"

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
        enum: ["UG", "PG", "PhD"],
    },
    accreditationStartDate: {
        type: Date,
        required: true,
    },
    accreditationEndDate: {
        type: Date,
        required: true,
    },
})

programSchema.virtual("isAccreditated").get(function() {
    const currentDate: Date = new Date(new Date().toISOString().split("T")[0])
    const endDate: Date = new Date(this.accreditationEndDate.toISOString().split("T")[0])
    
    return currentDate <= endDate
})

// const Program = mongoose.model("program", programSchema)
// export default Program

export { programSchema }