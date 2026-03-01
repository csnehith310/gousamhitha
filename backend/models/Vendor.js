const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    vendor_name: {
        type: String,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    email: String,
    phone: String,
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);
