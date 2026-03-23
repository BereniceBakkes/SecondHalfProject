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
