import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { hash } from "bcryptjs-react";
import { useMutation } from "@tanstack/react-query";
import { createNewUser } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { CheckCheck } from "lucide-react";

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
  });

const SignUp = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      middleName: "",
      lastName: "",
      confirmPassword: "",
    },
  });

  const mutate = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createNewUser,
    onSuccess: (data) => {
      form.reset();
      toast({
        variant: "default",
        action: (
          <div className="flex items-start justify-start gap-2 w-full">
            <CheckCheck className="text-green-500" />
            <span>Successfully created new user.</span>
          </div>
        ),
      });
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      email,
      firstName,
      middleName,
      lastName,
      password: initialPass,
    } = values;
    const password = await hash(initialPass, 5);
    console.log(values);
    mutate.mutateAsync({ email, firstName, middleName, lastName, password });
  };

  return (
    <div className="w-full flex items-center justify-center min-h-[60vh]">
      <Card className="md:w-3/5">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex md:flex-row flex-col md:gap-4 gap-2">
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
              </div>
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
              <div className="flex gap-2 text-muted-foreground items-center">
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
    </div>
  );
};

export default SignUp;
