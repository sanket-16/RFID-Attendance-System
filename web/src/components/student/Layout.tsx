import { useRouter } from "next/router"
import { ReactElement, ReactNode } from "react"
import { useStatus } from "@/lib/hooks/useStatus"
import Sidebar from "./Sidebar"

export default function Layout({
  children,
}: {
  children: ReactElement | ReactNode
}) {
  const router = useRouter()
  const { role } = useStatus()
  if (role === "Teacher") {
    router.push("/teacher/dashboard")
  }
  return (
    <main className="w-full">
      <div className="grid grid-cols-12 gap-4">
        <Sidebar />
        <div className="col-span-9 border p-4 ">{children}</div>
      </div>
    </main>
  )
}
