// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import Email from "@/components/Email";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const emailHtml = render(Email());

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const options = {
    from: process.env.EMAIL,
    to: "san162002@gmail.com",
    subject: "hello world",
    html: emailHtml,
  };

  const something = await transporter.sendMail(options);
  res.status(200).json({ message: String(something) });
}
