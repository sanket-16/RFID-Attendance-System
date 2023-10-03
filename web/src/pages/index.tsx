import { useStatus } from "@/lib/hooks/useStatus"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()
  const { role } = useStatus()
  if (role === "Student") {
    router.push("/student/dashboard")
  }
  if (role === "Teacher") {
    router.push("/teacher/dashboard")
  }
  return (
    <main className={`py-6 ${inter.className} min-w-max`}>
      <div className="grid w-full grid-cols-2">
        <div>hi</div>
        <div>hi</div>
      </div>
    </main>
  )
}
