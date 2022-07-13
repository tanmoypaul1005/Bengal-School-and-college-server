const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    sec: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    enrolcode: {
        type: String,
        required: true,
    },
    claasName: {
        type: String,
    },
    roomNo: {
        type: String,
    },
    classlacture: [
        {
            note: { type: String },
            title: { type: String },
            body: { type: String },
            date: { type: String, default: Date() },
        }
    ],

    student: [{
        student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
    }],

}, { timestamps: true });


module.exports = mongoose.model('Subject', SubjectSchema);