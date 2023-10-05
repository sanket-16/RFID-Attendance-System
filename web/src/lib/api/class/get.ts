import { Class } from "@prisma/client"

type Data = {
  classDetails: {
    id: string
    title: String
    startTime: Date
    subject: string
    _count: {
      students: number
    }
    students: Student[]
  }
}
type Student = {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  _count: {
    attendanceRecords: number
    classes: number
  }
}

const getClass = async ({ id }: { id: string }): Promise<Data> => {
  const res = await fetch(`/api/class/${id}`, {
    method: "GET",
  })
  const json = await res.json()
  console.log(json)
  if (!res.ok) {
    throw new Error("Something went wrong")
  }
  console.log(json)
  return json
}

export default getClass
