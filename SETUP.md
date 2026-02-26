# Gousamhitha E-commerce Platform - Setup Instructions

## Initial Setup

1. **Configure Supabase Credentials**
   
   Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```

2. **Add Your Supabase Credentials**
   
   Edit `config.js` and replace with your actual Supabase credentials:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'YOUR_SUPABASE_PROJECT_URL',
       anonKey: 'YOUR_SUPABASE_ANON_KEY'
   };
   ```

3. **Start the Frontend Server**
   
   Run one of the following:
   ```bash
   # Using Python
   start-frontend.bat
   
   # OR using Node.js
   start-frontend-node.bat
   ```

4. **Access the Application**
   
   Open your browser and go to:
   ```
   http://localhost:8000
   ```

## Security Notes

- `config.js` contains sensitive credentials and is gitignored
- Never commit `config.js` to version control
- Use `config.example.js` as a template for new setups
- Keep your Supabase credentials secure

## Admin Access

- Admin Email: gowsamhitha123@gmail.com
- Set up admin password in Supabase Auth dashboard
