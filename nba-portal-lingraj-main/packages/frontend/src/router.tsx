import { Routes } from "@/constants/routes"
import { createBrowserRouter } from "react-router-dom"
import AuthLayout from "./layouts/auth-layout"
import RequireAuth from "./components/require-auth"
import LoginForm from "./pages/auth/login/login-form"
import Roles from "./constants/roles"
import UnauthorizedPage from "./pages/unauthorized/unauthorized"
import RootPage from "./pages/root/root"
import PersistLogin from "./components/persist-login"
import AdminLayout from "./layouts/admin-layout"
import AdminPage from "./pages/admin"
import CollegePage from "./pages/college"
import EvaluatorPage from "./pages/evaluator"

export const router = createBrowserRouter([
  { // Auth Nav Graph
    path: Routes.Auth.getRoot(),
    element: <AuthLayout />,
    children: [
      {
        path: Routes.Auth.LOGIN,
        element: <LoginForm />
      },
      {
        path: Routes.Auth.SIGNUP,
        element: <div>Signup Page</div>,
      },
    ],
  },
  { // Protected Nav Graph
    element: <PersistLogin />,
    children: [
      { // Root Page
        element: <RequireAuth />,
        children: [
          {
            path: Routes.ROOT,
            element: <RootPage />,
          },
        ]
      },
      { // Admin Nav Graph
        path: Routes.Admin.getRoot(),
        element: <RequireAuth allowedRole={Roles.ADMIN} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: Routes.Admin.DASHBOARD,
                element: <AdminPage />,
              },
            ]
          },
        ],
      },
      { // College Nav Graph
        path: Routes.College.getRoot(),
        element: <RequireAuth allowedRole={Roles.COLLEGE} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: Routes.College.DASHBOARD,
                element: <CollegePage />,
              },
            ]
          },
        ],
      },
      { // Evaluator Nav Graph
        path: Routes.Evaluator.getRoot(),
        element: <RequireAuth allowedRole={Roles.EVALUATOR} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: Routes.Evaluator.DASHBOARD,
                element: <EvaluatorPage />,
              }
            ]
          }
        ]
      },
    ],
  },
  { // Unauthorized Page
    path: Routes.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },
])