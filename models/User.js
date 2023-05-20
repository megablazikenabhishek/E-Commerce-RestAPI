const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unquie: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false  
    }
}, 
{timestamps: true}
);

module.exports = mongoose.Schema(UserSchema);