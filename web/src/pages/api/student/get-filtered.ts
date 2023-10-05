import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { Class, PrismaClient, Student } from "@prisma/client"
import { authOptions } from "../auth/[...nextauth]"

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Students | Message>
) {
  if (req.method === "POST") {
    const { filter, classId } = await JSON.parse(req.body)
    console.log(filter)
    const session = await getServerSession(req, res, authOptions)
    const prisma = new PrismaClient()
    if (!session) {
      res.status(401).json({ message: "Unauthorized" })
    }
    const students = await prisma.student.findMany({
      select: {
        id: true,
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
        classes: true,
      },
      where: {
        OR: [
          {
            firstName: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            middleName: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: filter,
              mode: "insensitive",
            },
          },
        ],
        NOT: [
          {
            classes: {
              some: {
                id: {
                  contains: classId,
                },
              },
            },
          },
        ],
      },
    })

    res.status(200).json({ students })
  }
}
