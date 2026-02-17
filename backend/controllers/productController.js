const db = require('../db');

const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        
        let query = 'SELECT * FROM products';
        const params = [];

        if (category) {
            query += ' WHERE category = $1';
            params.push(category);
        }

        query += ' ORDER BY created_at DESC';

        const result = await db.query(query, params);

        res.json({
            success: true,
            products: result.rows
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ success: true, product: result.rows[0] });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, category, price, stock, image_url } = req.body;

        const result = await db.query(
            'INSERT INTO products (name, category, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, category, price, stock, image_url || null]
        );

        res.status(201).json({ success: true, product: result.rows[0] });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, image_url } = req.body;

        const result = await db.query(
            'UPDATE products SET name = $1, category = $2, price = $3, stock = $4, image_url = $5 WHERE id = $6 RETURNING *',
            [name, category, price, stock, image_url, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ success: true, product: result.rows[0] });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
