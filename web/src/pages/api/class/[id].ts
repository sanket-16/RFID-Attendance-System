import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { Class, PrismaClient, Student } from "@prisma/client"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "@/lib/utils/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      res.status(401).json({ message: "Unauthorized" })
    }
    const classDetails = await prisma.class.findUnique({
      where: {
        id: String(id),
      },
      include: {
        students: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
            email: true,
            _count: true,
          },
        },
        _count: true,
      },
    })

    if (!classDetails) {
      res.status(200).json({ message: "No class found" })
    }
    res.status(200).json({ classDetails })
  }
}
