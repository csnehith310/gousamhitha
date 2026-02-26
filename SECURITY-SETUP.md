# Security Setup Guide

## Environment Variables Configuration

All sensitive credentials are now stored in environment variables for security.

### Setup Instructions

1. **Copy the example file:**
   ```bash
   copy .env.example .env
   ```

2. **Fill in your credentials in `.env`:**
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (optional)
   - `JWT_SECRET` - Change to a secure random string for production
   - `GOOGLE_CLIENT_ID` - Google OAuth client ID (if using Google login)
   - `GOOGLE_CLIENT_SECRET` - Google OAuth client secret (if using Google login)
   - `RAZORPAY_KEY_ID` - Razorpay key ID (if using Razorpay payments)
   - `RAZORPAY_KEY_SECRET` - Razorpay key secret (if using Razorpay payments)
   - `ADMIN_EMAIL` - Admin email address

3. **Generate config.js from .env:**
   ```bash
   node generate-config.js
   ```

### Backend Setup

The backend automatically loads environment variables from `backend/.env.supabase` using `dotenv`.

1. **Copy backend example file:**
   ```bash
   cd backend
   copy .env.example .env.supabase
   ```

2. **Fill in backend credentials** in `backend/.env.supabase`

3. **Start the backend:**
   ```bash
   npm start
   ```

### Security Best Practices

1. **Never commit `.env` files to Git** - Already configured in `.gitignore`
2. **Never commit `config.js` to Git** - Already configured in `.gitignore`
3. **Use strong JWT secrets** - Change the default JWT_SECRET to a random string
4. **Rotate credentials regularly** - Update keys periodically for security
5. **Use service role key only on backend** - Never expose service role key to frontend

### Files Protected by .gitignore

- `.env`
- `backend/.env`
- `.env.local`
- `.env.production`
- `config.js`

### How It Works

1. **Frontend:** Uses `config.js` generated from `.env` by `generate-config.js`
2. **Backend:** Uses `dotenv` to load variables from `backend/.env.supabase`
3. **Git:** All sensitive files are excluded via `.gitignore`

### Verification

Run the application and verify:
- ✓ Login works
- ✓ Products load
- ✓ Cart works
- ✓ Orders work
- ✓ Admin dashboard works
- ✓ Database connection functions

### Troubleshooting

If you see connection errors:
1. Verify `.env` file exists and has correct values
2. Run `node generate-config.js` to regenerate config.js
3. Check that backend/.env.supabase has correct values
4. Restart both frontend and backend servers
