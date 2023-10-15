import Layout from "@/components/student/Layout";
import { useToast } from "@/components/ui/use-toast";
import { getClass, getFilteredStudents, getStudentClasses } from "@/lib/api";
import { Class } from "@/pages/api/student/get-classes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClassDetails = ({ classDetails }: { classDetails: Class }) => {
  const [open, setOpen] = useState(false);

  const { data, status } = useQuery({
    queryKey: ["getClass", classDetails],
    queryFn: () => getClass({ id: classDetails.id }),
    enabled: open,
  });

  const date = new Date(classDetails?.startTime);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card
          key={classDetails.id}
          className="p-4 text-start hover:cursor-pointer hover:bg-secondary"
        >
          <CardDescription className="font-bold">
            {classDetails.title}
          </CardDescription>
          <CardContent className="flex flex-col gap-4 py-4">
            <p>Subject : {classDetails.subject}</p>
            <p>
              Teacher :{" "}
              {classDetails.teacher.firstName +
                " " +
                classDetails.teacher.lastName}
            </p>
            <p>Start Time : {date.toLocaleString()}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{classDetails.title}</DialogTitle>
          <DialogDescription>{classDetails.subject}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p>Number of Students : {data?.classDetails?._count?.students}</p>
          <p>Time : {date.toLocaleString()}</p>
          <p>
            Teacher :{" "}
            {classDetails.teacher.firstName +
              " " +
              classDetails.teacher.lastName}
          </p>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const StudentDashboard = () => {
  const today = new Date();
  const { data, status } = useQuery({
    queryKey: ["getStudentClasses"],
    queryFn: () => getStudentClasses(),
  });
  const todaysClass = data?.classes?.filter(
    (classDetails) =>
      new Date(classDetails.startTime).getDate() === today.getDate()
  );
  const futureClasses = data?.classes?.filter(
    (classDetails) =>
      new Date(classDetails.startTime).getDate() > today.getDate()
  );

  return (
    <Layout>
      <>
        <CardDescription>StudentDashboard / Home</CardDescription>
        <CardContent className="py-4">
          <div className="grid w-full gap-4 md:grid-cols-3">
            <p className="col-span-3 font-bold text-muted-foreground">
              Today&#39;s Classes
            </p>
            {todaysClass?.length === 0 || todaysClass === undefined ? (
              <p>No classes scheduled today</p>
            ) : (
              todaysClass?.map((classDetails) => (
                <ClassDetails
                  key={classDetails.id}
                  classDetails={classDetails}
                />
              ))
            )}
            <p className="col-span-3 font-bold text-muted-foreground">
              Future Classes
            </p>
            {futureClasses?.length === 0 || futureClasses === undefined ? (
              <p>No classes scheduled for future</p>
            ) : (
              futureClasses?.map((classDetails) => (
                <ClassDetails
                  key={classDetails.id}
                  classDetails={classDetails}
                />
              ))
            )}
            <div className="col-span-3">
              <p className="pb-4 font-bold text-muted-foreground">
                Older Classes
              </p>
              <Button asChild>
                <Link href="/student/dashboard/older-classes">
                  View Older Classes
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </>
    </Layout>
  );
};

export default StudentDashboard;
