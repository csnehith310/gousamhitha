const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    subcategory: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    unit: String,
    unit_quantity: Number,
    display_unit: String,
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    image_url: String,
    description: String,
    in_stock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
