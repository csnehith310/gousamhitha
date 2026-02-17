# 🔧 Fix: Invalid Login Credentials

## Problem
You're seeing "Invalid login credentials" because the admin account doesn't exist in Supabase Auth yet.

## Solution - Use the Account Creator Tool

### Step 1: Open the Tool
Open this file in your browser:
```
create-admin-account.html
```

### Step 2: Follow the Steps in Order

1. **Click "Check Admin Account"**
   - If it says "does NOT exist" → continue to step 2
   - If it says "EXISTS" → skip to step 3

2. **Click "Create Admin Account"**
   - This creates the account in Supabase Auth
   - If you see "email confirmation required" → go to Supabase and disable it (see below)

3. **Click "Create Admin Profile"**
   - This creates the profile with admin role
   - If it says "already exists" → that's fine!

4. **Click "Test Admin Login"**
   - Should show "ADMIN LOGIN SUCCESSFUL" ✅
   - If successful, you're done!

### Step 3: Test on Your Website
1. Open `index.html`
2. Click profile icon
3. Enter:
   - Email: ruthvik@blockfortrust.com
   - Password: Saireddy880227
4. Click "Sign In"
5. Should see "Enter Admin Panel" button

## If Email Confirmation is Required

Go to Supabase:
1. Open: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers
2. Find "Email" provider
3. Scroll to "Email confirmation"
4. **Disable** the "Confirm email" checkbox
5. Click "Save"
6. Go back to `create-admin-account.html` and try again

## Alternative: Create Manually in Supabase

### Option A: Through Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users
2. Click "Add user" → "Create new user"
3. Enter:
   - Email: ruthvik@blockfortrust.com
   - Password: Saireddy880227
   - Auto Confirm User: **YES** ✅
4. Click "Create user"
5. Copy the User ID
6. Go to SQL Editor and run:
```sql
INSERT INTO profiles (id, email, role)
VALUES ('[PASTE-USER-ID-HERE]', 'ruthvik@blockfortrust.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### Option B: Through SQL (if profiles table exists)
```sql
-- This only works if the user already exists in auth.users
-- Get the user ID first from the Auth Users page, then:
INSERT INTO profiles (id, email, role)
VALUES ('[USER-ID]', 'ruthvik@blockfortrust.com', 'admin');
```

## Verify Everything Works

Run these checks in order:

### 1. Check Auth User Exists
Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users
- Should see ruthvik@blockfortrust.com in the list

### 2. Check Profile Exists
In SQL Editor:
```sql
SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```
- Should return 1 row with role = 'admin'

### 3. Test Login
Open `create-admin-account.html` and click "Test Admin Login"
- Should show success message

### 4. Test on Website
Open `index.html` and try logging in
- Should show "Enter Admin Panel" button

## Common Issues

### "User already registered"
- Account exists, just create the profile
- Click "Create Admin Profile" in the tool

### "Email confirmation required"
- Disable email confirmation in Supabase Auth settings
- See instructions above

### "Profile not found"
- Profile table might not exist
- Run the SQL from QUICK-START-ADMIN.md to create it

### "Role is customer not admin"
- Update the role:
```sql
UPDATE profiles SET role = 'admin' 
WHERE email = 'ruthvik@blockfortrust.com';
```

## Quick Fix Summary

1. Open `create-admin-account.html`
2. Click all 4 buttons in order
3. Should see all green success messages
4. Test login on `index.html`
5. Done! ✅

The tool handles everything automatically!
