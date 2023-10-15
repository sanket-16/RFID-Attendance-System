// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sendMail from "@/lib/utils/sendMail";
import AttendanceRecordEmail from "@/components/email-templates/AttendanceRecordEmail";
import prisma from "@/lib/utils/prisma";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const now = new Date();
      const today = new Date();
      const tommorow = new Date();
      today.setHours(0, 0, 0, 0);
      tommorow.setHours(23, 59, 59, 999);
      const todaysClasses = await prisma.class.findMany({
        include: {
          students: {
            select: {
              firstName: true,
              attendanceRecords: {
                where: {
                  entryTime: {
                    gt: today,
                    lt: tommorow,
                  },
                },
              },
            },
          },
        },
        where: {
          startTime: {
            gt: today,
            lt: tommorow,
          },
          students: {
            some: {
              attendanceRecords: {
                some: {
                  entryTime: {
                    lte: tommorow,
                  },
                  exitTime: {
                    gte: today,
                  },
                },
              },
            },
          },
        },
      });

      const filteredClasses = todaysClasses.filter((classItem) => {
        const { students } = classItem;
        if (students) {
          for (const student of students) {
            if (student.attendanceRecords) {
              for (const record of student.attendanceRecords) {
                if (record.exitTime === null) {
                  return false;
                }
                if (
                  record.entryTime <= classItem.startTime &&
                  record.exitTime >= classItem.startTime
                ) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      });

      console.log(filteredClasses);
      res.status(200).json(filteredClasses);
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });

    console.log(error);
  }
}
