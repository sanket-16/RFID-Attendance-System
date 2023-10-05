// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import sendMail from "@/lib/utils/sendMail"
import AttendanceRecordEmail from "@/components/email-templates/AttendanceRecordEmail"

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { uid } = await JSON.parse(req.body)
  const prisma = new PrismaClient()
  const { render, transporter } = sendMail()

  const user = await prisma.student.findFirst({
    where: {
      UID: uid,
    },
  })

  if (!user || user === null) {
    res.status(401).json({ message: "Failed to find user details." })
  }

  const emailHtml = render(
    AttendanceRecordEmail({
      email: "san162002@gmail.com",
      name: "Sanket Patil",
      entryTime: Date.UTC.toString(),
    })
  )

  const options = {
    from: process.env.EMAIL,
    to: String(user?.email),
    subject: "Your attendace has been marked.",
    html: emailHtml,
  }

  const attendanceRecord = prisma.attendanceRecord.create({
    data: {
      student: {
        connect: {
          id: user?.id,
        },
      },
      entryTime: Date.now().toLocaleString(),
    },
  })

  if (!attendanceRecord) {
    res.status(401).json({ message: "Failed to record attendance." })
  }
  const something = await transporter.sendMail(options)
  res.status(200).json({ message: "Successfully recorded attendance." })
}
