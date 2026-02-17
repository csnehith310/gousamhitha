const db = require('../db');
const getAllVendors = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM vendors ORDER BY created_at DESC');
        res.json({ success: true, vendors: result.rows });
    } catch (error) {
        console.error('Get vendors error:', error);
        res.status(500).json({ error: 'Failed to fetch vendors' });
    }
};
const createVendor = async (req, res) => {
    try {
        const { vendor_name, business_name, email, phone } = req.body;
        const result = await db.query(
            'INSERT INTO vendors (vendor_name, business_name, email, phone) VALUES ($1, $2, $3, $4) RETURNING *',
            [vendor_name, business_name, email || null, phone || null]
        );
        res.status(201).json({ success: true, vendor: result.rows[0] });
    } catch (error) {
        console.error('Create vendor error:', error);
        res.status(500).json({ error: 'Failed to create vendor' });
    }
};
module.exports = {
    getAllVendors,
    createVendor
};
