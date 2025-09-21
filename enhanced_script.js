// Enhanced FOSSEE Workshop Booking - Mobile-First JavaScript
// Focus on mobile UX, performance, and accessibility

// Workshop data - Enhanced with more details
const workshops = [
    {
        id: 1,
        title: "Python Programming Fundamentals",
        description: "Learn the basics of Python programming including variables, data types, control structures, and functions. Perfect for beginners.",
        category: "programming",
        duration: "2 days",
        seats: 25,
        price: "₹2,500",
        instructor: "Dr. Sarah Johnson",
        date: "2024-02-15",
        image: "fas fa-python",
        level: "Beginner",
        location: "Online",
        rating: 4.8
    },
    {
        id: 2,
        title: "Data Science with Python",
        description: "Master data analysis, visualization, and machine learning using Python libraries like Pandas, NumPy, and Scikit-learn.",
        category: "data-science",
        duration: "3 days",
        seats: 20,
        price: "₹4,500",
        instructor: "Prof. Michael Chen",
        date: "2024-02-20",
        image: "fas fa-chart-line",
        level: "Intermediate",
        location: "IIT Bombay",
        rating: 4.9
    },
    {
        id: 3,
        title: "Web Development Bootcamp",
        description: "Build modern web applications using HTML, CSS, JavaScript, and popular frameworks like React and Node.js.",
        category: "web-dev",
        duration: "5 days",
        seats: 30,
        price: "₹6,000",
        instructor: "Alex Rodriguez",
        date: "2024-02-25",
        image: "fas fa-code",
        level: "Beginner",
        location: "Online",
        rating: 4.7
    },
    {
        id: 4,
        title: "Machine Learning Essentials",
        description: "Introduction to machine learning algorithms, model training, and deployment using Python and TensorFlow.",
        category: "ai-ml",
        duration: "4 days",
        seats: 18,
        price: "₹5,500",
        instructor: "Dr. Emily Watson",
        date: "2024-03-01",
        image: "fas fa-brain",
        level: "Advanced",
        location: "IIT Bombay",
        rating: 4.9
    },
    {
        id: 5,
        title: "Advanced JavaScript",
        description: "Deep dive into modern JavaScript features, ES6+, async programming, and advanced patterns.",
        category: "programming",
        duration: "2 days",
        seats: 22,
        price: "₹3,000",
        instructor: "David Kim",
        date: "2024-03-05",
        image: "fab fa-js-square",
        level: "Intermediate",
        location: "Online",
        rating: 4.6
    },
    {
        id: 6,
        title: "Full-Stack Development",
        description: "Complete full-stack development course covering frontend, backend, databases, and deployment.",
        category: "web-dev",
        duration: "6 days",
        seats: 15,
        price: "₹8,000",
        instructor: "Maria Garcia",
        date: "2024-03-10",
        image: "fas fa-laptop-code",
        level: "Intermediate",
        location: "IIT Bombay",
        rating: 4.8
    }
];

// Global state management
const state = {
    currentFilter: 'all',
    visibleWorkshops: 6,
    isLoading: false,
    mobileMenuOpen: false
};

// DOM elements
const elements = {
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    navMenu: document.getElementById('navMenu'),
    workshopsGrid: document.getElementById('workshopsGrid'),
    filterTabs: document.querySelectorAll('.filter-tab'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    modal: document.getElementById('bookingModal'),
    bookingForm: document.getElementById('bookingForm'),
    contactForm: document.getElementById('contactForm'),
    newsletterForm: document.querySelector('.newsletter-form'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    messageContainer: document.getElementById('messageContainer')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    initializeNavigation();
    initializeWorkshops();
    initializeFilters();
    initializeModal();
    initializeForms();
    initializeScrollEffects();
    initializeAnimations();
    initializeAccessibility();
    
    // Show initial workshops
    renderWorkshops();
}

// Navigation functionality - Mobile optimized
function initializeNavigation() {
    // Mobile menu toggle
    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Navbar scroll effect
    window.addEventListener('scroll', updateNavbarStyle);
}

function toggleMobileMenu() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    
    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.classList.toggle('active', state.mobileMenuOpen);
    }
    
    if (elements.navMenu) {
        elements.navMenu.classList.toggle('active', state.mobileMenuOpen);
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    state.mobileMenuOpen = false;
    
    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.classList.remove('active');
    }
    
    if (elements.navMenu) {
        elements.navMenu.classList.remove('active');
    }
    
    document.body.style.overflow = 'auto';
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

function updateNavbarStyle() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Workshop management
function initializeWorkshops() {
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.addEventListener('click', loadMoreWorkshops);
    }
}

