import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  try {
    const { firstName, middleName, lastName, email, password } =
      (await JSON.parse(req.body)) as {
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        password: string;
      };

    const user = await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        email: email.toLowerCase(),
        password,
      },
    });

    return res.json({
      user: {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.send({ message: error.message });
  }
}
