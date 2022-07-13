const Student = require("../../Model/Student/Student");
const ErrorHander = require("../../utils/ErrorHander");
const shortid = require('shortid');
const bcrypt = require('bcrypt');

module.exports.AddStudent = (req, res, next) => {
    const { name, student_id, email, password, className, } = req.body;

    Student.findOne({ student_id: student_id })
        .exec((error, data) => {
            if (data) return next(new ErrorHander("Student All Rady Register", 400));

            const _student = new Student({ name, student_id, username: shortid.generate(), email, password, className });

            _student.save((error, data) => {
                if (error) return next(new ErrorHander("Somethings is rong", 400));
                if (data) { return res.status(200).json({ massage: "Student Create Successfully", data }) }
            })
        })
}

module.exports.StudentLogin = async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
    }

    const student = await Student.findOne({ email }).select("+password");

    if (!student) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, student.password)

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    res.status(200).json({ success: true, student });
}




module.exports.getStudent = (req, res, next) => {
    Student.find({}).sort({ createdAt: -1 })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) { return res.status(200).json({ data }) }
        });
}


module.exports.addStudentAttendance = (req, res, next) => {
    // console.log(req.body.id)
    Student.findOne({ _id: req.body.id })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) {
                Student.findOneAndUpdate({ _id: req.body.id }, { attendance: data.attendance + 1 }, { new: true })
                    .exec((error, att) => {
                        if (error) return next(new ErrorHander("Somethings is rong", 400));
                        if (att) { return res.status(200).json({ massage: "Attendance Successfully", att }) }
                    });
            }
        })
}



module.exports.getcontact = (req, res) => {
    Student.find({ className: req.body.className })
        .exec((error, att) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (att) {
                return res.status(200).json({ att })
            }
        });
}






