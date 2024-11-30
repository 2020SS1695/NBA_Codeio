import Roles from "@/constants/roles"

interface Session {
  email: string
  role: Roles
  accessToken: string
  collegeName?: string
}

export default Session