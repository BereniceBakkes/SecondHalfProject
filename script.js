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

// Multi-page Form Handler
let currentPage = 1;
const totalPages = 4;
let isInitialLoad = true;

function showPage(pageNum, shouldScroll = false) {
    // Hide all pages
    document.querySelectorAll('.form-page').forEach(page => {
        page.classList.remove('active');
    });

    // Show current page
    document.getElementById(`page-${pageNum}`).classList.add('active');

    // Update progress tracker
    updateProgressTracker(pageNum);

    // Update button visibility
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (pageNum === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (pageNum === totalPages) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }

    // Scroll to top of form (only when navigating, not on initial load)
    if (shouldScroll) {
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateProgressTracker(pageNum) {
    // Update progress bar width
    const progressPercentage = (pageNum / totalPages) * 100;
    document.getElementById('progressBar').style.width = progressPercentage + '%';

    // Update step indicators
    for (let i = 1; i <= totalPages; i++) {
        const step = document.getElementById(`step-${i}`);
        if (i <= pageNum) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    }
}

function nextPage() {
    // Validate current page
    if (validatePage(currentPage)) {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage, true);
        }
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage, true);
    }
}

function goToPage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
        currentPage = pageNum;
        showPage(currentPage, true);
    }
}

function validatePage(pageNum) {
    const page = document.getElementById(`page-${pageNum}`);
    const requiredFields = page.querySelectorAll('[required]');
    let isValid = true;

    // Validate fields with required attribute
    requiredFields.forEach(field => {
        if (field.type === 'radio') {
            const radioGroup = document.getElementsByName(field.name);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                radioGroup.forEach(radio => radio.classList.add('error'));
            } else {
                radioGroup.forEach(radio => radio.classList.remove('error'));
            }
        } else {
            // Check if field is empty
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } 
            // Check if field is valid (using HTML5 validation - catches email format, date format, etc.)
            else if (!field.checkValidity()) {
                isValid = false;
                field.classList.add('error');
            } 
            else {
                field.classList.remove('error');
            }
        }
    });

    // Validate checkbox and radio groups marked with asterisk (required)
    const formGroups = page.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const label = group.querySelector('label');
        if (label && label.textContent.includes('*')) {
            // This group is marked as required
            const checkboxGroup = group.querySelector('.checkbox-group');
            const radioGroup = group.querySelector('.radio-group');

            if (checkboxGroup) {
                // At least one checkbox must be checked
                const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
                const isChecked = Array.from(checkboxes).some(cb => cb.checked);
                if (!isChecked) {
                    isValid = false;
                    checkboxes.forEach(cb => cb.classList.add('error'));
                } else {
                    checkboxes.forEach(cb => cb.classList.remove('error'));
                }
            } else if (radioGroup) {
                // At least one radio must be selected
                const radios = radioGroup.querySelectorAll('input[type="radio"]');
                const isChecked = Array.from(radios).some(r => r.checked);
                if (!isChecked) {
                    isValid = false;
                    radios.forEach(r => r.classList.add('error'));
                } else {
                    radios.forEach(r => r.classList.remove('error'));
                }
            }
        }
    });

    if (!isValid) {
        alert('Please fill in all required fields correctly before proceeding.');
    }

    return isValid;
}

// Helper function to get all checked checkbox values
function getCheckboxValues(name) {
    const customForm = document.getElementById('customForm');
    const checkboxes = customForm.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value).join(', ');
}

// Helper function to get radio button value
function getRadioValue(name) {
    const customForm = document.getElementById('customForm');
    const radio = customForm.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : '';
}

