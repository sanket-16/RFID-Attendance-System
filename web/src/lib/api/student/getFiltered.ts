type Students = {
  students: {
    id: string
    firstName: string
    lastName: string
    middleName: string | null
    email: string | null
  }[]
}
type Message = {
  message: string
}

const getFilteredStudents = async ({
  filter,
  classId,
}: {
  filter: string
  classId: string
}): Promise<Students> => {
  const res = await fetch(`/api/student/get-filtered`, {
    method: "POST",
    body: JSON.stringify({
      filter,
      classId,
    }),
  })
  const json = await res.json()
  console.log(json)
  if (!res.ok) {
    throw new Error("Something went wrong")
  }
  console.log(json)
  return json
}

export default getFilteredStudents
