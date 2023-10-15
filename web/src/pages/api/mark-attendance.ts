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
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "POST") {
      const now = new Date();

      const { uid } = await JSON.parse(req.body);
      const today = new Date();
      const tommorow = new Date();
      today.setHours(0, 0, 0, 0);
      tommorow.setHours(23, 59, 59, 999);
      console.log(today.toLocaleString());
      const { render, transporter } = sendMail();
      const user = await prisma.student.findFirst({
        where: {
          UID: uid,
        },
      });

      if (!user || user === null) {
        res.status(401).json({ message: "Failed to find user details." });
      }

      const check = await prisma.attendanceRecord.findFirst({
        where: {
          AND: [
            {
              student: {
                id: user?.id,
              },
            },
            {
              entryTime: {
                gt: today,
                lt: tommorow,
              },
            },
          ],
        },
      });
      console.log("here", check);
      if (check) {
        if (check.exitTime !== null) {
          res.status(400).json({ message: "Exit time already recorded." });
        }
        const attendanceRecord = await prisma.attendanceRecord.update({
          where: {
            id: check.id,
          },
          data: {
            exitTime: now,
          },
        });

        const emailHtml = render(
          AttendanceRecordEmail({
            email: String(user?.email),
            name:
              user?.firstName + " " + user?.middleName + " " + user?.lastName,
            message: `Your exit time has been recorded at ${now.toLocaleString()}`,
          })
        );

        const options = {
          from: process.env.EMAIL,
          to: String(user?.email),
          subject: "Your attendace has been marked.",
          html: emailHtml,
        };
        const something = await transporter.sendMail(options);
        res.status(200).json({ message: "Successfully recorded attendance." });
      } else {
        const attendanceRecord = await prisma.attendanceRecord.create({
          data: {
            student: {
              connect: {
                id: user?.id,
              },
            },
            entryTime: now,
          },
        });
        const emailHtml = render(
          AttendanceRecordEmail({
            email: String(user?.email),
            name:
              user?.firstName + " " + user?.middleName + " " + user?.lastName,
            message: `Your entry time has been recorded at ${now.toLocaleString()}`,
          })
        );

        const options = {
          from: process.env.EMAIL,
          to: String(user?.email),
          subject: "Your attendace has been marked.",
          html: emailHtml,
        };
        const something = await transporter.sendMail(options);
        res.status(200).json({ message: "Successfully recorded attendance." });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });

    console.error(error);
  }
}
