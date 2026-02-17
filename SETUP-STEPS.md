# 🚀 Admin Setup - Follow These Steps

## 📋 Complete Setup in 5 Minutes

---

### ✅ STEP 1: Create Profiles Table

**Where:** Supabase SQL Editor  
**Link:** https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

**Copy this SQL:**
```sql
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
```

**Click:** RUN button

**Expected:** "Success" message

---

### ✅ STEP 2: Disable Email Confirmation

**Where:** Auth Settings  
**Link:** https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

**Do this:**
1. Find "Email" provider
2. Scroll to "Email confirmation"
3. **UNCHECK** "Confirm email"
4. Click "Save"

---

### ✅ STEP 3: Create Admin User

**Where:** Auth Users  
**Link:** https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users

**Do this:**
1. Click "Add user" button
2. Select "Create new user"
3. Fill in:
   ```
   Email: ruthvik@blockfortrust.com
   Password: Saireddy880227
   Auto Confirm User: ✅ CHECK THIS!
   ```
4. Click "Create user"
5. **IMPORTANT:** Copy the User ID (looks like: 12345678-1234-1234-1234-123456789abc)

---

### ✅ STEP 4: Create Admin Profile

**Where:** Supabase SQL Editor  
**Link:** https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor

**Copy this SQL (replace [USER-ID] with the ID you copied):**
```sql
INSERT INTO profiles (id, email, role)
VALUES ('[PASTE-USER-ID-HERE]', 'ruthvik@blockfortrust.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verify it worked
SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```

**Click:** RUN button

**Expected:** Should show 1 row with role = 'admin'

---

### ✅ STEP 5: Test Login

**Where:** Your website  
**File:** index.html

**Do this:**
1. Open index.html in browser
2. Click profile icon (top right)
3. Enter:
   - Email: ruthvik@blockfortrust.com
   - Password: Saireddy880227
4. Click "Sign In"
5. **Should see:** "Enter Admin Panel" button
6. Click button
7. **Should redirect to:** admin-dashboard.html

---

## 🎉 Done!

If you see the admin dashboard, everything is working!

---

## 🐛 If Something Goes Wrong

### "Invalid login credentials"
→ User wasn't created in Step 3  
→ Go back to Step 3 and create the user

### "Profile not found"
→ Profile wasn't created in Step 4  
→ Go back to Step 4 and run the SQL

### "Access denied"
→ Role is not "admin"  
→ Run this SQL:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'ruthvik@blockfortrust.com';
```

### Admin button doesn't show
→ Check browser console for errors  
→ Verify profile role is "admin" with this SQL:
```sql
SELECT * FROM profiles WHERE email = 'ruthvik@blockfortrust.com';
```

---

## 📝 Quick Reference

**Admin Credentials:**
- Email: ruthvik@blockfortrust.com
- Password: Saireddy880227

**Supabase Links:**
- SQL Editor: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/editor
- Auth Users: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/users
- Auth Settings: https://supabase.com/dashboard/project/hdlgqdjmleezidpvakjd/auth/providers

**Files:**
- Full SQL Guide: CREATE-ADMIN-SQL.md
- Troubleshooting: FIX-INVALID-CREDENTIALS.md
- Complete Guide: README-ADMIN-LOGIN.md

---

## ⏱️ Time Required

- Step 1: 30 seconds (SQL)
- Step 2: 30 seconds (Settings)
- Step 3: 1 minute (Create user)
- Step 4: 30 seconds (SQL)
- Step 5: 30 seconds (Test)

**Total: ~3 minutes**

---

**Start with Step 1 and follow in order!**
