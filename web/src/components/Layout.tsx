import { ReactElement, Fragment } from "react"
import Navbar from "./Navbar"
import { Toaster } from "@/components/ui/toaster"

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <main className="min-h-screen w-screen px-8 md:px-24 xl:px-36">
      <Navbar />
      {children}
      <Toaster />
    </main>
  )
}
