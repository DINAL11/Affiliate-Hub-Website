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
        commission: 75,
        productId: "524279",
        badges: ["🔥 Hot Seller", "Top Rated"],
        features: ["7-Minute Audio Track", "Instant Digital Access", "Money-Back Guarantee"],
        description: "Scientifically proven brain wave audio that attracts wealth and abundance into your life",
        type: "digital",
        featured: true
    },
    {
        id: 2,
        title: "Complete Digital Marketing Mastery 2024",
        category: "Online Marketing",
        price: 197,
        originalPrice: 497,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        rating: 4.8,
        reviews: 2847,
        commission: 50,
        productId: "PRODUCTID_PLACEHOLDER2",
        badges: ["Best Seller", "2024 Updated"],
        features: ["Lifetime Access", "Certificate", "24/7 Support"],
        description: "Master digital marketing from SEO to social media ads and email campaigns",
        type: "digital",
        featured: true
    },
    {
        id: 3,
        title: "Advanced Trading & Investment Course",
        category: "Business & Investment",
        price: 297,
        originalPrice: 997,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
        rating: 4.9,
        reviews: 3421,
        commission: 40,
        productId: "PRODUCTID_PLACEHOLDER3",
        badges: ["Professional", "High ROI"],
        features: ["Live Trading Sessions", "1-on-1 Coaching", "Trading Tools"],
        description: "Learn profitable trading strategies from Wall Street experts",
        type: "digital",
        featured: true
    },
    {
        id: 4,
        title: "Complete Fitness Transformation System",
        category: "Health & Fitness",
        price: 47,
        originalPrice: 147,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
        rating: 4.7,
        reviews: 5632,
        commission: 75,
        productId: "PRODUCTID_PLACEHOLDER4",
        badges: ["Most Popular", "Results Proven"],
        features: ["Meal Plans", "Video Workouts", "Progress Tracker"],
        description: "Get in the best shape of your life in just 12 weeks",
        type: "digital",
        featured: true
    },
    {
        id: 5,
        title: "Professional Web Development Bootcamp",
        category: "Software",
        price: 97,
        originalPrice: 497,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
        rating: 4.9,
        reviews: 4156,
        commission: 50,
        productId: "PRODUCTID_PLACEHOLDER5",
        badges: ["Career Boost", "Job Ready"],
        features: ["Real Projects", "Job Assistance", "Lifetime Updates"],
        description: "Become a professional developer and land high-paying jobs",
        type: "digital",
        featured: true
    },
    {
        id: 6,
        title: "Social Media Growth Masterclass",
        category: "Social Media",
        price: 77,
        originalPrice: 297,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        rating: 4.8,
        reviews: 2891,
        commission: 65,
        productId: "PRODUCTID_PLACEHOLDER6",
        badges: ["Trending", "Viral Tactics"],
        features: ["Growth Strategies", "Content Templates", "Analytics"],
        description: "Grow your social media following to 100K+ organically",
        type: "digital",
        featured: true
    },
    {
        id: 7,
        title: "Manifestation & Law of Attraction Guide",
        category: "Personal Development",
        price: 37,
        originalPrice: 127,
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop",
        rating: 4.8,
        reviews: 6234,
        commission: 70,
        productId: "PRODUCTID_PLACEHOLDER7",
        badges: ["Life Changing", "Spiritual"],
        features: ["Guided Meditations", "Daily Exercises", "Vision Board Templates"],
        description: "Master the art of manifestation and attract your dream life",
        type: "digital",
        featured: false
    },
    {
        id: 8,
        title: "Complete Keto Diet & Meal Plan",
        category: "Health & Fitness",
        price: 27,
        originalPrice: 97,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
        rating: 4.7,
        reviews: 7891,
        commission: 75,
        productId: "PRODUCTID_PLACEHOLDER8",
        badges: ["Weight Loss", "Beginner Friendly"],
        features: ["30-Day Meal Plan", "Recipe Book", "Shopping Lists"],
        description: "Lose weight fast with delicious keto recipes and meal plans",
        type: "digital",
        featured: false
    }
];

const CATEGORIES = [
    { name: "Personal Development", count: 315, icon: "🎯" },
    { name: "Online Marketing", count: 289, icon: "💼" },
    { name: "Business & Investment", count: 272, icon: "📈" },
    { name: "Education", count: 271, icon: "📚" },
    { name: "Health & Fitness", count: 260, icon: "💪" },
    { name: "Software", count: 113, icon: "💻" },
    { name: "Social Media", count: 79, icon: "📱" },
    { name: "Spirituality", count: 68, icon: "🔮" },
    { name: "Home & Garden", count: 42, icon: "🏡" },
    { name: "Food & Drink", count: 65, icon: "🍽️" }
];

const TESTIMONIALS = [
    {
        name: "Michael R.",
        role: "Entrepreneur",
        text: "The Billionaire Brain Wave changed my life! I manifested $50,000 in just 2 months. This stuff really works!",
        rating: 5,
        product: "The Billionaire Brain Wave"
    },
    {
        name: "Sarah Thompson",
        role: "Business Owner",
        text: "I was skeptical at first, but after using these products, my business revenue doubled! Best investment ever.",
        rating: 5,
        product: "Digital Marketing Course"
    },
    {
        name: "James Martinez",
        role: "Fitness Coach",
        text: "Lost 45 pounds and completely transformed my life. The meal plans and workouts are incredibly effective!",
        rating: 5,
        product: "Fitness Transformation"
    },
    {
        name: "Emily Chen",
        role: "Social Media Influencer",
        text: "Grew from 500 to 150K followers in 6 months using these strategies. Absolutely game-changing!",
        rating: 5,
        product: "Social Media Masterclass"
    },
    {
        name: "David Wilson",
        role: "Software Developer",
        text: "Landed a $120K job after completing the bootcamp. The skills are exactly what employers want!",
        rating: 5,
        product: "Web Development Bootcamp"
    },
    {
        name: "Lisa Anderson",
        role: "Life Coach",
        text: "These products helped me create the life I always dreamed of. The manifestation techniques are powerful!",
        rating: 5,
        product: "Manifestation Guide"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTS, CATEGORIES, TESTIMONIALS };
}
