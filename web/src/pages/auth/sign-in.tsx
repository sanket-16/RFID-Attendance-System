import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { hash } from "bcryptjs-react"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/router"

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(2, { message: "Please enter a valid password" }),
  role: z.enum(["Teacher", "Student"]),
})

const SignIn = () => {
  const router = useRouter()
  const { error } = router.query

  const [checked, setChecked] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const password = await hash(values.password, 5)

    const res = await signIn("credentials", {
      email: values.email,
      password: password,
      role: values.role,
      redirect: true,
      callbackUrl:
        values.role === "Student"
          ? `${process.env.NEXT_PUBLIC_URL}/student/dashboard`
          : `${process.env.NEXT_PUBLIC_URL}/teacher/dashboard`,
    })
    localStorage.setItem("role", values.role)
  }

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <Card className="md:w-3/5">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="my very secret password"
                        type={checked ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Teacher">Teacher</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => setChecked((val) => !val)}
                />
                <Label>Show password</Label>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {error && (
        <Card className="flex items-center gap-4 border border-red-500 bg-red-500/20 p-4 md:w-3/5">
          <X />
          {error}
        </Card>
      )}
    </div>
  )
}

export default SignIn
