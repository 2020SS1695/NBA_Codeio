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

function Registration() {
  const { toast } = useToast()

  const loginFormSchema = z.object({
    name: z.string(),
    email: z.string().email("Enter a valid email address"), 
  })

  type RegistrationFormData = z.infer<typeof loginFormSchema>

  const RegistrationForm = useForm<RegistrationFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      email: "", 
    },
  })

  async function onSubmit(data: RegistrationFormData) {
    try {
      axios.post(
        "/register/college",
        JSON.stringify({ 
          name: data.name, 
          email: data.email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      toast({
        variant: "default",
        description: "College successfully registered",
      })
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
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "An error occurred",
        })
      }
    }
  }

  return (
    <Form {...RegistrationForm}>
      <form onSubmit={RegistrationForm.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={RegistrationForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="name" placeholder="Type the college name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={RegistrationForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="joe@123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex items-center space-x-6">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  )
}

export default Registration