import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Class, PrismaClient, Student } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, studentId } = await JSON.parse(req.body);
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    console.log(session);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const classDetails = await prisma.class.update({
      where: {
        id: String(id),
      },
      data: {
        students: {
          connect: {
            id: studentId,
          },
        },
      },
    });
    prisma.$disconnect();

    if (!classDetails) {
      res.status(200).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Added student to class " });
  }
}
