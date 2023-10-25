import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { AttendanceRecord } from "@prisma/client";
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
  if (req.method === "POST") {
    const { classId } = await JSON.parse(req.body);

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const today = new Date();
    const tommorow = new Date();
    today.setHours(0, 0, 0, 0);
    tommorow.setHours(23, 59, 59, 999);
    const student = await prisma.student.findUnique({
      where: { id: session?.user.id },
      include: {
        classes: {
          where: {
            id: classId,
          },
        },
      },
    });

    const records = await prisma.attendanceRecord.findMany({
      where: {
        studentId: session?.user.id,
      },
    });
    prisma.$disconnect();

    res.status(200).json({ records });
  }
}
