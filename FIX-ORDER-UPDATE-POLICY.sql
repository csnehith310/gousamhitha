-- Fix Order Update Policy for Admin Users
-- Run this in Supabase SQL Editor

-- First, check current policies
SELECT * FROM pg_policies WHERE tablename = 'orders';

-- Drop existing update policies if any
DROP POLICY IF EXISTS "Allow authenticated users to update orders" ON orders;
DROP POLICY IF EXISTS "Allow admin to update orders" ON orders;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON orders;
DROP POLICY IF EXISTS "Enable update for all users" ON orders;

-- Make sure RLS is enabled
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create a new policy that allows authenticated users to update orders
CREATE POLICY "Enable update for authenticated users" 
ON orders 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Also ensure SELECT policy exists (needed for .select() after update)
DROP POLICY IF EXISTS "Enable read for authenticated users" ON orders;
CREATE POLICY "Enable read for authenticated users" 
ON orders 
FOR SELECT 
TO authenticated 
USING (true);

-- Verify the policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'orders'
ORDER BY cmd;

