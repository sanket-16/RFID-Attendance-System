// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import sendMail from "@/lib/sendMail";
import AttendanceRecordEmail from "@/components/email-templates/AttendanceRecordEmail";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId } = await JSON.parse(req.body);
  const prisma = new PrismaClient();
  const { render, transporter } = sendMail();

  const user = await prisma.student.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      attendanceRecords: true,
      firstName: true,
      middleName: true,
      lastName: true,
    },
  });

  if (!user) {
    res.status(401).json({ message: "Failed to find user details." });
  }

  const emailHtml = render(
    AttendanceRecordEmail({
      email: "san162002@gmail.com",
      name: "Sanket Patil",
    })
  );

  const options = {
    from: process.env.EMAIL,
    to: String(user?.email),
    subject: "Your attendace has been marked.",
    html: emailHtml,
  };

  const attendanceRecord = prisma.attendanceRecord.create({
    data: {
      student: {
        connect: {
          id: userId,
        },
      },
      entryTime: Date.now().toLocaleString(),
    },
  });

  if (!attendanceRecord) {
    res.status(401).json({ message: "Failed to record attendance." });
  }
  const something = await transporter.sendMail(options);
  res.status(200).json({ message: "Successfully recorded attendance." });
}
