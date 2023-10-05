import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import NewUserEmail from "@/components/email-templates/NewUserEmail"
import sendMail from "@/lib/utils/sendMail"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient()
    const { render, transporter } = sendMail()

    const emailHtml = render(
      NewUserEmail({
        email: "san162002@gmail.com",
        name: "Sanket Patil",
        password: "san162002",
      })
    )

    try {
      const { firstName, middleName, lastName, email } = await JSON.parse(
        req.body
      )

      const user = await prisma.student.create({
        data: {
          firstName,
          middleName,
          lastName,
          email: email.toLowerCase(),
          password: `${firstName.toLowerCase()}@terna`,
        },
      })
      if (!user) {
        throw new Error("Creation of user failed!")
      }
      const options = {
        from: process.env.EMAIL,
        to: String(user.email),
        subject: "hello world",
        html: emailHtml,
      }

      const something = await transporter.sendMail(options)
      console.log(something)
      return res.json({
        user: {
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          email: user.email,
        },
      })
    } catch (error: any) {
      console.log(error)
      res.send({ message: error.message })
    }
  }
}
