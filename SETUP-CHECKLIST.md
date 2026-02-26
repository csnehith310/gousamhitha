# Setup Checklist

Use this checklist to ensure your environment is properly configured.

## Initial Setup

### 1. Environment Files
- [ ] Copy `.env.example` to `.env`
- [ ] Copy `backend/.env.example` to `backend/.env.supabase`
- [ ] Fill in SUPABASE_URL in both files
- [ ] Fill in SUPABASE_ANON_KEY in both files
- [ ] Update ADMIN_EMAIL in `.env`
- [ ] Change JWT_SECRET to a secure random string

### 2. Optional Credentials (if using these features)
- [ ] Add GOOGLE_CLIENT_ID (for Google OAuth)
- [ ] Add GOOGLE_CLIENT_SECRET (for Google OAuth)
- [ ] Add RAZORPAY_KEY_ID (for Razorpay payments)
- [ ] Add RAZORPAY_KEY_SECRET (for Razorpay payments)
- [ ] Add SUPABASE_SERVICE_ROLE_KEY (for backend admin operations)

### 3. Generate Configuration
- [ ] Run `node generate-config.js`
- [ ] Verify `config.js` was created
- [ ] Check console output shows "configured" for required variables

### 4. Install Dependencies
- [ ] Run `cd backend && npm install`
- [ ] Verify node_modules folder created in backend

### 5. Security Verification
- [ ] Run `node verify-security.js`
- [ ] Verify all checks pass
- [ ] Confirm .gitignore includes .env and config.js

## Testing

### 6. Start Backend
- [ ] Run `cd backend && start.bat`
- [ ] Verify server starts on port 5000
- [ ] Check console for "Server running on port 5000"
- [ ] No error messages in console

### 7. Start Frontend
- [ ] Run `start-frontend.bat` (or `start-frontend-node.bat`)
- [ ] Verify server starts on port 8000
- [ ] config.js is auto-generated on startup
- [ ] No error messages in console

### 8. Test Connection
- [ ] Open http://localhost:8000/test-connection.html
- [ ] Click "1. Test Connection"
- [ ] Verify "Connection Successful" message
- [ ] Click "2. Check Tables"
- [ ] Verify all tables exist

### 9. Test Frontend Features
- [ ] Open http://localhost:8000
- [ ] Homepage loads without errors
- [ ] Products display correctly
- [ ] Login/Register works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Orders are saved

### 10. Test Admin Features
- [ ] Open http://localhost:8000/admin-dashboard.html
- [ ] Admin login works
- [ ] Dashboard displays data
- [ ] Can view orders
- [ ] Can manage products
- [ ] Can view vendors

## Security Checks

### 11. Git Security
- [ ] Run `git status` (if using Git)
- [ ] Verify `.env` is NOT listed
- [ ] Verify `config.js` is NOT listed
- [ ] Verify `backend/.env.supabase` is NOT listed
- [ ] Only source code files should be tracked

### 12. Code Review
- [ ] No hardcoded Supabase URLs in source files
- [ ] No hardcoded API keys in source files
- [ ] All credentials use environment variables
- [ ] Backend uses `process.env.*`
- [ ] Frontend uses `SUPABASE_CONFIG.*` from config.js

## Production Deployment

### 13. Pre-Deployment
- [ ] Generate strong JWT_SECRET using crypto
- [ ] Update all URLs to production domains
- [ ] Enable HTTPS for all endpoints
- [ ] Set production Supabase credentials
- [ ] Configure production environment variables on hosting platform

### 14. Post-Deployment
- [ ] Test all features in production
- [ ] Verify SSL/HTTPS works
- [ ] Check all API endpoints
- [ ] Test payment gateway (if configured)
- [ ] Monitor error logs

## Troubleshooting

### If Frontend Won't Start
- [ ] Check `.env` file exists
- [ ] Run `node generate-config.js`
- [ ] Verify `config.js` was created
- [ ] Check port 8000 is not in use

### If Backend Won't Start
- [ ] Check `backend/.env.supabase` exists
- [ ] Verify all required variables are set
- [ ] Run `npm install` in backend folder
- [ ] Check port 5000 is not in use

### If Database Connection Fails
- [ ] Verify SUPABASE_URL is correct
- [ ] Verify SUPABASE_ANON_KEY is correct
- [ ] Check Supabase project is active
- [ ] Test connection at test-connection.html

### If Login Doesn't Work
- [ ] Check JWT_SECRET is set
- [ ] Verify backend is running
- [ ] Check browser console for errors
- [ ] Verify Supabase auth is enabled

## Quick Commands

**Generate config:**
```bash
node generate-config.js
```

**Verify security:**
```bash
node verify-security.js
```

**Start backend:**
```bash
cd backend
start.bat
```

**Start frontend:**
```bash
start-frontend.bat
```

**Install backend dependencies:**
```bash
cd backend
npm install
```

## Documentation Reference

- **QUICK-START.md** - Quick start guide
- **ENV-VARIABLES.md** - Complete variable reference
- **SECURITY-SETUP.md** - Security configuration guide
- **SECURITY-IMPLEMENTATION-SUMMARY.md** - What was changed

## Status

Mark your overall setup status:

- [ ] Initial setup complete
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Backend tested and working
- [ ] Frontend tested and working
- [ ] Security verified
- [ ] Ready for development
- [ ] Ready for production deployment

---

**Last Updated:** After security implementation
**Version:** 1.0
