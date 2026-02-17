





const GOOGLE_CONFIG = {
    clientId: '488030012275-q24mqkugm2l0t6hgbc0uvd5lf0lj155q.apps.googleusercontent.com',
    redirectUri: 'https:
    scope: 'openid email profile',
    responseType: 'code',
    authEndpoint: 'https:
};



function handleGoogleSignIn() {
    console.log('Initiating Google Sign In...');
    const authUrl = buildGoogleAuthUrl('signin');
    localStorage.setItem('googleAuthAction', 'signin');
    window.location.href = authUrl;
}



function handleGoogleSignUp() {
    console.log('Initiating Google Sign Up...');
    const authUrl = buildGoogleAuthUrl('signup');
    localStorage.setItem('googleAuthAction', 'signup');
    window.location.href = authUrl;
}



function buildGoogleAuthUrl(action) {
    const params = new URLSearchParams({
        client_id: GOOGLE_CONFIG.clientId,
        redirect_uri: GOOGLE_CONFIG.redirectUri,
        response_type: GOOGLE_CONFIG.responseType,
        scope: GOOGLE_CONFIG.scope,
        access_type: 'offline',
        prompt: action === 'signup' ? 'consent' : 'select_account',
        state: generateRandomState()
    });
    return `${GOOGLE_CONFIG.authEndpoint}?${params.toString()}`;
}



async function handleGoogleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    if (error) {
        console.error('Google OAuth error:', error);
        alert('Google authentication failed. Please try again.');
        window.location.href = '/';
        return;
    }
    if (!code) {
        console.error('No authorization code received');
        return;
    }
    const savedState = localStorage.getItem('googleAuthState');
    if (state !== savedState) {
        console.error('State mismatch - possible CSRF attack');
        alert('Authentication failed. Please try again.');
        window.location.href = '/';
        return;
    }
    try {
        const userInfo = await exchangeCodeForUserInfo(code);
        const action = localStorage.getItem('googleAuthAction') || 'signin';
        if (action === 'signup') {
            await handleGoogleSignUpComplete(userInfo);
        } else {
            await handleGoogleSignInComplete(userInfo);
        }
        localStorage.removeItem('googleAuthAction');
        localStorage.removeItem('googleAuthState');
    } catch (error) {
        console.error('Google authentication error:', error);
        alert('Authentication failed. Please try again.');
        window.location.href = '/';
    }
}



async function exchangeCodeForUserInfo(code) {
    const response = await fetch('http:
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    });
    if (!response.ok) {
        throw new Error('Failed to exchange code for user info');
    }
    const data = await response.json();
    return data.user;
}



async function handleGoogleSignInComplete(userInfo) {
    console.log('Completing Google Sign In for:', userInfo.email);
    const response = await fetch('http:
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            googleId: userInfo.sub,
            picture: userInfo.picture
        })
    });
    const data = await response.json();
    if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.role);
        showMessage('Signed in successfully with Google!', 'success');
        setTimeout(() => {
            if (data.user.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 1000);
    } else {
        throw new Error(data.error || 'Sign in failed');
    }
}



async function handleGoogleSignUpComplete(userInfo) {
    console.log('Completing Google Sign Up for:', userInfo.email);
    const response = await fetch('http:
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            googleId: userInfo.sub,
            picture: userInfo.picture
        })
    });
    const data = await response.json();
    if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('userRole', 'customer');
        showMessage('Account created successfully with Google!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        throw new Error(data.error || 'Sign up failed');
    }
}



function generateRandomState() {
    const state = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    localStorage.setItem('googleAuthState', state);
    return state;
}
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
    `;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}



document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code') && urlParams.has('state')) {
        handleGoogleCallback();
    }
});
