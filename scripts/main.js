/**
 * CLIMATE WAYFINDING - Main JavaScript
 * PHI 116 Climate Philosophy Final Project
 * 
 * This script handles all interactive features:
 * - Loading screen animation
 * - Smooth scroll navigation
 * - Sticky header with transparency transition
 * - Mobile navigation toggle
 * - Scroll-triggered animations
 * - Active navigation state
 */

'use strict';

// =========================================================================
// DOM CONTENT LOADED - Initialize all functionality
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavState();
});

// =========================================================================
// LOADING SCREEN
// =========================================================================

/**
 * Initialize and control the loading screen animation
 * Fades out after page is fully loaded
 */
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (!loader) return;

    // Ensure minimum display time for visual effect
    const minLoadTime = 800;
    const startTime = Date.now();

    window.addEventListener('load', () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);

        setTimeout(() => {
            loader.classList.add('loaded');
            
            // Remove from DOM after transition completes
            setTimeout(() => {
                loader.remove();
            }, 600);
        }, remainingTime);
    });

    // Fallback: hide loader after 3 seconds regardless
    setTimeout(() => {
        if (!loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
        }
    }, 3000);
}

// =========================================================================
// NAVIGATION
// =========================================================================

/**
 * Initialize header scroll behavior and mobile navigation
 */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!header) return;

    // Header scroll state
    let lastScrollY = 0;
    let ticking = false;

    /**
     * Update header appearance based on scroll position
     */
    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    // Throttled scroll handler using requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateHeader();

    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
}

// =========================================================================
// SMOOTH SCROLL
// =========================================================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, '', href);

                // Set focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });
}

// =========================================================================
// SCROLL ANIMATIONS
// =========================================================================

/**
 * Initialize Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const animateElements = [
        '.section-header',
        '.narrative__lead',
        '.narrative__chapter',
        '.narrative__quote',
        '.philosophy-card',
        '.philosophy__synthesis',
        '.action-card',
        '.conclusion__text',
        '.conclusion__quote',
        '.conclusion__closing'
    ];

    // Select all elements that should animate
    const elements = document.querySelectorAll(animateElements.join(', '));

    if (!elements.length) return;

    // Add initial class for animation
    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    /**
     * Callback for intersection observer
     */
    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation (performance optimization)
                observer.unobserve(entry.target);
            }
        });
    }

    // Create and start observer
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    elements.forEach(el => observer.observe(el));

    // Also handle staggered children animations
    const staggerContainers = document.querySelectorAll('.philosophy__grid, .action__grid');
    
    staggerContainers.forEach(container => {
        container.classList.add('stagger-children');
    });

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    staggerContainers.forEach(container => staggerObserver.observe(container));
}

// =========================================================================
// ACTIVE NAVIGATION STATE
// =========================================================================

/**
 * Update active navigation state based on scroll position
 */
function initActiveNavState() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!sections.length || !navLinks.length) return;

    /**
     * Determine which section is currently in view
     */
    function updateActiveLink() {
        const scrollY = window.scrollY;
        const headerHeight = document.getElementById('header')?.offsetHeight || 80;

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll handler
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateActiveLink();
}

// =========================================================================
// UTILITY FUNCTIONS
// =========================================================================

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll event optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =========================================================================
// KEYBOARD NAVIGATION ENHANCEMENT
// =========================================================================

/**
 * Enhance keyboard navigation for accessibility
 */
document.addEventListener('keydown', (e) => {
    // Handle Tab key in modal/mobile menu
    const navMenu = document.getElementById('nav-menu');
    
    if (navMenu?.classList.contains('open') && e.key === 'Tab') {
        const focusableElements = navMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// =========================================================================
// PARALLAX EFFECT (Optional - CSS-based for performance)
// =========================================================================

/**
 * Initialize subtle parallax effect on hero section
 * Uses CSS transforms for GPU acceleration
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = hero.offsetHeight;
                
                if (scrollY < heroHeight) {
                    const translateY = scrollY * 0.3;
                    const opacity = 1 - (scrollY / heroHeight) * 0.5;
                    
                    const content = hero.querySelector('.hero__content');
                    if (content) {
                        content.style.transform = `translateY(${translateY}px)`;
                        content.style.opacity = Math.max(0, opacity);
                    }
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Initialize parallax after DOM loads
document.addEventListener('DOMContentLoaded', initParallax);

// =========================================================================
// SERVICE WORKER REGISTRATION (for PWA capability)
// =========================================================================

/**
 * Register service worker for offline capability
 * Uncomment if you want to add PWA features
 */
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('ServiceWorker registered:', registration.scope);
//             })
//             .catch(error => {
//                 console.log('ServiceWorker registration failed:', error);
//             });
//     });
// }

// =========================================================================
// CONSOLE EASTER EGG
// =========================================================================

console.log(
    '%c🌿 Climate Wayfinding',
    'color: #40916C; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cIn Defense of a Beating Heart',
    'color: #D4A373; font-size: 14px; font-style: italic;'
);
console.log(
    '%c"The climate crisis asks us not to fear the future, but to love the present more deeply."',
    'color: #1B4332; font-size: 12px;'
);


