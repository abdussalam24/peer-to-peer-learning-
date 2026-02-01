const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['paypal', 'bank', 'b2c'], required: true },
    details: {
        paypalEmail: String,
        accountName: String,
        accountNumber: String,
        bankName: String,
        ifsc: String,
        businessId: String
    },
    status: { type: String, enum: ['pending', 'completed', 'rejected'], default: 'pending' },
    requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
