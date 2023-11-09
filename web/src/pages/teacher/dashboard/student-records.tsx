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
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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

type PieData = { name: string; data: number };
const COLORS = ["#00FF00", "#FF0000"];

const StudentDetails = ({ student }: { student: Student }) => {
  const [open, setOpen] = useState(false);
  const [totalClasses, setTotalClasses] = useState<number>(0);
  const [presentData, setPresentData] = useState<number>(0);
  const [absentData, setAbsentData] = useState<number>(0);
  const [presentPercentage, setPresentPercentage] = useState<number>(0);
  const [absentPercentage, setAbsentPercentage] = useState<number>(0);
  const { data, status, isFetching, isRefetching } = useQuery({
    queryKey: ["getStudentRecords"],
    queryFn: () => getSingleStudent({ id: student.id }),
    enabled: open,
  });
  const [pieData, setPieData] = useState<PieData[]>([]);
  useEffect(() => {
    if (status === "error" || status === "loading") {
    }
    if (status === "success") {
      setTotalClasses(data?.student._count.classes);
      setPresentData(data?.student._count.attendanceRecords);
      setAbsentData(totalClasses - presentData);
      setPresentPercentage(Math.round((presentData / totalClasses) * 100));
      setAbsentPercentage(Math.round((absentData / totalClasses) * 100));
      setPieData([
        { name: "PresentData", data: presentData },
        { name: "AbsentData", data: absentData },
      ]);
    }
  }, [
    status,
    totalClasses,
    absentData,
    presentData,
    absentPercentage,
    presentPercentage,
    open,
    data,
  ]);
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
        {(status === "loading" || isFetching || isRefetching) && (
          <p className="p-10 text-center">loading...</p>
        )}
        {status === "success" && (!isFetching || !isRefetching) && (
          <div className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Total Classes</TableHead>
                  <TableHead>Present Classes</TableHead>
                  <TableHead>Absent Classes</TableHead>
                  <TableHead>Present %</TableHead>
                  <TableHead>Absent %</TableHead>
                  {/* <TableHead>Options</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                <TableRow>
                  <TableCell>{data?.student._count.classes}</TableCell>
                  <TableCell>{presentData}</TableCell>
                  <TableCell>{absentData}</TableCell>

                  <TableCell className="font-bold text-green-500">
                    {presentPercentage}%
                  </TableCell>
                  <TableCell className="font-bold text-red-500">
                    {absentPercentage}%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="grid  grid-cols-2 place-items-center ">
              <div className="flex flex-col gap-4">
                <p>Student Data</p>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border border-white bg-green-500"></div>
                  <p>Present Percentage</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border border-white bg-red-500"></div>
                  <p>Absent Percentage</p>
                </div>
              </div>
              <ResponsiveContainer width={400} height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#ffffff"
                    paddingAngle={5}
                    dataKey="data"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
