





const SUPABASE_URL = SUPABASE_CONFIG.url;
const SUPABASE_ANON_KEY = SUPABASE_CONFIG.anonKey;

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabase = supabaseClient;



async function handleSignUp(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const mobile = document.getElementById('signup-mobile').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const messageEl = document.getElementById('signup-message');
    
    if (password !== confirmPassword) {
        messageEl.textContent = 'Passwords do not match!';
        messageEl.className = 'auth-message error';
        return;
    }
    if (password.length < 6) {
        messageEl.textContent = 'Password must be at least 6 characters!';
        messageEl.className = 'auth-message error';
        return;
    }
    try {
        messageEl.textContent = 'Creating account...';
        messageEl.className = 'auth-message info';
        
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name,
                    mobile: mobile
                },
                emailRedirectTo: window.location.origin
            }
        });
        
        if (error) throw error;
        
        if (data.user) {
            if (!data.session) {
                messageEl.textContent = 'Account created! You can now sign in.';
                messageEl.className = 'auth-message success';
                setTimeout(() => {
                    switchTab('signin');
                }, 2000);
                return;
            }
            
            const role = email === APP_CONFIG.adminEmail ? 'admin' : 'customer';
            
            await supabaseClient
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email: email,
                    role: role
                });
            
            messageEl.textContent = 'Account created successfully! Redirecting...';
            messageEl.className = 'auth-message success';
            
            setTimeout(() => {
                if (role === 'admin') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1500);
        }
    } catch (error) {
        messageEl.textContent = error.message || 'Failed to create account';
        messageEl.className = 'auth-message error';
    }
}



async function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    const messageEl = document.getElementById('signin-message');
    
    try {
        messageEl.textContent = 'Signing in...';
        messageEl.className = 'auth-message info';
        
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            if (error.message.includes('Email not confirmed')) {
                messageEl.textContent = 'Please check your email and confirm your account before signing in.';
                messageEl.className = 'auth-message error';
                return;
            }
            throw error;
        }
        
        if (data.user && data.session) {
            if (email === 'gowsamhitha123@gmail.com') {
                messageEl.textContent = 'Admin login successful! Redirecting...';
                messageEl.className = 'auth-message success';
                
                await supabaseClient
                    .from('profiles')
                    .upsert({
                        id: data.user.id,
                        email: email,
                        role: 'admin'
                    });
                
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1000);
                return;
            }
            
            let { data: profile } = await supabaseClient
                .from('profiles')
                .select('role')
                .eq('id', data.user.id)
                .single();
            
            if (!profile) {
                await supabaseClient
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        email: email,
                        role: 'customer'
                    });
            }
            
            messageEl.textContent = 'Sign in successful!';
            messageEl.className = 'auth-message success';
            updateAuthUI(data.user, profile || { role: 'customer' });
            
            setTimeout(() => {
                closeAuthModal();
                window.location.href = 'index.html';
            }, 1000);
        }
    } catch (error) {
        messageEl.textContent = error.message || 'Invalid email or password';
        messageEl.className = 'auth-message error';
    }
}



async function handleSignOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('Supabase sign out error:', error);
            throw error;
        }
        
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        
        window.location.replace('./index.html');
    } catch (error) {
        console.error('Sign out error:', error);
        showToast('Failed to sign out: ' + error.message, 'error');
    }
}



async function checkAuthState() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (session && session.user) {
            const { data: profile } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            
            const currentPage = window.location.pathname;
            const isAdminPage = currentPage.includes('admin-');
            const isAdminUser = session.user.email === 'ruthvik@blockfortrust.com' || (profile && profile.role === 'admin');
            
            if (isAdminUser && !isAdminPage) {
                window.location.href = 'admin-dashboard.html';
                return;
            }
            
            updateAuthUI(session.user, profile);
            return { user: session.user, profile: profile };
        } else {
            updateAuthUI(null, null);
            return null;
        }
    } catch (error) {
        console.error('Check auth state error:', error);
        return null;
    }
}



function updateAuthUI(user, profile) {
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    const adminEnterBtn = document.getElementById('admin-enter-btn');
    const roleButtons = document.getElementById('role-buttons');
    if (user && profile) {
        if (profileBtn) {
            profileBtn.classList.add('logged-in');
            profileBtn.onclick = (e) => {
                e.preventDefault();
                window.location.href = 'profile.html';
            };
        }
        if (profileDropdown) {
            profileDropdown.style.display = 'none';
        }
        if (adminEnterBtn && roleButtons) {
            if (profile.role === 'admin') {
                roleButtons.style.display = 'block';
                adminEnterBtn.style.display = 'block';
            } else {
                roleButtons.style.display = 'none';
                adminEnterBtn.style.display = 'none';
            }
        }
    } else {
        if (profileBtn) {
            profileBtn.classList.remove('logged-in');
            profileBtn.onclick = (e) => {
                e.preventDefault();
                openAuthModal();
            };
        }
        if (profileDropdown) {
            profileDropdown.innerHTML = '';
            profileDropdown.classList.remove('active');
            profileDropdown.style.display = 'none';
        }
        if (adminEnterBtn && roleButtons) {
            roleButtons.style.display = 'none';
            adminEnterBtn.style.display = 'none';
        }
    }
}

