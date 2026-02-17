






ALTER TABLE products 
ADD COLUMN IF NOT EXISTS subcategory TEXT,
ADD COLUMN IF NOT EXISTS unit TEXT,
ADD COLUMN IF NOT EXISTS unit_quantity NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS display_unit TEXT,
ADD COLUMN IF NOT EXISTS vendor_id UUID REFERENCES vendors(id),
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true;

UPDATE products 
SET in_stock = (stock > 0)
WHERE in_stock IS NULL;

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (name) 
SELECT * FROM (VALUES 
    ('Fruits & Vegetables'),
    ('Daily Staples'),
    ('Snacks & More'),
    ('Bakery & Dairy'),
    ('Home Food'),
    ('Special Categories'),
    ('Conscious Living')
) AS t(name)
WHERE NOT EXISTS (SELECT 1 FROM categories LIMIT 1);

CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);





ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE vendors DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

ALTER TABLE vendors ALTER COLUMN email DROP NOT NULL;

SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'products'
ORDER BY ordinal_position;