function renderWorkshops() {
    if (!elements.workshopsGrid) return;
    
    const filteredWorkshops = getFilteredWorkshops();
    const workshopsToShow = filteredWorkshops.slice(0, state.visibleWorkshops);
    
    elements.workshopsGrid.innerHTML = workshopsToShow.map(workshop => createWorkshopCard(workshop)).join('');
    
    // Update load more button visibility
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.style.display = workshopsToShow.length < filteredWorkshops.length ? 'block' : 'none';
    }
    
    // Add animation to new cards
    animateWorkshopCards();
}

function getFilteredWorkshops() {
    return state.currentFilter === 'all' 
        ? workshops 
        : workshops.filter(workshop => workshop.category === state.currentFilter);
}

function createWorkshopCard(workshop) {
    return `
        <div class="workshop-card" data-category="${workshop.category}">
            <div class="workshop-image">
                <i class="${workshop.image}"></i>
            </div>
            <div class="workshop-content">
                <div class="workshop-header">
                    <span class="workshop-category">${getCategoryName(workshop.category)}</span>
                    <div class="workshop-rating">
                        <i class="fas fa-star"></i>
                        <span>${workshop.rating}</span>
                    </div>
                </div>
                <h3 class="workshop-title">${workshop.title}</h3>
                <p class="workshop-description">${workshop.description}</p>
                <div class="workshop-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(workshop.date)}</span>
                    <span><i class="fas fa-clock"></i> ${workshop.duration}</span>
                    <span><i class="fas fa-users"></i> ${workshop.seats} seats</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${workshop.location}</span>
                </div>
                <div class="workshop-footer">
                    <div class="workshop-price">${workshop.price}</div>
                    <div class="workshop-level">${workshop.level}</div>
                </div>
                <div class="workshop-actions">
                    <button class="btn btn-outline" onclick="viewWorkshopDetails(${workshop.id})">
                        <i class="fas fa-info-circle"></i>
                        Details
                    </button>
                    <button class="btn btn-primary" onclick="openBookingModal(${workshop.id})">
                        <i class="fas fa-calendar-plus"></i>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

function loadMoreWorkshops() {
    state.visibleWorkshops += 6;
    renderWorkshops();
}

// Filter functionality
function initializeFilters() {
    elements.filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setFilter(filter);
        });
    });
}

function setFilter(filter) {
    state.currentFilter = filter;
    state.visibleWorkshops = 6;
    
    // Update active tab
    elements.filterTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-filter') === filter);
    });
    
    renderWorkshops();
}

// Modal functionality
function initializeModal() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === elements.modal) {
            closeModal();
        }
    });

    // Handle form submission
    if (elements.bookingForm) {
        elements.bookingForm.addEventListener('submit', handleBookingSubmission);
    }
}

function openBookingModal(workshopId) {
    const workshop = workshops.find(w => w.id === workshopId);
    if (!workshop || !elements.modal) return;
    
    // Update modal content
    document.getElementById('modalWorkshopTitle').textContent = workshop.title;
    document.getElementById('modalWorkshopDate').textContent = formatDate(workshop.date);
    document.getElementById('modalWorkshopDuration').textContent = workshop.duration;
    document.getElementById('modalWorkshopPrice').textContent = workshop.price;
    
    // Show modal
    elements.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = elements.modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeModal() {
    if (elements.modal) {
        elements.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        if (elements.bookingForm) {
            elements.bookingForm.reset();
        }
    }
}

function handleBookingSubmission(event) {
    event.preventDefault();
    
    if (!validateForm(elements.bookingForm)) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    const formData = new FormData(elements.bookingForm);
    const bookingData = Object.fromEntries(formData.entries());
    
    // Show loading state
    showLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        showLoading(false);
        showMessage('Booking submitted successfully! We will contact you soon.', 'success');
        closeModal();
        
        // Log booking data (in real app, this would be sent to server)
        console.log('Booking submitted:', bookingData);
    }, 2000);
}

// Form management
function initializeForms() {
    // Contact form
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactSubmission);
    }
    
    // Newsletter form
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
}

function handleContactSubmission(event) {
    event.preventDefault();
    
    if (!validateForm(elements.contactForm)) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        showLoading(false);
        showMessage('Message sent successfully! We will get back to you soon.', 'success');
        elements.contactForm.reset();
    }, 2000);
}

function handleNewsletterSubmission(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    if (email) {
        showMessage('Thank you for subscribing to our newsletter!', 'success');
        event.target.reset();
    }
}

// Utility functions
function getCategoryName(category) {
    const categoryNames = {
        'programming': 'Programming',
        'data-science': 'Data Science',
        'web-dev': 'Web Development',
        'ai-ml': 'AI/ML'
    };
    return categoryNames[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--bg-tertiary)';
        }
    });
    
    return isValid;
}

function showMessage(message, type) {
    if (!elements.messageContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    elements.messageContainer.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function showLoading(show) {
    if (elements.loadingOverlay) {
        elements.loadingOverlay.style.display = show ? 'flex' : 'none';
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation system
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-item, .contact-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function animateWorkshopCards() {
    const cards = document.querySelectorAll('.workshop-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Accessibility features
function initializeAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close modal with Escape key
        if (e.key === 'Escape' && elements.modal && elements.modal.style.display === 'block') {
            closeModal();
        }
        
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && state.mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Focus management
    document.addEventListener('focusin', function(e) {
        if (state.mobileMenuOpen && !elements.navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Workshop details view
function viewWorkshopDetails(workshopId) {
    const workshop = workshops.find(w => w.id === workshopId);
    if (!workshop) return;
    
    const details = `
Workshop: ${workshop.title}
Instructor: ${workshop.instructor}
Duration: ${workshop.duration}
Date: ${formatDate(workshop.date)}
Location: ${workshop.location}
Seats Available: ${workshop.seats}
Price: ${workshop.price}
Level: ${workshop.level}
Rating: ${workshop.rating}/5

Description:
${workshop.description}
    `;
    
    // Create a modal for details
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal';
    detailsModal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>Workshop Details</h2>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <pre style="white-space: pre-wrap; font-family: inherit;">${details}</pre>
            </div>
        </div>
    `;
    
    document.body.appendChild(detailsModal);
    detailsModal.style.display = 'block';
}

// Smooth scroll functions
function scrollToWorkshops() {
    const workshopsSection = document.getElementById('workshops');
    if (workshopsSection) {
        workshopsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Performance optimizations
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
const optimizedScrollHandler = throttle(updateActiveNavigation, 100);
const optimizedNavbarHandler = throttle(updateNavbarStyle, 100);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('scroll', optimizedNavbarHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    showMessage('An unexpected error occurred. Please try again.', 'error');
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.scrollToWorkshops = scrollToWorkshops;
window.scrollToAbout = scrollToAbout;
window.openBookingModal = openBookingModal;
window.closeModal = closeModal;
window.viewWorkshopDetails = viewWorkshopDetails;

