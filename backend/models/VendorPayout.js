const mongoose = require('mongoose');

const vendorPayoutSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    commission: {
        type: Number,
        default: 0
    },
    payoutStatus: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    payoutDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('VendorPayout', vendorPayoutSchema);
