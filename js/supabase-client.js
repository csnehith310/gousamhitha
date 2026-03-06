// Supabase Client Configuration
// Using UMD build for better compatibility

const SUPABASE_URL = 'https://blsgyybaevuytmgpljyk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsc2d5eWJhZXZ1eXRtZ3BsanlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcyMjYsImV4cCI6MjA4NzM0MzIyNn0.G4gvoW-_7DxQ1y28oZEHS7OIVpsyHTlZewV02Th_meU';

// Load Supabase from CDN (UMD build)
(function() {
    // Create script element for Supabase UMD
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/dist/umd/supabase.js';
    script.onload = function() {
        // Initialize Supabase client after library loads
        if (window.supabase && window.supabase.createClient) {
            window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('✅ Supabase connected successfully');
            console.log('📍 Project URL:', SUPABASE_URL);
            
            // Dispatch event to signal Supabase is ready
            window.dispatchEvent(new Event('supabaseReady'));
        } else {
            console.error('❌ Supabase library failed to load');
        }
    };
    script.onerror = function() {
        console.error('❌ Failed to load Supabase library from CDN');
    };
    document.head.appendChild(script);
})();
