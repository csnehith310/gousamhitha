// UPI Payment System - Admin UPI ID Integration
class UPIPaymentSystem {
    constructor() {
        // Admin payment details
        this.adminUPI = '7893059116@paytm';
        this.merchantName = 'Gousamhitha';
        this.currency = 'INR';
        
        this.initializeSystem();
    }
    
    initializeSystem() {
        // Override existing payment functions
        this.overrideExistingPaymentFunctions();
        
        // Initialize payment buttons
        this.initializePaymentButtons();
        
        console.log('UPI Payment System initialized with admin UPI:', this.adminUPI);
    }
    
    // Calculate total amount from cart
    calculateCartTotal() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            let total = 0;
            
            if (Array.isArray(cart)) {
                cart.forEach(item => {
                    const price = parseFloat(item.price) || 0;
                    const quantity = parseInt(item.quantity) || 1;
                    total += price * quantity;
                });
            }
            
            return total;
        } catch (e) {
            console.warn('Error calculating cart total:', e.message);
            return 0;
        }
    }
    
    // Generate UPI payment link
    generateUPILink(amount, transactionNote = 'Payment') {
        const upiLink = `upi://pay?pa=${this.adminUPI}&pn=${encodeURIComponent(this.merchantName)}&am=${amount}&cu=${this.currency}&tn=${encodeURIComponent(transactionNote)}`;
        return upiLink;
    }
    
    // Process UPI payment for cart checkout
    processCartPayment() {
        const total = this.calculateCartTotal();
        
        if (total <= 0) {
            this.showMessage('Cart is empty or invalid total amount', 'error');
            return;
        }
        
        const upiLink = this.generateUPILink(total, 'Order Payment - Gousamhitha');
        this.redirectToUPI(upiLink, total, 'order');
    }
    
    // Process UPI payment for donations
    processDonationPayment(amount) {
        if (!amount || amount <= 0) {
            this.showMessage('Please enter a valid donation amount', 'error');
            return;
        }
        
        const upiLink = this.generateUPILink(amount, 'Donation - Gousamhitha Gowshala');
        this.redirectToUPI(upiLink, amount, 'donation');
    }
}
    
    // Redirect to UPI payment
    redirectToUPI(upiLink, amount, type) {
        console.log('Redirecting to UPI payment:', upiLink);
        
        // Store payment details for confirmation
        const paymentData = {
            amount: amount,
            type: type,
            timestamp: new Date().toISOString(),
            upiId: this.adminUPI
        };
        
        sessionStorage.setItem('pendingPayment', JSON.stringify(paymentData));
        
        // Show payment confirmation message
        this.showPaymentConfirmation(amount, type);
        
        // Redirect to UPI app
        try {
            window.location.href = upiLink;
        } catch (e) {
            // Fallback for browsers that don't support UPI links
            this.showManualPaymentInstructions(amount);
        }
        
        // Set up payment completion check
        this.setupPaymentCompletionCheck(amount, type);
    }
    
    // Show payment confirmation dialog
    showPaymentConfirmation(amount, type) {
        const message = `You will be redirected to your UPI app to pay ₹${amount} to ${this.merchantName}.\n\nUPI ID: ${this.adminUPI}\nAmount: ₹${amount}\n\nProceed with payment?`;
        
        if (!confirm(message)) {
            return false;
        }
        
        return true;
    }
    
    // Show manual payment instructions if UPI redirect fails
    showManualPaymentInstructions(amount) {
        const instructions = `
            <div style="padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #4a7c59; margin-bottom: 15px;">Manual Payment Instructions</h3>
                <p><strong>UPI ID:</strong> ${this.adminUPI}</p>
                <p><strong>Amount:</strong> ₹${amount}</p>
                <p><strong>Merchant Name:</strong> ${this.merchantName}</p>
                <p style="margin-top: 15px; color: #666;">
                    Please open your UPI app manually and send the payment to the above UPI ID.
                </p>
            </div>
        `;
        
        // Create modal or show in existing payment modal
        this.showMessage(instructions, 'info', true);
    }
    
    // Setup payment completion check
    setupPaymentCompletionCheck(amount, type) {
        // Check after 10 seconds if user completed payment
        setTimeout(() => {
            const confirmed = confirm(`Have you completed the payment of ₹${amount}?\n\nClick OK if payment is successful\nClick Cancel to try again`);
            
            if (confirmed) {
                this.handlePaymentSuccess(amount, type);
            } else {
                this.handlePaymentFailure();
            }
        }, 10000);
    }
    
    // Handle successful payment
    handlePaymentSuccess(amount, type) {
        const paymentData = {
            amount: amount,
            type: type,
            status: 'completed',
            paymentMethod: 'UPI',
            upiId: this.adminUPI,
            timestamp: new Date().toISOString(),
            transactionId: 'UPI_' + Date.now()
        };
        
        if (type === 'order') {
            this.processOrderCompletion(paymentData);
        } else if (type === 'donation') {
            this.processDonationCompletion(paymentData);
        }
        
        // Clear pending payment
        sessionStorage.removeItem('pendingPayment');
        
        this.showMessage('Payment successful! Thank you for your payment.', 'success');
    }
    
    // Handle payment failure
    handlePaymentFailure() {
        this.showMessage('Payment was not completed. Please try again.', 'error');
        sessionStorage.removeItem('pendingPayment');
    }
    
    // Process order completion
    processOrderCompletion(paymentData) {
        try {
            // Save order to localStorage or send to server
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            const order = {
                id: 'ORD_' + Date.now(),
                items: cart,
                payment: paymentData,
                status: 'confirmed',
                createdAt: new Date().toISOString()
            };
            
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Clear cart
            localStorage.setItem('cart', '[]');
            
            // Redirect to success page or orders page
            setTimeout(() => {
                window.location.href = 'orders.html';
            }, 2000);
            
        } catch (e) {
            console.error('Error processing order:', e);
        }
    }
    
    // Process donation completion
    processDonationCompletion(paymentData) {
        try {
            // Get donor name from session storage
            const donorName = sessionStorage.getItem('donorName') || 'Anonymous Donor';
            
            // Save donation to localStorage
            const donations = JSON.parse(localStorage.getItem('donations') || '[]');
            
            const donation = {
                id: 'DON_' + Date.now(),
                amount: paymentData.amount,
                payment: paymentData,
                name: donorName,
                date: new Date().toLocaleDateString(),
                paymentMethod: 'UPI',
                status: 'completed'
            };
            
            donations.push(donation);
            localStorage.setItem('donations', JSON.stringify(donations));
            
            // Clear donor name from session
            sessionStorage.removeItem('donorName');
            
            // Redirect to donations page
            setTimeout(() => {
                window.location.href = 'donations.html';
            }, 2000);
            
        } catch (e) {
            console.error('Error processing donation:', e);
        }
    }
    
    // Override existing payment functions
    overrideExistingPaymentFunctions() {
        // Override proceedToCheckout function
        window.proceedToCheckout = () => {
            this.processCartPayment();
        };
        
        // Override donation payment function
        window.processDonationPayment = (amount) => {
            this.processDonationPayment(amount);
        };
        
        // Override any existing UPI payment handlers
        window.handleUpiPayment = (amount, type = 'order') => {
            if (type === 'donation') {
                this.processDonationPayment(amount);
            } else {
                this.processCartPayment();
            }
        };
    }
    
    // Initialize payment buttons
    initializePaymentButtons() {
        // Find and update existing payment buttons
        document.addEventListener('DOMContentLoaded', () => {
            this.updatePaymentButtons();
        });
        
        // Also update if DOM is already loaded
        if (document.readyState !== 'loading') {
            this.updatePaymentButtons();
        }
    }
    
    // Update payment buttons to use new UPI system
    updatePaymentButtons() {
        // Update cart checkout buttons
        const checkoutButtons = document.querySelectorAll('[onclick*="proceedToCheckout"], .checkout-btn, .checkout-btn-mobile');
        checkoutButtons.forEach(button => {
            button.onclick = (e) => {
                e.preventDefault();
                this.processCartPayment();
            };
        });
        
        // Update donation buttons
        const donationButtons = document.querySelectorAll('[onclick*="Proceed to Payment"], .btn[type="submit"]');
        donationButtons.forEach(button => {
            if (button.closest('form') && button.closest('form').id === 'donation-form') {
                button.onclick = (e) => {
                    e.preventDefault();
                    const form = button.closest('form');
                    const amountInput = form.querySelector('input[name="amount"], #donation-amount');
                    const amount = parseFloat(amountInput?.value) || 0;
                    this.processDonationPayment(amount);
                };
            }
        });
    }
    
    // Show message to user
    showMessage(message, type = 'info', isHTML = false) {
        // Try to use existing toast function
        if (typeof showToast === 'function') {
            showToast(message, type);
            return;
        }
        
        // Fallback to alert for HTML content or simple messages
        if (isHTML) {
            // Create a temporary div to show HTML content
            const div = document.createElement('div');
            div.innerHTML = message;
            alert(div.textContent || div.innerText);
        } else {
            alert(message);
        }
    }
    
    // Get current cart total for display
    getCurrentTotal() {
        return this.calculateCartTotal();
    }
    
    // Validate UPI ID format
    validateUPIId(upiId) {
        const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        return upiRegex.test(upiId);
    }
    
    // Get payment status
    getPaymentStatus() {
        const pendingPayment = sessionStorage.getItem('pendingPayment');
        return pendingPayment ? JSON.parse(pendingPayment) : null;
    }
}

// Initialize UPI Payment System
window.upiPaymentSystem = new UPIPaymentSystem();

// Make functions available globally for backward compatibility
window.processUPIPayment = (amount, type = 'order') => {
    if (type === 'donation') {
        window.upiPaymentSystem.processDonationPayment(amount);
    } else {
        window.upiPaymentSystem.processCartPayment();
    }
};

console.log('UPI Payment System loaded successfully');