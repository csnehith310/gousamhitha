// Authentication Manager - Uses HTTP-only cookies (set by backend)
// User data fetched from API (not stored locally)

class AuthManager {
    constructor() {
        this.user = null;
        this.API_URL = 'http://localhost:5000/api';
        
        console.log('Auth Manager initialized. Using HTTP-only cookies for authentication.');
    }

    // Signup
    async signup(email, password, firstName, lastName, phone) {
        try {
            const response = await fetch(`${this.API_URL}/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    phone
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            return data;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    // Login
    async login(email, password) {
        try {
            const response = await fetch(`${this.API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store user data in memory (token is in HTTP-only cookie)
            this.user = data.user;
            
            console.log('Login successful. Token stored in HTTP-only cookie.');

            // Check if admin and redirect
            if (data.user.role === 'admin') {
                window.location.href = '/admin-dashboard.html';
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Get current user
    async getCurrentUser() {
        try {
            const response = await fetch(`${this.API_URL}/auth/me`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch user');
            }

            this.user = data.user;
            return data.user;
        } catch (error) {
            console.error('Get current user error:', error);
            throw error;
        }
    }

    // Logout
    async logout() {
        try {
            await fetch(`${this.API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        
        this.user = null;
        window.location.href = '/index.html';
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.user !== null;
    }

    // Check if user is admin
    isAdmin() {
        return this.user && this.user.role === 'admin';
    }

    // Make authenticated API call
    async authenticatedFetch(url, options = {}) {
        const response = await fetch(url, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        // If unauthorized, clear user and redirect to login
        if (response.status === 401) {
            this.user = null;
            throw new Error('Session expired. Please login again.');
        }

        return response;
    }
}

// Create global instance
window.authManager = new AuthManager();

console.log('✅ Auth Manager initialized (HTTP-only cookies for authentication)');
