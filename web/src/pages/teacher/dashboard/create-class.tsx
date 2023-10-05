import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Subjects } from "@prisma/client"
import { useForm } from "react-hook-form"
import Layout from "@/components/teacher/Layout"
import { CardContent, CardDescription } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMutation } from "@tanstack/react-query"
import { createNewClass, createNewUser } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { CheckCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function getEnumKeys<
  T extends string,
  TEnumValue extends string | number,
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>
}
const subjects = getEnumKeys(Subjects)
const formSchema = z.object({
  title: z.string().min(2, { message: "This field has to be filled." }),
  subject: z.enum(["", ...subjects]),
  startTime: z.string(),
})

const CreateClass = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subject: "",
      startTime: "",
    },
  })

  const mutate = useMutation({
    mutationKey: ["createNewClass"],
    mutationFn: createNewClass,
    onSuccess: (data) => {
      form.reset()
      toast({
        variant: "default",
        action: (
          <div className="flex w-full items-start justify-start gap-2">
            <CheckCheck className="text-green-500" />
            <span>Successfully created new class.</span>
          </div>
        ),
      })
    },
  })
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, subject, startTime } = values
    const date = new Date(startTime)
    console.log(values)
    mutate.mutateAsync({ title, subject, startTime: date })
  }

  return (
    <Layout>
      <CardDescription>TeacherDashboard / Create Class</CardDescription>
      <CardContent>
        <div className="h-4 md:col-span-3" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 py-12"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Networks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[40vh] overflow-y-scroll">
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Layout>
  )
}

export default CreateClass
