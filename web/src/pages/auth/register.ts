import { PrismaClient } from "@prisma/client";
import { render } from "@react-email/render";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import Email from "@/components/Email";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const emailHtml = render(
    Email({ email: "san162002@gmail.com", name: "Sanket Patil" })
  );

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    const { firstName, middleName, lastName, email, password } =
      (await JSON.parse(req.body)) as {
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        password: string;
      };

    const user = await prisma.student.create({
      data: {
        firstName,
        middleName,
        lastName,
        email: email.toLowerCase(),
        password,
      },
    });
    if (!user) {
      throw new Error("Creation of user failed!");
    }
    const options = {
      from: process.env.EMAIL,
      to: String(user.email),
      subject: "hello world",
      html: emailHtml,
    };

    const something = await transporter.sendMail(options);
    console.log(something);
    return res.json({
      user: {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.send({ message: error.message });
  }
}
