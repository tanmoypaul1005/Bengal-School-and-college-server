const { default: mongoose } = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },

    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }],

}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);