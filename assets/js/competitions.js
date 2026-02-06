// Competitions Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadCompetitions();
    initializeStatusFilters();
    initializeSearch();
    startCountdowns();
});

let allCompetitions = [];
let displayedCompetitions = [];
let competitionsPerPage = 9;
let currentPage = 1;
let currentStatus = 'active';

// Sample competitions data
const competitionsData = [
    {
        id: 1,
        title: "Global AI Challenge 2024",
        status: "active",
        category: "AI/ML",
        startDate: "2024-12-01",
        endDate: "2025-01-31",
        prizePool: 25000,
        participants: 1250,
        difficulty: "Advanced",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
        description: "Build an AI solution that addresses real-world problems. Categories include healthcare, education, environment, and social impact.",
        requirements: ["Python/R", "Machine Learning", "Data Analysis"],
        prizes: ["1st Place: $15,000", "2nd Place: $7,000", "3rd Place: $3,000"],
        judges: ["Dr. Sarah Johnson", "Dr. James Wilson"],
        featured: true
    },
    {
        id: 2,
        title: "Web Development Sprint",
        status: "active",
        category: "Web Dev",
        startDate: "2024-12-10",
        endDate: "2024-12-24",
        prizePool: 5000,
        participants: 800,
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
        description: "Create a responsive web application using modern frameworks. Focus on user experience and performance optimization.",
        requirements: ["HTML/CSS", "JavaScript", "React/Vue/Angular"],
        prizes: ["1st Place: $3,000", "2nd Place: $1,500", "3rd Place: $500"],
        judges: ["Carlos Martinez", "Michael Chen"]
    },
    {
        id: 3,
        title: "Mobile App Innovation",
        status: "upcoming",
        category: "Mobile",
        startDate: "2025-01-15",
        endDate: "2025-02-28",
        prizePool: 10000,
        participants: 0,
        difficulty: "Advanced",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
        description: "Develop a mobile application that solves everyday problems. Cross-platform solutions are encouraged.",
        requirements: ["React Native/Flutter", "Mobile UI/UX", "API Integration"],
        prizes: ["1st Place: $6,000", "2nd Place: $3,000", "3rd Place: $1,000"],
        judges: ["Michael Chen", "Emily Rodriguez"]
    },
    {
        id: 4,
        title: "Data Science Challenge",
        status: "active",
        category: "Data Science",
        startDate: "2024-12-05",
        endDate: "2025-01-05",
        prizePool: 8000,
        participants: 650,
        difficulty: "Advanced",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        description: "Analyze complex datasets and build predictive models. Focus on business insights and actionable recommendations.",
        requirements: ["Python/R", "Statistics", "Data Visualization"],
        prizes: ["1st Place: $5,000", "2nd Place: $2,000", "3rd Place: $1,000"],
        judges: ["Dr. James Wilson", "Lisa Thompson"]
    },
    {
        id: 5,
        title: "UI/UX Design Contest",
        status: "active",
        category: "Design",
        startDate: "2024-12-12",
        endDate: "2024-12-26",
        prizePool: 4000,
        participants: 400,
        difficulty: "Beginner",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
        description: "Design user interfaces for a fictional startup. Focus on user experience, accessibility, and visual appeal.",
        requirements: ["Figma/Sketch", "Design Principles", "Prototyping"],
        prizes: ["1st Place: $2,500", "2nd Place: $1,000", "3rd Place: $500"],
        judges: ["Michael Chen", "Robert Davis"]
    },
    {
        id: 6,
        title: "Blockchain Innovation",
        status: "upcoming",
        category: "Blockchain",
        startDate: "2025-02-01",
        endDate: "2025-03-15",
        prizePool: 15000,
        participants: 0,
        difficulty: "Advanced",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
        description: "Build decentralized applications or smart contracts that solve real-world problems using blockchain technology.",
        requirements: ["Solidity", "Web3", "Smart Contracts"],
        prizes: ["1st Place: $10,000", "2nd Place: $3,000", "3rd Place: $2,000"],
        judges: ["Dr. Sarah Johnson", "Carlos Martinez"]
    },
    {
        id: 7,
        title: "Cybersecurity CTF",
        status: "completed",
        category: "Security",
        startDate: "2024-11-01",
        endDate: "2024-11-30",
        prizePool: 6000,
        participants: 950,
        difficulty: "Advanced",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
        description: "Capture The Flag competition focusing on various cybersecurity challenges including cryptography, web security, and forensics.",
        requirements: ["Security Knowledge", "Linux", "Networking"],
        prizes: ["1st Place: $4,000", "2nd Place: $1,500", "3rd Place: $500"],
        judges: ["Security Experts", "Industry Professionals"],
        winners: ["Alex Chen", "Maria Garcia", "John Smith"]
    },
    {
        id: 8,
        title: "Game Development Jam",
        status: "completed",
        category: "Game Dev",
        startDate: "2024-10-15",
        endDate: "2024-10-29",
        prizePool: 3000,
        participants: 300,
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=250&fit=crop",
        description: "Create an innovative game within 2 weeks. Any platform and genre allowed. Focus on creativity and gameplay.",
        requirements: ["Game Engine", "Programming", "Game Design"],
        prizes: ["1st Place: $2,000", "2nd Place: $700", "3rd Place: $300"],
        judges: ["Game Industry Veterans"],
        winners: ["Team Pixel", "Code Warriors", "Indie Devs"]
    }
];

