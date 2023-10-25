// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Subjects } from "@prisma/client";
// import { sendMail } from "@/lib/utils"
import AttendanceRecordEmail from "@/components/email-templates/AttendanceRecordEmail";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/utils/prisma";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { title, startTime, subject } = await JSON.parse(req.body);
  console.log(title, subject, startTime);
  const session = await getServerSession(req, res, authOptions);

  const newClass = await prisma.class.create({
    data: {
      title: title,
      startTime: startTime,
      subject: subject,
      teacher: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });

  // const emailHtml = render(
  //   AttendanceRecordEmail({
  //     email: "san162002@gmail.com",
  //     name: "Sanket Patil",
  //     entryTime: Date.UTC.toString(),
  //   })
  // )

  // const options = {
  //   from: process.env.EMAIL,
  //   to: String(user?.email),
  //   subject: "Your attendace has been marked.",
  //   html: emailHtml,
  // }
  prisma.$disconnect();

  if (!newClass) {
    res.status(401).json({ message: "Failed to create class." });
  }
  // const something = await transporter.sendMail(options)
  res.status(200).json({ message: "Created class successfully." });
}
