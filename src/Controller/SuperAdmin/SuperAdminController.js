const SuperAdmin = require("../../Model/SuperAdmin/SuperAdmin");
const slugify = require('slugify');
const ErrorHander = require("../../utils/ErrorHander");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.AddSuperAdmin = (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    SuperAdmin.findOne({ email: email })
        .exec((error, data) => {

            if (data) return next(new ErrorHander("Admin All Rady Register", 400));
            const _superadmin = SuperAdmin({ name, email, password, username: slugify(name).toLowerCase() });
            _superadmin.save((error, data) => {
                if (error) return next(new ErrorHander("Somethings is Wrong", 500));
                if (data) { return res.status(200).json({ massage: "Super Admin Create Successfully", data }) }
            })
        })
}


module.exports.SuperAdminLogin = async (req, res, next) => {
    const { email, password, role, Status } = req.body;
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 201));
    }
    const superadmin = await SuperAdmin.findOne({ email }).select("+password");
    if (!superadmin) {
        return next(new ErrorHander("Invalid email or password", 201));
    }
    const isPasswordMatched = await bcrypt.compare(password, superadmin.password)
    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 201));
    }
    if (superadmin.Status === 'approve') {
        const token = jwt.sign({ _id: superadmin._id, name: superadmin.name, email: superadmin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json({ success: true,message:'Super Admin Login Successfully', superadmin, token });
    }
}


module.exports.getSuperAdmin = (req, res, next) => {
    SuperAdmin.find({}).sort({ createdAt: -1 })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is Wrong", 500));
            if (data) { return res.status(200).json({ success: 'true', data }) }
        })
}

module.exports.AddStatus = (req, res, next) => {
    console.log(req.body)
    const { id } = req.params
    console.log(id)
    const { Status } = req.body;
    SuperAdmin.findOneAndUpdate({ _id: req.body.id }, { Status: req.body.data }, { new: true })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is Wrong", 500));
            if (data) { return res.status(200).json({ success: 'true', massage: "SuperAdmin is successfully Updated", data }) }
        })
}


