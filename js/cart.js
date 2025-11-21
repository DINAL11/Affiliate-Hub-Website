// ============================================
// SHOPPING CART - FindNBuy Store
// ============================================

class CartManager {
    constructor() {
        this.cart = [];
        this.cartSidebar = null;
        this.cartItemsContainer = null;
    }

    init() {
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartItemsContainer = document.getElementById('cartItems');
        
        this.loadCartFromStorage();
        this.setupEventListeners();
        this.updateCartUI();
    }

    setupEventListeners() {
        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        const cartBtnMobile = document.getElementById('cartBtnMobile');
        
        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.showCart());
        }
        if (cartBtnMobile) {
            cartBtnMobile.addEventListener('click', () => {
                this.showCart();
                uiManager.closeMobileMenu();
            });
        }

        // Close cart
        const closeCart = document.getElementById('closeCart');
        if (closeCart) {
            closeCart.addEventListener('click', () => this.hideCart());
        }

        // Close on overlay click
        const cartOverlay = this.cartSidebar.querySelector('.cart-overlay');
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => this.hideCart());
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.handleCheckout());
        }
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('findnbuy_cart');
        if (savedCart) {
            try {
                this.cart = JSON.parse(savedCart);
            } catch (error) {
                console.error('Error loading cart:', error);
                this.cart = [];
            }
        }
    }

    saveCartToStorage() {
        localStorage.setItem('findnbuy_cart', JSON.stringify(this.cart));
    }

    addToCart(product, showNotification = true) {
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCartToStorage();
        this.updateCartUI();

        if (showNotification) {
            this.showAddToCartNotification(product);
        }

        // Add animation to cart button
        this.animateCartButton();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCartToStorage();
        this.updateCartUI();
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, item.quantity + change);
            this.saveCartToStorage();
            this.updateCartUI();
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCartToStorage();
        this.updateCartUI();
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateCartUI() {
        // Update cart count badges
        const cartBadge = document.getElementById('cartBadge');
        const cartBadgeMobile = document.getElementById('cartBadgeMobile');
        const cartCount = this.getCartCount();

        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
        }
        if (cartBadgeMobile) {
            cartBadgeMobile.textContent = cartCount;
            cartBadgeMobile.style.display = cartCount > 0 ? 'flex' : 'none';
        }

        // Update cart items
        this.renderCartItems();

        // Update cart totals
        this.updateCartTotals();
    }

    renderCartItems() {
        if (!this.cartItemsContainer) return;

        if (this.cart.length === 0) {
            this.cartItemsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                </div>
            `;
            return;
        }

        this.cartItemsContainer.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, -1)">
                            <i data-lucide="minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, 1)">
                            <i data-lucide="plus"></i>
                        </button>
                        <button class="remove-btn" onclick="cartManager.removeFromCart(${item.id})">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Reinitialize icons
        lucide.createIcons();
    }

    updateCartTotals() {
        const subtotal = this.getCartTotal();
        const shipping = CONFIG.FREE_SHIPPING_THRESHOLD > 0 && subtotal < CONFIG.FREE_SHIPPING_THRESHOLD 
            ? CONFIG.SHIPPING_COST 
            : 0;
        const total = subtotal + shipping;

        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotal = document.getElementById('cartTotal');

        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    showCart() {
        this.cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideCart() {
        this.cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }

    animateCartButton() {
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
        }
    }

    showAddToCartNotification(product) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <i data-lucide="check-circle"></i>
                <span>Added to cart: ${product.name}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 5rem;
            right: 1rem;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);
        lucide.createIcons();

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    async handleCheckout() {
        // Check if user is logged in
        if (!authManager.isAuthenticated()) {
            this.hideCart();
            authManager.showAuthModal('login');
            authManager.showNotification('Please login to continue checkout', 'info');
            return;
        }

        // Check if cart is empty
        if (this.cart.length === 0) {
            authManager.showNotification('Your cart is empty', 'error');
            return;
        }

        // Show shipping address modal before proceeding to Stripe
        this.showShippingModal();
    }

    showShippingModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'shippingModal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Shipping Address</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <form id="shippingForm" class="auth-form">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" id="shippingName" required placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label>Address Line 1 *</label>
                        <input type="text" id="shippingAddress1" required placeholder="123 Main St">
                    </div>
                    <div class="form-group">
                        <label>Address Line 2</label>
                        <input type="text" id="shippingAddress2" placeholder="Apt 4B (optional)">
                    </div>
                    <div class="form-group">
                        <label>City *</label>
                        <input type="text" id="shippingCity" required placeholder="New York">
                    </div>
                    <div class="form-group">
                        <label>State / Province *</label>
                        <input type="text" id="shippingState" required placeholder="NY">
                    </div>
                    <div class="form-group">
                        <label>ZIP / Postal Code *</label>
                        <input type="text" id="shippingZip" required placeholder="10001">
                    </div>
                    <div class="form-group">
                        <label>Country *</label>
                        <input type="text" id="shippingCountry" required placeholder="United States">
                    </div>
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" id="shippingPhone" required placeholder="+1 (555) 123-4567">
                    </div>
                    <button type="submit" class="btn btn-primary btn-large btn-block">
                        <i data-lucide="credit-card"></i>
                        <span>Continue to Payment</span>
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        lucide.createIcons();

        // Handle form submission
        const shippingForm = document.getElementById('shippingForm');
        shippingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processCheckoutWithShipping();
        });

        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
    }

    async processCheckoutWithShipping() {
        // Get shipping details
        const shippingData = {
            name: document.getElementById('shippingName').value,
            address1: document.getElementById('shippingAddress1').value,
            address2: document.getElementById('shippingAddress2').value,
            city: document.getElementById('shippingCity').value,
            state: document.getElementById('shippingState').value,
            zip: document.getElementById('shippingZip').value,
            country: document.getElementById('shippingCountry').value,
            phone: document.getElementById('shippingPhone').value
        };

        // Save shipping info
        localStorage.setItem('findnbuy_shipping', JSON.stringify(shippingData));

        // Close shipping modal
        document.getElementById('shippingModal').remove();
        document.body.style.overflow = '';

        // Proceed to Stripe checkout
        await this.createStripeCheckout(shippingData);
    }

    async createStripeCheckout(shippingData) {
        try {
            // Check if Stripe is configured
            if (!CONFIG.STRIPE_PUBLIC_KEY || CONFIG.STRIPE_PUBLIC_KEY === 'YOUR_STRIPE_PUBLIC_KEY_HERE') {
                alert('⚠️ Stripe is not configured yet.\n\nIn production, this would redirect to Stripe checkout.\n\nOrder Details:\n' +
                    `Total: $${this.getCartTotal().toFixed(2)}\n` +
                    `Items: ${this.getCartCount()}\n` +
                    `Shipping to: ${shippingData.city}, ${shippingData.state}`);
                
                // Save order locally for testing
                await this.saveOrder(shippingData, 'test_payment_intent');
                return;
            }

            // Initialize Stripe
            const stripe = Stripe(CONFIG.STRIPE_PUBLIC_KEY);

            // Prepare line items for Stripe
            const lineItems = this.cart.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: [item.image]
                    },
                    unit_amount: Math.round(item.price * 100) // Stripe uses cents
                },
                quantity: item.quantity
            }));

            // Create checkout session
            // NOTE: This requires a backend endpoint to create the session
            // For now, we'll show a demo message
            alert('🎉 Stripe Integration Ready!\n\nYour order:\n' +
                this.cart.map(item => `${item.name} x${item.quantity}`).join('\n') +
                `\n\nTotal: $${this.getCartTotal().toFixed(2)}\n\n` +
                'In production, you would be redirected to Stripe checkout.');

            // In production, you would call your backend:
            /*
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lineItems,
                    shippingData,
                    userId: authManager.currentUser.id
                })
            });

            const session = await response.json();
            await stripe.redirectToCheckout({ sessionId: session.id });
            */

        } catch (error) {
            console.error('Checkout error:', error);
            authManager.showNotification('Checkout failed. Please try again.', 'error');
        }
    }

    async saveOrder(shippingData, paymentIntentId) {
        const order = {
            user_id: authManager.currentUser.id,
            items: this.cart,
            subtotal: this.getCartTotal(),
            shipping: 0,
            total: this.getCartTotal(),
            shipping_address: shippingData,
            payment_intent_id: paymentIntentId,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        // Save to database
        await supabaseClient.createOrder(order);

        // Clear cart
        this.clearCart();

        // Show success message
        authManager.showNotification('Order placed successfully!', 'success');
        
        // Close modals
        this.hideCart();
    }

    async loadUserCart() {
        // Load cart from server if user is logged in
        // This is where you'd sync cart with backend
        console.log('Loading user cart...');
    }
}

// Create global instance
const cartManager = new CartManager();