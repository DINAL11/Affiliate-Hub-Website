// ============================================
// PRODUCTS DATA - FindNBuy Store
// ============================================

const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Wireless Earbuds Pro",
        price: 29.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
        category: "Electronics",
        rating: 4.8,
        reviews: 1243,
        discount: 63,
        description: "Premium sound quality with active noise cancellation. Perfect for work and play.",
        inStock: true,
        isNew: false
    },
    {
        id: 2,
        name: "Smart Watch Series 6",
        price: 149.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop",
        category: "Electronics",
        rating: 4.9,
        reviews: 2156,
        discount: 63,
        description: "Track your fitness goals with style. Heart rate monitor, GPS, and more.",
        inStock: true,
        isNew: true
    },
    {
        id: 3,
        name: "Premium Yoga Mat",
        price: 24.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        category: "Fitness",
        rating: 4.7,
        reviews: 892,
        discount: 58,
        description: "Non-slip, eco-friendly exercise mat with extra cushioning.",
        inStock: true,
        isNew: false
    },
    {
        id: 4,
        name: "Coffee Maker Deluxe",
        price: 79.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
        category: "Home",
        rating: 4.6,
        reviews: 567,
        discount: 60,
        description: "Brew barista-quality coffee at home. Programmable timer included.",
        inStock: true,
        isNew: false
    },
    {
        id: 5,
        name: "LED Desk Lamp",
        price: 34.99,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=500&fit=crop",
        category: "Home",
        rating: 4.5,
        reviews: 423,
        discount: 61,
        description: "Adjustable brightness and color temperature. USB charging port.",
        inStock: true,
        isNew: false
    },
    {
        id: 6,
        name: "Resistance Bands Set",
        price: 19.99,
        originalPrice: 49.99,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop",
        category: "Fitness",
        rating: 4.8,
        reviews: 1089,
        discount: 60,
        description: "Complete workout set with 5 resistance levels and door anchor.",
        inStock: true,
        isNew: false
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 39.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        category: "Electronics",
        rating: 4.7,
        reviews: 734,
        discount: 60,
        description: "Waterproof portable speaker with 20-hour battery life.",
        inStock: true,
        isNew: true
    },
    {
        id: 8,
        name: "Running Shoes",
        price: 59.99,
        originalPrice: 149.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        category: "Fashion",
        rating: 4.8,
        reviews: 1567,
        discount: 60,
        description: "Lightweight and breathable running shoes with superior cushioning.",
        inStock: true,
        isNew: false
    },
    {
        id: 9,
        name: "Backpack Pro",
        price: 44.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        category: "Fashion",
        rating: 4.6,
        reviews: 892,
        discount: 63,
        description: "Water-resistant laptop backpack with USB charging port.",
        inStock: true,
        isNew: false
    }
];

const CATEGORIES = [
    { id: 'all', name: 'All Products', count: PRODUCTS_DATA.length },
    { id: 'Electronics', name: 'Electronics', count: PRODUCTS_DATA.filter(p => p.category === 'Electronics').length },
    { id: 'Fitness', name: 'Fitness', count: PRODUCTS_DATA.filter(p => p.category === 'Fitness').length },
    { id: 'Home', name: 'Home', count: PRODUCTS_DATA.filter(p => p.category === 'Home').length },
    { id: 'Fashion', name: 'Fashion', count: PRODUCTS_DATA.filter(p => p.category === 'Fashion').length }
];