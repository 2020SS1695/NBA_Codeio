import type { Response, Request, NextFunction } from "express"
import { validateToken } from "#src/services/auth.service.js"
import ModifiedRequest from "#src/types/modified-request.js"

type Decoded = ModifiedRequest["user"]

function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith("Bearer ")) {
        return res.sendStatus(401) // Unauthorized
    }

    const token = authHeader.split(" ")[1]

    validateToken(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        // TODO: you could access the decoded token here, if you take the second argument
        function (err, decoded) {
            if (err) {
                return res.sendStatus(403) // Forbidden
            }

            (req as ModifiedRequest).user = (decoded as Decoded)

            next()
        }
    )
}

export default verifyJWT