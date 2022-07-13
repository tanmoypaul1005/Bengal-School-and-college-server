const { default: mongoose } = require("mongoose");

const ClasslactureSchema = new mongoose.Schema({
    classLacture: [
        { note: { type: String } }
    ],
    title: { type: String },
    body: { type: String },
    date: { type: String, default: Date() },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true }
}, { timestamps: true });
module.exports = mongoose.model(' Classlacture', ClasslactureSchema);