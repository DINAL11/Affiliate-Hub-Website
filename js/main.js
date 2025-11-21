// ============================================
// MAIN INITIALIZATION - FindNBuy Store
// ============================================

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 FindNBuy Store initializing...');

    try {
        // 1. Initialize Supabase
        await supabaseClient.init();

        // 2. Initialize Authentication
        authManager.init();
        console.log('✅ Auth manager initialized');

        // 3. Initialize Cart
        cartManager.init();
        console.log('✅ Cart manager initialized');

        // 4. Initialize UI
        uiManager.init();
        console.log('✅ UI manager initialized');

        // 5. Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            console.log('✅ Icons initialized');
        }

        // 6. Add smooth scroll behavior
        initSmoothScroll();

        // 7. Add animations
        initAnimations();

        console.log('🎉 FindNBuy Store loaded successfully!');

    } catch (error) {
        console.error('❌ Error initializing application:', error);
    }
});

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations
function initAnimations() {
    // Add entrance animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeIn 1s ease';
    }

    // Add parallax effect to hero
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const heroGradient = document.querySelector('.hero-gradient');
                if (heroGradient) {
                    const scrolled = window.pageYOffset;
                    heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Global utility functions
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add "Back to Top" button
window.addEventListener('scroll', function() {
    let backToTop = document.getElementById('backToTop');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.innerHTML = '<i data-lucide="arrow-up"></i>';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        backToTop.addEventListener('click', scrollToTop);
        document.body.appendChild(backToTop);
        lucide.createIcons();
    }

    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
        setTimeout(() => {
            if (window.pageYOffset <= 300) {
                backToTop.style.display = 'none';
            }
        }, 300);
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with lazy class
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    #backToTop:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 30px rgba(59, 130, 246, 0.6);
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Handle online/offline status
window.addEventListener('online', function() {
    authManager.showNotification('Back online!', 'success');
});

window.addEventListener('offline', function() {
    authManager.showNotification('You are offline', 'error');
});

// Console welcome message
console.log('%c🛍️ FindNBuy Store', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cWe find the cheapest deals online!', 'font-size: 14px; color: #6b7280;');
console.log('%cVersion: 1.0.0', 'font-size: 12px; color: #9ca3af;');