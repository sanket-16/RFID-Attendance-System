import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { hash } from "bcryptjs-react";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(2, { message: "Please enter a valid password" }),
});

const SignIn = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const password = await hash(values.password, 5);

    // event.preventDefault();
    console.log(values);
    const res = await signIn("credentials", {
      email: values.email,
      password: password,
      redirect: false,
    });
    console.log(res);
  };

  return (
    <div className="w-full flex items-center justify-center min-h-[60vh]">
      <Card className="md:w-3/5">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form
            onSubmit={async (event) => {
              // event.preventDefault();
              console.log("hi");
              // const res = await signIn("credentials", {
              //   email: email,
              //   password: password,
              //   redirect: false,
              // });
              // console.log(res);
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="sanketpatil@ternaengg.ac.in"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={checked ? "text" : "password"}
                  placeholder="my very secret password"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="passcheck"
                  checked={checked}
                  onCheckedChange={(event) => setChecked((val) => !val)}
                />
                <label
                  htmlFor="passcheck"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
              </div>
            </div>
          </form> */}
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

export default SignIn;
