import Link from "next/link"
import { useRouter } from "next/router"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"

const tabs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Check Class Details",
    link: "/check-class-details",
  },
  {
    name: "Check Attendance",
    link: "/create-attendance",
  },
]

const Sidebar = () => {
  const router = useRouter()
  return (
    <Card className="col-span-3 h-full border p-4">
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
