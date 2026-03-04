// Nhost Client Configuration
// Replace with your Nhost credentials from dashboard

import { NhostClient } from "@nhost/nhost-js";

// Initialize Nhost client
// Get these values from your Nhost dashboard
export const nhost = new NhostClient({
    subdomain: "YOUR_NHOST_SUBDOMAIN",  // Replace with your Nhost subdomain
    region: "YOUR_NHOST_REGION"         // Replace with your Nhost region (e.g., "us-east-1")
});

// Export auth methods for convenience
export const auth = nhost.auth;

// Helper function to check if user is logged in
export function isLoggedIn() {
    return nhost.auth.isAuthenticated();
}

// Helper function to get current user
export function getCurrentUser() {
    return nhost.auth.getUser();
}

// Helper function to get session
export function getSession() {
    return nhost.auth.getSession();
}

console.log('✅ Nhost client initialized');
