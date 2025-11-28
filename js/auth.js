// ============================================
// AUTHENTICATION - FindNBuy Store
// ============================================

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.authModal = null;
        this.authForm = null;
        this.isLoginMode = true;
    }

    init() {
        this.authModal = document.getElementById('authModal');
        this.authForm = document.getElementById('authForm');
        
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        // Login button
        const loginBtn = document.getElementById('loginBtn');
        const loginBtnMobile = document.getElementById('loginBtnMobile');
        
        if (loginBtn) {
            // Prevent default and ensure modal is displayed even if other errors occur
            loginBtn.addEventListener('click', (e) => {
                if (e && typeof e.preventDefault === 'function') e.preventDefault();
                try { this.showAuthModal('login'); } catch (err) { console.error('Failed to open auth modal:', err); }
            });
        }
        if (loginBtnMobile) {
            loginBtnMobile.addEventListener('click', (e) => {
                if (e && typeof e.preventDefault === 'function') e.preventDefault();
                try { this.showAuthModal('login'); } catch (err) { console.error('Failed to open auth modal (mobile):', err); }
                try { uiManager.closeMobileMenu(); } catch (_ignore) { /* ignore if uiManager not ready */ }
            });
        }

        // Close modal buttons
        const closeAuthModal = document.getElementById('closeAuthModal');
        if (closeAuthModal) {
            closeAuthModal.addEventListener('click', () => this.hideAuthModal());
        }

        // Close on overlay click
        const modalOverlay = this.authModal ? this.authModal.querySelector('.modal-overlay') : null;
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.hideAuthModal());
        }

        // Toggle between login/register
        const authToggleBtn = document.getElementById('authToggleBtn');
        if (authToggleBtn) {
            authToggleBtn.addEventListener('click', () => this.toggleAuthMode());
        }

        // Form submission
        if (this.authForm) {
            this.authForm.addEventListener('submit', (e) => this.handleAuthSubmit(e));
        }

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
    }

    async checkExistingSession() {
        // Check localStorage for existing user
        const savedUser = localStorage.getItem('findnbuy_user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.updateUIForLoggedInUser();
                
                // Also check Supabase if initialized
                if (supabaseClient.initialized) {
                    const user = await supabaseClient.getCurrentUser();
                    if (user) {
                        this.currentUser = user;
                        this.updateUIForLoggedInUser();
                    }
                }
            } catch (error) {
                console.error('Error checking session:', error);
                localStorage.removeItem('findnbuy_user');
            }
        }
    }

    showAuthModal(mode = 'login') {
        this.isLoginMode = mode === 'login';
        this.updateAuthModalUI();
        if (!this.authModal) {
            console.warn('Auth modal element not found in DOM');
            return;
        }
        this.authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideAuthModal() {
        if (this.authModal) this.authModal.classList.remove('active');
        document.body.style.overflow = '';
        if (this.authForm && typeof this.authForm.reset === 'function') this.authForm.reset();
    }

    toggleAuthMode() {
        this.isLoginMode = !this.isLoginMode;
        this.updateAuthModalUI();
    }

    updateAuthModalUI() {
        const authTitle = document.getElementById('authTitle');
        const authSubmitText = document.getElementById('authSubmitText');
        const authToggleText = document.getElementById('authToggleText');
        const authToggleBtn = document.getElementById('authToggleBtn');
        const nameField = document.getElementById('nameField');

        if (this.isLoginMode) {
            authTitle.textContent = 'Welcome Back';
            authSubmitText.textContent = 'Login';
            authToggleText.textContent = "Don't have an account?";
            authToggleBtn.textContent = 'Register';
            nameField.style.display = 'none';
        } else {
            authTitle.textContent = 'Create Account';
            authSubmitText.textContent = 'Register';
            authToggleText.textContent = 'Already have an account?';
            authToggleBtn.textContent = 'Login';
            nameField.style.display = 'block';
        }
    }

    async handleAuthSubmit(e) {
        e.preventDefault();

        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        const name = document.getElementById('authName').value;

        // Show loading state
        const submitBtn = this.authForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="spinner"></div>';
        submitBtn.disabled = true;

        try {
            let result;

            if (this.isLoginMode) {
                // Login
                result = await supabaseClient.signIn(email, password);
            } else {
                // Register
                if (!name) {
                    throw new Error('Please enter your full name');
                }
                result = await supabaseClient.signUp(email, password, name);
            }

            if (result.success) {
                this.currentUser = result.user;
                localStorage.setItem('findnbuy_user', JSON.stringify(result.user));
                
                this.updateUIForLoggedInUser();
                this.hideAuthModal();
                
                // Show success message
                this.showNotification(
                    this.isLoginMode ? 'Welcome back!' : 'Account created successfully!',
                    'success'
                );

                // Reload cart from server if logged in
                if (this.isLoginMode) {
                    cartManager.loadUserCart();
                }
            } else {
                throw new Error(result.error || 'Authentication failed');
            }
        } catch (error) {
            console.error('Auth error:', error);
            this.showNotification(error.message || 'Authentication failed. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleLogout() {
        try {
            await supabaseClient.signOut();
            localStorage.removeItem('findnbuy_user');
            this.currentUser = null;
            
            // Clear cart
            cartManager.clearCart();
            
            this.updateUIForLoggedOutUser();
            this.showNotification('Logged out successfully', 'success');
        } catch (error) {
            console.error('Logout error:', error);
            this.showNotification('Logout failed. Please try again.', 'error');
        }
    }

    updateUIForLoggedInUser() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            if (userName && this.currentUser) {
                userName.textContent = this.currentUser.full_name || 
                                      this.currentUser.email?.split('@')[0] || 
                                      'User';
            }
        }

        // Update mobile menu
        const loginBtnMobile = document.getElementById('loginBtnMobile');
        if (loginBtnMobile && this.currentUser) {
            loginBtnMobile.innerHTML = `
                <i data-lucide="user"></i>
                <span>${this.currentUser.full_name || 'My Account'}</span>
            `;
            lucide.createIcons();
        }
    }

    updateUIForLoggedOutUser() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');

        if (loginBtn) loginBtn.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';

        // Update mobile menu
        const loginBtnMobile = document.getElementById('loginBtnMobile');
        if (loginBtnMobile) {
            loginBtnMobile.innerHTML = `
                <i data-lucide="log-in"></i>
                <span>Login</span>
            `;
            lucide.createIcons();
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles if not already in CSS
        notification.style.cssText = `
            position: fixed;
            top: 5rem;
            right: 1rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);
        lucide.createIcons();

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Create global instance
const authManager = new AuthManager();