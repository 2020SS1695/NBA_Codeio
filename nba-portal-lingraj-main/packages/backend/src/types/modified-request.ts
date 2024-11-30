import type { Request } from "express"

interface ModifiedRequest extends Request {
    user: {
        id: string
        email: string
        role: string
    }
}

export default ModifiedRequest