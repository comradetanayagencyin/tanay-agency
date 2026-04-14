// Dynamic Details Pages JavaScript

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
    // Add fade-out animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        // Check if there's history to go back to
        if (window.history.length > 1 && document.referrer) {
            window.history.back();
        } else {
            // Fallback to homepage
            window.location.href = 'index.html';
        }
    }, 300);
}

// Initialize fade-in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Fade-in Animation Observer
function observeFadeIns() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

// Dynamic Breadcrumb Update
function updateBreadcrumb(pageTitle) {
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    if (breadcrumbCurrent && pageTitle) {
        breadcrumbCurrent.textContent = pageTitle;
    }
}

const DataManager = {
    getServices() {
        const data = localStorage.getItem('tanayServices');
        return data ? JSON.parse(data) : [];
    },

    getProjects() {
        const data = localStorage.getItem('tanayProjects');
        return data ? JSON.parse(data) : [];
    },

    getStats() {
        const data = localStorage.getItem('tanayStats');
        return data ? JSON.parse(data) : { projects: 150, clients: 80, experience: 10, team: 25 };
    }
};

// Load Service Details - Premium Case Study Layout
function loadServiceDetails() {
    const params = new URLSearchParams(window.location.search);
    const serviceId = parseInt(params.get('id'));
    
    if (!serviceId) {
        window.location.href = 'index.html#services';
        return;
    }

    const services = DataManager.getServices();
    const service = services.find(s => s.id === serviceId);

    if (!service) {
        window.location.href = 'index.html#services';
        return;
    }

    // Update hero section
    const heroIcon = document.getElementById('serviceHeroIcon');
    const heroTitle = document.getElementById('serviceHeroTitle');
    const heroSubtitle = document.getElementById('serviceHeroSubtitle');
    
    if (heroIcon) {
        heroIcon.innerHTML = `<i class="${service.icon}"></i>`;
    }
    if (heroTitle) {
        heroTitle.textContent = service.title;
    }
    if (heroSubtitle) {
        heroSubtitle.textContent = service.shortDesc;
    }
    
    // Update breadcrumb
    updateBreadcrumb(service.title);

    const container = document.getElementById('serviceDetails');
    if (container) {
        // Service-specific content based on type
        const serviceContent = getServiceContent(service.title);

        container.innerHTML = `
            <!-- Overview Section -->
            <div class="project-description-section fade-in">
                <h2>Service Overview</h2>
                <p>${service.fullDesc}</p>
                <p>${serviceContent.overview}</p>
            </div>

            <!-- What We Offer -->
            <div class="project-description-section fade-in">
                <h2>What We Offer</h2>
                <div class="features-grid">
                    ${serviceContent.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Our Process -->
            <div class="project-description-section fade-in">
                <h2>Our Process</h2>
                <p>We follow a proven methodology to ensure every project is delivered with excellence and precision.</p>
                <div class="process-steps">
                    ${serviceContent.process.map((step, index) => `
                        <div class="process-step">
                            <div class="step-number">${index + 1}</div>
                            <h3>${step.title}</h3>
                            <p>${step.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Technologies Used -->
            <div class="project-description-section fade-in">
                <h2>Technologies We Use</h2>
                <p>We leverage the latest technologies and frameworks to build robust, scalable solutions.</p>
                <div class="tech-tags">
                    ${serviceContent.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>

            <!-- Benefits -->
            <div class="project-description-section fade-in">
                <h2>Why Choose This Service?</h2>
                <div class="benefits-grid">
                    ${serviceContent.benefits.map(benefit => `
                        <div class="benefit-card">
                            <i class="${benefit.icon}"></i>
                            <h3>${benefit.title}</h3>
                            <p>${benefit.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Call to Action -->
            <div class="project-cta fade-in">
                <h2>Ready to Get Started?</h2>
                <p>Let's discuss how we can help transform your business with our expert ${service.title.toLowerCase()} services.</p>
                <div class="project-cta-buttons">
                    <a href="index.html#contact" class="btn btn-primary">
                        <i class="fas fa-rocket"></i> Start Your Project
                    </a>
                    <a href="index.html#portfolio" class="btn btn-secondary">
                        <i class="fas fa-th-large"></i> View Our Work
                    </a>
                </div>
            </div>
        `;

        // Trigger fade-in animations
        setTimeout(() => {
            observeFadeIns();
        }, 100);
    }
}

// Service-specific content generator
function getServiceContent(serviceTitle) {
    const contentMap = {
        'Market Research Analysis': {
            overview: 'Our market research analysis service provides deep insights into your target audience, competitors, and industry trends. We use advanced analytics tools and methodologies to gather actionable data that drives strategic decision-making. Whether you are launching a new product, entering a new market, or optimizing your current strategy, our research helps you make informed decisions with confidence.',
            features: [
                'Comprehensive market size and growth analysis',
                'Competitor benchmarking and positioning studies',
                'Customer behavior and preference mapping',
                'Industry trend forecasting and opportunity identification',
                'Actionable insights and strategic recommendations',
                'Detailed reports with data visualizations'
            ],
            process: [
                { title: 'Research & Discovery', description: 'We begin by understanding your business objectives and identifying key research questions that need to be answered.' },
                { title: 'Data Collection', description: 'Using surveys, interviews, and secondary research, we gather comprehensive data from multiple sources.' },
                { title: 'Analysis & Insights', description: 'Our analysts process the data using advanced statistical methods to uncover patterns and insights.' },
                { title: 'Strategy Development', description: 'We translate insights into actionable strategies tailored to your business goals.' },
                { title: 'Delivery & Support', description: 'You receive a comprehensive report with presentations and ongoing consultation support.' }
            ],
            technologies: ['Google Analytics', 'SEMrush', 'SurveyMonkey', 'Tableau', 'SPSS', 'Excel', 'PowerBI'],
            benefits: [
                { icon: 'fas fa-chart-line', title: 'Data-Driven Decisions', description: 'Make informed choices backed by real market data and analytics.' },
                { icon: 'fas fa-bullseye', title: 'Targeted Strategy', description: 'Focus your resources on opportunities with the highest ROI potential.' },
                { icon: 'fas fa-shield-alt', title: 'Risk Reduction', description: 'Identify potential challenges before they impact your business.' },
                { icon: 'fas fa-trophy', title: 'Competitive Advantage', description: 'Stay ahead of competitors with insights they do not have.' }
            ]
        },
        'Web Development': {
            overview: 'We build high-performance, scalable web applications using the latest technologies and frameworks. Our development team creates custom solutions that are optimized for speed, security, and user experience. From simple landing pages to complex enterprise applications, we deliver web solutions that drive business growth and enhance user engagement.',
            features: [
                'Custom web application development',
                'Responsive and mobile-first design',
                'E-commerce platform development',
                'Content management systems (CMS)',
                'API development and integration',
                'Performance optimization and SEO'
            ],
            process: [
                { title: 'Requirements Gathering', description: 'We work closely with you to understand your needs, goals, and technical requirements.' },
                { title: 'Planning & Architecture', description: 'Our team designs the system architecture and creates a detailed project roadmap.' },
                { title: 'Development', description: 'We build your application using modern frameworks and best coding practices.' },
                { title: 'Testing & QA', description: 'Rigorous testing ensures your application is bug-free and performs optimally.' },
                { title: 'Launch & Support', description: 'We deploy your application and provide ongoing maintenance and support.' }
            ],
            technologies: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
            benefits: [
                { icon: 'fas fa-tachometer-alt', title: 'High Performance', description: 'Lightning-fast load times and smooth user experiences.' },
                { icon: 'fas fa-lock', title: 'Secure & Reliable', description: 'Enterprise-grade security to protect your data and users.' },
                { icon: 'fas fa-expand-arrows-alt', title: 'Scalable Solutions', description: 'Architecture that grows with your business needs.' },
                { icon: 'fas fa-mobile-alt', title: 'Mobile Optimized', description: 'Perfect experience across all devices and screen sizes.' }
            ]
        },
        'Mobile App Development': {
            overview: 'Our mobile development team creates stunning native and cross-platform applications for iOS and Android. We focus on delivering apps that are intuitive, performant, and visually appealing. From concept to launch, we handle every aspect of mobile app development, ensuring your app stands out in the competitive app marketplace.',
            features: [
                'Native iOS and Android development',
                'Cross-platform app development',
                'UI/UX design for mobile',
                'App store optimization (ASO)',
                'Push notification integration',
                'Offline functionality and caching'
            ],
            process: [
                { title: 'Concept & Strategy', description: 'We help refine your app idea and develop a strategy for market success.' },
                { title: 'Design & Prototyping', description: 'Our designers create wireframes and interactive prototypes for validation.' },
                { title: 'Development', description: 'We build your app using native or cross-platform technologies.' },
                { title: 'Testing & Optimization', description: 'Comprehensive testing across devices ensures flawless performance.' },
                { title: 'Launch & Marketing', description: 'We help you launch and optimize your app for maximum visibility.' }
            ],
            technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'iOS', 'Android'],
            benefits: [
                { icon: 'fas fa-mobile-alt', title: 'Native Performance', description: 'Optimized apps that leverage device capabilities fully.' },
                { icon: 'fas fa-users', title: 'User Engagement', description: 'Features that keep users coming back to your app.' },
                { icon: 'fas fa-dollar-sign', title: 'Revenue Generation', description: 'Monetization strategies integrated into your app.' },
                { icon: 'fas fa-sync-alt', title: 'Regular Updates', description: 'Continuous improvement based on user feedback.' }
            ]
        },
        'UI/UX Design': {
            overview: 'Great design is at the heart of every successful digital product. Our UI/UX design team creates intuitive, visually appealing interfaces that delight users and drive conversions. We combine aesthetic excellence with user-centered design principles to create experiences that are both beautiful and functional.',
            features: [
                'User research and persona development',
                'Wireframing and prototyping',
                'Visual design and branding',
                'Usability testing and optimization',
                'Design system creation',
                'Interaction and motion design'
            ],
            process: [
                { title: 'User Research', description: 'We study your target audience to understand their needs, behaviors, and pain points.' },
                { title: 'Information Architecture', description: 'We organize content and features in a logical, user-friendly structure.' },
                { title: 'Wireframing', description: 'Low-fidelity layouts help us test and refine the user flow.' },
                { title: 'Visual Design', description: 'We create beautiful, on-brand designs that engage and convert.' },
                { title: 'Testing & Iteration', description: 'We test with real users and refine based on feedback.' }
            ],
            technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer', 'Zeplin'],
            benefits: [
                { icon: 'fas fa-smile', title: 'User Satisfaction', description: 'Designs that users love and find easy to use.' },
                { icon: 'fas fa-chart-line', title: 'Higher Conversions', description: 'Strategic design that drives business results.' },
                { icon: 'fas fa-palette', title: 'Brand Consistency', description: 'Cohesive design across all touchpoints.' },
                { icon: 'fas fa-handshake', title: 'Customer Loyalty', description: 'Great experiences that build long-term relationships.' }
            ]
        }
    };

    // Default content for any service not in the map
    return contentMap[serviceTitle] || {
        overview: 'Our comprehensive service is designed to help your business achieve its goals through innovative solutions and expert execution. We combine industry best practices with creative thinking to deliver results that exceed expectations. Our team works closely with you to understand your unique challenges and develop tailored strategies that drive measurable success.',
        features: [
            'Professional consultation and strategy development',
            'Customized solutions tailored to your needs',
            'Dedicated project management team',
            '24/7 support and maintenance',
            'Regular progress updates and reporting',
            'Quality assurance and testing'
        ],
        process: [
            { title: 'Discovery & Research', description: 'We start by understanding your business, goals, and challenges through in-depth consultation.' },
            { title: 'Planning & Strategy', description: 'Our team develops a comprehensive plan aligned with your objectives and timeline.' },
            { title: 'Execution & Development', description: 'We implement the strategy using proven methodologies and best practices.' },
            { title: 'Testing & Refinement', description: 'Rigorous testing ensures everything works perfectly before launch.' },
            { title: 'Delivery & Support', description: 'We deliver the final solution and provide ongoing support for success.' }
        ],
        technologies: ['Industry Best Practices', 'Modern Tools', 'Advanced Analytics', 'Cloud Platforms', 'Automation'],
        benefits: [
            { icon: 'fas fa-award', title: 'Proven Expertise', description: 'Years of experience delivering successful projects.' },
            { icon: 'fas fa-users', title: 'Expert Team', description: 'Skilled professionals dedicated to your success.' },
            { icon: 'fas fa-rocket', title: 'Fast Delivery', description: 'Efficient processes ensure on-time completion.' },
            { icon: 'fas fa-headset', title: 'Ongoing Support', description: 'We are here to help even after project delivery.' }
        ]
    };
}

// Load Project Details - Premium Case Study Layout
function loadProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get('id'));
    
    if (!projectId) {
        window.location.href = 'index.html#portfolio';
        return;
    }

    const projects = DataManager.getProjects();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        window.location.href = 'index.html#portfolio';
        return;
    }

    // Update hero section
    const heroImage = document.getElementById('projectHeroImage');
    const heroTitle = document.getElementById('projectHeroTitle');
    const categoryTag = document.getElementById('projectCategoryTag');
    
    if (heroImage) {
        heroImage.style.backgroundImage = `url(${project.image})`;
    }
    if (heroTitle) {
        heroTitle.textContent = project.title;
    }
    
    const categoryNames = {
        'web': 'Web Application',
        'ecommerce': 'E-commerce',
        'iot': 'IoT',
        'saas': 'SaaS',
        'mobile': 'Mobile App',
        'fintech': 'FinTech'
    };
    
    if (categoryTag) {
        categoryTag.textContent = categoryNames[project.category] || project.category;
    }
    
    // Update breadcrumb
    updateBreadcrumb(project.title);

    const container = document.getElementById('projectDetails');
    if (container) {
        // Generate additional gallery images (using same image with different crops for demo)
        const galleryImages = [
            project.image,
            project.image,
            project.image
        ];

        // Get related projects (same category, excluding current)
        const relatedProjects = projects
            .filter(p => p.category === project.category && p.id !== project.id)
            .slice(0, 3);

        container.innerHTML = `
            <!-- Project Overview Cards -->
            <div class="project-overview fade-in">
                <div class="overview-card">
                    <div class="overview-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <h4>Client</h4>
                    <p>${project.client || 'Confidential'}</p>
                </div>
                
                <div class="overview-card">
                    <div class="overview-icon">
                        <i class="fas fa-tag"></i>
                    </div>
                    <h4>Category</h4>
                    <p>${categoryNames[project.category] || project.category}</p>
                </div>
                
                <div class="overview-card">
                    <div class="overview-icon">
                        <i class="fas fa-calendar"></i>
                    </div>
                    <h4>Duration</h4>
                    <p>${project.duration || '3-6 Months'}</p>
                </div>
                
                <div class="overview-card">
                    <div class="overview-icon">
                        <i class="fas fa-code"></i>
                    </div>
                    <h4>Technologies</h4>
                    <div class="tech-tags">
                        ${(project.technologies || ['React', 'Node.js', 'MongoDB']).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>

            <!-- Project Description -->
            <div class="project-description-section fade-in">
                <h2>Project Overview</h2>
                <p>${project.description}</p>
                
                <h3>The Challenge</h3>
                <p>Every great project starts with a challenge. Our client needed a comprehensive digital solution that would transform their business operations and deliver exceptional user experiences. The goal was to create a scalable, modern platform that could grow with their business.</p>
                
                <h3>Our Solution</h3>
                <p>We designed and developed a custom solution tailored to their specific needs. By leveraging cutting-edge technologies and following best practices, we created a robust platform that not only met but exceeded their expectations. Our approach focused on user-centric design, performance optimization, and future scalability.</p>
                
                <h3>The Results</h3>
                <p>The project delivered outstanding results, including improved user engagement, increased conversions, and streamlined operations. The client saw a significant boost in their key metrics and received positive feedback from their users.</p>
            </div>

            <!-- Image Gallery -->
            <div class="project-gallery fade-in">
                <h2>Project Gallery</h2>
                <div class="gallery-grid">
                    ${galleryImages.map((img, index) => `
                        <div class="gallery-item" onclick="openGalleryModal(${index})">
                            <img src="${img}" alt="${project.title} - Image ${index + 1}" onerror="this.src='https://via.placeholder.com/800x500?text=Project+Image+${index + 1}'">
                            <div class="gallery-item-overlay">
                                <i class="fas fa-search-plus"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Call to Action -->
            <div class="project-cta fade-in">
                <h2>Ready to Start Your Project?</h2>
                <p>Let's create something amazing together. Get in touch to discuss your next big idea.</p>
                <div class="project-cta-buttons">
                    <a href="index.html#contact" class="btn btn-primary">
                        <i class="fas fa-rocket"></i> Start Your Project
                    </a>
                    <a href="index.html#portfolio" class="btn btn-secondary">
                        <i class="fas fa-th-large"></i> View More Projects
                    </a>
                </div>
            </div>

            <!-- Related Projects -->
            ${relatedProjects.length > 0 ? `
                <div class="related-projects fade-in">
                    <h2>Related Projects</h2>
                    <div class="related-projects-grid">
                        ${relatedProjects.map(relatedProject => `
                            <div class="related-project-card" onclick="window.location.href='project-details.html?id=${relatedProject.id}'">
                                <img src="${relatedProject.image}" alt="${relatedProject.title}" onerror="this.src='https://via.placeholder.com/600x400?text=${encodeURIComponent(relatedProject.title)}'">
                                <div class="related-project-info">
                                    <h3>${relatedProject.title}</h3>
                                    <p>${relatedProject.description ? relatedProject.description.substring(0, 100) + '...' : 'Click to view project details'}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        // Store gallery images for modal
        window.currentGalleryImages = galleryImages;
        window.currentGalleryIndex = 0;
        
        // Trigger fade-in animations
        setTimeout(() => {
            observeFadeIns();
        }, 100);
    }
}

// Gallery Modal Functions
function openGalleryModal(index) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryModalImage');
    
    if (modal && modalImage && window.currentGalleryImages) {
        window.currentGalleryIndex = index;
        modalImage.src = window.currentGalleryImages[index];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function navigateGallery(direction) {
    if (!window.currentGalleryImages) return;
    
    window.currentGalleryIndex += direction;
    
    if (window.currentGalleryIndex < 0) {
        window.currentGalleryIndex = window.currentGalleryImages.length - 1;
    } else if (window.currentGalleryIndex >= window.currentGalleryImages.length) {
        window.currentGalleryIndex = 0;
    }
    
    const modalImage = document.getElementById('galleryModalImage');
    if (modalImage) {
        modalImage.src = window.currentGalleryImages[window.currentGalleryIndex];
    }
}

// Gallery Modal Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    const modalClose = document.getElementById('galleryModalClose');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryModal = document.getElementById('galleryModal');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeGalleryModal);
    }
    
    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => navigateGallery(-1));
    }
    
    if (galleryNext) {
        galleryNext.addEventListener('click', () => navigateGallery(1));
    }
    
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeGalleryModal();
        }
    });
});

// Initialize
if (window.location.pathname.includes('service-details.html')) {
    loadServiceDetails();
    setTimeout(() => {
        observeFadeIns();
    }, 100);
} else if (window.location.pathname.includes('project-details.html')) {
    loadProjectDetails();
    setTimeout(() => {
        observeFadeIns();
    }, 100);
}