import { Student } from "@prisma/client";

type Students = {
  students: Student[];
};

const getAllStudents = async (): Promise<Students> => {
  const res = await fetch("/api/teacher/get-all-students", {
    method: "GET",
  });
  const json = await res.json();
  console.log(json);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return json;
};

export default getAllStudents;