document.addEventListener('click', function(event) {
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');
    if (profileDropdown && profileBtn && !profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
        profileDropdown.classList.remove('active');
    }
});



async function checkAdminAuth() {
    try {
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        
        if (sessionError) {
            showToast('Session error. Please login again.', 'error');
            window.location.href = 'index.html';
            return false;
        }
        
        if (!session) {
            window.location.href = 'index.html';
            return false;
        }
        
        if (session.user.email === 'gowsamhitha123@gmail.com') {
            return true;
        }
        
        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
        
        if (profileError) {
            if (profileError.code === 'PGRST116') {
                if (session.user.email === 'gowsamhitha123@gmail.com') {
                    return true;
                }
                showToast('Profile not found. Please contact support.', 'error');
                window.location.href = 'index.html';
                return false;
            }
            showToast('Authentication error. Please try logging in again.', 'error');
            window.location.href = 'index.html';
            return false;
        }
        
        if (!profile || profile.role !== 'admin') {
            showToast('Access denied. Admin privileges required.', 'error');
            window.location.href = 'index.html';
            return false;
        }
        
        return true;
    } catch (error) {
        showToast('Authentication error. Please try logging in again.', 'error');
        window.location.href = 'index.html';
        return false;
    }
}



async function handleAdminLogin(event) {
    event.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const messageEl = document.getElementById('login-message');
    try {
        messageEl.textContent = 'Signing in...';
        messageEl.className = 'login-message info';
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) throw error;
        if (data.user) {
            const { data: profile } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();
            if (!profile || profile.role !== 'admin') {
                await supabaseClient.auth.signOut();
                throw new Error('Access denied. Admin privileges required.');
            }
            messageEl.textContent = 'Login successful! Redirecting...';
            messageEl.className = 'login-message success';
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        }
    } catch (error) {
        console.error('Admin login error:', error);
        messageEl.textContent = error.message || 'Invalid credentials';
        messageEl.className = 'login-message error';
    }
}



async function adminLogout() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
            
            localStorage.clear();
            
            window.location.replace('./index.html');
        } catch (error) {
            console.error('Logout error:', error);
            showToast('Failed to logout. Please try again.', 'error');
        }
    }
}



supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        updateAuthUI(null, null);
    }
});



document.addEventListener('DOMContentLoaded', async function() {
    await checkAuthState();
    const currentPage = window.location.pathname;
    if (currentPage.includes('admin-dashboard.html') || 
        currentPage.includes('admin-products.html') || 
        currentPage.includes('admin-orders.html') ||
        currentPage.includes('admin-add-product.html') ||
        currentPage.includes('admin-vendors.html')) {
        try {
            await checkAdminAuth();
        } catch (error) {
            console.error('Admin auth check failed, but allowing page to load:', error);
        }
    }
});



function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'block';
    } else {

        window.location.href = 'index.html';
    }
}
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
function switchTab(tab) {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const tabs = document.querySelectorAll('.auth-tab');
    tabs.forEach(t => t.classList.remove('active'));
    if (tab === 'signin') {
        signinForm.classList.add('active');
        signupForm.classList.remove('active');
        tabs[0].classList.add('active');
    } else {
        signupForm.classList.add('active');
        signinForm.classList.remove('active');
        tabs[1].classList.add('active');
    }
}
async function enterAsAdmin() {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        if (!session) {
            showToast('Session expired. Please login again.', 'error');
            return;
        }
        
        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
        
        if (profileError) {
            if (session.user.email === 'ruthvik@blockfortrust.com') {
                closeAuthModal();
                window.location.href = 'admin-dashboard.html';
                return;
            }
            showToast('Failed to verify admin access. Please contact support.', 'error');
            return;
        }
        
        if (profile && profile.role === 'admin') {
            closeAuthModal();
            window.location.href = 'admin-dashboard.html';
        } else {
            showToast('Access denied. Admin privileges required.', 'error');
        }
    } catch (error) {
        console.error('Enter as admin error:', error);
        showToast('Failed to verify admin access: ' + error.message, 'error');
    }
}



window.handleSignUp = handleSignUp;
window.handleSignIn = handleSignIn;
window.handleSignOut = handleSignOut;
window.handleAdminLogin = handleAdminLogin;
window.adminLogout = adminLogout;
window.checkAuthState = checkAuthState;
window.checkAdminAuth = checkAdminAuth;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchTab = switchTab;
window.enterAsAdmin = enterAsAdmin;
