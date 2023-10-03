// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  role: string | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("hit");
  const { id } = await JSON.parse(req.body);
  const prisma = new PrismaClient();
  const student = await prisma.student.findUnique({
    where: {
      id: id,
    },
  });
  const teacher = await prisma.teacher.findUnique({
    where: {
      id: id,
    },
  });
  if (teacher) {
    res.status(200).json({ role: "Teacher" });
  }
  if (student) {
    res.status(200).json({ role: "Student" });
  }
  res.status(401).json({ role: undefined });
}
