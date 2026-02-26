# Environment Variables Reference

## Complete List of Environment Variables

### Supabase Configuration
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `SUPABASE_URL` | Yes | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase service role key (backend only) | `eyJhbGc...` |

### Authentication & Security
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `JWT_SECRET` | Yes | Secret key for JWT token signing | `your_random_secret_key_here` |
| `JWT_EXPIRES_IN` | Yes | JWT token expiration time | `7d` |

### Google OAuth (Optional)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret | `GOCSPX-xxxxx` |
| `GOOGLE_REDIRECT_URI` | No | OAuth callback URL | `http://localhost:5000/auth/google/callback` |

### Payment Gateway (Optional)
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RAZORPAY_KEY_ID` | No | Razorpay API key ID | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | No | Razorpay API key secret | `xxxxx` |

### Application Configuration
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `ADMIN_EMAIL` | Yes | Admin email address | `admin@example.com` |
| `API_BASE_URL` | Yes | Backend API URL | `http://localhost:5000` |
| `PORT` | Yes | Backend server port | `5000` |
| `FRONTEND_PORT` | Yes | Frontend server port | `8000` |
| `APP_NAME` | Yes | Application name | `Gousamhitha` |
| `APP_DESCRIPTION` | Yes | Application description | `Organic Products E-commerce Platform` |

## File Locations

### Frontend Environment Variables
- **File:** `ecommerce-main/.env`
- **Usage:** Used by `generate-config.js` to create `config.js`
- **Loaded by:** Frontend HTML pages via `<script src="config.js"></script>`

### Backend Environment Variables
- **File:** `ecommerce-main/backend/.env.supabase`
- **Usage:** Loaded by Node.js backend using `dotenv`
- **Loaded by:** `backend/server.js` automatically on startup

## How to Use

### Initial Setup
1. Copy example files:
   ```bash
   copy .env.example .env
   cd backend
   copy .env.example .env.supabase
   ```

2. Edit `.env` and `backend/.env.supabase` with your actual credentials

3. Generate frontend config:
   ```bash
   node generate-config.js
   ```

### Starting the Application

**Frontend:**
```bash
start-frontend.bat
```
This automatically runs `generate-config.js` before starting the server.

**Backend:**
```bash
cd backend
start.bat
```
This checks for `.env.supabase` before starting.

## Security Notes

### Protected Files (in .gitignore)
- `.env`
- `backend/.env`
- `.env.local`
- `.env.production`
- `config.js`

### Never Commit These Files
These files contain sensitive credentials and are automatically excluded from Git.

### Safe to Commit
- `.env.example`
- `backend/.env.example`
- `generate-config.js`
- `verify-security.js`

## Verification

Run the security verification script:
```bash
node verify-security.js
```

This checks:
- All required files exist
- .gitignore is properly configured
- Environment variables are defined

## Troubleshooting

### Config.js not found
Run: `node generate-config.js`

### Backend connection errors
1. Check `backend/.env.supabase` exists
2. Verify all required variables are set
3. Restart the backend server

### Frontend Supabase errors
1. Check `.env` file exists
2. Run `node generate-config.js`
3. Verify `config.js` was generated
4. Restart the frontend server

## Production Deployment

Before deploying to production:

1. **Generate a strong JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update environment variables** on your hosting platform

3. **Never use development credentials** in production

4. **Enable HTTPS** for all production URLs

5. **Rotate credentials regularly** for security
