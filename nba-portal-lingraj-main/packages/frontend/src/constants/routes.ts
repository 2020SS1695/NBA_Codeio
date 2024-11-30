export const Routes = {
  Auth: {
    getRoot() {
      return "/auth"
    },
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },
  Admin: {
    getRoot() {
      return "/admin"
    },
    DASHBOARD: "/admin/dashboard",
  },
  College: {
    getRoot() {
      return "/college"
    },
    DASHBOARD: "/college/dashboard",
  },
  Evaluator: {
    getRoot() {
      return "/evaluator"
    },
    DASHBOARD: "/evaluator/dashboard"
  },
  ROOT: "/",
  UNAUTHORIZED: "/unauthorized",
}