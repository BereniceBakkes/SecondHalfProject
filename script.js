// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const currentPageSpan = document.getElementById('currentPage');

// Set initial current page based on active link
function initializeCurrentPage() {
    if (currentPageSpan) {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const pageText = activeLink.textContent.trim();
            currentPageSpan.textContent = pageText;
        }
    }
}

// Initialize on page load
initializeCurrentPage();

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            // Update current page display
            const pageText = link.textContent.trim();
            if (currentPageSpan) {
                currentPageSpan.textContent = pageText;
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.hero-content h1, .hero-content h2, .hero-content p, .btn, ' +
        '.approach-card, .approach-icon, .approach-title, ' +
        '.pillar, .principle, ' +
        '.about-wrapper, .about-title, .about-image, .about-content, .coach-name, ' +
        '.program-title, .program-content, .program-image, ' +
        '.included-title, .included-list li, ' +
        '.faq-title, .faq-container, .faq-item, ' +
        '.who-title, .who-intro, ' +
        '.philosophy-title, .philosophy-content, ' +
        '.why-title, .why-description, .why-highlight, ' +
        '.apply-title, .apply-content, .google-form-container, ' +
        '.contact-title, .contact-card'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
