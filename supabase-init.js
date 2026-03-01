// Supabase Initialization - Standalone file
// This file initializes Supabase client immediately when loaded

(function() {
    'use strict';
    
    console.log('🚀 Initializing Supabase...');
    
    // Supabase configuration
    const SUPABASE_URL = "https://blsgyybaevuytmgpljyk.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsc2d5eWJhZXZ1eXRtZ3BsanlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NjcyMjYsImV4cCI6MjA4NzM0MzIyNn0.G4gvoW-_7DxQ1y28oZEHS7OIVpsyHTlZewV02Th_meU";
    
    // Set global config for backward compatibility
    window.SUPABASE_CONFIG = {
        url: SUPABASE_URL,
        anonKey: SUPABASE_ANON_KEY
    };
    
    console.log('✅ SUPABASE_CONFIG set:', {
        url: SUPABASE_URL,
        hasKey: !!SUPABASE_ANON_KEY
    });
    
    // Wait for Supabase CDN to load
    function initializeSupabase() {
        if (typeof supabase === 'undefined' || !supabase.createClient) {
            console.log('⏳ Waiting for Supabase CDN...');
            setTimeout(initializeSupabase, 100);
            return;
        }
        
        try {
            console.log('🔧 Creating Supabase client...');
            
            const { createClient } = supabase;
            const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                auth: {
                    autoRefreshToken: true,
                    persistSession: true,
                    detectSessionInUrl: true,
                    flowType: 'pkce'
                }
            });
            
            // Make globally available
            window.supabase = supabaseClient;
            window.supabaseClient = supabaseClient;
            
            console.log('✅ Supabase client initialized successfully!');
            console.log('✅ window.supabase is ready');
            
            // Dispatch custom event to notify other scripts
            window.dispatchEvent(new CustomEvent('supabaseReady', { 
                detail: { client: supabaseClient } 
            }));
            
        } catch (error) {
            console.error('❌ Failed to initialize Supabase:', error);
        }
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSupabase);
    } else {
        initializeSupabase();
    }
    
})();
