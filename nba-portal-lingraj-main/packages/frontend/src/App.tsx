import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { Toaster } from "./shadcn/components/ui/toaster"
import AdminPage from "./pages/admin"
import Registration from "./pages/admin/registration"

// TODO: remove js-cookie package
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />

      {/* <Registration /> */}
    </>
  )
}

export default App
