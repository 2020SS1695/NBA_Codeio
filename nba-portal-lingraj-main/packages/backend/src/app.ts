import authRouter from "./routes/auth.routes.js"
import registerRouter from "./routes/register.routes.js"
import fetchRouter from "./routes/fetch.routes.js"
import express from "express"
import cookieParser from "cookie-parser"
import credentials from "./middlewares/credentials.js"
import cors from "cors"
import corsOptions from "./config/corsOptions.js"
import verifyJWT from "./middlewares/verifyJWT.js"

const app = express()

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// TODO: setup a error handler
app.use("/auth", authRouter)
app.use("/register", registerRouter)
app.use("/fetch", fetchRouter)

app.use(verifyJWT)

// TODO: remove this
app.get("/test", (req, res) => {
    res.send("Hello World!")
})

export { app }

// import { Evaluator } from "#src/models/evaluator.model.js"

// const evaluator = Evaluator.create({
//     name: "John Doe",
//     category: 1,
//     hIndex: 10,
// })