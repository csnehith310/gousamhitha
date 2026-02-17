-- =====================================================
-- DISABLE ROW LEVEL SECURITY FOR ADMIN OPERATIONS
-- =====================================================
-- Run this in Supabase SQL Editor to allow admin operations
-- =====================================================

-- Disable RLS on all admin tables
-- This allows full access to these tables
-- For production, you should create proper RLS policies instead

ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE vendors DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('products', 'vendors', 'categories', 'orders', 'order_items');

-- =====================================================
-- ALTERNATIVE: Enable RLS with permissive policies
-- =====================================================
-- If you want to keep RLS enabled but allow all operations:

-- For products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on products" ON products;
CREATE POLICY "Allow all operations on products" ON products
FOR ALL USING (true) WITH CHECK (true);

-- For vendors table
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on vendors" ON vendors;
CREATE POLICY "Allow all operations on vendors" ON vendors
FOR ALL USING (true) WITH CHECK (true);

-- For categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on categories" ON categories;
CREATE POLICY "Allow all operations on categories" ON categories
FOR ALL USING (true) WITH CHECK (true);

-- For orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on orders" ON orders;
CREATE POLICY "Allow all operations on orders" ON orders
FOR ALL USING (true) WITH CHECK (true);

-- For order_items table
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all operations on order_items" ON order_items;
CREATE POLICY "Allow all operations on order_items" ON order_items
FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- RECOMMENDED: Use the DISABLE option for now
-- =====================================================
-- For development/testing, it's easier to disable RLS
-- You can add proper policies later for production

-- Just run the first section (DISABLE ROW LEVEL SECURITY)
