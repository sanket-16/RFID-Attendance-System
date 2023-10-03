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
    name: "Create Student Account",
    link: "/create-student-profile",
  },
  {
    name: "Create Class",
    link: "/create-class",
  },
];

const Sidebar = () => {
  return (
    <Card className="col-span-3 border  h-full">
      <CardHeader>
        <CardDescription>Teacher Dashboard</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-4">
        {tabs.map((tab) => (
          <Link
            href={`/teacher/dashboard${tab.link}`}
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
