import { Class } from "@/pages/api/student/get-classes";
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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClass, getOlderClasses, getStudentClasses } from "@/lib/api";
import Layout from "@/components/student/Layout";

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

const OlderClasses = () => {
  const { data, status } = useQuery({
    queryKey: ["getStudentClasses"],
    queryFn: () => getOlderClasses(),
  });
  if (status === "loading") {
    return <p>Loading</p>;
  }
  if (status === "error") {
    return <p>Error</p>;
  }

  return (
    <Layout>
      <>
        <CardDescription>StudentDashboard / Older Classes</CardDescription>
        <CardContent className="py-4">
          {data?.classes?.length === 0 ? (
            <p>No older class records found</p>
          ) : (
            data?.classes?.map((classDetails) => (
              <ClassDetails key={classDetails.id} classDetails={classDetails} />
            ))
          )}
        </CardContent>
      </>
    </Layout>
  );
};

export default OlderClasses;
