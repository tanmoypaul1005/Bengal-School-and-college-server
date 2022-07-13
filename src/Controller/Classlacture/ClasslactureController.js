const Classlacture = require("../../Model/Classlacture/Classlacture.js");
const ErrorHander = require("../../utils/ErrorHander");

module.exports.AddClasslacture = (req, res, next) => {
    const { title, body, date, subject } = req.body;
    console.log(req.body)
    let classLacture = {};
    if (req.file.length > 0) {
        classLacture = req.files.map((file) => {
            return { note: file.location };
        });
    }

    const _classlacture = new Classlacture({ title, body, date, subject, classLacture });
    _classlacture.save((error, data) => {
        if (error) return next(new ErrorHander("Somethings is rong", 400));
        if (data) {
            return res.status(200).json({ data });
        }
    })
}
