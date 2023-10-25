import { AttendanceRecord, Class, Student } from "@prisma/client";

type Data = {
    student : {
      UID : string
      attendanceRecords :{
        entryTime: string
        exitTime: string
        id : string
        studentId : string
      }
      classes : {
        id: string
        startTime: string
        subject: string
        teacher: string
        title: string
      }
      email : string
      firstName : string
      id : string
      image : string
      lastName : string
      middleName : string
      _count : {
          attendanceRecords : number
          classes : number
      }
    }

}
const getSingleStudent = async ({ id }: { id: string }): Promise<Data> => {
  const res = await fetch("/api/teacher/get-single-student", {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
  });
  const json = await res.json();
  console.log(json);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return json;
};

export default getSingleStudent;
