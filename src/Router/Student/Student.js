const app = require("express");
const { AddStudent, StudentLogin, getStudent, addStudentAttendance, getcontact } = require("../../Controller/Student/StudentController");
const router = app.Router();

router.post('/student/add', AddStudent);
router.post('/student/login', StudentLogin);
router.get('/student/get', getStudent);
router.post('/student/attendance/add', addStudentAttendance);

router.post('/student/contact', getcontact)
module.exports = router;