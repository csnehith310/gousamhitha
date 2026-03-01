const mongoose = require('mongoose');

const deliveryChargesSchema = new mongoose.Schema({
    minOrderValue: {
        type: Number,
        required: true
    },
    maxOrderValue: Number,
    charge: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DeliveryCharges', deliveryChargesSchema);
