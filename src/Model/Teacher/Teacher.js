const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },

    position: {
        type: String,
        required: true,
    },

    ssc: {
        type: String,
        required: true,
    },

    hsc: {
        type: String,
        required: true,
    },

    bachelorDegree: {
        type: String,
        required: true,
    },

    mastersDegree: {
        type: String,
        required: true,
    },

    phd: {
        type: String,

    },

    contactNumber: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'teacher',
    }

}, { timestamps: true });

TeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});


module.exports = mongoose.model('Teacher', TeacherSchema);