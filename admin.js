// Admin Panel JavaScript

// Theme Toggle for Admin Panel
const adminThemeToggle = document.getElementById('adminThemeToggle');
const adminThemeIcon = document.getElementById('adminThemeIcon');

// Check for saved theme preference
const adminCurrentTheme = localStorage.getItem('adminTheme') || 'dark';

// Apply saved theme on load
if (adminCurrentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (adminThemeIcon) {
        adminThemeIcon.className = 'fas fa-moon';
    }
}

// Theme toggle event listener
if (adminThemeToggle) {
    adminThemeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Update icon and save preference
        if (document.body.classList.contains('light-mode')) {
            adminThemeIcon.className = 'fas fa-moon';
            localStorage.setItem('adminTheme', 'light');
        } else {
            adminThemeIcon.className = 'fas fa-sun';
            localStorage.setItem('adminTheme', 'dark');
        }
    });
}

// Navigation Functions
function goToMainSite() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
}

function goToAdminLogin() {
    window.location.href = 'admin-login.html';
}

const ADMIN_CREDENTIALS = { username: 'admin', password: '1234' };

// Data Management
const DataManager = {
    getServices() {
        const data = localStorage.getItem('tanayServices');
        return data ? JSON.parse(data) : this.getDefaultServices();
    },

    saveServices(services) {
        localStorage.setItem('tanayServices', JSON.stringify(services));
    },

    getDefaultServices() {
        const services = [
            {
                id: 1,
                title: 'Market Research Analysis',
                icon: 'fas fa-chart-line',
                shortDesc: 'Deep-driven research with Tanay Agency to understand target audience and market trends.',
                fullDesc: 'Our comprehensive market research service provides deep insights into your target audience, competitors, and industry trends. We use advanced analytics and data-driven methodologies to help you make informed business decisions. Our team conducts thorough market analysis, customer surveys, and competitive intelligence to identify opportunities and mitigate risks.'
            },
            {
                id: 2,
                title: 'Web Development',
                icon: 'fas fa-code',
                shortDesc: 'Custom web applications built with cutting-edge technologies.',
                fullDesc: 'We build high-performance, scalable web applications using the latest technologies and frameworks. From simple landing pages to complex enterprise solutions, our development team delivers custom web applications that are responsive, secure, and optimized for performance. We specialize in React, Node.js, Python, and cloud-native architectures.'
            },
            {
                id: 3,
                title: 'Mobile App Development',
                icon: 'fas fa-mobile-alt',
                shortDesc: 'Native and cross-platform mobile applications.',
                fullDesc: 'Our mobile development team creates stunning native and cross-platform applications for iOS and Android. We focus on delivering exceptional user experiences, optimal performance, and seamless functionality. Whether you need a consumer-facing app or an enterprise mobility solution, we have the expertise to bring your vision to life.'
            },
            {
                id: 4,
                title: 'UI/UX Design',
                icon: 'fas fa-paint-brush',
                shortDesc: 'User-centered design that converts visitors into customers.',
                fullDesc: 'Great design is at the heart of every successful digital product. Our UI/UX design team creates intuitive, visually appealing interfaces that engage users and drive conversions. We conduct user research, create wireframes and prototypes, and iterate based on user feedback to ensure the best possible experience for your customers.'
            }
        ];
        this.saveServices(services);
        return services;
    },

    getProjects() {
        const data = localStorage.getItem('tanayProjects');
        return data ? JSON.parse(data) : this.getDefaultProjects();
    },

    saveProjects(projects) {
        localStorage.setItem('tanayProjects', JSON.stringify(projects));
    },

    getDefaultProjects() {
        const projects = [
            {
                id: 1,
                title: 'E-commerce Platform',
                category: 'ecommerce',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
                description: 'A full-featured e-commerce platform with advanced product management, secure payment processing, real-time inventory tracking, and personalized shopping experiences. Built with scalability and performance in mind.'
            },
            {
                id: 2,
                title: 'IoT Dashboard',
                category: 'iot',
                image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&h=400&fit=crop',
                description: 'Real-time IoT monitoring dashboard that collects, processes, and visualizes data from thousands of connected devices. Features include predictive analytics, automated alerts, and comprehensive reporting tools.'
            },
            {
                id: 3,
                title: 'SaaS Analytics Tool',
                category: 'saas',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                description: 'Cloud-based analytics platform providing businesses with actionable insights through advanced data visualization, custom reporting, and AI-powered predictions.'
            },
            {
                id: 4,
                title: 'Mobile Banking App',
                category: 'fintech',
                image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop',
                description: 'Secure and user-friendly mobile banking application with features like account management, fund transfers, bill payments, investment tracking, and biometric authentication.'
            },
            {
                id: 5,
                title: 'Corporate Website',
                category: 'web',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
                description: 'Modern corporate website with dynamic content management, multi-language support, SEO optimization, and integration with CRM and marketing automation tools.'
            },
            {
                id: 6,
                title: 'Fitness Tracking App',
                category: 'mobile',
                image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop',
                description: 'Comprehensive fitness tracking application with workout planning, nutrition monitoring, progress tracking, social features, and integration with wearable devices.'
            }
        ];
        this.saveProjects(projects);
        return projects;
    },

    getTestimonials() {
        const data = localStorage.getItem('tanayTestimonials');
        return data ? JSON.parse(data) : this.getDefaultTestimonials();
    },

    saveTestimonials(testimonials) {
        localStorage.setItem('tanayTestimonials', JSON.stringify(testimonials));
    },

    getDefaultTestimonials() {
        const testimonials = [
            {
                id: 1,
                name: 'Sarah Johnson',
                role: 'CEO, TechStart Inc.',
                feedback: 'Tanay Agency transformed our online presence completely. Their team delivered beyond our expectations with incredible attention to detail.',
                rating: 5
            },
            {
                id: 2,
                name: 'Michael Chen',
                role: 'Founder, InnovateLab',
                feedback: 'Working with Tanay Agency was a game-changer for our business. They understood our vision and brought it to life perfectly.',
                rating: 5
            },
            {
                id: 3,
                name: 'Emily Rodriguez',
                role: 'Product Manager, AppVenture',
                feedback: 'Exceptional quality and professionalism. Our mobile app exceeded all expectations and our users love it!',
                rating: 5
            },
            {
                id: 4,
                name: 'David Park',
                role: 'Marketing Director, GrowthCo',
                feedback: 'The UI/UX design work was outstanding. Our conversion rates increased by 150% after the redesign.',
                rating: 5
            },
            {
                id: 5,
                name: 'Lisa Thompson',
                role: 'CTO, DigitalFirst',
                feedback: 'From concept to launch, Tanay Agency provided exceptional service. Highly recommend their web development team!',
                rating: 5
            }
        ];
        this.saveTestimonials(testimonials);
        return testimonials;
    },

    getStats() {
        const data = localStorage.getItem('tanayStats');
        return data ? JSON.parse(data) : { projects: 150, clients: 80, experience: 10, team: 25 };
    },

    saveStats(stats) {
        localStorage.setItem('tanayStats', JSON.stringify(stats));
    },

    getMessages() {
        const data = localStorage.getItem('tanayMessages');
        return data ? JSON.parse(data) : [];
    },

    saveMessage(message) {
        const messages = this.getMessages();
        messages.push({ ...message, id: Date.now(), date: new Date().toISOString() });
        localStorage.setItem('tanayMessages', JSON.stringify(messages));
    }
};

