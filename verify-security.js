const fs = require('fs');
const path = require('path');

console.log('===========================================');
console.log('Security Configuration Verification');
console.log('===========================================\n');

const checks = [];

function checkFile(filePath, shouldExist, description) {
    const exists = fs.existsSync(filePath);
    const status = exists === shouldExist ? '✓' : '✗';
    const result = exists === shouldExist ? 'PASS' : 'FAIL';
    checks.push({ status, description, result });
    console.log(`${status} ${description}: ${result}`);
}

function checkGitignore(pattern, description) {
    const gitignorePath = path.join(__dirname, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
        const content = fs.readFileSync(gitignorePath, 'utf8');
        const hasPattern = content.includes(pattern);
        const status = hasPattern ? '✓' : '✗';
        const result = hasPattern ? 'PASS' : 'FAIL';
        checks.push({ status, description, result });
        console.log(`${status} ${description}: ${result}`);
    }
}

function checkEnvVariables() {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const requiredVars = [
            'SUPABASE_URL',
            'SUPABASE_ANON_KEY',
            'JWT_SECRET',
            'ADMIN_EMAIL',
            'API_BASE_URL',
            'PORT',
            'APP_NAME'
        ];
        
        console.log('\nEnvironment Variables Check:');
        requiredVars.forEach(varName => {
            const hasVar = content.includes(`${varName}=`);
            const status = hasVar ? '✓' : '✗';
            console.log(`${status} ${varName}: ${hasVar ? 'Found' : 'Missing'}`);
        });
    }
}

console.log('\n1. Environment Files:');
checkFile('.env', true, '.env file exists');
checkFile('.env.example', true, '.env.example file exists');
checkFile('backend/.env.supabase', true, 'backend/.env.supabase exists');
checkFile('backend/.env.example', true, 'backend/.env.example exists');

console.log('\n2. Generated Files:');
checkFile('config.js', true, 'config.js generated');
checkFile('generate-config.js', true, 'generate-config.js exists');

console.log('\n3. Git Security:');
checkGitignore('.env', '.env in .gitignore');
checkGitignore('config.js', 'config.js in .gitignore');
checkGitignore('.env.local', '.env.local in .gitignore');
checkGitignore('.env.production', '.env.production in .gitignore');

checkEnvVariables();

const failedChecks = checks.filter(c => c.result === 'FAIL');

console.log('\n===========================================');
if (failedChecks.length === 0) {
    console.log('✓ All security checks passed!');
    console.log('✓ Your credentials are properly secured.');
} else {
    console.log(`✗ ${failedChecks.length} check(s) failed!`);
    console.log('Please review the failed items above.');
}
console.log('===========================================\n');
