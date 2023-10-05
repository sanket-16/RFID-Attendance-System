import { Class } from "@prisma/client"

type Classes = {
  classes: Class[]
}

const getClasses = async (): Promise<Classes> => {
  const res = await fetch("/api/class/getAll", {
    method: "GET",
  })
  const json = await res.json()
  console.log(json)
  if (!res.ok) {
    throw new Error("Something went wrong")
  }
  return json
}

export default getClasses