// Submit the collected data to Google Forms
function submitToGoogleForms() {
    const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdHhfg73LRpx8OR0kXLFtawCSfBRHEc7cBJQOLy2wjm5SmC0g/formResponse';

    // First, ensure all form data is saved to localStorage
    saveFormData();

    // Get the saved data from localStorage
    const savedDataJSON = localStorage.getItem('applicationFormData');
    const savedData = savedDataJSON ? JSON.parse(savedDataJSON) : {};

    // Log the saved data for debugging
    console.log('Saved form data:', savedData);

    // Prepare form data
    const formData = new FormData();

    try {
        // Page 1 Fields
        if (savedData.email) formData.append('emailAddress', savedData.email);
        if (savedData.fullName) formData.append('entry.569054967', savedData.fullName);
        if (savedData.contactNumber) formData.append('entry.1390730019', savedData.contactNumber);
        if (savedData.dateOfBirth) formData.append('entry.1091406177', savedData.dateOfBirth);
        if (savedData.gender) formData.append('entry.1081316312', savedData.gender);

        // Page 2 Fields
        if (savedData.goals) formData.append('entry.453925915', Array.isArray(savedData.goals) ? savedData.goals.join(', ') : savedData.goals);
        if (savedData.goalsElaborate) formData.append('entry.292737724', savedData.goalsElaborate);
        if (savedData.challenges) formData.append('entry.1884319589', Array.isArray(savedData.challenges) ? savedData.challenges.join(', ') : savedData.challenges);
        if (savedData.challengesElaborate) formData.append('entry.303490720', savedData.challengesElaborate);

        // Page 3 Fields
        if (savedData.previousAttempts) formData.append('entry.1778146938', savedData.previousAttempts);
        if (savedData.triedBefore) formData.append('entry.1282701131', savedData.triedBefore);
        if (savedData.diet) formData.append('entry.1904904898', savedData.diet);
        if (savedData.medicalConditions) formData.append('entry.59218978', savedData.medicalConditions);
        if (savedData.medicalSpecify) formData.append('entry.853010451', savedData.medicalSpecify);
        if (savedData.prescriptionMeds) formData.append('entry.2117106748', savedData.prescriptionMeds);
        if (savedData.medRxSpecify) formData.append('entry.140953979', savedData.medRxSpecify);
        if (savedData.supplements) formData.append('entry.897309947', savedData.supplements);
        if (savedData.supplementsList) formData.append('entry.793487963', savedData.supplementsList);
        if (savedData.allergies) formData.append('entry.1282300603', savedData.allergies);
        if (savedData.allergySpecify) formData.append('entry.1184648343', savedData.allergySpecify);
        if (savedData.bloodwork) formData.append('entry.412990079', savedData.bloodwork);
        if (savedData.healthRating) formData.append('entry.441328348', savedData.healthRating);
        if (savedData.currentWeight) formData.append('entry.263517772', savedData.currentWeight);
        if (savedData.height) formData.append('entry.1896424265', savedData.height);

        // Page 4 Fields
        if (savedData.whyChange) formData.append('entry.875607148', savedData.whyChange);
        if (savedData.lifestyleChanges) formData.append('entry.1113720368', savedData.lifestyleChanges);
        if (savedData.oneGoal) formData.append('entry.819484998', Array.isArray(savedData.oneGoal) ? savedData.oneGoal.join(', ') : savedData.oneGoal);
        if (savedData.threeMonths) formData.append('entry.1540798030', savedData.threeMonths);
        if (savedData.readinessScale) formData.append('entry.1758599209', savedData.readinessScale);

        // Log FormData entries for debugging
        console.log('FormData entries being sent:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

    } catch (error) {
        console.error('Error preparing form data:', error);
    }

    // Submit using Fetch API (no-cors mode prevents navigation)
    fetch(googleFormURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    }).then(() => {
        console.log('Form submitted successfully');
        // Clear localStorage after successful submission
        clearFormData();

        // Show success message
        showSuccessMessage();
    }).catch((error) => {
        console.error('Error submitting form:', error);
        // Still show success message even if there's an error (Google Forms doesn't return proper responses)
        clearFormData();
        showSuccessMessage();
    });
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const customForm = document.getElementById('customForm');
    const submitBtn = document.getElementById('submitBtn');

    if (customForm) {
        currentPage = 1;
        showPage(currentPage);

        // Load saved form data from localStorage
        loadFormData();

        // Save form data whenever any input changes
        customForm.addEventListener('change', saveFormData);
        customForm.addEventListener('input', saveFormData);

        // Handle submit button click
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();

                // Validate final page
                if (!validatePage(totalPages)) {
                    return;
                }

                // Submit to Google Forms
                submitToGoogleForms();
            });
        }

        // Also handle form submit event (for Enter key, etc.)
        customForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate final page
            if (!validatePage(totalPages)) {
                return;
            }

            // Submit to Google Forms
            submitToGoogleForms();
        });
    }
});

// Save form data to localStorage
function saveFormData() {
    const customForm = document.getElementById('customForm');
    const data = {};

    // Store text inputs, textareas, and selects
    customForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], textarea, select').forEach(field => {
        data[field.id] = field.value;
    });

    // Store radio button values
    customForm.querySelectorAll('input[type="radio"]:checked').forEach(field => {
        data[field.name] = field.value;
    });

    // Store checkbox values (as arrays)
    const checkboxGroups = {};
    customForm.querySelectorAll('input[type="checkbox"]:checked').forEach(field => {
        if (!checkboxGroups[field.name]) {
            checkboxGroups[field.name] = [];
        }
        checkboxGroups[field.name].push(field.value);
    });
    Object.assign(data, checkboxGroups);

    // Save to localStorage
    localStorage.setItem('applicationFormData', JSON.stringify(data));
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('applicationFormData');
    if (!savedData) return;

    const data = JSON.parse(savedData);
    const customForm = document.getElementById('customForm');

    Object.keys(data).forEach(key => {
        const field = document.getElementById(key);

        if (field) {
            if (field.type === 'radio') {
                const radio = customForm.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                if (radio) radio.checked = true;
            } else if (field.type === 'checkbox') {
                field.checked = true;
            } else {
                field.value = data[key];
            }
        } else {
            // Handle radio button groups by name (when no matching ID found)
            const radioButtons = customForm.querySelectorAll(`input[name="${key}"]`);
            if (radioButtons.length > 0 && radioButtons[0].type === 'radio') {
                const matchingRadio = customForm.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                if (matchingRadio) {
                    matchingRadio.checked = true;
                }
            } else {
                // Handle checkbox groups by name
                const checkboxes = customForm.querySelectorAll(`input[name="${key}"]`);
                if (checkboxes.length > 0 && Array.isArray(data[key])) {
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = data[key].includes(checkbox.value);
                    });
                }
            }
        }
    });
}

// Clear form data from localStorage
function clearFormData() {
    localStorage.removeItem('applicationFormData');
}

function showSuccessMessage() {
    const formContainer = document.querySelector('.form-container');
    const successHTML = `
        <div class="success-message">
            <div class="success-content">
                <h2>Application Submitted Successfully!</h2>
                <p>Thank you for applying to the Second Half Project.</p>
                <p>We've received your application and will review it shortly.</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 20px;">Return to Home</a>
            </div>
        </div>
    `;
    formContainer.innerHTML = successHTML;
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
