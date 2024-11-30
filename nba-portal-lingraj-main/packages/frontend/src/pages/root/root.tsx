import Roles from "@/constants/roles"
import { Routes } from "@/constants/routes"
import { useAuth } from "@/hooks"
import { Navigate } from "react-router-dom"

export default function RootPage() {
  const { authState } = useAuth()

  if(authState?.role == Roles.ADMIN) {
    return <Navigate to={Routes.Admin.DASHBOARD} />
  } else if(authState?.role == Roles.COLLEGE) {
    return <Navigate to={Routes.College.DASHBOARD} />
  } else if(authState?.role == Roles.EVALUATOR) {
    return <Navigate to={Routes.Evaluator.DASHBOARD} />
  }

  return <>Role Error</>
}