// Load competitions
function loadCompetitions() {
    allCompetitions = [...competitionsData];
    filterCompetitionsByStatus(currentStatus);
}

// Render competitions grid
function renderCompetitions() {
    const grid = document.getElementById('competitionsGrid');
    if (!grid) return;

    grid.innerHTML = displayedCompetitions.map((competition, index) => `
        <div class="col-lg-4 col-md-6">
            <div class="premium-competition-card" onclick="window.location.href='competitions-detail.html'" style="animation: cardEntrance 0.8s ease-out ${index * 0.1}s both;">
                <!-- Floating Background Elements -->
                <div class="card-bg-elements">
                    <div class="floating-particle particle-1"></div>
                    <div class="floating-particle particle-2"></div>
                    <div class="floating-particle particle-3"></div>
                    <div class="floating-orb orb-1"></div>
                    <div class="floating-orb orb-2"></div>
                </div>
                
                <!-- Featured Badge -->
                ${competition.featured ? `
                    <div class="premium-featured-badge">
                        <div class="featured-glow"></div>
                        <i class="bi bi-star-fill"></i>
                        <span>Featured</span>
                    </div>
                ` : ''}
                
                <!-- Card Header with Image -->
                <div class="premium-card-header">
                    <div class="image-container">
                        <img src="${competition.image}" alt="${competition.title}" class="competition-image">
                        <div class="image-overlay"></div>
                        <div class="shimmer-effect"></div>
                    </div>
                    
                    <!-- Status Badge -->
                    <div class="status-badge-container">
                        <div class="status-badge ${competition.status}">
                            <div class="status-glow"></div>
                            <i class="bi ${getStatusIcon(competition.status)}"></i>
                            <span>${formatStatus(competition.status)}</span>
                        </div>
                    </div>
                    
                    <!-- Prize Pool Highlight -->
                    <div class="prize-highlight">
                        <div class="prize-glow"></div>
                        <i class="bi bi-trophy-fill"></i>
                        <span>$${competition.prizePool.toLocaleString()}</span>
                    </div>
                </div>
                
                <!-- Card Body -->
                <div class="premium-card-body">
                    <!-- Category and Difficulty -->
                    <div class="card-tags">
                        <div class="category-tag">
                            <i class="bi ${getCategoryIcon(competition.category)}"></i>
                            <span>${competition.category}</span>
                        </div>
                        <div class="difficulty-tag ${competition.difficulty.toLowerCase()}">
                            <div class="difficulty-dots">
                                <span class="dot ${competition.difficulty === 'Beginner' ? 'active' : ''}"></span>
                                <span class="dot ${competition.difficulty === 'Intermediate' || competition.difficulty === 'Advanced' ? 'active' : ''}"></span>
                                <span class="dot ${competition.difficulty === 'Advanced' ? 'active' : ''}"></span>
                            </div>
                            <span>${competition.difficulty}</span>
                        </div>
                    </div>
                    
                    <!-- Title with Gradient -->
                    <h5 class="premium-title">
                        <span class="title-gradient">${competition.title}</span>
                        <div class="title-underline"></div>
                    </h5>
                    
                    <!-- Description -->
                    <p class="premium-description">${competition.description.substring(0, 100)}...</p>
                    
                    <!-- Stats Grid -->
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-icon">
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-number">${competition.participants}</span>
                                <span class="stat-label">Participants</span>
                            </div>
                        </div>
                        
                        <div class="stat-item">
                            <div class="stat-icon">
                                <i class="bi bi-calendar3"></i>
                            </div>
                            <div class="stat-content">
                                <span class="stat-number">${getDaysRemaining(competition.endDate)}</span>
                                <span class="stat-label">Days Left</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Countdown Timer for Active Competitions -->
                    ${competition.status === 'active' ? `
                        <div class="countdown-container">
                            <div class="countdown-label">Time Remaining</div>
                            <div class="countdown-timer" data-countdown="${competition.endDate}">
                                ${getTimeRemaining(competition.endDate)}
                            </div>
                            <div class="countdown-progress">
                                <div class="progress-bar" style="animation: progressPulse 2s ease-in-out infinite;"></div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Action Button -->
                    <div class="action-button-container">
                        <button class="premium-action-btn ${competition.status}" ${competition.status !== 'active' ? '' : ''} onclick="window.location.href='competitions-detail.html'">
                            <div class="btn-bg-gradient"></div>
                            <div class="btn-content">
                                <i class="bi ${getActionIcon(competition.status)}"></i>
                                <span>${getActionButtonText(competition.status)}</span>
                            </div>
                            <div class="btn-shine"></div>
                        </button>
                    </div>
                </div>
                
                <!-- Card Glow Effect -->
                <div class="card-glow"></div>
            </div>
        </div>
    `).join('');

    // Update load more button
    updateLoadMoreButton();
    
    // Initialize card animations
    initializeCardAnimations();
}

// Initialize status filters
function initializeStatusFilters() {
    const statusButtons = document.querySelectorAll('[data-status]');
    
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            statusButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter competitions
            const status = this.getAttribute('data-status');
            currentStatus = status;
            filterCompetitionsByStatus(status);
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('competitionSearch');
    if (!searchInput) return;

    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300);
    });
}

// Filter competitions by status
function filterCompetitionsByStatus(status) {
    let filteredCompetitions;
    
    if (status === 'leaderboard') {
        // Show top performers across all competitions
        filteredCompetitions = allCompetitions.filter(comp => comp.status === 'completed');
    } else {
        filteredCompetitions = allCompetitions.filter(competition => competition.status === status);
    }
    
    // Reset pagination
    currentPage = 1;
    displayedCompetitions = filteredCompetitions.slice(0, competitionsPerPage);
    renderCompetitions();
    
    // Clear search when filtering by status
    const searchInput = document.getElementById('competitionSearch');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Apply search filters
function applyFilters() {
    const searchTerm = document.getElementById('competitionSearch')?.value.toLowerCase() || '';
    
    let filteredCompetitions = allCompetitions.filter(competition => competition.status === currentStatus);
    
    if (searchTerm) {
        filteredCompetitions = filteredCompetitions.filter(competition => 
            competition.title.toLowerCase().includes(searchTerm) ||
            competition.description.toLowerCase().includes(searchTerm) ||
            competition.category.toLowerCase().includes(searchTerm) ||
            competition.requirements.some(req => req.toLowerCase().includes(searchTerm))
        );
    }
    
    // Reset pagination
    currentPage = 1;
    displayedCompetitions = filteredCompetitions.slice(0, competitionsPerPage);
    renderCompetitions();
}

// Load more competitions
function loadMoreCompetitions() {
    const searchTerm = document.getElementById('competitionSearch')?.value.toLowerCase() || '';
    
    let filteredCompetitions = allCompetitions.filter(competition => competition.status === currentStatus);
    
    if (searchTerm) {
        filteredCompetitions = filteredCompetitions.filter(competition => 
            competition.title.toLowerCase().includes(searchTerm) ||
            competition.description.toLowerCase().includes(searchTerm) ||
            competition.category.toLowerCase().includes(searchTerm) ||
            competition.requirements.some(req => req.toLowerCase().includes(searchTerm))
        );
    }
    
    currentPage++;
    const startIndex = (currentPage - 1) * competitionsPerPage;
    const endIndex = startIndex + competitionsPerPage;
    const newCompetitions = filteredCompetitions.slice(startIndex, endIndex);
    
    displayedCompetitions = [...displayedCompetitions, ...newCompetitions];
    renderCompetitions();
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreCompetitions');
    if (!loadMoreBtn) return;

    const searchTerm = document.getElementById('competitionSearch')?.value.toLowerCase() || '';
    
    let filteredCompetitions = allCompetitions.filter(competition => competition.status === currentStatus);
    
    if (searchTerm) {
        filteredCompetitions = filteredCompetitions.filter(competition => 
            competition.title.toLowerCase().includes(searchTerm) ||
            competition.description.toLowerCase().includes(searchTerm) ||
            competition.category.toLowerCase().includes(searchTerm) ||
            competition.requirements.some(req => req.toLowerCase().includes(searchTerm))
        );
    }

    if (displayedCompetitions.length >= filteredCompetitions.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = loadMoreCompetitions;
    }
}

// Show competition details modal
function showCompetitionDetails(competitionId) {
    const competition = allCompetitions.find(c => c.id === competitionId);
    if (!competition) return;

    const modalBody = document.getElementById('competitionModalBody');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-5">
                <img src="${competition.image}" alt="${competition.title}" class="img-fluid rounded mb-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="fw-bold mb-3">Competition Info</h6>
                        <div class="row g-2 small">
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-trophy me-2 text-warning"></i>
                                    <div>
                                        <small class="text-muted d-block">Prize Pool</small>
                                        <strong>$${competition.prizePool.toLocaleString()}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-people me-2 text-primary"></i>
                                    <div>
                                        <small class="text-muted d-block">Participants</small>
                                        <strong>${competition.participants}+</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-calendar3 me-2 text-primary"></i>
                                    <div>
                                        <small class="text-muted d-block">Start Date</small>
                                        <strong>${formatDate(competition.startDate)}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-calendar-check me-2 text-primary"></i>
                                    <div>
                                        <small class="text-muted d-block">End Date</small>
                                        <strong>${formatDate(competition.endDate)}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="d-flex align-items-center mb-3">
                    <span class="badge bg-light text-dark me-2">${competition.category}</span>
                    <span class="badge ${getDifficultyBadgeClass(competition.difficulty)} me-2">${competition.difficulty}</span>
                    <span class="badge ${getStatusBadgeClass(competition.status)}">${formatStatus(competition.status)}</span>
                </div>
                
                <h4 class="fw-bold mb-3" style="color: #1F8FFF;">${competition.title}</h4>
                <p class="text-muted mb-4">${competition.description}</p>
                
                <div class="mb-4">
                    <h6 class="fw-bold mb-2">Requirements</h6>
                    <div class="d-flex flex-wrap gap-2">
                        ${competition.requirements.map(req => 
                            `<span class="badge bg-primary" style="background-color: #1F8FFF !important;">${req}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="mb-4">
                    <h6 class="fw-bold mb-2">Prizes</h6>
                    <ul class="list-unstyled">
                        ${competition.prizes.map(prize => 
                            `<li class="mb-1"><i class="bi bi-trophy-fill text-warning me-2"></i>${prize}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="mb-4">
                    <h6 class="fw-bold mb-2">Judges</h6>
                    <div class="d-flex flex-wrap gap-2">
                        ${competition.judges.map(judge => 
                            `<span class="badge bg-light text-dark">${judge}</span>`
                        ).join('')}
                    </div>
                </div>
                
                ${competition.winners ? `
                    <div class="mb-4">
                        <h6 class="fw-bold mb-2">Winners</h6>
                        <div class="d-flex flex-wrap gap-2">
                            ${competition.winners.map((winner, index) => 
                                `<span class="badge bg-success">${index + 1}. ${winner}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    <strong>Note:</strong> All submissions will be evaluated based on innovation, technical implementation, and real-world impact.
                </div>
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('competitionModal'));
    modal.show();
}

// Start countdowns for active competitions
function startCountdowns() {
    setInterval(() => {
        const countdownElements = document.querySelectorAll('[data-countdown]');
        countdownElements.forEach(element => {
            const endDate = element.getAttribute('data-countdown');
            const timeRemaining = getTimeRemaining(endDate);
            element.textContent = timeRemaining;
        });
        
        // Update featured countdown
        const featuredCountdown = document.getElementById('featuredCountdown');
        if (featuredCountdown) {
            featuredCountdown.textContent = getTimeRemaining('2025-01-31');
        }
    }, 1000);
}

// Utility functions
function getStatusBadgeClass(status) {
    const classes = {
        'active': 'bg-success',
        'upcoming': 'bg-primary',
        'completed': 'bg-secondary'
    };
    return classes[status] || 'bg-secondary';
}

function getDifficultyBadgeClass(difficulty) {
    const classes = {
        'Beginner': 'bg-success',
        'Intermediate': 'bg-warning',
        'Advanced': 'bg-danger'
    };
    return classes[difficulty] || 'bg-secondary';
}

function formatStatus(status) {
    const statuses = {
        'active': 'Active',
        'upcoming': 'Upcoming',
        'completed': 'Completed'
    };
    return statuses[status] || status;
}

function getActionButtonText(status) {
    const texts = {
        'active': 'Compotition Detail',
        'upcoming': 'Register Interest',
        'completed': 'View Results'
    };
    return texts[status] || 'View Details';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function formatDateRange(startDate, endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

function getTimeRemaining(endDate) {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const distance = end - now;
    
    if (distance < 0) {
        return "Ended";
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
        return `${days}d ${hours}h`;
    } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}

function getDaysRemaining(endDate) {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const distance = end - now;
    
    if (distance < 0) {
        return "0";
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    return days.toString();
}

function getStatusIcon(status) {
    const icons = {
        'active': 'bi-play-circle-fill',
        'upcoming': 'bi-clock-fill',
        'completed': 'bi-check-circle-fill'
    };
    return icons[status] || 'bi-info-circle-fill';
}

function getCategoryIcon(category) {
    const icons = {
        'AI/ML': 'bi-robot',
        'Web Dev': 'bi-code-slash',
        'Mobile': 'bi-phone',
        'Data Science': 'bi-graph-up',
        'Design': 'bi-palette',
        'Blockchain': 'bi-currency-bitcoin',
        'Security': 'bi-shield-check',
        'Game Dev': 'bi-controller'
    };
    return icons[category] || 'bi-code-square';
}

function getActionIcon(status) {
    const icons = {
        'active': 'bi-rocket-takeoff',
        'upcoming': 'bi-bell',
        'completed': 'bi-eye'
    };
    return icons[status] || 'bi-arrow-right';
}

// Initialize card animations
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.premium-competition-card');
    
    cards.forEach((card, index) => {
        // Add intersection observer for entrance animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

// Add premium styling and animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Premium Competition Card Styles */
        .premium-competition-card {
            position: relative;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            padding: 0;
            margin-bottom: 2rem;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            height: auto;
            min-height: 500px;
        }
        
        .premium-competition-card:hover {
            transform: translateY(-12px) rotateX(2deg);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
            border-color: rgba(31, 143, 255, 0.3);
        }
        
        .premium-competition-card.hovered .card-glow {
            opacity: 1;
            transform: scale(1.05);
        }
        
        /* Background Elements */
        .card-bg-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }
        
        .floating-particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #1F8FFF, #1F8FFF);
            border-radius: 50%;
            opacity: 0.6;
        }
        
        .particle-1 {
            top: 20%;
            left: 10%;
            animation: particleFloat1 8s ease-in-out infinite;
        }
        
        .particle-2 {
            top: 60%;
            right: 15%;
            animation: particleFloat2 10s ease-in-out infinite 2s;
        }
        
        .particle-3 {
            bottom: 30%;
            left: 20%;
            animation: particleFloat3 12s ease-in-out infinite 4s;
        }
        
        .floating-orb {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(31, 143, 255, 0.1), rgba(31, 143, 255, 0.05));
            backdrop-filter: blur(10px);
        }
        
        .orb-1 {
            width: 40px;
            height: 40px;
            top: 15%;
            right: 10%;
            animation: orbFloat1 15s ease-in-out infinite;
        }
        
        .orb-2 {
            width: 30px;
            height: 30px;
            bottom: 20%;
            right: 25%;
            animation: orbFloat2 18s ease-in-out infinite 3s;
        }
        
        /* Featured Badge */
        .premium-featured-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            background: linear-gradient(135deg, #1F8FFF, #1F8FFF);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 15px rgba(31, 143, 255, 0.4);
            animation: featuredPulse 3s ease-in-out infinite;
        }
        
        .featured-glow {
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #1F8FFF, #1F8FFF);
            border-radius: 22px;
            opacity: 0.5;
            filter: blur(8px);
            z-index: -1;
            animation: glowPulse 2s ease-in-out infinite;
        }
        
        /* Card Header */
        .premium-card-header {
            position: relative;
            height: 220px;
            overflow: hidden;
            border-radius: 24px 24px 0 0;
        }
        
        .image-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
        
        .competition-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }
        
        .premium-competition-card:hover .competition-image {
            transform: scale(1.08);
        }
        
        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.3) 100%);
            z-index: 2;
        }
        
        .shimmer-effect {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            z-index: 3;
            transition: left 0.6s ease;
        }
        
        .premium-competition-card:hover .shimmer-effect {
            left: 100%;
        }
        
        /* Status Badge */
        .status-badge-container {
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 10;
        }
        
        .status-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 600;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }
        
        .status-badge.active {
            background: rgba(34, 197, 94, 0.9);
            color: white;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        }
        
        .status-badge.upcoming {
            background: rgba(31, 143, 255, 0.9);
            color: white;
            box-shadow: 0 4px 15px rgba(31, 143, 255, 0.3);
        }
        
        .status-badge.completed {
            background: rgba(107, 114, 128, 0.9);
            color: white;
            box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
        }
        
        .status-glow {
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: 18px;
            opacity: 0.6;
            filter: blur(6px);
            z-index: -1;
            animation: statusGlow 2s ease-in-out infinite;
        }
        
        .status-badge.active .status-glow {
            background: rgba(34, 197, 94, 0.8);
        }
        
        .status-badge.upcoming .status-glow {
            background: rgba(31, 143, 255, 0.8);
        }
        
        .status-badge.completed .status-glow {
            background: rgba(107, 114, 128, 0.8);
        }
        
        /* Prize Highlight */
        .prize-highlight {
            position: absolute;
            bottom: 16px;
            left: 16px;
            background: linear-gradient(135deg, rgba(31, 143, 255, 0.95), rgba(31, 143, 255, 0.95));
            color: white;
            padding: 10px 16px;
            border-radius: 18px;
            font-weight: 700;
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 10;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(31, 143, 255, 0.4);
            position: relative;
            overflow: hidden;
        }
        
        .prize-glow {
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #1F8FFF, #1F8FFF);
            border-radius: 20px;
            opacity: 0.7;
            filter: blur(8px);
            z-index: -1;
            animation: prizeGlow 3s ease-in-out infinite;
        }
        
        /* Card Body */
        .premium-card-body {
            padding: 24px;
            position: relative;
            z-index: 5;
        }
        
        /* Card Tags */
        .card-tags {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        
        .category-tag {
            display: flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, rgba(31, 143, 255, 0.1), rgba(31, 143, 255, 0.05));
            color: #1F8FFF;
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            border: 1px solid rgba(31, 143, 255, 0.2);
        }
        
        .difficulty-tag {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .difficulty-tag.beginner {
            background: rgba(34, 197, 94, 0.1);
            color: #059669;
            border: 1px solid rgba(34, 197, 94, 0.2);
        }
        
        .difficulty-tag.intermediate {
            background: rgba(31, 143, 255, 0.1);
            color: #D97706;
            border: 1px solid rgba(31, 143, 255, 0.2);
        }
        
        .difficulty-tag.advanced {
            background: rgba(239, 68, 68, 0.1);
            color: #DC2626;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }
        
        .difficulty-dots {
            display: flex;
            gap: 3px;
        }
        
        .difficulty-dots .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(156, 163, 175, 0.4);
            transition: all 0.3s ease;
        }
        
        .difficulty-dots .dot.active {
            background: currentColor;
            box-shadow: 0 0 8px currentColor;
        }
        
        /* Premium Title */
        .premium-title {
            position: relative;
            margin-bottom: 16px;
        }
        
        .title-gradient {
            background: linear-gradient(135deg, #1F8FFF, #1F8FFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            font-size: 1.3rem;
            line-height: 1.3;
        }
        
        .title-underline {
            height: 3px;
            background: linear-gradient(90deg, #1F8FFF, #1F8FFF, #1F8FFF);
            border-radius: 2px;
            margin-top: 8px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
        }
        
        .premium-competition-card:hover .title-underline {
            transform: scaleX(1);
        }
        
        /* Description */
        .premium-description {
            color: #6B7280;
            font-size: 0.9rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 20px;
        }
        
        .stat-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: rgba(31, 143, 255, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(31, 143, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        .stat-item:hover {
            background: rgba(31, 143, 255, 0.1);
            transform: translateY(-2px);
        }
        
        .stat-icon {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #1F8FFF, #1F8FFF);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1rem;
        }
        
        .stat-content {
            display: flex;
            flex-direction: column;
        }
        
        .stat-number {
            font-weight: 700;
            font-size: 1.1rem;
            color: #1F8FFF;
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: #6B7280;
        }
        
        /* Countdown Container */
        .countdown-container {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(31, 143, 255, 0.05));
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .countdown-label {
            font-size: 0.8rem;
            color: #DC2626;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .countdown-timer {
            font-size: 1.4rem;
            font-weight: 700;
            color: #DC2626;
            margin-bottom: 12px;
        }
        
        .countdown-progress {
            height: 4px;
            background: rgba(239, 68, 68, 0.2);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #DC2626, #1F8FFF);
            border-radius: 2px;
            width: 70%;
        }
        
        /* Action Button */
        .action-button-container {
            margin-top: 20px;
        }
        
        .premium-action-btn {
            width: 100%;
            position: relative;
            padding: 14px 24px;
            border: none;
            border-radius: 16px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.4s ease;
            color: white;
        }
        
        .premium-action-btn.active {
            background: linear-gradient(135deg, #1F8FFF, #1F8FFF);
            box-shadow: 0 8px 25px rgba(31, 143, 255, 0.3);
        }
        
        .premium-action-btn.upcoming {
            background: linear-gradient(135deg, #1F8FFF, #3B82F6);
            box-shadow: 0 8px 25px rgba(31, 143, 255, 0.3);
        }
        
        .premium-action-btn.completed {
            background: linear-gradient(135deg, #6B7280, #9CA3AF);
            box-shadow: 0 8px 25px rgba(107, 114, 128, 0.3);
        }
        
        .premium-action-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(31, 143, 255, 0.4);
        }
        
        .premium-action-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .btn-bg-gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
            z-index: 1;
        }
        
        .btn-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .btn-shine {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            z-index: 3;
            transition: left 0.6s ease;
        }
        
        .premium-action-btn:hover .btn-shine {
            left: 100%;
        }
        
        /* Card Glow */
        .card-glow {
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            background: linear-gradient(135deg, rgba(31, 143, 255, 0.3), rgba(31, 143, 255, 0.3));
            border-radius: 28px;
            opacity: 0;
            filter: blur(20px);
            z-index: -1;
            transition: all 0.4s ease;
        }
        
        /* Animations */
        @keyframes cardEntrance {
            0% {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes particleFloat1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(10px, -15px) rotate(90deg); }
            50% { transform: translate(-5px, -25px) rotate(180deg); }
            75% { transform: translate(-15px, -10px) rotate(270deg); }
        }
        
        @keyframes particleFloat2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(-12px, -20px) rotate(120deg); }
            66% { transform: translate(8px, -30px) rotate(240deg); }
        }
        
        @keyframes particleFloat3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            20% { transform: translate(15px, -10px) rotate(72deg); }
            40% { transform: translate(5px, -25px) rotate(144deg); }
            60% { transform: translate(-10px, -20px) rotate(216deg); }
            80% { transform: translate(-20px, -5px) rotate(288deg); }
        }
        
        @keyframes orbFloat1 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
            50% { transform: translate(-20px, -30px) scale(1.2); opacity: 0.8; }
        }
        
        @keyframes orbFloat2 {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
            50% { transform: translate(15px, -20px) scale(1.1); opacity: 0.7; }
        }
        
        @keyframes featuredPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes glowPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
        }
        
        @keyframes statusGlow {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.9; }
        }
        
        @keyframes prizeGlow {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
        
        @keyframes progressPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .premium-competition-card {
                margin-bottom: 1.5rem;
                min-height: 450px;
            }
            
            .premium-card-header {
                height: 180px;
            }
            
            .premium-card-body {
                padding: 20px;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .card-tags {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            
            .title-gradient {
                font-size: 1.1rem;
            }
        }
        
        @media (max-width: 576px) {
            .premium-competition-card {
                min-height: 400px;
            }
            
            .premium-card-header {
                height: 160px;
            }
            
            .premium-card-body {
                padding: 16px;
            }
        }
    `;
    document.head.appendChild(style);
});
