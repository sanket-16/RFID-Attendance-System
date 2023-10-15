import { ReactElement, ReactNode } from "react"
import { useRouter } from "next/router"
import { useStatus } from "@/lib/hooks/useStatus"
import Sidebar from "./Sidebar"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export default function Layout({
  children,
}: {
  children: ReactElement | ReactNode
}) {
  const router = useRouter()
  const { role, status } = useStatus()
  if (role === "Student") {
    router.push("/student/dashboard")
  }
  return (
    <main className="w-full">
      <div className="grid grid-cols-12 gap-4 ">
        <Sidebar />
        {status === "loading" ? (
          <Skeleton className="col-span-9 h-[80vh]"></Skeleton>
        ) : (
          <Card className="col-span-9 h-[80vh] rounded-md border p-4">
            {children}
          </Card>
        )}
      </div>
    </main>
  )
}
