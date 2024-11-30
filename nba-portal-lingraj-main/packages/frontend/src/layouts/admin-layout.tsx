import { Outlet } from "react-router-dom"
import nba_logo_long from "@/assets/NBA-logo-long.png"
import { Button } from "@/shadcn/components/ui/button"
import { useAuth } from "@/hooks"

function AdminLayout() {
  const { dispatchAuthState } = useAuth()

  return (
    <div className=" flex flex-col h-screen bg-[#add8e6]">
      <div className=" flex justify-center items-center h-24 bg-[#17415f]">
        <img className=" h-[35%] md:h-[50%] lg:h-[60%]" src={nba_logo_long} alt="NBA logo" />
      </div>
      <div>
        <Button className=" ml-8 mt-6" onClick={() => { dispatchAuthState({ type: "LOGOUT" }) }}>Logout</Button>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout