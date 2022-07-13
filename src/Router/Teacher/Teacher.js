const app = require("express");
const { getDepartmentTeacher, getTeacherDetail, getTeacher, AddTeacher,TeacherLogin} = require("../../Controller/Teacher/TeacherController");

const router = app.Router();
router.get('/teacher', getTeacher);
router.post('/teacher/add', AddTeacher)
router.post('/teacher/:department', getDepartmentTeacher);
router.post('/teacher/:department/:id', getTeacherDetail);
router.post('/login/teacher',TeacherLogin );

module.exports = router;