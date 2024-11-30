import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks"
import { AuthContextType } from "@/contexts/authContext"
import { Routes } from "@/constants/routes"
import Roles from "@/constants/roles"

interface RequireAuthProps {
  allowedRole?: Roles
}

function RequireAuth({ allowedRole }: RequireAuthProps) {
  const { authState }: AuthContextType = useAuth()
  const location = useLocation()

  console.log("authState", authState)

  return (
    authState?.accessToken
      ? ((authState?.role === allowedRole || allowedRole === undefined)
        ? <Outlet />
        : <Navigate to={Routes.UNAUTHORIZED} state={{ from: location }} replace />)
      : <Navigate to={Routes.Auth.LOGIN} state={{ from: location }} replace />
  )
}

export default RequireAuth