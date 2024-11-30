import axios from "@/services/axios"
import { useAuth } from "."
import { AuthContextType } from "@/contexts/authContext"
import { Session } from "@/types"
import { AxiosError } from "axios"
import { useToast } from "@/shadcn/components/ui/use-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { Routes } from "@/constants/routes"

export default function useRefreshToken() {
  const { dispatchAuthState }: AuthContextType = useAuth()
  const { toast } = useToast()
  const location = useLocation()
  const navigate = useNavigate()

  async function refresh() {
    try {
      const response = await axios.get("/auth/token/refresh", {
        withCredentials: true,
      })

      const dataPayload: Session = response.data.data

      dispatchAuthState({
        type: "REFRESH",
        payload: dataPayload,
      })

      return response.data.data.accessToken
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          toast({
            variant: "destructive",
            title: "Session expired",
            description: "Please login again",
          })

          dispatchAuthState({
            type: "LOGOUT",
          })

          navigate(Routes.Auth.LOGIN, { state: { from: location }, replace: true })
        }
      }
    }
  }

  return refresh
}