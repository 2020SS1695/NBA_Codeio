import { createContext, useReducer, ReactNode, useState } from "react"
import { Session } from "@/types"

type AuthStateType = Session | null | undefined

// interface AuthReducerAction {
//   type: "LOGIN" | "LOGOUT" | "REFRESH"
//   payload?: Partial<Session>
// }

interface AuthReducerAction {
  type: "LOGIN" | "LOGOUT" | "REFRESH";
  payload?: Session
}

interface AuthContextType {
  authState: AuthStateType
  dispatchAuthState: React.Dispatch<AuthReducerAction>
  persist: boolean
  setPersist: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function authReducer(authState: AuthStateType, action: AuthReducerAction): AuthStateType {
  switch(action.type) {
    case "LOGIN":
    case "REFRESH":
      return action.payload
    case "LOGOUT":
      return null
    default:
      throw new Error(`Invalid action type: ${action.type}, state: ${authState}`)
  }
}

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [authState, dispatchAuthState] = useReducer(authReducer, undefined)
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") ?? "true")
  )

  return (
    <AuthContext.Provider value={{ authState, dispatchAuthState, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
export type { AuthStateType, AuthContextType }