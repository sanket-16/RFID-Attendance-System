import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Class, PrismaClient, Student } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = await JSON.parse(req.body);
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    console.log(session);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const classDetails = await prisma.class.findUnique({
      where: {
        id: String(id),
      },
      select: {
        id: true,
        startTime: true,
      },
    });

    if (!classDetails || classDetails === null) {
      res.status(200).json({ message: "No class found" });
    }
    const classDelete = await prisma.class.delete({
      where: {
        id: classDetails?.id,
      },
    });
    prisma.$disconnect();

    res.status(200).json({ message: "Successfully deleted class" });
  }
}
