import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="min-w-full flex justify-between items-center py-6">
      <Link href="/" className="text-xl font-bold">
        RFID
      </Link>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
