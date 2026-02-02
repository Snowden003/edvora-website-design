// Modern Footer Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initFooterAnimations();
    initNewsletterForm();
    initSocialLinks();
    initScrollAnimations();
});

// Initialize footer animations
function initFooterAnimations() {
    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateNumber(stat);
            }
        });
    };

    // Initial check
    animateStats();
    
    // Check on scroll
    window.addEventListener('scroll', animateStats);
}

// Animate number counting
function animateNumber(element) {
    const target = element.textContent;
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    const suffix = target.replace(/[\d]/g, '');
    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Newsletter form handling
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    const input = document.querySelector('.newsletter-input');
    const button = document.querySelector('.newsletter-btn');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = input.value.trim();
            if (validateEmail(email)) {
                // Add success animation
                button.innerHTML = '<i class="bi bi-check-circle"></i>';
                button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-send"></i>';
                    button.style.background = '';
                    input.value = '';
                }, 2000);
            } else {
                // Show error animation
                input.style.borderColor = '#dc3545';
                input.style.animation = 'shake 0.5s ease-in-out';
                
                showNotification('Please enter a valid email address', 'error');
                
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.style.animation = '';
                }, 500);
            }
        });

        // Input focus effects
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
            this.parentElement.style.boxShadow = '';
        });
    }
}

// Social links interactions
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add ripple effect
            createRipple(this);
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Create ripple effect
function createRipple(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Scroll animations
function initScrollAnimations() {
    const footerSections = document.querySelectorAll('.footer-section');
    const footerBrand = document.querySelector('.footer-brand');
    
    const animateOnScroll = () => {
        // Animate footer brand
        if (footerBrand && isElementInViewport(footerBrand)) {
            footerBrand.style.animation = 'slideInLeft 0.8s ease-out';
        }
        
        // Animate footer sections
        footerSections.forEach((section, index) => {
            if (isElementInViewport(section)) {
                section.style.animation = `slideInUp 0.8s ease-out ${index * 0.1}s both`;
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}

// Utility functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `footer-notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        ${type === 'success' ? 'background: linear-gradient(135deg, #28a745, #20c997);' : 'background: linear-gradient(135deg, #dc3545, #e74c3c);'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
