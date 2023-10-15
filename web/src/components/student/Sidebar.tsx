import Link from "next/link"
import { useRouter } from "next/router"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"

const tabs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Check Attendance",
    link: "/check-attendance",
  },
  {
    name: "Older Classes",
    link: "/older-classes",
  },
]

const Sidebar = () => {
  const router = useRouter()
  return (
    <Card className="col-span-3 h-full border bg-background p-4">
      <CardHeader>
        <CardDescription>Student Dashboard</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-4">
        {tabs.map((tab) => (
          <Link
            href={`/student/dashboard${tab.link}`}
            key={tab.name}
            className={`rounded-md px-4 py-3 hover:bg-secondary ${
              router.route === `/teacher/dashboard${tab.link}` && "bg-secondary"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export default Sidebar
