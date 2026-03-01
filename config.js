// Supabase Configuration for Production Deployment
// This file MUST be loaded FIRST before any other JavaScript files
// Version: 2.0 - Fixed duplicate config files issue

console.log('🔄 Loading config.js...');

window.SUPABASE_CONFIG = {
    url: "https://blsgyybaevuytmgpljyk.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsc2d5eWJhZXZ1eXRtZ3BsanlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcyMjYsImV4cCI6MjA4NzM0MzIyNn0.G4gvoW-_7DxQ1y28oZEHS7OIVpsyHTlZewV02Th_meU"
};

console.log('✅ SUPABASE_CONFIG loaded successfully');
console.log('✅ Config URL:', window.SUPABASE_CONFIG.url);
console.log('✅ Config Key exists:', !!window.SUPABASE_CONFIG.anonKey);
