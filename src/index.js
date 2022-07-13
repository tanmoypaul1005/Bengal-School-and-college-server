const express = require('express')
const app = express()
require('dotenv').config();
const DataBaseconnect = require("./config/DataBase");


const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// DataBase Connection
DataBaseconnect();


const StudentRoutes = require("./Router/Student/Student")
const TeacherRoutes = require('./Router/Teacher/Teacher');
const SubjectRoutes = require('./Router/Academic/Subject');
const AdminRoutes = require('./Router/Admin/Admin');
const SuperAdminRoutes = require('./Router/SuperAdmin/SuperAdmin');
const AttendanceRoutes = require('./Router/Attendance/Attendance');
const ClasslactureRoutes = require('./Router/Classlacture/Classlacture');
const ResultRoutes = require('./Router/Result/Result');
const errorMiddleware = require('./Middleware/Error');

app.use('/api', StudentRoutes);
app.use('/api', TeacherRoutes);
app.use('/api', SubjectRoutes);
app.use('/api', AdminRoutes);
app.use('/api', SuperAdminRoutes);
app.use('/api', AttendanceRoutes);
app.use('/api', ClasslactureRoutes);
app.use('/api', ResultRoutes);
app.use('/api', errorMiddleware);


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Example app listening on port ${(port)}`)
})