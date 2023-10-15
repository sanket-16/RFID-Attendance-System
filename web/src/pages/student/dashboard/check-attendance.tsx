import Layout from "@/components/student/Layout";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttendanceRecords } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const markAttendance = async () => {
  const req = await fetch("/api/mark-attendance", {
    method: "POST",
    body: JSON.stringify({
      uid: "1234-1234",
    }),
  });
  const res = await req.json();
  console.log(res);
};

const RawRecords = () => {
  const [hidden, setHidden] = useState(false);
  const { data, status } = useQuery({
    queryKey: ["attendance-records"],
    queryFn: () => getAttendanceRecords(),
    enabled: hidden,
  });
  return (
    <Dialog open={hidden} onOpenChange={setHidden}>
      <DialogTrigger asChild>
        <Button variant="secondary">View Raw Attendance Records</Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogTitle>Attendance Records</DialogTitle>
        <DialogDescription>
          Raw attendance records from rfid system.
        </DialogDescription>
        {status === "loading" ? (
          <p>Loading</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sr No</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {status === "success" &&
                data.records !== undefined &&
                data?.records.map((record, index) => (
                  <TableRow key={record.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {new Date(record.entryTime)?.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {record.exitTime !== null
                        ? new Date(record.exitTime)?.toLocaleString()
                        : "Null"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CheckAttendance = () => {
  return (
    <Layout>
      <>
        <CardDescription>StudentDashboard / Check Attendance</CardDescription>
        <CardContent className="py-4">
          <p className="font-bold text-muted-foreground">Attendance Records</p>
          <div className="p-4">
            <RawRecords />
          </div>
        </CardContent>
      </>
    </Layout>
  );
};

export default CheckAttendance;
