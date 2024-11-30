import type { Response, NextFunction } from "express"
import ModifiedRequest from "#src/types/modified-request.js"

// TODO: add this in the routes that you want to protect
function verifyRole(allowedRole: string) {
    return function (req: ModifiedRequest, res: Response, next: NextFunction) {
        const role = req.user.role

        if (allowedRole !== role) {
            return res.sendStatus(403) // Forbidden
        }

        next()
    }
}

export default verifyRole