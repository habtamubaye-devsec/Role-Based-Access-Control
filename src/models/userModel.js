const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "manager", "user"],
        },
    },
    {
    timestamps: true,   
    }
);


module.exports = mongoose.model("User", userSchema);// Auto edit at 2025-11-26T17:47:30.253Z