// Alert System
function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    if (alert) {
        alert.textContent = message;
        alert.className = `alert ${type} show`;
        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    }
}

// Login Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('loginError');

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'admin.html';
        } else {
            errorEl.textContent = 'Invalid credentials. Please try again.';
        }
    });
}

// Check authentication
function checkAuth() {
    if (window.location.pathname.includes('admin.html') && !localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html';
    }
}

checkAuth();

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    });
}

// Navigation
function showSection(sectionName) {
    if (window.location.pathname.includes('admin.html')) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        document.getElementById(`${sectionName}-section`).classList.add('active');
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        document.getElementById('pageTitle').textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
        
        loadSectionData(sectionName);
    }
}

if (window.location.pathname.includes('admin.html')) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
        });
    });
}

// Load Section Data
function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'services':
            renderServices();
            break;
        case 'projects':
            renderProjects();
            break;
        case 'testimonials':
            renderTestimonials();
            break;
        case 'stats':
            loadStats();
            break;
        case 'messages':
            renderMessages();
            break;
    }
}

// Dashboard
function loadDashboard() {
    const services = DataManager.getServices();
    const projects = DataManager.getProjects();
    const testimonials = DataManager.getTestimonials();
    const messages = DataManager.getMessages();

    document.getElementById('totalServices').textContent = services.length;
    document.getElementById('totalProjects').textContent = projects.length;
    document.getElementById('totalTestimonials').textContent = testimonials.length;
    document.getElementById('totalMessages').textContent = messages.length;
}

