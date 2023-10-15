import { AttendanceRecord } from "@prisma/client"

type AttendanceRecords = {
  records: AttendanceRecord[] | undefined
}
type Message = {
  message: string
}

const getAttendanceRecords = async (): Promise<AttendanceRecords> => {
  const res = await fetch(`/api/student/get-attendance-records`, {
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

export default getAttendanceRecords
