import { Session } from "."

interface JSONResponse {
  message: string
  data?: Session
}

export default JSONResponse