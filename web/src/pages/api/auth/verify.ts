// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  role: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("hit");
  const { id } = await JSON.parse(req.body);
  const prisma = new PrismaClient();
  const user = prisma.student.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    res.status(200).json({ role: "Teacher" });
  }

  res.status(200).json({ role: "Student" });
}
