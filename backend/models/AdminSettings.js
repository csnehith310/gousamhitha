const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
    platformCommission: {
        type: Number,
        default: 10,
        min: 0,
        max: 100
    },
    deliveryCharges: {
        type: Number,
        default: 50
    },
    freeDeliveryThreshold: {
        type: Number,
        default: 1000
    },
    taxRate: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminSettings', adminSettingsSchema);
