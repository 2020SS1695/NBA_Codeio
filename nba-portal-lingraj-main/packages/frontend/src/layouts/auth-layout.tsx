import { Outlet } from "react-router-dom"
import nba_logo_long from "@/assets/NBA-logo-long.png"
import working_img from "@/assets/undraw-working.svg"

function AuthLayout() {
  return (
    <div className=" flex flex-col h-screen bg-[#add8e6]">
      <div className=" flex justify-center items-center h-24 bg-[#17415f]">
        <img className=" h-[35%] md:h-[50%] lg:h-[60%]" src={nba_logo_long} alt="NBA logo" />
      </div>
      <div className=" flex-grow my-8 flex flex-col xl:flex-row">
        <div className=" xl:w-1/2 flex justify-center items-center">
          <img className=" h-60 md:h-72 lg:h-96" src={working_img} alt="people working" />
        </div>
  
        <div className=" mt-8 xl:w-1/2 flex flex-grow justify-center items-center">
          <div className=" w-[80%] md:w-[60%] lg:h-[40%]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout