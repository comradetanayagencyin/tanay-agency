// Page Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on load
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.textContent = '☀️';
    }
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon and save preference
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Smart Back Button Functionality
function goBack() {
    if (window.history.length > 1 && document.referrer) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animated Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const stats = localStorage.getItem('tanayStats');
    const statsData = stats ? JSON.parse(stats) : { projects: 150, clients: 80, experience: 10, team: 25 };
    
    const targets = [statsData.projects, statsData.clients, statsData.experience, statsData.team];
    const speed = 200;

    counters.forEach((counter, index) => {
        const target = targets[index] || +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 20);
        } else {
            counter.innerText = target + '+';
        }
    });
}

// Trigger counter animation when stats section is in view
let counted = false;
const statsSection = document.querySelector('.stats');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            animateCounters();
            counted = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    countObserver.observe(statsSection);
}

// Portfolio
const portfolioData = [];

// Load projects from localStorage or use default
function loadProjects() {
    const data = localStorage.getItem('tanayProjects');
    if (data) {
        return JSON.parse(data);
    }
    // If no data in localStorage, initialize with defaults
    const defaultProjects = [
        {
            id: 1,
            title: 'E-commerce Platform',
            category: 'ecommerce',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
            description: 'A full-featured e-commerce platform with advanced product management, secure payment processing, real-time inventory tracking, and personalized shopping experiences.'
        },
        {
            id: 2,
            title: 'IoT Dashboard',
            category: 'iot',
            image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&h=400&fit=crop',
            description: 'Real-time IoT monitoring dashboard that collects, processes, and visualizes data from thousands of connected devices.'
        },
        {
            id: 3,
            title: 'SaaS Analytics Tool',
            category: 'saas',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
            description: 'Cloud-based analytics platform providing businesses with actionable insights through advanced data visualization.'
        },
        {
            id: 4,
            title: 'Mobile Banking App',
            category: 'fintech',
            image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop',
            description: 'Secure and user-friendly mobile banking application with account management, fund transfers, and biometric authentication.'
        },
        {
            id: 5,
            title: 'Corporate Website',
            category: 'web',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            description: 'Modern corporate website with dynamic content management, multi-language support, and SEO optimization.'
        },
        {
            id: 6,
            title: 'Fitness Tracking App',
            category: 'mobile',
            image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop',
            description: 'Comprehensive fitness tracking application with workout planning, nutrition monitoring, and social features.'
        }
    ];
    localStorage.setItem('tanayProjects', JSON.stringify(defaultProjects));
    return defaultProjects;
}

function saveProjects(projects) {
    localStorage.setItem('tanayProjects', JSON.stringify(projects));
}

function renderProjects(filter = 'all') {
    const grid = document.getElementById('portfolioGrid');
    const projects = loadProjects();
    
    grid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    filteredProjects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'portfolio-item fade-in';
        item.style.animationDelay = `${index * 0.1}s`;
        item.innerHTML = `
            <a href="project-details.html?id=${project.id}" style="text-decoration: none; color: inherit;">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(project.title)}'">
                <div class="portfolio-overlay">
                    <h3>${project.title}</h3>
                    <p>${getCategoryName(project.category)}</p>
                </div>
            </a>
        `;
        grid.appendChild(item);
    });
    
    // Trigger fade-in animation with smooth transition
    setTimeout(() => {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.classList.add('visible');
        });
    }, 100);
}

function getCategoryName(category) {
    const categories = {
        'web': 'Web Applications',
        'ecommerce': 'E-commerce',
        'iot': 'IoT',
        'saas': 'SaaS',
        'mobile': 'Mobile Apps',
        'fintech': 'FinTech'
    };
    return categories[category] || category;
}

// Portfolio filters with smooth animation
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        
        // Add fade-out effect
        const grid = document.getElementById('portfolioGrid');
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            renderProjects(filter);
            grid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            grid.style.opacity = '1';
            grid.style.transform = 'translateY(0)';
        }, 300);
    });
});

// Initial render
renderProjects();
renderServices();

