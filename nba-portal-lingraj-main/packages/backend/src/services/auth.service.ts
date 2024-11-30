import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getToken(payload: any, secret: string, expiresIn: string) {
    return jwt.sign(
        payload, 
        secret,
        { expiresIn: expiresIn }
    )
}

export function validateToken(token: string, secret: string, callback: jwt.VerifyCallback) {
    return jwt.verify(
        token,
        secret,
        callback
    )
}

export function getAccessToken(payload: { id: ObjectId, email: string, role: number }) {
    return getToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET!,
        process.env.ACCESS_TOKEN_EXPIRES_IN!
    )
}