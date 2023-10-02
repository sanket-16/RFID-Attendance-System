import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
//@ts-ignore
import { AvatarComponent } from "avatar-initials";
import { Session } from "next-auth";

const Menu = ({ data }: { data: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"} className="flex items-center gap-2 py-4">
          <AvatarComponent
            classes="rounded-full"
            useGravatar={false}
            size={24}
            primarySource={data.user?.image}
            color="#000000"
            background="#f1f1f1"
            fontSize={14}
            fontWeight={400}
            offsetY={14}
            initials={`${data.user?.name?.split(" ")[0][0]}${
              data.user?.name?.split(" ")[1][0]
            }`}
          />
          {data.user?.name?.split(" ")[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const { data, status } = useSession();
  console.log(data);
  return (
    <nav className="min-w-full flex justify-between items-center py-6">
      <Link href="/" className="text-xl font-bold">
        RFID
      </Link>
      <div className="flex gap-4">
        {status === "unauthenticated" && (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
        {status === "authenticated" && <Menu data={data} />}
        {status === "loading" && <Skeleton className="w-28 h-10" />}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
