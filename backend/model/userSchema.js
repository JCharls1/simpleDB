const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate usernames
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true, // Store hashed passwords only
    },
    dateRegistered: {
        type: Date,
        default: Date.now, // Automatically set the registration date
    }
});

module.exports = mongoose.model('User', userSchema);
