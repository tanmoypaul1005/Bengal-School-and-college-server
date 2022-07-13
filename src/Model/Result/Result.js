const { default: mongoose } = require("mongoose");

const ResultSchema = new mongoose.Schema({
    result: [
        {
            subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
            gpa: { type: Number },
        }
    ],
    term:{type: String},
    date: { type: String, default: Date() },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
}, { timestamps: true });
module.exports = mongoose.model(' Result', ResultSchema);
