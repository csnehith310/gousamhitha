const fs = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    
    if (!fs.existsSync(envPath)) {
        console.error('Error: .env file not found!');
        console.log('Please copy .env.example to .env and fill in your credentials.');
        process.exit(1);
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            const value = valueParts.join('=').trim();
            env[key.trim()] = value;
        }
    });
    
    return env;
}

function generateConfig() {
    const env = loadEnv();
    
    const configContent = `const SUPABASE_CONFIG = {
    url: '${env.SUPABASE_URL || ''}',
    anonKey: '${env.SUPABASE_ANON_KEY || ''}'
};

const APP_CONFIG = {
    adminEmail: '${env.ADMIN_EMAIL || ''}',
    apiBaseUrl: '${env.API_BASE_URL || 'http://localhost:5000'}',
    appName: '${env.APP_NAME || 'Gousamhitha'}',
    appDescription: '${env.APP_DESCRIPTION || 'Organic Products E-commerce Platform'}'
};

const RAZORPAY_CONFIG = {
    keyId: '${env.RAZORPAY_KEY_ID || ''}'
};
`;
    
    const configPath = path.join(__dirname, 'config.js');
    fs.writeFileSync(configPath, configContent, 'utf8');
    
    console.log('✓ config.js generated successfully from .env');
    console.log('✓ Supabase URL:', env.SUPABASE_URL ? '***configured***' : 'MISSING');
    console.log('✓ Admin Email:', env.ADMIN_EMAIL || 'MISSING');
    console.log('✓ Razorpay Key:', env.RAZORPAY_KEY_ID ? '***configured***' : 'MISSING');
}

try {
    generateConfig();
} catch (error) {
    console.error('Error generating config:', error.message);
    process.exit(1);
}