// Services CRUD
function renderServices(filter = '') {
    const services = DataManager.getServices();
    const container = document.getElementById('servicesList');
    
    const filtered = services.filter(s => 
        s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(filter.toLowerCase())
    );

    container.innerHTML = filtered.map(service => `
        <div class="data-card">
            <div class="data-info">
                <h3><i class="${service.icon}" style="margin-right: 10px; color: var(--primary);"></i>${service.title}</h3>
                <p>${service.shortDesc}</p>
            </div>
            <div class="data-actions">
                <button class="btn-edit" onclick="editService(${service.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-danger" onclick="deleteService(${service.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function openServiceModal(service = null) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('modalForm');

    title.textContent = service ? 'Edit Service' : 'Add Service';
    
    form.innerHTML = `
        <div class="form-group">
            <label>Service Title</label>
            <input type="text" id="serviceTitle" value="${service ? service.title : ''}" required>
        </div>
        <div class="form-group">
            <label>Icon Class (FontAwesome)</label>
            <input type="text" id="serviceIcon" value="${service ? service.icon : 'fas fa-cog'}" required>
        </div>
        <div class="form-group">
            <label>Short Description</label>
            <textarea id="serviceShortDesc" rows="3" required>${service ? service.shortDesc : ''}</textarea>
        </div>
        <div class="form-group">
            <label>Full Description</label>
            <textarea id="serviceFullDesc" rows="5" required>${service ? service.fullDesc : ''}</textarea>
        </div>
        <button type="submit" class="btn-primary">
            <i class="fas fa-save"></i> ${service ? 'Update' : 'Add'} Service
        </button>
    `;

    form.onsubmit = (e) => {
        e.preventDefault();
        const services = DataManager.getServices();
        
        const serviceData = {
            id: service ? service.id : Date.now(),
            title: document.getElementById('serviceTitle').value,
            icon: document.getElementById('serviceIcon').value,
            shortDesc: document.getElementById('serviceShortDesc').value,
            fullDesc: document.getElementById('serviceFullDesc').value
        };

        if (service) {
            const index = services.findIndex(s => s.id === service.id);
            services[index] = serviceData;
        } else {
            services.push(serviceData);
        }

        DataManager.saveServices(services);
        closeModal();
        renderServices();
        showAlert('Service saved successfully!');
    };

    modal.classList.add('active');
}

function editService(id) {
    const services = DataManager.getServices();
    const service = services.find(s => s.id === id);
    openServiceModal(service);
}

function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        let services = DataManager.getServices();
        services = services.filter(s => s.id !== id);
        DataManager.saveServices(services);
        renderServices();
        showAlert('Service deleted successfully!');
    }
}

// Projects CRUD
function renderProjects(filter = '', category = 'all') {
    const projects = DataManager.getProjects();
    const container = document.getElementById('projectsList');
    
    let filtered = projects;
    if (filter) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));
    }
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }

    container.innerHTML = filtered.map(project => `
        <div class="data-card">
            <div class="data-info">
                <h3>${project.title}</h3>
                <p>Category: ${project.category} | <a href="project-details.html?id=${project.id}" target="_blank" style="color: var(--primary);">View Details</a></p>
            </div>
            <div class="data-actions">
                <button class="btn-edit" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function openProjectModal(project = null) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('modalForm');

    title.textContent = project ? 'Edit Project' : 'Add Project';
    
    form.innerHTML = `
        <div class="form-group">
            <label>Project Title</label>
            <input type="text" id="projectTitle" value="${project ? project.title : ''}" required>
        </div>
        <div class="form-group">
            <label>Category</label>
            <select id="projectCategory" required>
                <option value="web" ${project && project.category === 'web' ? 'selected' : ''}>Web Applications</option>
                <option value="ecommerce" ${project && project.category === 'ecommerce' ? 'selected' : ''}>E-commerce</option>
                <option value="iot" ${project && project.category === 'iot' ? 'selected' : ''}>IoT</option>
                <option value="saas" ${project && project.category === 'saas' ? 'selected' : ''}>SaaS</option>
                <option value="mobile" ${project && project.category === 'mobile' ? 'selected' : ''}>Mobile Apps</option>
                <option value="fintech" ${project && project.category === 'fintech' ? 'selected' : ''}>FinTech</option>
            </select>
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="projectImage" value="${project ? project.image : ''}" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="projectDesc" rows="5" required>${project ? project.description : ''}</textarea>
        </div>
        <button type="submit" class="btn-primary">
            <i class="fas fa-save"></i> ${project ? 'Update' : 'Add'} Project
        </button>
    `;

    form.onsubmit = (e) => {
        e.preventDefault();
        const projects = DataManager.getProjects();
        
        const projectData = {
            id: project ? project.id : Date.now(),
            title: document.getElementById('projectTitle').value,
            category: document.getElementById('projectCategory').value,
            image: document.getElementById('projectImage').value,
            description: document.getElementById('projectDesc').value
        };

        if (project) {
            const index = projects.findIndex(p => p.id === project.id);
            projects[index] = projectData;
        } else {
            projects.push(projectData);
        }

        DataManager.saveProjects(projects);
        closeModal();
        renderProjects();
        showAlert('Project saved successfully!');
    };

    modal.classList.add('active');
}

function editProject(id) {
    const projects = DataManager.getProjects();
    const project = projects.find(p => p.id === id);
    openProjectModal(project);
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        let projects = DataManager.getProjects();
        projects = projects.filter(p => p.id !== id);
        DataManager.saveProjects(projects);
        renderProjects();
        showAlert('Project deleted successfully!');
    }
}

