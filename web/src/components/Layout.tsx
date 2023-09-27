import { ReactElement, Fragment } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <main className="w-screen min-h-screen md:px-24 xl:px-36 px-8">
      <Navbar />
      {children}
    </main>
  );
}
