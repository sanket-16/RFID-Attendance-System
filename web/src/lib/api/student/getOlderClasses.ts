import { Class } from "@prisma/client"

type Classes = {
  classes: {
    id: string
    title: string
    startTime: Date
    subject: string
    teacher: {
      firstName: string
      middleName: string
      lastName: string
    }
  }[]
}
type Message = {
  message: string
}

const getOlderClasses = async (): Promise<Classes> => {
  const res = await fetch(`/api/student/get-older-classes`, {
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

export default getOlderClasses
