const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    token: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
