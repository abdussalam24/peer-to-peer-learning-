const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    learner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'MentorProfile', required: true },
    topic: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'scheduled', 'completed', 'cancelled'],
        default: 'pending'
    },
    scheduledAt: { type: Date },
    duration: { type: Number, default: 60 },
    meetingLink: String,
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);
