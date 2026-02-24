const db = require('../db');
const createOrder = async (req, res) => {
    const client = await db.getClient();
    try {
        await client.query('BEGIN');
        const { customer_email, items } = req.body;
        let total = 0;
        for (const item of items) {
            const productResult = await client.query('SELECT price, stock FROM products WHERE id = $1', [item.product_id]);
            if (productResult.rows.length === 0) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: `Product ${item.product_id} not found` });
            }
            const product = productResult.rows[0];
            if (item.quantity > product.stock) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: `Insufficient stock for product ${item.product_id}` });
            }
            total += product.price * item.quantity;
        }
        const orderId = 'GS' + Date.now().toString();
        await client.query(
            'INSERT INTO orders (id, customer_email, total, status) VALUES ($1, $2, $3, $4)',
            [orderId, customer_email, total, 'Pending']
        );
        for (const item of items) {
            const productResult = await client.query('SELECT name, price FROM products WHERE id = $1', [item.product_id]);
            const product = productResult.rows[0];
            await client.query(
                'INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES ($1, $2, $3, $4, $5)',
                [orderId, item.product_id, product.name, item.quantity, product.price]
            );
            await client.query(
                'UPDATE products SET stock = stock - $1 WHERE id = $2',
                [item.quantity, item.product_id]
            );
        }
        await client.query('COMMIT');
        res.status(201).json({ success: true, orderId, total });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    } finally {
        client.release();
    }
};
const getAllOrders = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json({ success: true, orders: result.rows });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderResult = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        const itemsResult = await db.query('SELECT * FROM order_items WHERE order_id = $1', [id]);
        res.json({
            success: true,
            order: orderResult.rows[0],
            items: itemsResult.rows
        });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await db.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ success: true, order: result.rows[0] });
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};
module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};
