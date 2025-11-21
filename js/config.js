// ============================================
// CONFIGURATION - FindNBuy Store
// ============================================

const CONFIG = {
    // Supabase Configuration
    SUPABASE_URL: 'https://iphxmjjcnomjqzhhmcqi.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwaHhtampjbm9tanF6aGhtY3FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MjcwMjAsImV4cCI6MjA3OTMwMzAyMH0.SHEfqTVR8Zsuj48r-FHgm1qG2Zyn6f8JozRpH3hIhQo',
    
    // Stripe Configuration
    STRIPE_PUBLIC_KEY: 'pk_test_51SD5aG3EYHc3U9Etyi3F67dRw22iyWis6w2zZM6gs6RptB3NV37mKK2003HiCiKwo7FR0bn15yYrMRpPJ3zJAkuf00XxhcxdpB',
    
    // App Settings
    CURRENCY_SYMBOL: '$',
    PRODUCTS_PER_PAGE: 9,
    ENABLE_WISHLIST: true,
    ENABLE_REVIEWS: true,
    
    // Shipping
    FREE_SHIPPING_THRESHOLD: 0, // Free shipping on all orders
    SHIPPING_COST: 0,
    
    // Tax
    TAX_RATE: 0, // 0% tax for now
    
    // API Endpoints (if using custom backend)
    API_BASE_URL: 'https://your-api.com/api',
    
    // Analytics
    GOOGLE_ANALYTICS_ID: '', // Optional
    FACEBOOK_PIXEL_ID: '', // Optional
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}