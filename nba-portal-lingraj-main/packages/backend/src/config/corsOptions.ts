import { CorsOptions } from "cors"
import allowedOrigins from "#src/constants/allowedOrigin.js"

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if(allowedOrigins.indexOf(origin!) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200,
}

export default corsOptions