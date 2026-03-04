// Nhost Authentication Handler
// Handles signup, signin, profile, and logout using Nhost

import { nhost, auth, isLoggedIn, getCurrentUser, getAccessToken } from './nhost-client.js';

// ============================================
// SIGN UP
// ============================================
async function handleSignUp(event) {
    event.preventDefault();
    
    const messageEl = document.getElementById('signup-message');
    
    // Get form values
    const fullName = document.getElementById('signup-name')?.value.trim() || '';
    const email = document.getElementById('signup-email')?.value.trim() || '';
    const mobile = document.getElementById('signup-mobile')?.value.trim() || '';
    const password = document.getElementById('signup-password')?.value || '';
    const confirmPassword = document.getElementById('signup-confirm')?.value || '';
    
    // Validate
    if (!fullName || !email || !password) {
        showAuthMessage(messageEl, 'Please fill all required fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showAuthMessage(messageEl, 'Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage(messageEl, 'Password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        showAuthMessage(messageEl, 'Creating account...', 'success');
        
        // Sign up with Nhost
        const { session, error } = await auth.signUp({
            email: email,
            password: password,
            options: {
                displayName: fullName,
                metadata: {
                    phone: mobile,
                    firstName: fullName.split(' ')[0],
                    lastName: fullName.split(' ').slice(1).join(' ')
                }
            }
        });
        
        if (error) {
            throw new Error(error.message || 'Signup failed');
        }
        
        showAuthMessage(messageEl, 'Account created! Logging you in...', 'success');
        
        // Auto-login after signup
        setTimeout(() => {
            // Update profile UI
            updateProfileUI();
            
            // Close auth modal and show profile modal
            closeAuthModal();
            showProfileModal();
        }, 1000);
        
    } catch (error) {
        console.error('Signup error:', error);
        showAuthMessage(messageEl, error.message || 'Signup failed', 'error');
    }
}

// ============================================
// SIGN IN
// ============================================
async function handleSignIn(event) {
    event.preventDefault();
    
    const messageEl = document.getElementById('signin-message');
    
    // Get form values
    const email = document.getElementById('signin-email')?.value.trim() || '';
    const password = document.getElementById('signin-password')?.value || '';
    
    // Validate
    if (!email || !password) {
        showAuthMessage(messageEl, 'Please enter email and password', 'error');
        return;
    }
    
    try {
        showAuthMessage(messageEl, 'Signing in...', 'success');
        
        // Sign in with Nhost
        const { session, error } = await auth.signIn({
            email: email,
            password: password
        });
        
        if (error) {
            throw new Error(error.message || 'Login failed');
        }
        
        showAuthMessage(messageEl, 'Login successful!', 'success');
        
        // Close modal and show profile
        setTimeout(() => {
            // Update profile UI
            updateProfileUI();
            
            // Close auth modal and show profile modal
            closeAuthModal();
            showProfileModal();
        }, 500);
        
    } catch (error) {
        console.error('Login error:', error);
        showAuthMessage(messageEl, error.message || 'Login failed', 'error');
    }
}

// ============================================
// SHOW AUTH MESSAGE
// ============================================
function showAuthMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `auth-message ${type}`;
    element.style.display = 'block';
}

// ============================================
// SWITCH BETWEEN FORMS
// ============================================
function showSignIn() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('signin-form').style.display = 'block';
}

function showSignUp() {
    document.getElementById('signin-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

// ============================================
// UPDATE PROFILE UI
// ============================================
function updateProfileUI() {
    const profileBtn = document.getElementById('profile-btn');
    const profileUserName = document.getElementById('profile-user-name');
    const profileUserEmail = document.getElementById('profile-user-email');
    
    if (!profileBtn) return;
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        
        // Update dropdown with user info
        if (profileUserName && user) {
            profileUserName.textContent = user.displayName || user.email;
        }
        if (profileUserEmail && user) {
            profileUserEmail.textContent = user.email;
        }
        
        // Change profile button to show user initial
        if (user) {
            const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U';
            profileBtn.innerHTML = `
                <div class="profile-icon-logged-in" style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #4a7c59;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 16px;
                    cursor: pointer;
                ">
                    ${initial}
                </div>
            `;
        }
    } else {
        // Not logged in - show default icon
        profileBtn.innerHTML = `
            <div class="profile-icon-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                    <path d="M6.5 18.5C7.5 16.5 9.5 15 12 15C14.5 15 16.5 16.5 17.5 18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        `;
    }
    
    // Reattach click handler
    attachProfileClickHandler();
}

// ============================================
// ATTACH PROFILE BUTTON CLICK HANDLER
// ============================================
function attachProfileClickHandler() {
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if user is logged in
            if (isLoggedIn()) {
                // Show profile modal
                showProfileModal();
            } else {
                // Show login modal
                openAuthModal(e);
            }
        };
    }
}

// ============================================
// OPEN AUTH MODAL
// ============================================
function openAuthModal(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// ============================================
// CLOSE AUTH MODAL
// ============================================
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================
// PROFILE MODAL
// ============================================
async function showProfileModal() {
    const modal = document.getElementById('profile-modal');
    const content = document.getElementById('profile-content');
    const loading = document.getElementById('profile-loading');
    
    modal.style.display = 'flex';
    content.style.display = 'none';
    loading.style.display = 'block';
    
    try {
        console.log('Fetching profile...');
        
        const user = getCurrentUser();
        
        if (!user) {
            throw new Error('User not found');
        }
        
        // Fill in profile data
        document.getElementById('modal-name').textContent = user.displayName || user.email;
        document.getElementById('modal-email').textContent = user.email;
        document.getElementById('modal-phone').textContent = user.metadata?.phone || '-';
        document.getElementById('modal-address').textContent = user.metadata?.address || '-';
        
        loading.style.display = 'none';
        content.style.display = 'block';
        
    } catch (error) {
        console.error('Error loading profile:', error);
        loading.innerHTML = '<p style="color: red;">Failed to load profile: ' + error.message + '</p>';
    }
}

function closeProfileModal() {
    document.getElementById('profile-modal').style.display = 'none';
}

function editProfile() {
    alert('Edit profile feature coming soon!');
}

// ============================================
// LOGOUT
// ============================================
async function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        try {
            await auth.signOut();
            closeProfileModal();
            updateProfileUI();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Logout error:', error);
            window.location.href = 'index.html';
        }
    }
}

// ============================================
// TOGGLE PROFILE DROPDOWN
// ============================================
function toggleProfileDropdown(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const dropdown = document.getElementById('profile-dropdown');
    if (!dropdown) return;
    
    // Toggle display
    if (dropdown.style.display === 'none' || !dropdown.style.display) {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profile-dropdown');
    const profileBtn = document.getElementById('profile-btn');
    
    if (dropdown && profileBtn) {
        if (!dropdown.contains(event.target) && !profileBtn.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    }
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', async function() {
    // Update profile UI if user is logged in
    updateProfileUI();
    
    console.log('✅ Nhost auth handler initialized');
});

console.log('✅ Nhost auth handler loaded');
