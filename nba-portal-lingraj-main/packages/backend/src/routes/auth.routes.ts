import express from "express"
import { 
    login, 
    logout, 
    signup 
} from "#src/controllers/auth.controller.js"
import { handleRefreshToken } from "#src/controllers/refreshToken.controller.js"

const router = express.Router()

router
    .get("/token/refresh", handleRefreshToken)

router
    .post("/login", login)
    .post("/signup", signup)
    .post("/logout", logout)

export default router