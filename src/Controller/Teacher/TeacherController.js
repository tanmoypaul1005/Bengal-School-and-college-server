const Teacher = require("../../Model/Teacher/Teacher");
const shortid = require('shortid');
const ErrorHander = require("../../utils/ErrorHander");
const { default: slugify } = require("slugify");
const bcrypt = require('bcrypt');

module.exports.AddTeacher = (req, res, next) => {
    const { name, email, password, department, position, ssc, hsc, bachelorDegree, mastersDegree, phd, contactNumber, profilePicture } = req.body;

    Teacher.findOne({ email: email })
        .exec((error, data) => {
            if (data) return next(new ErrorHander("Student All Rady Register", 400));


            const _teacher = new Teacher({
                name,
                email,
                password,
                username: slugify(name).toLowerCase(),
                department,
                position,
                ssc,
                hsc,
                bachelorDegree,
                mastersDegree,
                phd,
                contactNumber,
                profilePicture
            });

            _teacher.save((error, data) => {
                if (error) return next(new ErrorHander("Somethings is rong", 500));
                if (data) { return res.status(200).json({ massage: "Teacher Create Successfully", data }) }
            })
        })
}




module.exports.TeacherLogin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 201));
    }
    const teacher= await Teacher.findOne({ email }).select("+password");
    if (!teacher) {
        return next(new ErrorHander("Invalid email or password", 201));
    }
    const isPasswordMatched = await bcrypt.compare(password, teacher.password)
    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 201));
    }
    res.status(200).json({ success: true,message:'Teacher Login Successfully',teacher });
}







module.exports.getTeacher = (req, res, next) => {
    Teacher.find({}).sort({ createdAt: -1 })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is rong", 400));
            if (data) { return res.status(200).json({ data }) }
        });
}


module.exports.getDepartmentTeacher = (req, res, next) => {
    Teacher.find({ department: req.params.department })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Teacher Not Found", 400));
            if (data) { return res.status(200).json({ data }) }
        });
}


module.exports.getTeacherDetail = (req, res, next) => {
    console.log(req.params)
    Teacher.find({ _id: req.params.id })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Teacher Not Found", 400));
            if (data) { return res.status(200).json({ data} ) }
        });
}



