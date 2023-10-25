import Layout from "@/components/teacher/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getAllStudents } from "@/lib/api";
import { Student } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const StudentRecords = () => {
  const { data: studentData, status: studentStatus } = useQuery({
    queryKey: ["getAllStudents"],
    queryFn: () => getAllStudents(),
  });
  return (
    <Layout>
      <CardDescription>TeacherDashboard / Student Records</CardDescription>
      <CardContent className="p-4">
        {studentStatus === "error" && "Something went wrong"}
        {studentStatus === "loading" && "Loading..."}
        {studentStatus === "success" && (
          <div className="flex flex-col gap-4 px-4">
            {studentData.students.map((student) => (
              <StudentDetails key={student.id} student={student} />
            ))}
            {studentData?.students.length === 0 && "No students"}
          </div>
        )}
      </CardContent>
    </Layout>
  );
};

export default StudentRecords;

const StudentDetails = ({ student }: { student: Student }) => {
  const [open, setOpen] = useState(false);
  const { data, status } = useQuery({
    queryKey: ["getStudentRecords"],
    queryFn: () => getClass({ id: classDetails.id }),
    enabled: open,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="p-2 hover:bg-secondary" onClick={() => {}}>
          <CardContent className="flex items-center justify-between">
            <span>
              {student.firstName +
                " " +
                student.middleName +
                " " +
                student.lastName}
            </span>
            <span className="text-sm font-bold text-muted-foreground">
              {student.email}
            </span>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {student.firstName +
              " " +
              student.middleName +
              " " +
              student.lastName}
          </DialogTitle>
          <DialogDescription> {student.email}</DialogDescription>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};
