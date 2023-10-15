import type { NextApiRequest, NextApiResponse } from "next";
import NewUserEmail from "@/components/email-templates/NewUserEmail";
import sendMail from "@/lib/utils/sendMail";
import { hash } from "bcrypt";
import prisma from "@/lib/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { render, transporter } = sendMail();

    try {
      const { firstName, middleName, lastName, email, uid } = await JSON.parse(
        req.body
      );
      const password = await hash(`${firstName.toLowerCase()}@terna`, 5);

      const user = await prisma.student.create({
        data: {
          firstName,
          middleName,
          lastName,
          email: email.toLowerCase(),
          password: password,
          UID: uid,
        },
      });
      if (!user) {
        throw new Error("Creation of user failed!");
      }

      const emailHtml = render(
        NewUserEmail({
          email: String(user.email),
          name: user.firstName + " " + user.lastName,
          password: user.firstName + `@terna`,
        })
      );

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
}
