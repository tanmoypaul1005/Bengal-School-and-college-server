const app = require("express");
const { AddAttendance, getAttendance } = require("../../Controller/Attendance/AttendanceController");

const router = app.Router();

router.post('/attendance/add', AddAttendance);
router.post('/attendance/get', getAttendance)
module.exports = router;