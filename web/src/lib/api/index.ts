import createNewUser, { createNewTeacher } from "./user/createNewUser";
import verifyUser from "./user/verifyUser";
import createClass from "./class/create";
import getClasses from "./class/getAll";
import getClass from "./class/get";
import getFilteredStudents from "./student/getFiltered";
import addStudent from "./class/addStudent";
import getStudentClasses from "./student/getClasses";
import getOlderClasses from "./student/getOlderClasses";
import getAttendanceRecords from "./student/getAttendanceRecords";
import getAllStudents from "./student/getAll";
import getSingleStudent from "./teacher/getSingleStudent";
export {
  getAllStudents,
  createNewUser,
  verifyUser,
  createClass as createNewClass,
  getClasses,
  getClass,
  getFilteredStudents,
  addStudent,
  getStudentClasses,
  getOlderClasses,
  getAttendanceRecords,
  createNewTeacher,
  getSingleStudent,
};
