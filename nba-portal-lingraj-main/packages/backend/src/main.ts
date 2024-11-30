import mongoose from "mongoose"
import dotenv from "dotenv"

import { app } from "#src/app.js"

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URL!)
    .then(() => {
        console.log("connected to db")
    })
    .catch((err) => {
        console.error("Failed in db connection phase: ", err)
    })

const port: string = process.env.SERVER_PORT!

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})