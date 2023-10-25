import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { AttendanceRecord, PrismaClient, Student } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/utils/prisma";

type AttendanceRecords = {
  records: AttendanceRecord[] | undefined;
};
type Message = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AttendanceRecords | Message>
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const records = await prisma.attendanceRecord.findMany({
      where: {
        studentId: session?.user.id,
      },
    });
    prisma.$disconnect();

    res.status(200).json({ records });
  }
}
