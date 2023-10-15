import Link from "next/link"
import { Session } from "next-auth"
import { signIn, signOut, useSession } from "next-auth/react"
//@ts-ignore
import { AvatarComponent } from "avatar-initials"
import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

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
            color="#ffffff"
            background="hsl(217.2 ,91.2% ,59.8%)"
            fontSize={13}
            fontWeight={400}
            offsetY={13}
            initials={`${data.user?.name?.split(
              " "
            )[0][0]}${data.user?.name?.split(" ")[1][0]}`}
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
  )
}

const Navbar = () => {
  const { data, status } = useSession()
  console.log(data)
  return (
    <nav className="flex min-w-full items-center justify-between py-6">
      <Link href="/" className="text-xl font-bold">
        RFID
      </Link>
      <div className="flex gap-4">
        {status === "unauthenticated" && (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
        {status === "authenticated" && <Menu data={data} />}
        {status === "loading" && <Skeleton className="h-10 w-28" />}
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar
