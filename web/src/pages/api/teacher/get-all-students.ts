import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const date = new Date();
    const students = await prisma.student.findMany({
      select: {
        firstName: true,
        lastName: true,
        id: true,
        middleName: true,
        email: true,
      },
    });
    res.status(200).json({ students });
  }
}
