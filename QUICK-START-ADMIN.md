# 🚀 Quick Start: Admin Login

## Admin Credentials
```
Email: ruthvik@blockfortrust.com
Password: Saireddy880227
```

## Setup (One-Time)

### 1. Create Profiles Table
Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

Paste and run:
```sql
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

### 2. Disable Email Confirmation
Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers
- Find "Email" provider
- Disable "Confirm email"
- Save

### 3. Test Setup
Open: `test-admin-login.html`
- Click all test buttons
- Should see green success messages

## How to Login as Admin

### From Homepage (index.html):
1. Click profile icon (top right)
2. Enter admin credentials
3. Click "Sign In"
4. Wait for "Enter Admin Panel" button
5. Click button → redirects to admin dashboard

### From Admin Page (admin.html):
1. Enter admin credentials
2. Click "Login to Dashboard"
3. Redirects to admin dashboard

## What Happens

```
Login → Supabase Auth → Fetch Profile → Check Role
                                            ↓
                                    role === "admin"?
                                            ↓
                                    YES: Show admin button
                                    NO: Redirect to home
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid email or password" | Create admin account in Supabase Auth |
| "Access denied" | Update role to "admin" in profiles table |
| Admin button doesn't show | Check console, verify profile role |
| Profile not created | Use test-admin-login.html to create |

## Quick SQL Queries

### Check if admin exists:
```sql
SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```

### Set user as admin:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'ruthvik@blockfortrust.com';
```

### Create admin profile manually:
```sql
-- First get user ID from Auth dashboard, then:
INSERT INTO profiles (id, email, role)
VALUES ('[USER-ID]', 'ruthvik@blockfortrust.com', 'admin');
```

## Files to Know

- `supabase-auth.js` - Authentication logic
- `test-admin-login.html` - Test suite
- `ADMIN-LOGIN-SETUP-GUIDE.md` - Detailed guide
- `ADMIN-LOGIN-FIX-COMPLETE.md` - What was fixed

## That's It!

Setup takes 2 minutes. Then admin login works perfectly with Supabase! 🎉
