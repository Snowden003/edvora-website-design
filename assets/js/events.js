// Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    initializeCategoryFilters();
    initializeSearch();
});

let allEvents = [];
let displayedEvents = [];
let eventsPerPage = 9;
let currentPage = 1;

// Sample events data
const eventsData = [
    {
        id: 1,
        title: "Global Tech Conference 2024",
        category: "conference",
        date: "2024-12-15",
        endDate: "2024-12-17",
        time: "09:00",
        duration: "3 days",
        location: "San Francisco & Online",
        price: 299,
        attendees: 2500,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
        description: "Join industry leaders and innovators for a 3-day conference featuring the latest trends in technology, AI, and digital transformation.",
        speakers: ["Dr. Sarah Johnson", "Michael Chen", "Emily Rodriguez"],
        agenda: [
            "Day 1: AI and Machine Learning Trends",
            "Day 2: Digital Transformation Strategies",
            "Day 3: Future of Technology"
        ],
        featured: true
    },
    {
        id: 2,
        title: "React Development Workshop",
        category: "workshop",
        date: "2024-12-20",
        time: "14:00",
        duration: "4 hours",
        location: "Online",
        price: 89,
        attendees: 150,
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
        description: "Hands-on workshop covering advanced React concepts, hooks, and best practices for modern web development.",
        speakers: ["Carlos Martinez"],
        agenda: [
            "Advanced React Hooks",
            "State Management with Context",
            "Performance Optimization",
            "Testing React Applications"
        ]
    },
    {
        id: 3,
        title: "Digital Marketing Masterclass",
        category: "webinar",
        date: "2024-12-22",
        time: "18:00",
        duration: "2 hours",
        location: "Online",
        price: 0,
        attendees: 500,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        description: "Learn the latest digital marketing strategies, SEO techniques, and social media best practices from industry experts.",
        speakers: ["Emily Rodriguez"],
        agenda: [
            "SEO Fundamentals",
            "Social Media Strategy",
            "Content Marketing",
            "Analytics and Measurement"
        ]
    },
    {
        id: 4,
        title: "Data Science Bootcamp",
        category: "bootcamp",
        date: "2025-01-05",
        endDate: "2025-01-19",
        time: "10:00",
        duration: "2 weeks",
        location: "New York & Online",
        price: 1299,
        attendees: 80,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        description: "Intensive 2-week bootcamp covering Python, machine learning, data visualization, and real-world projects.",
        speakers: ["Dr. James Wilson", "Dr. Sarah Johnson"],
        agenda: [
            "Week 1: Python and Data Analysis",
            "Week 2: Machine Learning and Projects"
        ]
    },
    {
        id: 5,
        title: "UX Design Networking Event",
        category: "networking",
        date: "2024-12-28",
        time: "19:00",
        duration: "3 hours",
        location: "Los Angeles",
        price: 25,
        attendees: 200,
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop",
        description: "Network with UX professionals, share experiences, and discover new opportunities in the design industry.",
        speakers: ["Michael Chen", "Robert Davis"],
        agenda: [
            "Welcome Reception",
            "Panel Discussion",
            "Networking Session",
            "Closing Remarks"
        ]
    },
    {
        id: 6,
        title: "Business Strategy Workshop",
        category: "workshop",
        date: "2025-01-10",
        time: "13:00",
        duration: "6 hours",
        location: "Chicago & Online",
        price: 199,
        attendees: 100,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
        description: "Learn strategic planning, market analysis, and business model innovation from experienced consultants.",
        speakers: ["Lisa Thompson"],
        agenda: [
            "Strategic Planning Fundamentals",
            "Market Analysis Techniques",
            "Business Model Canvas",
            "Implementation Strategies"
        ]
    },
    {
        id: 7,
        title: "AI Ethics Conference",
        category: "conference",
        date: "2025-01-15",
        endDate: "2025-01-16",
        time: "09:30",
        duration: "2 days",
        location: "Online",
        price: 149,
        attendees: 800,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
        description: "Explore the ethical implications of AI, responsible development practices, and regulatory frameworks.",
        speakers: ["Dr. James Wilson", "Dr. Sarah Johnson"],
        agenda: [
            "Day 1: AI Ethics Fundamentals",
            "Day 2: Regulatory and Legal Aspects"
        ]
    },
    {
        id: 8,
        title: "Language Learning Webinar",
        category: "webinar",
        date: "2025-01-20",
        time: "16:00",
        duration: "90 minutes",
        location: "Online",
        price: 0,
        attendees: 300,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
        description: "Discover effective language learning techniques and tools for accelerated language acquisition.",
        speakers: ["Dr. Anna Kim"],
        agenda: [
            "Language Learning Psychology",
            "Effective Study Techniques",
            "Technology Tools",
            "Q&A Session"
        ]
    }
];