// Render Services Dynamically
function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    let services = localStorage.getItem('tanayServices');
    if (!services) {
        // Initialize with default services
        const defaultServices = [
            {
                id: 1,
                title: 'Market Research Analysis',
                icon: 'fas fa-chart-line',
                shortDesc: 'Deep-driven research with Tanay Agency to understand target audience and market trends.',
                fullDesc: 'Our comprehensive market research service provides deep insights into your target audience, competitors, and industry trends.'
            },
            {
                id: 2,
                title: 'Web Development',
                icon: 'fas fa-code',
                shortDesc: 'Custom web applications built with cutting-edge technologies.',
                fullDesc: 'We build high-performance, scalable web applications using the latest technologies and frameworks.'
            },
            {
                id: 3,
                title: 'Mobile App Development',
                icon: 'fas fa-mobile-alt',
                shortDesc: 'Native and cross-platform mobile applications.',
                fullDesc: 'Our mobile development team creates stunning native and cross-platform applications for iOS and Android.'
            },
            {
                id: 4,
                title: 'UI/UX Design',
                icon: 'fas fa-paint-brush',
                shortDesc: 'User-centered design that converts visitors into customers.',
                fullDesc: 'Great design is at the heart of every successful digital product. Our UI/UX design team creates intuitive, visually appealing interfaces.'
            }
        ];
        localStorage.setItem('tanayServices', JSON.stringify(defaultServices));
        services = JSON.stringify(defaultServices);
    } else {
        services = JSON.parse(services);
    }
    
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card fade-in">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.shortDesc}</p>
            <a href="service-details.html?id=${service.id}" class="btn btn-outline">Learn More</a>
        </div>
    `).join('');
    
    // Trigger fade-in animations
    setTimeout(() => {
        observeFadeIns();
    }, 100);
}

// Admin - Add New Project
const addProjectForm = document.getElementById('addProjectForm');

if (addProjectForm) {
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('projectTitle').value;
        const category = document.getElementById('projectCategory').value;
        const image = document.getElementById('projectImage').value;
        
        const projects = loadProjects();
        const newProject = {
            id: projects.length + 1,
            title,
            category,
            image
        };
        
        projects.push(newProject);
        saveProjects(projects);
        
        // Reset form
        addProjectForm.reset();
        
        // Re-render portfolio
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        renderProjects(activeFilter);
        
        alert('Project added successfully!');
    });
}

// Admin toggle (press Ctrl+Shift+A to show/hide)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const adminSection = document.getElementById('admin');
        adminSection.style.display = adminSection.style.display === 'none' ? 'block' : 'none';
    }
});

// Contact Form Validation with Real-time Feedback
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');

// Validation Rules
const validationRules = {
    name: {
        required: true,
        minLength: 3,
        message: 'Name must be at least 3 characters'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        required: true,
        pattern: /^[0-9+\-\s()]{10,}$/,
        minLength: 10,
        message: 'Please enter a valid phone number (min 10 digits)'
    },
    subject: {
        required: true,
        minLength: 1,
        message: 'Subject is required'
    },
    message: {
        required: true,
        minLength: 10,
        message: 'Message must be at least 10 characters'
    }
};

// Real-time validation on input/blur
function setupRealTimeValidation() {
    const fields = [
        { input: 'contactName', error: 'nameError', rule: 'name' },
        { input: 'contactEmail', error: 'emailError', rule: 'email' },
        { input: 'contactPhone', error: 'phoneError', rule: 'phone' },
        { input: 'contactSubject', error: 'subjectError', rule: 'subject' },
        { input: 'contactMessage', error: 'messageError', rule: 'message' }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.input);
        if (!input) return;

        // Validate on blur
        input.addEventListener('blur', () => {
            validateField(field.input, field.error, field.rule);
        });

        // Validate on input (after first blur)
        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error') || 
                input.parentElement.classList.contains('success')) {
                validateField(field.input, field.error, field.rule);
            }
        });
    });
}

// Validate single field
function validateField(inputId, errorId, ruleName) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    const parent = input.parentElement;
    const rule = validationRules[ruleName];
    const value = input.value.trim();

    // Clear previous states
    parent.classList.remove('error', 'success');
    const successIcon = parent.querySelector('.success-icon');
    if (successIcon) successIcon.classList.remove('show');

    // Check if required and empty
    if (rule.required && !value) {
        showError(parent, errorEl, 'This field is required');
        return false;
    }

    // Check minimum length
    if (rule.minLength && value.length < rule.minLength) {
        showError(parent, errorEl, rule.message);
        return false;
    }

    // Check pattern
    if (rule.pattern && !rule.pattern.test(value)) {
        showError(parent, errorEl, rule.message);
        return false;
    }

    // Success
    showSuccess(parent, successIcon);
    return true;
}

function showError(parent, errorEl, message) {
    parent.classList.add('error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function showSuccess(parent, successIcon) {
    parent.classList.remove('error');
    parent.classList.add('success');
    const errorEl = parent.querySelector('.error-message');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }
    if (successIcon) {
        successIcon.classList.add('show');
    }
}

if (contactForm) {
    // Setup real-time validation
    setupRealTimeValidation();

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors();
        
        // Validate all required fields
        const isNameValid = validateField('contactName', 'nameError', 'name');
        const isEmailValid = validateField('contactEmail', 'emailError', 'email');
        const isPhoneValid = validateField('contactPhone', 'phoneError', 'phone');
        const isSubjectValid = validateField('contactSubject', 'subjectError', 'subject');
        const isMessageValid = validateField('contactMessage', 'messageError', 'message');
        
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid || !isMessageValid) {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Get form values
        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            phone: document.getElementById('contactPhone').value.trim(),
            company: document.getElementById('contactCompany').value.trim(),
            subject: document.getElementById('contactSubject').value.trim(),
            address: document.getElementById('contactAddress').value.trim(),
            message: document.getElementById('contactMessage').value.trim()
        };
        
        // Save message to localStorage
        const messages = localStorage.getItem('tanayMessages');
        const messagesArray = messages ? JSON.parse(messages) : [];
        messagesArray.push({ 
            ...formData, 
            id: Date.now(), 
            date: new Date().toISOString() 
        });
        localStorage.setItem('tanayMessages', JSON.stringify(messagesArray));
        
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message with animation
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            clearAllErrors();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    });
}

function clearAllErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const successIcon = group.querySelector('.success-icon');
        if (successIcon) successIcon.classList.remove('show');
    });
}

// Testimonials Carousel
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = 5;

function updateCarousel() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
}

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

// Scroll animations with Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Add fade-in class to sections
const sectionsToAnimate = document.querySelectorAll('.service-card, .stat-item, .section-header');
sectionsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// Re-observe after dynamic content
setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(element => {
        fadeObserver.observe(element);
    });
}, 500);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(139, 92, 246, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = '0 4px 30px rgba(139, 92, 246, 0.1)';
    }
});

// Add hover sound effect (optional enhancement)
const hoverElements = document.querySelectorAll('.btn, .service-card, .portfolio-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});