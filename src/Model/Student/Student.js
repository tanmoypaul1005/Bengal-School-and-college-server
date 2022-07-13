const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    student_id: {
        type: String,
        required: true,
    },

    username: {
        type: String,

    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    className: {
        type: String,
        required: true,
    },
    attendance: {
        type: Number,
    },
    result: {},
    role: {
        type: String,
        default: 'student',
    },
    contactNumber: {
        type: String,
    }
}, { timestamps: true });

StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});



module.exports = mongoose.model('Student', StudentSchema);