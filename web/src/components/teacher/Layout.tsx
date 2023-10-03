import React, { ReactElement } from "react"
import { useRouter } from "next/router"
import { useStatus } from "@/lib/hooks/useStatus"
import Sidebar from "./Sidebar"
import { Card } from "../ui/card"

export default function Layout({
  children,
}: {
  children: ReactElement | React.ReactNode
}) {
  const router = useRouter()
  const { role } = useStatus()
  if (role === "Student") {
    router.push("/student/dashboard")
  }
  return (
    <main className="w-full">
      <div className="grid grid-cols-12 gap-4 ">
        <Sidebar />
        <Card className="col-span-9 h-[80vh] border p-4">{children}</Card>
      </div>
    </main>
  )
}
