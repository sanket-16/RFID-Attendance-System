import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="min-w-full flex justify-between items-center py-6">
      <h3 className="text-xl font-bold">RFID</h3>
      <div className="flex gap-4">
        <Button>Sign In</Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
