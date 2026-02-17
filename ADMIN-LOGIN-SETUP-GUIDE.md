# Admin Login Setup Guide

## Overview
This guide will help you set up the admin authentication system using Supabase.

## Admin Credentials
- **Email:** ruthvik@blockfortrust.com
- **Password:** Saireddy880227

## Required Supabase Setup

### Step 1: Create the Profiles Table

Go to your Supabase SQL Editor:
https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

Run this SQL:

```sql
-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

### Step 2: Disable Email Confirmation (For Testing)

Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

1. Find "Email" provider
2. Scroll to "Email confirmation" setting
3. **Disable** "Confirm email" checkbox
4. Click "Save"

This allows immediate login after signup without email verification.

### Step 3: Create Admin Account

You have two options:

#### Option A: Sign Up Through the Website
1. Open `index.html` in your browser
2. Click the profile icon → "Sign Up" tab
3. Fill in the form with:
   - Name: Ruthvik
   - Email: ruthvik@blockfortrust.com
   - Mobile: (any number)
   - Password: Saireddy880227
   - Confirm Password: Saireddy880227
4. Click "Create Account"
5. The system will automatically assign admin role and redirect to admin dashboard

#### Option B: Create Manually in Supabase

1. Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users
2. Click "Add user" → "Create new user"
3. Enter:
   - Email: ruthvik@blockfortrust.com
   - Password: Saireddy880227
   - Auto Confirm User: YES
4. Click "Create user"
5. Copy the user ID from the users list
6. Go to SQL Editor and run:

```sql
INSERT INTO profiles (id, email, role)
VALUES ('[PASTE-USER-ID-HERE]', 'ruthvik@blockfortrust.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

## How It Works

### Login Flow:

1. User enters email and password
2. System calls `supabase.auth.signInWithPassword()`
3. Supabase validates credentials
4. System fetches user profile from `profiles` table
5. If profile doesn't exist, creates one with appropriate role
6. If role is "admin", shows "Enter Admin Panel" button
7. User clicks button → redirects to `admin-dashboard.html`

### Role Assignment Logic:

```javascript
const role = email === 'ruthvik@blockfortrust.com' ? 'admin' : 'customer';
```

- Email `ruthvik@blockfortrust.com` → admin role
- All other emails → customer role

### Admin Page Protection:

All admin pages (`admin-dashboard.html`, `admin-products.html`, etc.) automatically:
1. Check if user is logged in
2. Fetch user profile from database
3. Verify role is "admin"
4. If not admin → redirect to home page

## Testing the Admin Login

### Test 1: Admin Login from Homepage
1. Open `index.html`
2. Click profile icon
3. Enter:
   - Email: ruthvik@blockfortrust.com
   - Password: Saireddy880227
4. Click "Sign In"
5. Should see "Enter Admin Panel" button
6. Click button → should redirect to admin dashboard

### Test 2: Admin Login from Admin Page
1. Open `admin.html` directly
2. Enter:
   - Email: ruthvik@blockfortrust.com
   - Password: Saireddy880227
3. Click "Login to Dashboard"
4. Should redirect to admin dashboard

### Test 3: Customer Login
1. Create a customer account with any other email
2. Login with customer credentials
3. Should NOT see "Enter Admin Panel" button
4. Should redirect to homepage
5. Try accessing `admin-dashboard.html` directly
6. Should be redirected back to homepage with "Access denied" message

## Troubleshooting

### Issue: "Invalid email or password"
- **Solution:** Make sure the admin account exists in Supabase Auth
- Check: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users

### Issue: "Access denied. Admin privileges required."
- **Solution:** Check the profiles table to ensure role is set to "admin"
- Run in SQL Editor:
```sql
SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```
- If role is not "admin", update it:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'ruthvik@blockfortrust.com';
```

### Issue: Profile not created after signup
- **Solution:** This might be due to RLS policies
- The system will auto-create profile on first login if missing
- Or manually create profile using SQL from Step 3, Option B

### Issue: "Enter Admin Panel" button doesn't show
- **Solution:** Check browser console for errors
- Verify the profile has role = "admin"
- Make sure `supabase-auth.js` is loaded
- Check that the modal HTML has the button elements:
  - `<div id="role-buttons">`
  - `<button id="admin-enter-btn">`

## Security Notes

1. **Password Security:** The admin password is hardcoded in the guide for demo purposes. In production, use a strong, unique password.

2. **RLS Policies:** Row Level Security ensures users can only access their own profile data.

3. **Session Management:** Supabase handles JWT tokens automatically - no localStorage needed.

4. **Admin Protection:** All admin pages verify the user's role from the database on page load.

## Files Modified

- `supabase-auth.js` - Updated login/signup logic to properly handle admin role detection
- `script.js` - Updated `checkUserRole()` to work with Supabase
- `index.html` - Already has the modal structure with admin button
- `admin.html` - Already has admin login form

## Next Steps

After completing the setup:
1. Test admin login from homepage
2. Test admin login from admin page
3. Test customer login
4. Test admin page protection
5. Verify profile creation for new signups

All authentication now uses Supabase - no localStorage for credentials!
