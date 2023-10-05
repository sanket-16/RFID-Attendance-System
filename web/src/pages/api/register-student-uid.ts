// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
// import { sendMail } from "@/lib/utils"
import AttendanceRecordEmail from "@/components/email-templates/AttendanceRecordEmail"

type ErrorData = {
  message: string
}
type UserDetails = {
  name: string
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorData | UserDetails>
) {
  const { userId, uid } = await JSON.parse(req.body)
  const prisma = new PrismaClient()
  // const { render, transporter } = sendMail()

  const user = await prisma.student.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      firstName: true,
      middleName: true,
      lastName: true,
      UID: true,
    },
  })

  if (!user) {
    res.status(401).json({ message: "Failed to find user details." })
  }

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

  const userUpdate = await prisma.student.update({
    where: {
      id: userId,
    },
    data: {
      UID: uid,
    },
  })

  if (!userUpdate) {
    res.status(401).json({ message: "Failed to update record." })
  }
  // const something = await transporter.sendMail(options)
  res
    .status(200)
    .json({
      name: `${userUpdate.firstName} ${userUpdate.lastName}`,
      message: "Successfully updated record.",
    })
}
