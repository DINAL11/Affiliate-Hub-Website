// ============================================
// CONFIGURATION FILE - FindNBuy.store
// ============================================

const CONFIG = {
    // Your Digistore24 Affiliate ID
    AFFILIATE_ID: 'EdwineLase',
    
    // Site Information
    SITE_NAME: 'FindNBuy.store',
    SITE_TAGLINE: 'Find & Buy Life-Changing Products',
    SITE_DESCRIPTION: 'Discover premium products that transform lives',
    DOMAIN: 'findnbuy.store',
    
    // Social Proof Numbers
    TOTAL_CUSTOMERS: '50,000+',
    TOTAL_PRODUCTS: '100+',
    AVERAGE_RATING: '4.9',
    TOTAL_REVIEWS: '18,567',
    WEEKLY_PURCHASES: '3,421',
    
    // Display Settings
    PRODUCTS_PER_PAGE: 6,
    SHOW_COMMISSION: true,
    SHOW_ORIGINAL_PRICE: true,
    
    // Analytics (Add your tracking IDs)
    GOOGLE_ANALYTICS_ID: '',
    FACEBOOK_PIXEL_ID: '',
    
    // Currency
    CURRENCY_SYMBOL: '$',
    
    // Contact Info
    CONTACT_EMAIL: 'support@findnbuy.store',
    
    // Digistore24 Base URL
    DIGISTORE_BASE_URL: 'https://www.digistore24.com/redir/'
};

// Helper function to generate affiliate link
function generateAffiliateLink(productId) {
    return `${CONFIG.DIGISTORE_BASE_URL}${productId}/${CONFIG.AFFILIATE_ID}`;
}

// Export config
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
