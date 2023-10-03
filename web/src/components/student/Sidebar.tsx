import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

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
];

const Sidebar = () => {
  return (
    <Card className="col-span-3 border p-4 h-full">
      <CardHeader>
        <CardDescription>Student Dashboard</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-4">
        {tabs.map((tab) => (
          <Link
            href={`/student/dashboard${tab.link}`}
            key={tab.name}
            className="px-4 py-3 hover:bg-secondary rounded-md"
          >
            {tab.name}
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default Sidebar;
