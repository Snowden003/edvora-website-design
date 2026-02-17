// Competitions Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
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
        <div class="col-lg-4 col-md-6 d-flex justify-content-center">
            <div class="premium-competition-card" onclick="window.location.href='competitions-detail.html'" style="animation: cardEntrance 0.8s ease-out ${index * 0.1}s both;">
                
                <!-- Card Header with Image -->
                <div class="premium-card-header">
                    <div class="image-container">
                        <img src="${competition.image}" alt="${competition.title}" class="competition-image">
                        <div class="image-overlay"></div>
                    </div>
                    
                    <!-- Category Badge -->
                     <div class="category-tag">
                        <i class="bi ${getCategoryIcon(competition.category)}"></i>
                        <span>${competition.category}</span>
                    </div>

                    <!-- Status Badge -->
                    <div class="status-badge-container">
                        <div class="status-badge ${competition.status}">
                            <i class="bi ${getStatusIcon(competition.status)}"></i>
                            <span>${formatStatus(competition.status)}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Card Body -->
                <div class="premium-card-body">
                    <!-- Title -->
                    <h5 class="premium-title">${competition.title}</h5>
                    
                    <!-- Description -->
                    <p class="premium-description">${competition.description.substring(0, 80)}...</p>
                    
                    <!-- Stats Grid -->
                    <div class="stats-grid">
                        <div class="stat-item">
                            <i class="bi bi-people-fill"></i>
                            <div>
                                <span class="stat-number">${formatNumber(competition.participants)}</span>
                                <span>Part.</span>
                            </div>
                        </div>
                        
                        <div class="stat-item">
                            <i class="bi bi-clock-history"></i>
                            <div>
                                <span class="stat-number">${getDaysRemaining(competition.endDate)}</span>
                                <span>Days</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Action -->
                    <div class="card-footer-action">
                        <div class="prize-pool">
                            $${competition.prizePool.toLocaleString()}
                        </div>
                        <button class="action-btn-small">
                            <i class="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
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
        button.addEventListener('click', function () {
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
    searchInput.addEventListener('input', function () {
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
        < div class="row" >
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
        </div >
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
    return `${formatDate(startDate)} - ${formatDate(endDate)} `;
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
        return `${days}d ${hours} h`;
    } else if (hours > 0) {
        return `${hours}h ${minutes} m`;
    } else {
        return `${minutes} m`;
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

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
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
                    entry.target.style.animationDelay = `${index * 0.1} s`;
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);

        // Add hover effects
        card.addEventListener('mouseenter', function () {
            this.classList.add('hovered');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('hovered');
        });
    });
}

