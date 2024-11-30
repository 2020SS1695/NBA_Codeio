import mongoose, { InferSchemaType } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        select: false,  
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "evaluator", "college"],
        // TODO: add a default value, if needed
        // default: "college",
    },
    refreshToken: {
        type: String,
        select: false,
    },
}, { timestamps: true })

userSchema.methods.checkPassword = async function (inputPassword: string) {
    return await bcrypt.compare(inputPassword, this.password)
}

type User = InferSchemaType<typeof userSchema>

interface IUserMethods {
    checkPassword: (inputPassword: string) => Promise<boolean>,
}

type UserModel = mongoose.Model<User, Record<string,never>, IUserMethods>

// TODO: sync this with the frontend
function validateEmail(email: string) {
    // TODO: update this regex to be more accurate
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

const UserModel = mongoose.model<User, UserModel>("user", userSchema)

export default UserModel