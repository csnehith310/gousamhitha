# 📝 SQL Commands Only

Copy and paste these SQL commands in order.

---

## SQL #1: Create Profiles Table

**Run this first in SQL Editor:**

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

---

## ⚠️ STOP: Create User in Dashboard

**You CANNOT create auth users with SQL!**

Go to: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users

1. Click "Add user"
2. Create new user:
   - Email: ruthvik@blockfortrust.com
   - Password: Saireddy880227
   - Auto Confirm: ✅ YES
3. Copy the User ID

---

## SQL #2: Create Admin Profile

**Replace [USER-ID] with the ID you copied above:**

```sql
-- Create admin profile
INSERT INTO profiles (id, email, role)
VALUES ('[PASTE-USER-ID-HERE]', 'ruthvik@blockfortrust.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## SQL #3: Verify Setup

**Check everything is correct:**

```sql
-- Should return 1 row with role = 'admin'
SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```

---

## Useful SQL Commands

### Check if table exists:
```sql
SELECT * FROM profiles LIMIT 5;
```

### Update role to admin:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'ruthvik@blockfortrust.com';
```

### Delete profile (start over):
```sql
DELETE FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```

### See all profiles:
```sql
SELECT * FROM profiles;
```

---

## Links

- SQL Editor: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor
- Auth Users: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users
- Auth Settings: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

---

**That's it! Just 2 SQL commands + 1 manual user creation.**
