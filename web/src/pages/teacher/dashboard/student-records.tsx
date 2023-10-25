import Layout from "@/components/teacher/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getAllStudents, getSingleStudent } from "@/lib/api";
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
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    queryFn: () => getSingleStudent({ id: student.id }),
    enabled: open,
  });
  const totalClasses = data?.student._count.classes;
  const presentData = data?.student._count.attendanceRecords;
  const absentData = totalClasses - presentData;
  const presentPercentage = Math.round((presentData / totalClasses) * 100);
  const absentPercentage = Math.round((absentData / totalClasses) * 100);
  return (<>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="p-2 hover:bg-secondary" onClick={() => { }}>
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
      <DialogContent className="max-h-screen overflow-y-scroll lg:max-w-fit">
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
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sr No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Present %</TableHead>
                <TableHead>Absent %</TableHead>
                {/* <TableHead>Options</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {1}
                </TableCell>
                <TableCell>
                  {data?.student.firstName + " " + data?.student.middleName + " " + data?.student.lastName}
                </TableCell>

                <TableCell>
                  {data?.student.email}
                </TableCell>

                <TableCell>
                  {presentPercentage}
                </TableCell>
                <TableCell>
                  {absentPercentage}
                </TableCell>


                {/* <TableCell>
                <button   className="btn btn-primary">View</button>
              </TableCell> */}



              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>




  </>

  );
};
