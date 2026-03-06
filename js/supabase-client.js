// Supabase Client Configuration
// Hardcoded for static site deployment

const SUPABASE_URL = 'https://blsgyybaevuytmgpljyk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsc2d5eWJhZXZ1eXRtZ3BsanlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcyMjYsImV4cCI6MjA4NzM0MzIyNn0.G4gvoW-_7DxQ1y28oZEHS7OIVpsyHTlZewV02Th_meU';

// Load Supabase library from CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/dist/umd/supabase.js';
script.onload = function() {
    // Initialize after library loads
    const supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
    
    // Replace window.supabase with the client instance
    window.supabaseClient = supabaseClient;
    window.supabase = supabaseClient;
    
    console.log('Supabase initialized');
    
    // Dispatch ready event
    window.dispatchEvent(new Event('supabaseReady'));
};
document.head.appendChild(script);
