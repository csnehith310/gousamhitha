# 🔐 Create Admin Account - Complete SQL Guide

## Step 1: Create Profiles Table (Run This First)

Go to Supabase SQL Editor:
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

Copy and paste this SQL:

```sql
-- ============================================
-- STEP 1: CREATE PROFILES TABLE
-- ============================================

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create policies
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Verify table was created
SELECT 'Profiles table created successfully!' as status;
```

Click **RUN** button.

You should see: "Profiles table created successfully!"

---

## Step 2: Disable Email Confirmation

Go to Auth Settings:
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

1. Find **"Email"** provider
2. Scroll down to **"Email confirmation"** section
3. **UNCHECK** the "Confirm email" checkbox
4. Click **"Save"** button

---

## Step 3: Create Admin User in Supabase Dashboard

Go to Auth Users:
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users

1. Click **"Add user"** button (top right)
2. Select **"Create new user"**
3. Fill in the form:
   ```
   Email: ruthvik@blockfortrust.com
   Password: Saireddy880227
   Auto Confirm User: ✅ YES (check this box!)
   ```
4. Click **"Create user"** button
5. **COPY THE USER ID** from the users list (you'll need it for next step)

The User ID looks like: `12345678-1234-1234-1234-123456789abc`

---

## Step 4: Create Admin Profile (Run This SQL)

Go back to SQL Editor:
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

Replace `[PASTE-USER-ID-HERE]` with the actual User ID you copied:

```sql
-- ============================================
-- STEP 4: CREATE ADMIN PROFILE
-- ============================================

-- Replace [PASTE-USER-ID-HERE] with the actual User ID from Step 3
INSERT INTO profiles (id, email, role)
VALUES ('[PASTE-USER-ID-HERE]', 'ruthvik@blockfortrust.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verify profile was created
SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```

Click **RUN** button.

You should see the profile with role = 'admin'

---

## Step 5: Verify Everything Works

Run this SQL to check:

```sql
-- Check if profile exists with admin role
SELECT 
    p.id,
    p.email,
    p.role,
    p.created_at,
    CASE 
        WHEN p.role = 'admin' THEN '✅ ADMIN ACCESS GRANTED'
        ELSE '❌ NOT ADMIN'
    END as status
FROM profiles p
WHERE p.email = 'ruthvik@blockfortrust.com';
```

Should show: `✅ ADMIN ACCESS GRANTED`

---

## Step 6: Test Login on Website

1. Open `index.html` in your browser
2. Click the profile icon (top right)
3. Enter credentials:
   - Email: `ruthvik@blockfortrust.com`
   - Password: `Saireddy880227`
4. Click **"Sign In"**
5. Should see **"Enter Admin Panel"** button
6. Click the button
7. Should redirect to `admin-dashboard.html`

---

## Alternative: If You Already Created the User

If you already tried to create the user and it exists, just create the profile:

### Find the User ID:
1. Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users
2. Find `ruthvik@blockfortrust.com` in the list
3. Click on it to see details
4. Copy the User ID

### Create Profile:
```sql
-- Use the User ID you found above
INSERT INTO profiles (id, email, role)
VALUES ('[USER-ID-HERE]', 'ruthvik@blockfortrust.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## Troubleshooting SQL

### Check if profiles table exists:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'profiles';
```

### Check all profiles:
```sql
SELECT * FROM profiles;
```

### Update existing profile to admin:
```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'ruthvik@blockfortrust.com';
```

### Delete profile (if you need to start over):
```sql
DELETE FROM profiles 
WHERE email = 'ruthvik@blockfortrust.com';
```

### Check RLS policies:
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';
```

---

## Complete Setup Checklist

- [ ] Step 1: Run SQL to create profiles table ✅
- [ ] Step 2: Disable email confirmation in Auth settings ✅
- [ ] Step 3: Create admin user in Supabase Dashboard ✅
- [ ] Step 4: Copy User ID ✅
- [ ] Step 5: Run SQL to create admin profile ✅
- [ ] Step 6: Verify with SQL query ✅
- [ ] Step 7: Test login on website ✅

---

## Quick Reference

### Admin Credentials:
```
Email: ruthvik@blockfortrust.com
Password: Saireddy880227
```

### Supabase Links:
- SQL Editor: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor
- Auth Users: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users
- Auth Settings: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

---

## Why Can't We Create Users with SQL?

Supabase Auth users are stored in a special `auth.users` table that's managed by Supabase's authentication system. You can't directly insert into it with SQL for security reasons. You must use:

1. Supabase Dashboard (manual creation)
2. Supabase Auth API (programmatic creation)
3. The website signup form

But you CAN create profiles with SQL once the auth user exists!

---

## Summary

1. ✅ Create profiles table (SQL)
2. ✅ Disable email confirmation (Dashboard)
3. ✅ Create auth user (Dashboard - can't use SQL)
4. ✅ Create profile (SQL)
5. ✅ Test login (Website)

Follow the steps in order and you'll have admin access in 5 minutes!
