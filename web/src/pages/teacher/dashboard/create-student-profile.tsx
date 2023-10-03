import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Layout from "@/components/teacher/Layout"
import { createNewUser } from "@/lib/api"

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: "This field has to be filled." }),
    middleName: z.string(),
    lastName: z.string().min(2, { message: "This field has to be filled." }),
    email: z
      .string()
      .min(2, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(2, { message: "Please enter a valid password" }),
    confirmPassword: z
      .string()
      .min(2, { message: "Please enter a valid password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const SignUp = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
    },
  })

  const mutate = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createNewUser,
    onSuccess: (data) => {
      form.reset()
      toast({
        variant: "default",
        action: (
          <div className="flex w-full items-start justify-start gap-2">
            <CheckCheck className="text-green-500" />
            <span>Successfully created new user.</span>
          </div>
        ),
      })
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, firstName, middleName, lastName } = values

    console.log(values)
    mutate.mutateAsync({ email, firstName, middleName, lastName })
  }

  return (
    <Layout>
      <>
        <CardDescription>
          TeacherDashboard / Create Student Profile
        </CardDescription>
        <CardContent>
          <div className="h-4 md:col-span-3" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 py-12"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Sanket" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Suresh " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Patil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="sanketpatil@ternaengg.ac.in"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </>
    </Layout>
  )
}

export default SignUp
