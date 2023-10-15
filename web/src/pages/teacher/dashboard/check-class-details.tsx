import Layout from "@/components/teacher/Layout";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addStudent,
  getClass,
  getClasses,
  getFilteredStudents,
} from "@/lib/api";
import { Class } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCheck, MoreVertical, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const ClassDetails = ({ classDetails }: { classDetails: Class }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [filter, setFilter] = useState("");
  const { data, status } = useQuery({
    queryKey: ["getClass", classDetails],
    queryFn: () => getClass({ id: classDetails.id }),
    enabled: open,
  });
  const { data: studentData, status: studentStatus } = useQuery({
    queryKey: ["getFilteredStudents", filter],
    queryFn: () => getFilteredStudents({ filter, classId: classDetails.id }),
    enabled: hidden,
  });
  const mutate = useMutation({
    mutationKey: ["addStudent"],
    mutationFn: addStudent,
    onSuccess: (data) => {
      setFilter("");
      queryClient.invalidateQueries(["getClass"]);
      queryClient.invalidateQueries(["getFilteredStudents"]);
      toast({
        variant: "default",
        action: (
          <div className="flex w-full items-start justify-start gap-2">
            <CheckCheck className="text-green-500" />
            <span>Successfully added student.</span>
          </div>
        ),
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "default",
        action: (
          <div className="flex w-full items-start justify-start gap-2">
            <X className="text-red-500" />
            <span>Failed to add student.</span>
          </div>
        ),
      });
    },
  });
  const date = new Date(classDetails?.startTime);

  // if (status === "loading") {
  //   return (
  //     <Dialog open={open} onOpenChange={setOpen}>
  //       <DialogContent>Loading</DialogContent>
  //     </Dialog>
  //   )
  // }
  // if (status === "error") {
  //   return (
  //     <Dialog open={open} onOpenChange={setOpen}>
  //       <DialogContent>Error</DialogContent>
  //     </Dialog>
  //   )
  // }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="p-4 text-start hover:cursor-pointer hover:bg-secondary">
          <CardTitle className="text-lg font-bold">
            {classDetails.title}
          </CardTitle>
          <CardContent className="flex flex-col gap-2 py-4 text-sm text-muted-foreground">
            <p>Subject : {classDetails.subject}</p>
            <p>Teacher : {}</p>
            <p>Time : {date.toLocaleString()}</p>
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
          <p>Students : </p>
          {data?.classDetails.students.length === 0 ? (
            <p>No students added</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Sr No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Options</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.classDetails.students.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {student.firstName + student.lastName}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel className="font-sm text-bold text-muted-foreground">
                            Options
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                            <Trash2 size={14} /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {hidden && (
            <>
              <Input
                placeholder="Search for student name"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
              <ScrollArea className="h-32">
                {studentStatus === "error" && "Something went wrong"}
                {studentStatus === "loading" && "Loading..."}
                {studentStatus === "success" && (
                  <div className="flex flex-col gap-4 px-4">
                    {studentData.students.map((student) => (
                      <Card
                        key={student.id}
                        className="p-2 hover:bg-secondary"
                        onClick={() =>
                          mutate.mutateAsync({
                            id: classDetails.id,
                            studentId: student.id,
                          })
                        }
                      >
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
                    ))}
                    {studentData?.students.length === 0 && "No students"}
                  </div>
                )}
              </ScrollArea>
            </>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => setHidden((val) => !val)}>
            Add Student to class
          </Button>
          <Button variant={"outline"}>Delete Class</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CheckClassDetails = () => {
  const date = new Date();
  const { data, status } = useQuery({
    queryKey: ["getAllClasses"],
    queryFn: () => getClasses(),
    refetchOnWindowFocus: false,
  });

  if (status === "error") {
    return (
      <Layout>
        <CardDescription>
          TeacherDashboard / Check Class Details
        </CardDescription>
        <CardContent>
          <CardContent>Error Occured</CardContent>
        </CardContent>
      </Layout>
    );
  }
  if (status === "loading") {
    return (
      <Layout>
        <CardDescription>
          TeacherDashboard / Check Class Details
        </CardDescription>
        <CardContent>
          <CardContent>Loading</CardContent>
        </CardContent>
      </Layout>
    );
  }

  return (
    <Layout>
      <CardDescription>TeacherDashboard / Check Class Details</CardDescription>
      <CardContent className="grid gap-4 p-4 md:grid-cols-3">
        {data !== undefined ? (
          <>
            <p className="md:col-span-3">Today&#39;s Classes</p>
            {data?.classes
              .filter(
                (classDetails) =>
                  new Date(classDetails.startTime).getDate() === date.getDate()
              )
              .map((classDetails) => {
                return (
                  <ClassDetails
                    classDetails={classDetails}
                    key={classDetails.id}
                  />
                );
              })}
            <p className="md:col-span-3">Older Classes</p>
            {data?.classes
              .filter(
                (classDetails) =>
                  new Date(classDetails.startTime).getDate() < date.getDate()
              )
              .map((classDetails) => {
                return (
                  <ClassDetails
                    classDetails={classDetails}
                    key={classDetails.id}
                  />
                );
              })}
          </>
        ) : (
          <p>No classes yet</p>
        )}
      </CardContent>
    </Layout>
  );
};

export default CheckClassDetails;
