// ============================================
// PRODUCTS DATABASE
// ============================================

const PRODUCTS = [
    {
        id: 1,
        title: "Complete Digital Marketing Mastery 2024",
        category: "Online Marketing",
        price: 197,
        originalPrice: 497,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        rating: 4.9,
        reviews: 2847,
        commission: 50,
        productId: "YOURPRODUCTID1", // Replace with actual Digistore24 product ID
        badges: ["Best Seller", "Limited Time"],
        features: ["Lifetime Access", "Certificate", "24/7 Support"],
        description: "Master digital marketing from SEO to social media ads",
        type: "digital" // digital or physical
    },
    {
        id: 2,
        title: "Ultimate Personal Development Blueprint",
        category: "Personal Development",
        price: 67,
        originalPrice: 197,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        rating: 4.8,
        reviews: 1923,
        commission: 60,
        productId: "YOURPRODUCTID2",
        badges: ["Top Rated", "🔥 Hot"],
        features: ["90-Day Guarantee", "Bonus Materials", "Community Access"],
        description: "Transform your life with proven success strategies",
        type: "digital"
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
        productId: "YOURPRODUCTID3",
        badges: ["Professional", "High Value"],
        features: ["Live Trading Sessions", "1-on-1 Coaching", "Trading Tools"],
        description: "Learn profitable trading strategies from experts",
        type: "digital"
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
        productId: "YOURPRODUCTID4",
        badges: ["Most Popular", "Beginner Friendly"],
        features: ["Meal Plans", "Video Workouts", "Progress Tracker"],
        description: "Get in the best shape of your life in 12 weeks",
        type: "digital"
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
        productId: "YOURPRODUCTID5",
        badges: ["Career Boost", "2024 Updated"],
        features: ["Real Projects", "Job Assistance", "Lifetime Updates"],
        description: "Become a professional developer in 6 months",
        type: "digital"
    },
    {
        id: 6,
        title: "Social Media Marketing Masterclass",
        category: "Social Media",
        price: 77,
        originalPrice: 297,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        rating: 4.8,
        reviews: 2891,
        commission: 65,
        productId: "YOURPRODUCTID6",
        badges: ["Trending", "Results Proven"],
        features: ["Growth Strategies", "Content Templates", "Analytics Tools"],
        description: "Grow your social media presence exponentially",
        type: "digital"
    },
    {
        id: 7,
        title: "Premium Kitchen Knife Set - Professional Grade",
        category: "Home & Garden",
        price: 89,
        originalPrice: 249,
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&h=600&fit=crop",
        rating: 4.9,
        reviews: 1456,
        commission: 30,
        productId: "YOURPRODUCTID7",
        badges: ["Top Quality", "Free Shipping"],
        features: ["German Steel", "Lifetime Warranty", "Professional Grade"],
        description: "Professional chef knives for your kitchen",
        type: "physical"
    },
    {
        id: 8,
        title: "Smart Fitness Watch - Track Everything",
        category: "Health & Fitness",
        price: 129,
        originalPrice: 299,
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=600&fit=crop",
        rating: 4.6,
        reviews: 3210,
        commission: 25,
        productId: "YOURPRODUCTID8",
        badges: ["Best Seller", "New Arrival"],
        features: ["Heart Rate Monitor", "Sleep Tracking", "Water Resistant"],
        description: "Advanced fitness tracking with smart notifications",
        type: "physical"
    }
];

const CATEGORIES = [
    { name: "Personal Development", count: 315, icon: "🎯" },
    { name: "Online Marketing", count: 289, icon: "💼" },
    { name: "Business & Investment", count: 272, icon: "📈" },
    { name: "Education", count: 271, icon: "📚" },
    { name: "Health & Fitness", count: 260, icon: "💪" },
    { name: "Software", count: 113, icon: "💻" },
    { name: "Computer & Internet", count: 112, icon: "🌐" },
    { name: "Social Media", count: 79, icon: "📱" },
    { name: "Home & Garden", count: 42, icon: "🏡" },
    { name: "Food & Drink", count: 65, icon: "🍽️" }
];

const TESTIMONIALS = [
    {
        name: "Sarah M.",
        role: "Entrepreneur",
        text: "These products changed my business completely! 10x ROI in just 3 months.",
        rating: 5
    },
    {
        name: "John D.",
        role: "Developer",
        text: "Best investment I've made in my career. Worth every penny!",
        rating: 5
    },
    {
        name: "Emma R.",
        role: "Marketer",
        text: "Finally found quality products that actually deliver results.",
        rating: 5
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTS, CATEGORIES, TESTIMONIALS };
}
