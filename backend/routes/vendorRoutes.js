const express = require('express');
const router = express.Router();
const { getAllVendors, createVendor } = require('../controllers/vendorController');
router.get('/', getAllVendors);
router.post('/', createVendor);
module.exports = router;