// Load events
function loadEvents() {
    allEvents = [...eventsData];
    displayedEvents = allEvents.slice(0, eventsPerPage);
    renderEvents();
}

// Render events grid
function renderEvents() {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;

    grid.innerHTML = displayedEvents.map(event => `
        <div class="col-lg-4 col-md-6">
            <div class="card h-100 border-0 shadow-sm event-card">
                ${event.featured ? '<div class="position-absolute top-0 start-0 m-3 z-3"><span class="badge bg-danger">Featured</span></div>' : ''}
                <div class="position-relative">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}" style="height: 200px; object-fit: cover;">
                    <div class="position-absolute top-0 end-0 m-3">
                        <span class="badge bg-primary">${formatCategory(event.category)}</span>
                    </div>
                </div>
                
                <div class="card-body p-4">
                    <h5 class="fw-bold mb-3" style="color: #1F8FFF;">${event.title}</h5>
                    <p class="text-muted mb-3" style="font-size: 0.9rem;">${event.description.substring(0, 100)}...</p>
                    
                    <div class="row g-2 mb-3 small">
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-calendar3 me-2 text-primary"></i>
                                <span>${formatDate(event.date)}</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-clock me-2 text-primary"></i>
                                <span>${event.duration}</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-geo-alt me-2 text-primary"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-people me-2 text-primary"></i>
                                <span>${event.attendees} attendees</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary" style="background-color: #1F8FFF; border-color: #1F8FFF;" onclick="registerForEvent(${event.id})">
                            ${event.price === 0 ? 'Join Free' : 'Register'}
                        </button>
                        <button class="btn btn-outline-primary" onclick="goToEventDetail('${getEventSlug(event)}')">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Update load more button
    updateLoadMoreButton();
}

// Initialize category filters
function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('[data-category]');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter events
            const category = this.getAttribute('data-category');
            filterEventsByCategory(category);
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('eventSearch');
    if (!searchInput) return;

    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300);
    });
}

// Filter events by category
function filterEventsByCategory(category) {
    let filteredEvents = category === 'all' ? allEvents : allEvents.filter(event => event.category === category);
    
    // Reset pagination
    currentPage = 1;
    displayedEvents = filteredEvents.slice(0, eventsPerPage);
    renderEvents();
    
    // Clear search when filtering by category
    const searchInput = document.getElementById('eventSearch');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Apply search filters
function applyFilters() {
    const searchTerm = document.getElementById('eventSearch')?.value.toLowerCase() || '';
    const activeCategory = document.querySelector('[data-category].active')?.getAttribute('data-category') || 'all';
    
    let filteredEvents = activeCategory === 'all' ? allEvents : allEvents.filter(event => event.category === activeCategory);
    
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm))
        );
    }
    
    // Reset pagination
    currentPage = 1;
    displayedEvents = filteredEvents.slice(0, eventsPerPage);
    renderEvents();
}

// Load more events
function loadMoreEvents() {
    const searchTerm = document.getElementById('eventSearch')?.value.toLowerCase() || '';
    const activeCategory = document.querySelector('[data-category].active')?.getAttribute('data-category') || 'all';
    
    let filteredEvents = activeCategory === 'all' ? allEvents : allEvents.filter(event => event.category === activeCategory);
    
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm))
        );
    }
    
    currentPage++;
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const newEvents = filteredEvents.slice(startIndex, endIndex);
    
    displayedEvents = [...displayedEvents, ...newEvents];
    renderEvents();
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreEvents');
    if (!loadMoreBtn) return;

    const searchTerm = document.getElementById('eventSearch')?.value.toLowerCase() || '';
    const activeCategory = document.querySelector('[data-category].active')?.getAttribute('data-category') || 'all';
    
    let filteredEvents = activeCategory === 'all' ? allEvents : allEvents.filter(event => event.category === activeCategory);
    
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm))
        );
    }

    if (displayedEvents.length >= filteredEvents.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = loadMoreEvents;
    }
}

// Show event details modal
function showEventDetails(eventId) {
    const event = allEvents.find(e => e.id === eventId);
    if (!event) return;

    const modalBody = document.getElementById('eventModalBody');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-5">
                <img src="${event.image}" alt="${event.title}" class="img-fluid rounded mb-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="fw-bold mb-3">Event Details</h6>
                        <div class="row g-2 small">
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-calendar3 me-2 text-primary"></i>
                                    <div>
                                        <small class="text-muted d-block">Date</small>
                                        <strong>${formatDate(event.date)}${event.endDate ? ' - ' + formatDate(event.endDate) : ''}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-clock me-2 text-primary"></i>
                                    <div>
                                        <small class="text-muted d-block">Duration</small>
                                        <strong>${event.duration}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-geo-alt me-2 text-primary"></i>
                                    <div>
                                        <small class="text-muted d-block">Location</small>
                                        <strong>${event.location}</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-people me-2 text-primary"></i>
                                    <div>
                                        <small class="text-muted d-block">Attendees</small>
                                        <strong>${event.attendees}+</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-3">
                            <div class="fw-bold fs-4" style="color: #1F8FFF;">
                                ${event.price === 0 ? 'Free Event' : `$${event.price}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="d-flex align-items-center mb-3">
                    <span class="badge bg-primary me-2">${formatCategory(event.category)}</span>
                    ${event.featured ? '<span class="badge bg-danger">Featured</span>' : ''}
                </div>
                
                <h4 class="fw-bold mb-3" style="color: #1F8FFF;">${event.title}</h4>
                <p class="text-muted mb-4">${event.description}</p>
                
                <div class="mb-4">
                    <h6 class="fw-bold mb-2">Speakers</h6>
                    <div class="d-flex flex-wrap gap-2">
                        ${event.speakers.map(speaker => 
                            `<span class="badge bg-light text-dark">${speaker}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="mb-4">
                    <h6 class="fw-bold mb-2">Agenda</h6>
                    <ul class="list-unstyled">
                        ${event.agenda.map(item => 
                            `<li class="mb-1"><i class="bi bi-check-circle-fill text-success me-2"></i>${item}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    <strong>Registration includes:</strong> Access to all sessions, networking opportunities, digital materials, and certificate of attendance.
                </div>
            </div>
        </div>
    `;

    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
}

// Utility functions
function formatCategory(category) {
    const categories = {
        'workshop': 'Workshop',
        'webinar': 'Webinar',
        'conference': 'Conference',
        'networking': 'Networking',
        'bootcamp': 'Bootcamp'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Add hover effects to event cards
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .event-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        
        .event-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .event-card:hover .btn {
            background-color: #1F8FFF !important;
            border-color: #1F8FFF !important;
        }
    `;
    document.head.appendChild(style);
});

// Generate event slug for URL
function getEventSlug(event) {
    return event.title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
}

// Navigate to event detail page
function goToEventDetail(eventSlug) {
    window.location.href = `events-detail.html?event=${eventSlug}`;
}

// Register for event function
function registerForEvent(eventId) {
    // Check if user is logged in
    const userSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    
    if (!userSession) {
        // Redirect to login page
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        return;
    }

    // Show registration success message
    showToast('Registration successful! Check your email for confirmation.', 'success');
}

// Toast notification function
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    // Add to page
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove from DOM after hiding
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}
