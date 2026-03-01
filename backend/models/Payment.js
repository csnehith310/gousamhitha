const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['razorpay', 'cod', 'upi', 'card'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    },
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
