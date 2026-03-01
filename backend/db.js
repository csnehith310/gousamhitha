// MongoDB Migration - Old Supabase db.js replaced
// Controllers will be updated to use MongoDB models instead

// Temporary stub to prevent errors during migration
module.exports = {
    query: () => {
        throw new Error('This endpoint uses old Supabase. Please use MongoDB models.');
    },
    getClient: () => {
        throw new Error('This endpoint uses old Supabase. Please use MongoDB models.');
    }
};

// Note: Update controllers to use:
// const Product = require('../models/Product');
// const Order = require('../models/Order');
// etc.
