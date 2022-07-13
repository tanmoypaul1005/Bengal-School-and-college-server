const Admin = require("../../Model/Admin/Admin");
const slugify = require('slugify');
const ErrorHander = require("../../utils/ErrorHander");


module.exports.AddAdmin = (req, res, next) => {
    const { name, email, password } = req.body;
    Admin.findOne({ email: email })
        .exec((error, data) => {
            if (data) return next(new ErrorHander("Admin All Rady Register", 400));

            const _admin = Admin({ name, email, password, username: slugify(name).toLowerCase() });

            _admin.save((error, data) => {
                if (error) return next(new ErrorHander("Somethings is Wrong", 500));
                if (data) { return res.status(200).json({ massage: "Admin Create Successfully", data }) }
            })
        })
}


module.exports.getAdmin = (req, res, next) => {
    Admin.find({}).sort({ createdAt: -1 })
        .exec((error, data) => {
            if (error) return next(new ErrorHander("Somethings is Wrong", 500));
            if (data) { return res.status(200).json({ success: 'true', data }) }
        })
}