# Fix CORS Errors - Quick Guide

## ❌ The Problem

You're seeing these errors:
```
Access to fetch at 'https://blsgyybaevuytmgpljyk.supabase.co/auth/v1/user' 
from origin 'null' has been blocked by CORS policy
```

**Cause:** You're opening HTML files directly (file:// protocol) instead of through a web server.

## ✅ The Solution

You MUST run the website through a web server. Here's how:

### Method 1: Using Python Server (Recommended)

1. **Open Command Prompt/Terminal**

2. **Navigate to your project folder:**
   ```bash
   cd C:\Users\ksair\Downloads\ecommerce-main\ecommerce-main
   ```

3. **Run the start script:**
   ```bash
   start-frontend.bat
   ```

4. **Open your browser and go to:**
   ```
   http://localhost:8000
   ```
   
   **NOT:** `file:///C:/Users/...`

### Method 2: Using Node.js http-server

1. **Open Command Prompt/Terminal**

2. **Navigate to your project folder:**
   ```bash
   cd C:\Users\ksair\Downloads\ecommerce-main\ecommerce-main
   ```

3. **Run:**
   ```bash
   start-frontend-node.bat
   ```

4. **Open browser:**
   ```
   http://localhost:8000
   ```

### Method 3: Using VS Code Live Server

1. **Install "Live Server" extension in VS Code**

2. **Right-click on index.html**

3. **Select "Open with Live Server"**

4. **Browser opens automatically**

## 🚫 What NOT to Do

**DON'T:**
- Double-click HTML files to open them
- Open files directly from File Explorer
- Use file:// URLs

**DO:**
- Always use http://localhost:8000
- Run through a web server
- Use the provided start scripts

## 🔍 How to Verify It's Working

### ✅ Correct (Will Work):
```
URL: http://localhost:8000/index.html
URL: http://localhost:8000/shop.html
URL: http://127.0.0.1:8000/index.html
```

### ❌ Wrong (Will NOT Work):
```
URL: file:///C:/Users/ksair/Downloads/ecommerce-main/ecommerce-main/index.html
URL: C:\Users\ksair\Downloads\ecommerce-main\ecommerce-main\index.html
```

## 📋 Step-by-Step Fix

1. **Close all browser tabs with your website**

2. **Open Command Prompt:**
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

3. **Navigate to project:**
   ```bash
   cd C:\Users\ksair\Downloads\ecommerce-main\ecommerce-main
   ```

4. **Start server:**
   ```bash
   start-frontend.bat
   ```

5. **Wait for this message:**
   ```
   Server will run at: http://localhost:8000
   Serving HTTP on :: port 8000 (http://[::]:8000/) ...
   ```

6. **Open browser and type:**
   ```
   http://localhost:8000
   ```

7. **Press Enter**

## 🐛 Troubleshooting

### Error: "Python is not recognized"
**Solution:** Install Python from python.org or use Node.js method

### Error: "Port 8000 is already in use"
**Solution:** 
- Close other servers
- Or change port in start-frontend.bat to 8001

### Error: "node is not recognized"
**Solution:** Install Node.js from nodejs.org

### Server starts but page doesn't load
**Solution:**
- Check if you typed http://localhost:8000 correctly
- Try http://127.0.0.1:8000
- Check firewall settings

## ✅ Verification Checklist

After starting the server:
- [ ] Command prompt shows "Serving HTTP..."
- [ ] Browser URL starts with http://localhost:8000
- [ ] No CORS errors in console (F12)
- [ ] Website loads properly
- [ ] Can login/signup
- [ ] Products display
- [ ] No "null origin" errors

## 🎯 Quick Test

1. Start server: `start-frontend.bat`
2. Open: `http://localhost:8000`
3. Press F12 (open console)
4. Check for errors
5. If no CORS errors = ✅ Fixed!

## 📝 Important Notes

- **Always** use the server for development
- **Never** open HTML files directly
- **Keep** the command prompt window open while using the site
- **Restart** server after changing config files

## 🚀 For Production

When deploying to production:
- Use a proper web server (Apache, Nginx, etc.)
- Or deploy to hosting platforms (Vercel, Netlify, etc.)
- CORS errors won't occur on proper hosting

---

**Remember:** The key is to always access your website through http://localhost:8000, not by opening files directly!
