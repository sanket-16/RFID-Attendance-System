const addStudent = async ({
  id,
  studentId,
}: {
  id: string
  studentId: string
}) => {
  const res = await fetch("/api/class/add-student", {
    method: "POST",

    body: JSON.stringify({
      id,
      studentId,
    }),
  })
  const json = await res.json()
  console.log(json)
  return json
}

export default addStudent
