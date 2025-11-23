// ============================================
// UI INTERACTIONS - FindNBuy Store
// ============================================

class UIManager {
    constructor() {
        this.currentCategory = 'all';
        this.currentSort = 'discount';
        this.searchQuery = '';
        this.displayedProducts = CONFIG.PRODUCTS_PER_PAGE;
        this.wishlist = [];
    }

    init() {
        this.loadWishlist();
        this.setupEventListeners();
        this.setupScrollEffects();
        this.renderCategories();
        this.renderProducts();
    }

    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('searchInput');
        const searchInputMobile = document.getElementById('searchInputMobile');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.renderProducts();
            });
        }

        if (searchInputMobile) {
            searchInputMobile.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.renderProducts();
            });
        }

        // Sort filter
        const sortFilter = document.getElementById('sortFilter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.renderProducts();
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        }

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.openMobileMenu());
        }

        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', () => this.closeMobileMenu());
        }

        // Scroll header effect
        this.setupHeaderScroll();

        // Wishlist button
        const wishlistBtn = document.getElementById('wishlistBtn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => this.showWishlist());
        }
    }

    setupHeaderScroll() {
        let lastScroll = 0;
        const header = document.getElementById('mainHeader');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }

            lastScroll = currentScroll;
        });
    }

    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe product cards as they're created
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                observer.observe(card);
            });
        }, 100);
    }

    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;

        container.innerHTML = CATEGORIES.map(cat => `
            <button 
                class="category-pill ${cat.id === this.currentCategory ? 'active' : ''}"
                onclick="uiManager.filterByCategory('${cat.id}')"
            >
                ${cat.name} (${cat.count})
            </button>
        `).join('');
    }

    filterByCategory(categoryId) {
        this.currentCategory = categoryId;
        this.displayedProducts = CONFIG.PRODUCTS_PER_PAGE;
        this.renderCategories();
        this.renderProducts();

        // Scroll to products
        document.getElementById('productsGrid').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    getFilteredProducts() {
        let products = [...PRODUCTS_DATA];

        // Filter by category
        if (this.currentCategory !== 'all') {
            products = products.filter(p => p.category === this.currentCategory);
        }

        // Filter by search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            products = products.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Sort products
        switch (this.currentSort) {
            case 'discount':
                products.sort((a, b) => b.discount - a.discount);
                break;
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
        }

        return products;
    }

    renderProducts() {
        const container = document.getElementById('productsGrid');
        if (!container) return;

        const products = this.getFilteredProducts();
        const productsToShow = products.slice(0, this.displayedProducts);

        if (productsToShow.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            this.hideLoadMore();
            return;
        }

        container.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');

        // Show/hide load more button
        if (products.length > this.displayedProducts) {
            this.showLoadMore();
        } else {
            this.hideLoadMore();
        }

        // Reinitialize icons
        lucide.createIcons();

        // Setup scroll effects
        this.setupScrollEffects();
    }

    createProductCard(product) {
        const isInWishlist = this.wishlist.includes(product.id);
        const savings = product.originalPrice - product.price;

        return `
            <div class="product-card">
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    
                    <div class="product-badges">
                        <span class="badge badge-discount">-${product.discount}%</span>
                        ${product.isNew ? '<span class="badge badge-new">NEW</span>' : ''}
                    </div>

                    <button 
                        class="wishlist-btn ${isInWishlist ? 'active' : ''}"
                        onclick="uiManager.toggleWishlist(${product.id})"
                    >
                        <i data-lucide="heart" ${isInWishlist ? 'fill="currentColor"' : ''}></i>
                    </button>

                    <div class="cheapest-badge">
                        <i data-lucide="target"></i>
                        <span>Cheapest Price Found!</span>
                    </div>
                </div>

                <div class="product-content">
                    <div class="product-category">${product.category}</div>
                    
                    <h3 class="product-title">${product.name}</h3>
                    
                    <p class="product-description">${product.description}</p>

                    <div class="product-rating">
                        <div class="stars">
                            ${this.generateStars(product.rating)}
                        </div>
                        <span class="rating-text">${product.rating} (${product.reviews.toLocaleString()})</span>
                    </div>

                    <div class="product-pricing">
                        <div class="price-group">
                            <span class="price-current">$${product.price.toFixed(2)}</span>
                            <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
                        </div>
                        <div class="price-save">Save $${savings.toFixed(2)}</div>
                    </div>

                    <button 
                        class="btn btn-primary btn-block"
                        onclick="cartManager.addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                    >
                        <i data-lucide="shopping-cart"></i>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i data-lucide="star" class="star" fill="currentColor"></i>';
        }

        if (hasHalfStar) {
            stars += '<i data-lucide="star" class="star" style="opacity: 0.5" fill="currentColor"></i>';
        }

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i data-lucide="star" class="star"></i>';
        }

        return stars;
    }

    loadMoreProducts() {
        this.displayedProducts += CONFIG.PRODUCTS_PER_PAGE;
        this.renderProducts();
    }

    showLoadMore() {
        const section = document.getElementById('loadMoreSection');
        if (section) section.style.display = 'block';
    }

    hideLoadMore() {
        const section = document.getElementById('loadMoreSection');
        if (section) section.style.display = 'none';
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Wishlist functions
    loadWishlist() {
        const saved = localStorage.getItem('findnbuy_wishlist');
        if (saved) {
            try {
                this.wishlist = JSON.parse(saved);
                this.updateWishlistBadge();
            } catch (error) {
                console.error('Error loading wishlist:', error);
                this.wishlist = [];
            }
        }
    }

    toggleWishlist(productId) {
        if (this.wishlist.includes(productId)) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
            authManager.showNotification('Removed from wishlist', 'info');
        } else {
            this.wishlist.push(productId);
            authManager.showNotification('Added to wishlist', 'success');
        }

        localStorage.setItem('findnbuy_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistBadge();
        this.renderProducts();
    }

    updateWishlistBadge() {
        const badge = document.getElementById('wishlistBadge');
        const badgeMobile = document.getElementById('wishlistBadgeMobile');
        
        if (badge) {
            badge.textContent = this.wishlist.length;
            badge.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
        if (badgeMobile) {
            badgeMobile.textContent = this.wishlist.length;
            badgeMobile.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
        }
    }

    showWishlist() {
        if (this.wishlist.length === 0) {
            authManager.showNotification('Your wishlist is empty', 'info');
            return;
        }

        const wishlistProducts = PRODUCTS_DATA.filter(p => this.wishlist.includes(p.id));
        
        // Create modal to show wishlist
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content" style="max-width: 60rem;">
                <div class="modal-header">
                    <h2>My Wishlist (${this.wishlist.length})</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove(); document.body.style.overflow=''">
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div style="padding: 1.5rem; max-height: 70vh; overflow-y: auto;">
                    <div class="products-grid">
                        ${wishlistProducts.map(p => this.createProductCard(p)).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        lucide.createIcons();

        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
    }
}

// Create global instance
const uiManager = new UIManager();
