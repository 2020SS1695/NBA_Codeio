import { Outlet } from "react-router-dom"
import { useAuth } from "@/hooks"
import { useEffect, useState } from "react"
import { useRefreshToken } from "@/hooks"

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const refresh = useRefreshToken()
  const { authState, persist } = useAuth()

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh()
      } catch (err: unknown) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (!(authState?.accessToken)) {
      verifyRefreshToken()
    } else {
      setIsLoading(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TODO: Add loading spinner
  return (
    <>
      {
        !persist
          ? <Outlet />
          : isLoading
            ? <div>Loading...</div>
            : <Outlet />
      }
    </>
  )
}