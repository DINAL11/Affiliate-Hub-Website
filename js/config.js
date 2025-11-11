// ============================================
// CONFIGURATION FILE
// ============================================

const CONFIG = {
    // Your Digistore24 Affiliate ID
    AFFILIATE_ID: 'YOURAFFILIATEID',
    
    // Site Information
    SITE_NAME: 'EliteHub',
    SITE_DESCRIPTION: 'Premium Products & Exclusive Deals',
    
    // Social Proof Numbers
    TOTAL_CUSTOMERS: '50,000+',
    TOTAL_PRODUCTS: '2000+',
    AVERAGE_RATING: '4.9',
    TOTAL_REVIEWS: '15,234',
    
    // Display Settings
    PRODUCTS_PER_PAGE: 6,
    SHOW_COMMISSION: true, // Show commission badges
    SHOW_ORIGINAL_PRICE: true, // Show strikethrough price
    
    // Analytics (Add your tracking IDs)
    GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX',
    FACEBOOK_PIXEL_ID: '',
    
    // Currency
    CURRENCY_SYMBOL: ',
    
    // Contact Info
    CONTACT_EMAIL: 'support@elitehub.com',
    
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
