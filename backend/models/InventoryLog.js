const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    changeType: {
        type: String,
        enum: ['add', 'remove', 'adjust', 'sale', 'return'],
        required: true
    },
    quantityBefore: {
        type: Number,
        required: true
    },
    quantityAfter: {
        type: Number,
        required: true
    },
    changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reason: String
}, {
    timestamps: true
});

module.exports = mongoose.model('InventoryLog', inventoryLogSchema);
