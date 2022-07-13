const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const SuperAdminSchema = new mongoose.Schema({
    name: {
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
    role: {
        type: String,
        default: 'superadmin',
    },

    Status: {
        type: String,
        enum: ['panding', 'approve'],
        default: 'panding'
    }

}, { timestamps: true });

SuperAdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});



module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);