const Attendance = require("../../Model/Attendance/Attendance");
const ErrorHander = require("../../utils/ErrorHander");

module.exports.AddAttendance = (req, res, next) => {
    const { student, subject, date } = req.body;
    Attendance.findOne({ date: date })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 401));
            if (data) {
                Attendance.findOneAndUpdate({ date: date }, { $push: { student: student } }, { new: true, upsert: true })
                    .exec((error, data) => {
                        if (error) return next(new ErrorHander("Somethings is rong", 402));
                        if (data) { if (data) { return res.status(200).json({ massage: "Attendance Add Successfully", data }) } }
                    })
            } else {
                const _attendance = new Attendance({ date: date, subject: subject, student: student });
                _attendance.save((error, data) => {
                    if (error) return next(new ErrorHander("Somethings is rong", 404));
                    if (data) { if (data) { return res.status(200).json({ massage: "Attendance Add Successfully", data }) } }
                });
            }
        });
}



module.exports.getAttendance = (req, res, next) => {
    console.log(req.body)
    Attendance.findOne({ date: req.body.date, subject: req.body.subject }).populate("student")
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) { if (data) { return res.status(200).json({ data }) } }
        })
}

