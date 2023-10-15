import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/utils/prisma";

type Classes = {
  classes: Class[] | undefined;
};
type Message = {
  message: string;
};
export type Class = {
  title: string;
  id: string;
  startTime: Date;
  subject: string;
  teacher: {
    firstName: string;
    middleName: string | null;
    lastName: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Classes | Message>
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const date = new Date();
    const student = await prisma.student.findFirst({
      where: {
        AND: [
          {
            id: String(session?.user.id),
          },
          {
            classes: {
              some: {
                startTime: {
                  lt: date,
                },
              },
            },
          },
        ],
      },
      select: {
        classes: {
          select: {
            id: true,
            title: true,
            startTime: true,
            subject: true,

            teacher: {
              select: {
                firstName: true,
                lastName: true,
                middleName: true,
              },
            },
          },
        },
      },
    });
    const classes = student?.classes;
    res.status(200).json({ classes });
  }
}
