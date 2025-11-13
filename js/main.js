// ============================================
// MAIN JAVASCRIPT - FindNBuy.store
// ============================================

// Track displayed products
let displayedProducts = CONFIG.PRODUCTS_PER_PAGE;
let currentFilter = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadProducts();
    loadCategories();
    loadTestimonials();
    initializeScrollEffects();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log('FindNBuy.store loaded successfully!');
});

// ============================================
// NAVIGATION
// ============================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// PRODUCTS
// ============================================
function loadProducts(filter = 'all', count = CONFIG.PRODUCTS_PER_PAGE) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    let productsToShow = PRODUCTS;
    
    // Filter by category if needed
    if (filter !== 'all') {
        productsToShow = PRODUCTS.filter(p => p.category === filter);
    }
    
    // Limit number of products
    productsToShow = productsToShow.slice(0, count);
    
    if (productsToShow.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #9ca3af;">No products found in this category.</p>';
        return;
    }
    
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 100}ms`;
        productGrid.appendChild(productCard);
    });
    
    displayedProducts = count;
    currentFilter = filter;
    
    // Show/hide load more button
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        if (filter === 'all' && displayedProducts < PRODUCTS.length) {
            loadMoreBtn.style.display = 'block';
        } else if (filter !== 'all' && count < PRODUCTS.filter(p => p.category === filter).length) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const affiliateLink = product.affiliateLink || generateAffiliateLink(product.productId);
    const savings = Math.round((1 - product.price / product.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="product-badges">
            ${product.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
        </div>
        
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="image-overlay"></div>
        </div>
        
        <div class="product-content">
            <div class="product-category">${product.category}</div>
            
            <h3 class="product-title">${product.title}</h3>
            
            <p class="product-description">${product.description}</p>
            
            <div class="product-features">
                ${product.features.map(feature => `
                    <div class="feature-item">
                        <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-number">${product.rating}</span>
                <span class="rating-count">(${product.reviews.toLocaleString()} reviews)</span>
            </div>
            
            <div class="product-price">
                <div>
                    <span class="price-current">${CONFIG.CURRENCY_SYMBOL}${product.price}</span>
                    ${CONFIG.SHOW_ORIGINAL_PRICE ? `
                    <span class="price-original">${CONFIG.CURRENCY_SYMBOL}${product.originalPrice}</span>
                    ` : ''}
                </div>
                <div class="price-save">Save ${savings}%</div>
            </div>
            
            <button class="product-cta" onclick="handleProductClick('${affiliateLink}', '${product.title.replace(/'/g, "\\'")}')">
                <span>Get Instant Access</span>
                <i data-lucide="external-link" style="width: 18px; height: 18px;"></i>
            </button>
            
            <div class="trust-badge">
                <i data-lucide="shield" style="width: 14px; height: 14px;"></i>
                <span>30-Day Money Back Guarantee</span>
            </div>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += '<i data-lucide="star" style="width: 16px; height: 16px;"></i>';
    }
    return stars;
}

function handleProductClick(affiliateLink, productTitle) {
    // Track click for analytics
    console.log(`Product clicked: ${productTitle}`);
    console.log(`Affiliate link: ${affiliateLink}`);
    
    // Google Analytics tracking
    if (typeof gtag !== 'undefined' && CONFIG.GOOGLE_ANALYTICS_ID) {
        gtag('event', 'product_click', {
            'product_name': productTitle,
            'affiliate_link': affiliateLink
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined' && CONFIG.FACEBOOK_PIXEL_ID) {
        fbq('track', 'ViewContent', {
            content_name: productTitle
        });
    }
    
    // Open affiliate link
    window.open(affiliateLink, '_blank');
}

function loadMoreProducts() {
    const newCount = displayedProducts + CONFIG.PRODUCTS_PER_PAGE;
    loadProducts(currentFilter, newCount);
}

// ============================================
// CATEGORIES
// ============================================
function loadCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    if (!categoryGrid) return;
    
    categoryGrid.innerHTML = '';
    
    CATEGORIES.forEach((category, index) => {
        const categoryCard = createCategoryCard(category);
        categoryCard.style.animationDelay = `${index * 50}ms`;
        categoryGrid.appendChild(categoryCard);
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.onclick = () => filterByCategory(category.name);
    
    card.innerHTML = `
        <div class="category-icon">${category.icon}</div>
        <div class="category-name">${category.name}</div>
        <div class="category-count">${category.count} products</div>
    `;
    
    return card;
}

function filterByCategory(categoryName) {
    // Scroll to products
    scrollToProducts();
    
    // Load filtered products
    setTimeout(() => {
        loadProducts(categoryName);
    }, 500);
}

// ============================================
// TESTIMONIALS
// ============================================
function loadTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;
    
    testimonialsGrid.innerHTML = '';
    
    // Show first 3 testimonials
    TESTIMONIALS.slice(0, 3).forEach((testimonial, index) => {
        const testimonialCard = createTestimonialCard(testimonial);
        testimonialCard.style.animationDelay = `${index * 100}ms`;
        testimonialsGrid.appendChild(testimonialCard);
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    card.innerHTML = `
        <div class="testimonial-stars">
            ${generateStars(testimonial.rating)}
        </div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">${testimonial.name}</div>
        <div class="testimonial-role">${testimonial.role}</div>
        ${testimonial.product ? `<div class="testimonial-product">Purchased: ${testimonial.product}</div>` : ''}
    `;
    
    return card;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initializeScrollEffects() {
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
    
    // Observe elements
    setTimeout(() => {
        document.querySelectorAll('.product-card, .category-card, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }, 100);
}

// ============================================
// GLOBAL FUNCTIONS
// ============================================
window.scrollToProducts = scrollToProducts;
window.loadMoreProducts = loadMoreProducts;
window.handleProductClick = handleProductClick;
