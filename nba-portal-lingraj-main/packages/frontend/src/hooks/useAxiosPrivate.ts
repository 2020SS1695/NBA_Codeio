import { axiosPrivate } from "@/services/axios"
import { useAuth, useRefreshToken } from "."
import { AuthContextType } from "@/contexts/authContext"
import { useEffect } from "react"

export default function useAxiosPrivate() {
  const refresh = useRefreshToken()
  const { authState }: AuthContextType = useAuth()

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${authState!.accessToken}`
        }

        return config
      }, error => Promise.reject(error)
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        if (error.response.status === 403 && !originalRequest._sent) {
          originalRequest._sent = true

          const accessToken = await refresh()

          axiosPrivate.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

          return axiosPrivate(originalRequest)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [authState, refresh])

  return axiosPrivate
}