import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/shadcn/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form"
import { Input } from "@/shadcn/components/ui/input"
import axios from "@/services/axios"
import { AxiosError } from "axios"
import { useToast } from "@/shadcn/components/ui/use-toast"
import { useAuth } from "@/hooks"
import { JSONResponse, Session } from "@/types"
import { useLocation, useNavigate } from "react-router-dom"
import { Checkbox } from "@/shadcn/components/ui/checkbox"


function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname ?? "/"

  const { dispatchAuthState: dispatch, setPersist } = useAuth()

  const { toast } = useToast()

  const loginFormSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    remember: z.boolean().default(true)
  })

  type LoginFormData = z.infer<typeof loginFormSchema>

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true
    },
  })

  async function onSubmit(data: LoginFormData) {
    setPersist(data.remember)
    localStorage.setItem("persist", data.remember.toString())

    try {
      const axiosRes = await axios.post(
        "/auth/login",
        JSON.stringify({ email: data.email, password: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      
      const res: JSONResponse = axiosRes.data

      const session: Session = {
        accessToken: res.data!.accessToken,
        email: res.data!.email,
        role: res.data!.role,
        collegeName: res.data!.collegeName,
      }

      dispatch({ type: "LOGIN", payload: session })
      navigate(from, { replace: true })
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        if (!error.response) {
          toast({
            variant: "destructive",
            description: "No server response",
          })
        } else if (error.response.status === 400) {
          toast({
            variant: "destructive",
            description: "Missing email or password",
          })
        } else if (error.response.status === 401) {
          toast({
            variant: "destructive",
            description: error.response.data.message,
          })
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "An error occurred",
          })
        }
      }
    }
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@doe.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex items-center space-x-6">
          <Button type="submit">Login</Button>
          <FormField
            control={loginForm.control}
            name="remember"
            render={({ field }) => (
              <FormItem>
                <div className=" flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    Remember?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export default LoginForm