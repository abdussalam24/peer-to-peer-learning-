const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['learner', 'mentor', 'admin'], default: 'learner' },
    avatar: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