// Testimonials CRUD
function renderTestimonials() {
    const testimonials = DataManager.getTestimonials();
    const container = document.getElementById('testimonialsList');

    container.innerHTML = testimonials.map(t => `
        <div class="data-card">
            <div class="data-info">
                <h3>${t.name} - ${t.role}</h3>
                <p>${'⭐'.repeat(t.rating)} | "${t.feedback.substring(0, 100)}..."</p>
            </div>
            <div class="data-actions">
                <button class="btn-edit" onclick="editTestimonial(${t.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-danger" onclick="deleteTestimonial(${t.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function openTestimonialModal(testimonial = null) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('modalForm');

    title.textContent = testimonial ? 'Edit Testimonial' : 'Add Testimonial';
    
    form.innerHTML = `
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="testimonialName" value="${testimonial ? testimonial.name : ''}" required>
        </div>
        <div class="form-group">
            <label>Role/Company</label>
            <input type="text" id="testimonialRole" value="${testimonial ? testimonial.role : ''}" required>
        </div>
        <div class="form-group">
            <label>Feedback</label>
            <textarea id="testimonialFeedback" rows="4" required>${testimonial ? testimonial.feedback : ''}</textarea>
        </div>
        <div class="form-group">
            <label>Rating (1-5)</label>
            <input type="number" id="testimonialRating" min="1" max="5" value="${testimonial ? testimonial.rating : 5}" required>
        </div>
        <button type="submit" class="btn-primary">
            <i class="fas fa-save"></i> ${testimonial ? 'Update' : 'Add'} Testimonial
        </button>
    `;

    form.onsubmit = (e) => {
        e.preventDefault();
        const testimonials = DataManager.getTestimonials();
        
        const data = {
            id: testimonial ? testimonial.id : Date.now(),
            name: document.getElementById('testimonialName').value,
            role: document.getElementById('testimonialRole').value,
            feedback: document.getElementById('testimonialFeedback').value,
            rating: parseInt(document.getElementById('testimonialRating').value)
        };

        if (testimonial) {
            const index = testimonials.findIndex(t => t.id === testimonial.id);
            testimonials[index] = data;
        } else {
            testimonials.push(data);
        }

        DataManager.saveTestimonials(testimonials);
        closeModal();
        renderTestimonials();
        showAlert('Testimonial saved successfully!');
    };

    modal.classList.add('active');
}

function editTestimonial(id) {
    const testimonials = DataManager.getTestimonials();
    const testimonial = testimonials.find(t => t.id === id);
    openTestimonialModal(testimonial);
}

function deleteTestimonial(id) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        let testimonials = DataManager.getTestimonials();
        testimonials = testimonials.filter(t => t.id !== id);
        DataManager.saveTestimonials(testimonials);
        renderTestimonials();
        showAlert('Testimonial deleted successfully!');
    }
}

// Stats Management
function loadStats() {
    const stats = DataManager.getStats();
    document.getElementById('statProjects').value = stats.projects;
    document.getElementById('statClients').value = stats.clients;
    document.getElementById('statExperience').value = stats.experience;
    document.getElementById('statTeam').value = stats.team;
}

const statsForm = document.getElementById('statsForm');
if (statsForm) {
    statsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const stats = {
            projects: parseInt(document.getElementById('statProjects').value),
            clients: parseInt(document.getElementById('statClients').value),
            experience: parseInt(document.getElementById('statExperience').value),
            team: parseInt(document.getElementById('statTeam').value)
        };
        DataManager.saveStats(stats);
        showAlert('Statistics updated successfully!');
    });
}

// Messages
function renderMessages() {
    const messages = DataManager.getMessages();
    const container = document.getElementById('messagesList');

    if (messages.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No messages yet</p>';
        return;
    }

    container.innerHTML = messages.map(m => `
        <div class="message-card">
            <div class="message-header">
                <h3>${m.name}</h3>
                <span class="date">${new Date(m.date).toLocaleDateString()}</span>
            </div>
            <div class="message-details">
                <p><strong>Email:</strong> ${m.email}</p>
                <p><strong>Phone:</strong> ${m.phone}</p>
                <p><strong>Address:</strong> ${m.address}</p>
            </div>
            <div class="message-content">
                <p>${m.message}</p>
            </div>
        </div>
    `).join('');
}

// Modal Controls
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Search Handlers
const searchServices = document.getElementById('searchServices');
if (searchServices) {
    searchServices.addEventListener('input', (e) => {
        renderServices(e.target.value);
    });
}

const searchProjects = document.getElementById('searchProjects');
if (searchProjects) {
    searchProjects.addEventListener('input', (e) => {
        const category = document.getElementById('filterCategory').value;
        renderProjects(e.target.value, category);
    });
}

const filterCategory = document.getElementById('filterCategory');
if (filterCategory) {
    filterCategory.addEventListener('change', (e) => {
        const search = document.getElementById('searchProjects').value;
        renderProjects(search, e.target.value);
    });
}

// Initialize
if (window.location.pathname.includes('admin.html')) {
    loadDashboard();
}