// ============================================
// PRODUCTS DATABASE - FindNBuy.store
// ============================================

const PRODUCTS = [
    {
        id: 1,
        title: "The Billionaire Brain Wave",
        category: "Personal Development",
        price: 39,
        originalPrice: 197,
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=600&fit=crop",
        rating: 4.9,
        reviews: 8734,
        affiliateLink: "https://www.digistore24.com/redir/524279/EdwineLase/",
        badges: ["🔥 Best Seller", "80% OFF"],
        features: ["7-Minute Daily Audio", "Instant Digital Access", "30-Day Guarantee"],
        description: "Scientifically proven brain wave technology that attracts wealth and abundance into your life in just 7 minutes a day",
        type: "digital",
        featured: true
    },
    {
        id: 2,
        title: "KeySlim Drops - Revolutionary Weight Loss",
        category: "Health & Fitness",
        price: 198.21,
        originalPrice: 397,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        rating: 4.8,
        reviews: 12456,
        affiliateLink: "https://getkeyslimdrops.cc/vsl1/#aff=EdwineLase",
        badges: ["🔥 New Launch", "Fast Results"],
        features: ["Drip & Drop Formula", "Natural Ingredients", "Proven Results"],
        description: "One-of-a-kind weight loss drops with revolutionary formula. See dramatic results in weeks with our unique drip & drop method",
        type: "physical",
        featured: true
    },
    {
        id: 3,
        title: "Advanced Amino Formula - Build Muscle Fast",
        category: "Health & Fitness",
        price: 112.60,
        originalPrice: 249,
        image: "https://images.unsplash.com/photo-1526401363794-c96f8a4bc65b?w=800&h=600&fit=crop",
        rating: 4.9,
        reviews: 8923,
        affiliateLink: "https://www.digistore24.com/redir/472943/EdwineLase/",
        badges: ["💪 Top Rated", "99% Protein"],
        features: ["8 Essential Amino Acids", "99% Protein Utilization", "Enhanced Performance"],
        description: "Build stronger muscles, boost energy & stamina, improve mood & memory. Complete amino acid profile with 99% protein utilization",
        type: "physical",
        featured: true
    },
    {
        id: 4,
        title: "AlgePrime - Complete Business System",
        category: "Business & Investment",
        price: 3181.38,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        rating: 4.9,
        reviews: 2134,
        affiliateLink: "https://algeprime.com#aff=EdwineLase",
        badges: ["🚀 Premium", "High ROI"],
        features: ["Member Area Access", "Video Courses", "24/7 Support"],
        description: "Everything you need to start fast and scale your earnings. Clear payouts, ready-to-use creatives, and responsive support",
        type: "digital",
        featured: true
    },
    {
        id: 5,
        title: "AI Educator Pro - Create 10x More Content",
        category: "Education",
        price: 90,
        originalPrice: 297,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        rating: 4.8,
        reviews: 5678,
        affiliateLink: "https://www.digistore24.com/redir/647496/EdwineLase/",
        badges: ["🤖 AI Powered", "2025 Tech"],
        features: ["20 Video Lectures", "AKOOL AI Credits Included", "Private Community"],
        description: "Create 10x more video content in 90% less time using AKOOL AI. Face Swap, AI Avatar, Video Translation & more included",
        type: "digital",
        featured: true
    }
];

const CATEGORIES = [
    { name: "Personal Development", count: 1, icon: "🎯" },
    { name: "Health & Fitness", count: 2, icon: "💪" },
    { name: "Business & Investment", count: 1, icon: "📈" },
    { name: "Education", count: 1, icon: "📚" }
];

const TESTIMONIALS = [
    {
        name: "Michael R.",
        role: "Business Owner",
        text: "The Billionaire Brain Wave changed my life! I manifested my dream income in just 2 months. This is absolutely life-changing!",
        rating: 5,
        product: "The Billionaire Brain Wave"
    },
    {
        name: "Sarah Johnson",
        role: "Fitness Enthusiast",
        text: "KeySlim Drops helped me lose 23 pounds in 8 weeks! No crazy diets, just amazing results. Highly recommend!",
        rating: 5,
        product: "KeySlim Drops"
    },
    {
        name: "David Martinez",
        role: "Gym Owner",
        text: "Advanced Amino Formula is incredible! My clients see faster muscle growth and recovery. Best supplement on the market!",
        rating: 5,
        product: "Advanced Amino Formula"
    },
    {
        name: "Emily Chen",
        role: "Content Creator",
        text: "AI Educator Pro completely transformed my content creation process. I'm making 10x more videos in half the time!",
        rating: 5,
        product: "AI Educator Pro"
    },
    {
        name: "Robert Thompson",
        role: "Entrepreneur",
        text: "AlgePrime gave me the exact system I needed to scale my business. The ROI has been incredible!",
        rating: 5,
        product: "AlgePrime"
    },
    {
        name: "Lisa Anderson",
        role: "Health Coach",
        text: "These products helped me and my clients achieve results we never thought possible. Quality is outstanding!",
        rating: 5,
        product: "Multiple Products"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTS, CATEGORIES, TESTIMONIALS };
}