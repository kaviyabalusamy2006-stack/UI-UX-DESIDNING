// Workshop data
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
        image: "fas fa-python"
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
        image: "fas fa-chart-line"
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
        image: "fas fa-code"
    },
    {
        id: 4,
        title: "Machine Learning Essentials",
        description: "Introduction to machine learning algorithms, model training, and deployment using Python and TensorFlow.",
        category: "data-science",
        duration: "4 days",
        seats: 18,
        price: "₹5,500",
        instructor: "Dr. Emily Watson",
        date: "2024-03-01",
        image: "fas fa-brain"
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
        image: "fab fa-js-square"
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
        image: "fas fa-laptop-code"
    }
];

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const workshopsGrid = document.getElementById('workshopsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('bookingModal');
const bookingForm = document.getElementById('bookingForm');
const closeModal = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    renderWorkshops();
    initializeFilters();
    initializeModal();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
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
    });
}

// Render workshops
function renderWorkshops(filter = 'all') {
    const filteredWorkshops = filter === 'all' 
        ? workshops 
        : workshops.filter(workshop => workshop.category === filter);

    workshopsGrid.innerHTML = filteredWorkshops.map(workshop => `
        <div class="workshop-card" data-category="${workshop.category}">
            <div class="workshop-image">
                <i class="${workshop.image}"></i>
            </div>
            <div class="workshop-content">
                <span class="workshop-category">${getCategoryName(workshop.category)}</span>
                <h3 class="workshop-title">${workshop.title}</h3>
                <p class="workshop-description">${workshop.description}</p>
                <div class="workshop-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(workshop.date)}</span>
                    <span><i class="fas fa-clock"></i> ${workshop.duration}</span>
                    <span><i class="fas fa-users"></i> ${workshop.seats} seats</span>
                </div>
                <div class="workshop-price">${workshop.price}</div>
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
    `).join('');

    // Add animation to workshop cards
    animateWorkshopCards();
}

// Initialize filters
function initializeFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter workshops
            const filter = this.getAttribute('data-filter');
            renderWorkshops(filter);
        });
    });
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'programming': 'Programming',
        'data-science': 'Data Science',
        'web-dev': 'Web Development'
    };
    return categoryNames[category] || category;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Modal functionality
function initializeModal() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });

    // Close modal with close button
    closeModal.addEventListener('click', closeModalFunction);

    // Handle form submission
    bookingForm.addEventListener('submit', handleBookingSubmission);
}

// Open booking modal
function openBookingModal(workshopId) {
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop) {
        document.getElementById('workshopName').value = workshop.title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('firstName').focus();
        }, 100);
    }
}

// Close modal
function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    bookingForm.reset();
}

// Handle booking form submission
function handleBookingSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(bookingForm);
    const bookingData = {
        workshop: document.getElementById('workshopName').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        organization: document.getElementById('organization').value,
        experience: document.getElementById('experience').value,
        motivation: document.getElementById('motivation').value
    };

    // Show loading state
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="loading"></span> Processing...';
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Show success message
        showMessage('Booking submitted successfully! We will contact you soon.', 'success');
        closeModalFunction();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Log booking data (in real app, this would be sent to server)
        console.log('Booking submitted:', bookingData);
    }, 2000);
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// View workshop details
function viewWorkshopDetails(workshopId) {
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop) {
        const details = `
Workshop: ${workshop.title}
Instructor: ${workshop.instructor}
Duration: ${workshop.duration}
Date: ${formatDate(workshop.date)}
Seats Available: ${workshop.seats}
Price: ${workshop.price}

Description:
${workshop.description}
        `;
        alert(details);
    }
}

// Smooth scrolling
function initializeSmoothScrolling() {
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

// Scroll to workshops section
function scrollToWorkshops() {
    document.getElementById('workshops').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Scroll to about section
function scrollToAbout() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize animations
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
    document.querySelectorAll('.feature-card, .workshop-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animate workshop cards
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

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="loading"></span> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showMessage('Message sent successfully! We will get back to you soon.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showMessage('Thank you for subscribing to our newsletter!', 'success');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Search functionality (if needed)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const workshopCards = document.querySelectorAll('.workshop-card');
            
            workshopCards.forEach(card => {
                const title = card.querySelector('.workshop-title').textContent.toLowerCase();
                const description = card.querySelector('.workshop-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunction();
    }
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger-color)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    return isValid;
}

// Add form validation to booking form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                showMessage('Please fill in all required fields.', 'error');
            }
        });
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// Add loading states for better UX
function addLoadingState(element, text = 'Loading...') {
    const originalContent = element.innerHTML;
    element.innerHTML = `<span class="loading"></span> ${text}`;
    element.disabled = true;
    
    return function removeLoadingState() {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

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
