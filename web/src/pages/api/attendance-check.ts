import type { NextApiRequest, NextApiResponse } from "next";
import sendMail from "@/lib/utils/sendMail";
import prisma from "@/lib/utils/prisma";
import { Class } from "@prisma/client";
import AttendanceReportEmail from "@/components/email-templates/AttendanceReport";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === "GET") {
      const now = new Date();
      const today = new Date();
      const tommorow = new Date();
      today.setHours(0, 0, 0, 0);
      tommorow.setHours(23, 59, 59, 999);
      const { render, transporter } = sendMail();
      const students = await prisma.student.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          middleName: true,
          lastName: true,
          classes: {
            where: {
              startTime: {
                gt: today,
                lt: tommorow,
              },
            },
          },
          attendanceRecords: {
            where: {
              entryTime: {
                gt: today,
              },
            },
          },
        },
      });
      console.log(students);
      students.forEach(async (student) => {
        console.warn(student.email);
        let absentClasses: Class[] = [];
        let presentClasses: Class[] = [];

        if (
          !student.attendanceRecords ||
          student.attendanceRecords.length === 0 ||
          student.attendanceRecords[0].exitTime === null
        ) {
          absentClasses = [...student.classes];
          const emailHtml = render(
            AttendanceReportEmail({
              name:
                student?.firstName +
                " " +
                student?.middleName +
                " " +
                student?.lastName,
              absentClasses: absentClasses.map(
                (classDetails) =>
                  classDetails.title + " " + classDetails.subject
              ),
              presentClasses: presentClasses.map(
                (classDetails) =>
                  classDetails.title + " " + classDetails.subject
              ),
            })
          );

          const options = {
            from: process.env.EMAIL,
            to: String(student?.email),
            subject: `Daily Attendance Report`,
            html: emailHtml,
          };
          const something = await transporter.sendMail(options);

          console.log(absentClasses);

          return;
        }
        const exitTime: Date = student.attendanceRecords[0].exitTime;
        student.classes.map((classRecord) => {
          if (
            classRecord.startTime > student.attendanceRecords[0].entryTime &&
            classRecord.startTime < exitTime
          ) {
            presentClasses.push(classRecord);
          } else {
            absentClasses.push(classRecord);
          }
        });
        const emailHtml = render(
          AttendanceReportEmail({
            name:
              student?.firstName +
              " " +
              student?.middleName +
              " " +
              student?.lastName,
            absentClasses: absentClasses.map(
              (classDetails) =>
                classDetails.title + " - " + classDetails.subject
            ),
            presentClasses: presentClasses.map(
              (classDetails) =>
                classDetails.title + " - " + classDetails.subject
            ),
          })
        );

        const options = {
          from: process.env.EMAIL,
          to: String(student?.email),
          subject: `Daily Attendance Report`,
          html: emailHtml,
        };
        const something = await transporter.sendMail(options);
      });

      res.status(200).json({ message: "Successfully sent mail." });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });

    console.log(error);
  }
}
