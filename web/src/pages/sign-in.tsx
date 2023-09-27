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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SignIn = () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className="w-full flex items-center justify-center min-h-[60vh]">
      <Card className="md:w-3/5">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sanketpatil@ternaengg.ac.in"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
