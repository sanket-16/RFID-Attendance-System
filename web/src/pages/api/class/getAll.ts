import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { Class, PrismaClient } from "@prisma/client"
import { authOptions } from "../auth/[...nextauth]"
type Data = {
  message: string
}
type Classes = {
  classes: Class[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Classes>
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions)
    const prisma = new PrismaClient()
    console.log(session)
    if (!session) {
      res.status(401).json({ message: "Unauthorized" })
    }
    const classes = await prisma.class.findMany({
      where: {
        teacherId: session?.user.id,
      },
    })

    if (!classes || classes.length === 0) {
      res.status(200).json({ message: "No classes found" })
    }
    res.status(200).json({ classes })
  }
}
