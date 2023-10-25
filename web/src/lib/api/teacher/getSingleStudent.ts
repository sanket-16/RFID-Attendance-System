import { Student } from "@prisma/client";

const getSingleStudent = async ({ id }: { id: string }): Promise<Student> => {
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
