import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = await JSON.parse(req.body);

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const student = await prisma.student.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        middleName: true,
        email: true,
        image: true,
        attendanceRecords: true,
        classes: true,
        UID: true,
        _count: true,
      },
    });
    prisma.$disconnect();
    res.status(200).json({ student });
  }
}
