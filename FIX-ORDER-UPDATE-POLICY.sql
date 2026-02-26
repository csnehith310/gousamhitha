-- Fix Order Update Policy for Admin Users
-- Run this in Supabase SQL Editor

-- First, check if the policy exists and drop it if needed
DROP POLICY IF EXISTS "Allow authenticated users to update orders" ON orders;
DROP POLICY IF EXISTS "Allow admin to update orders" ON orders;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON orders;

-- Create a new policy that allows authenticated users to update orders
CREATE POLICY "Enable update for authenticated users" 
ON orders 
FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Alternative: If you want only admins to update, use this instead:
-- CREATE POLICY "Enable update for admin users" 
-- ON orders 
-- FOR UPDATE 
-- TO authenticated 
-- USING (
--   auth.jwt() ->> 'email' = 'gowsamhitha123@gmail.com'
-- ) 
-- WITH CHECK (
--   auth.jwt() ->> 'email' = 'gowsamhitha123@gmail.com'
-- );

-- Verify the policy was created
SELECT * FROM pg_policies WHERE tablename = 'orders' AND cmd = 'UPDATE';
