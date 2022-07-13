const { ObjectId } = require("mongodb");
const shortid = require("shortid");
const Subject = require("../../Model/Academic/Subject");
const Teacher = require("../../Model/Teacher/Teacher");
const ErrorHander = require("../../utils/ErrorHander");
const Student = require("../../Model/Student/Student");

module.exports.AddSubject = (req, res, next) => {
    const { name, time, sec, teacher, claasName, roomNo } = req.body;
    console.log(typeof req.body)
    const _subject = new Subject({ name, time, sec, teacher, claasName, roomNo, enrolcode: shortid.generate(), });
    _subject.save((error, data) => {
        if (error) return next(new ErrorHander("Somethings is rong", 400));
        if (data) { return res.status(200).json({ massage: "Subject Create Successfully", data }) }
    })
}


module.exports.getSubject = (req, res, next) => {
    Subject.find({}).sort({ createdAt: -1 })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) {
                return res.status(200).json({ data })
            }
        })
}

module.exports.addStudentCourse = (req, res, next) => {
    Subject.findOneAndUpdate({ enrolcode: req.body.data.state.enrolcode },
        {
            $push: { student: req.body.data }
        },
        function (error, success) {
            if ({ "error": error }) {
                console.log(error);
            } else {
                console.log({ msg: 'Your comment has been published', success });
            }
        })
}


module.exports.getEnrolCourse = (req, res, next) => {
    // console.log(req.body)
    Subject.find({ "student.student_id": req.body.id })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) { return res.status(200).json({ data }) }
        }
        )
}


module.exports.getcourseStudent = (req, res, next) => {
    const data = JSON.parse(req.body.department);
    // console.log(req.body)
    Subject.find({_id:data._id, name: data.name, sec: data.sec,claasName:data.claasName,teacher:data.teacher }).populate("student.student_id")
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) {
                return res.status(200).json({ data })
            }
        }
        )
}


module.exports.getClassLecture = (req, res, next) => {
    const { id } = req.params;
    console.log(req.params.id)
    Subject.findOne({ _id: req.params.id })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) {
                return res.status(200).json({ data })
            }
        })
}



module.exports.getTeacherSubject=(req, res, next)=>{
Subject.find({teacher:req.body.data.name})
.exec((error, data) => {
    if (error) return next(new ErrorHander("Somethings is rong", 400));
    if (data) {
        return res.status(200).json({ data })
    }
})
}