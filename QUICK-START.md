# Quick Start Guide

## Prerequisites
- Node.js installed
- Python installed (for frontend server)
- Supabase account with project created

## Setup Steps

### 1. Configure Environment Variables

**Copy example files:**
```bash
copy .env.example .env
cd backend
copy .env.example .env.supabase
cd ..
```

**Edit `.env` file** and add your credentials:
- SUPABASE_URL (from your Supabase project)
- SUPABASE_ANON_KEY (from your Supabase project)
- ADMIN_EMAIL (your admin email)

**Edit `backend/.env.supabase`** with the same credentials.

### 2. Generate Frontend Configuration

```bash
node generate-config.js
```

This creates `config.js` from your `.env` file.

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
start.bat
```
Backend runs at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
start-frontend.bat
```
Frontend runs at: http://localhost:8000

### 5. Verify Setup

Run the security verification:
```bash
node verify-security.js
```

Open browser and test:
- Frontend: http://localhost:8000
- Test connection: http://localhost:8000/test-connection.html

## Common Issues

### "Config.js not found"
**Solution:** Run `node generate-config.js`

### "Cannot connect to Supabase"
**Solution:** 
1. Check `.env` has correct SUPABASE_URL and SUPABASE_ANON_KEY
2. Run `node generate-config.js`
3. Restart frontend server

### "Backend connection failed"
**Solution:**
1. Check `backend/.env.supabase` exists and has correct values
2. Restart backend server
3. Verify backend is running at http://localhost:5000

### "Port already in use"
**Solution:**
- Frontend: Change FRONTEND_PORT in `.env`
- Backend: Change PORT in `backend/.env.supabase`

## File Structure

```
ecommerce-main/
├── .env                          # Frontend environment variables (DO NOT COMMIT)
├── .env.example                  # Template for .env
├── config.js                     # Generated from .env (DO NOT COMMIT)
├── generate-config.js            # Generates config.js from .env
├── verify-security.js            # Verifies security setup
├── start-frontend.bat            # Start frontend server
├── start-frontend-node.bat       # Alternative frontend server
├── backend/
│   ├── .env.supabase            # Backend environment variables (DO NOT COMMIT)
│   ├── .env.example             # Template for backend .env
│   ├── server.js                # Backend entry point
│   └── start.bat                # Start backend server
└── [other files...]
```

## Next Steps

1. **Configure Database:** Run SQL scripts in Supabase SQL editor
2. **Add Products:** Use admin panel to add products
3. **Test Orders:** Place test orders to verify functionality
4. **Customize:** Update branding and content as needed

## Security Checklist

- [ ] `.env` file created and configured
- [ ] `backend/.env.supabase` created and configured
- [ ] `config.js` generated successfully
- [ ] `.gitignore` includes `.env` and `config.js`
- [ ] JWT_SECRET changed from default
- [ ] All credentials are environment variables
- [ ] No hardcoded credentials in code

## Documentation

- **ENV-VARIABLES.md** - Complete environment variables reference
- **SECURITY-SETUP.md** - Detailed security configuration guide
- **DELIVERY-LOCATION-FEATURE.md** - Delivery location feature documentation

## Support

If you encounter issues:
1. Check the documentation files
2. Run `node verify-security.js` to diagnose problems
3. Verify all environment variables are set correctly
4. Check console logs for error messages
