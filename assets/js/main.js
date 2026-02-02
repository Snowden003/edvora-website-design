// Main JavaScript for KoMoJa
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    loadPopularCourses();
    initCoursesSlider();
    loadUpcomingEvents();
    loadUpcomingCompetitions();
    loadTopStudents();
    loadStartedCourses();
    loadTestimonials();
    initContactForm();
    initAnimations();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.className = 'bi bi-moon-fill';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.className = 'bi bi-moon-fill';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'bi bi-sun-fill';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize Courses Slider
function initCoursesSlider() {
    const sliderTrack = document.getElementById('coursesSliderTrack');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    const originalCards = Array.from(document.querySelectorAll('.course-card'));
    const totalCards = originalCards.length;
    
    // Create seamless infinite scroll by duplicating cards
    sliderTrack.innerHTML = '';
    
    // Add original cards first
    originalCards.forEach(card => {
        sliderTrack.appendChild(card.cloneNode(true));
    });
    
    // Add duplicate cards for seamless loop
    originalCards.forEach(card => {
        sliderTrack.appendChild(card.cloneNode(true));
    });
    
    const cardWidth = 340; // 320px card + 20px gap
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Update slider position
    function updateSlider(smooth = true) {
        sliderTrack.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        sliderTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        
        // Update indicators based on position within original set
        const indicatorIndex = currentIndex % totalCards;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === indicatorIndex);
        });
    }
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        
        currentIndex--;
        updateSlider();
        
        // Reset to end when reaching beginning
        if (currentIndex < 0) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = totalCards - 1;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    });
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        
        currentIndex++;
        updateSlider();
        
        // Reset to beginning when reaching end of first set
        if (currentIndex >= totalCards) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto-play functionality
    let autoPlayInterval = setInterval(() => {
        if (isTransitioning) return;
        
        currentIndex++;
        updateSlider();
        
        // Reset to beginning when reaching end of first set
        if (currentIndex >= totalCards) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    }, 4000);
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.courses-slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            if (isTransitioning) return;
            
            currentIndex++;
            updateSlider();
            
            if (currentIndex >= totalCards) {
                isTransitioning = true;
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                    isTransitioning = false;
                }, 500);
            }
        }, 4000);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });
    
    sliderTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    sliderTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                currentSlide++;
                updateSlider();
                if (currentSlide > totalSlides) {
                    setTimeout(() => {
                        currentSlide = 1;
                        updateSlider(false);
                    }, 500);
                }
            } else {
                currentSlide--;
                updateSlider();
                if (currentSlide <= 0) {
                    setTimeout(() => {
                        currentSlide = totalSlides;
                        updateSlider(false);
                    }, 500);
                }
            }
        }
        
        // Restart auto-play
        autoPlayInterval = setInterval(() => {
            currentSlide++;
            updateSlider();
            
            if (currentSlide > totalSlides) {
                setTimeout(() => {
                    currentSlide = 1;
                    updateSlider(false);
                }, 500);
            }
        }, 5000);
    });
    
    // Add hover effects to navigation buttons
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-50%) scale(1.1)';
            btn.style.boxShadow = '0 8px 25px rgba(3, 55, 205, 0.5)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(-50%) scale(1)';
            btn.style.boxShadow = '0 4px 15px rgba(3, 55, 205, 0.3)';
        });
    });
    
    // Initialize
    updateSlider(false);
}

// Load Popular Courses (kept for compatibility)
function loadPopularCourses() {
    // This function is now handled by the HTML structure
    // but kept for compatibility with existing code
    return;
}

// Load Enhanced Upcoming Events
function loadUpcomingEvents() {
    const eventsContainer = document.getElementById('eventsSliderTrack');
    if (!eventsContainer) return;
    
    const events = [
        {
            id: 1,
            title: "AI & Machine Learning Summit 2024",
            date: "Dec 15",
            time: "10:00 AM - 6:00 PM",
            location: "Virtual Conference",
            category: "Technology",
            description: "Join industry leaders and explore the latest advances in artificial intelligence and machine learning technologies.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
            attendees: 500,
            price: "Free"
        },
        {
            id: 2,
            title: "Full-Stack Web Development Bootcamp",
            date: "Dec 18",
            time: "2:00 PM - 8:00 PM",
            location: "Tech Hub, Downtown",
            category: "Development",
            description: "Intensive hands-on workshop covering modern web development frameworks and best practices.",
            image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
            attendees: 150,
            price: "$49"
        },
        {
            id: 3,
            title: "Data Science Career Fair",
            date: "Dec 22",
            time: "9:00 AM - 5:00 PM",
            location: "Convention Center",
            category: "Career",
            description: "Network with top companies and discover exciting career opportunities in data science and analytics.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
            attendees: 800,
            price: "Free"
        },
        {
            id: 4,
            title: "Digital Marketing Masterclass",
            date: "Dec 25",
            time: "3:00 PM - 7:00 PM",
            location: "Virtual Workshop",
            category: "Marketing",
            description: "Learn cutting-edge digital marketing strategies and tools from industry experts.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
            attendees: 300,
            price: "$29"
        },
        {
            id: 5,
            title: "UI/UX Design Workshop",
            date: "Dec 28",
            time: "1:00 PM - 6:00 PM",
            location: "Design Studio",
            category: "Design",
            description: "Master the principles of user interface and user experience design with practical projects.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
            attendees: 120,
            price: "$39"
        },
        {
            id: 6,
            title: "Cybersecurity Fundamentals",
            date: "Jan 5",
            time: "10:00 AM - 4:00 PM",
            location: "Security Lab",
            category: "Security",
            description: "Essential cybersecurity concepts and hands-on experience with security tools and techniques.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
            attendees: 200,
            price: "$59"
        }
    ];
    
    // Create enhanced event cards with animations
    eventsContainer.innerHTML = events.map((event, index) => `
        <div class="event-card-enhanced" style="animation: eventCardEntrance 0.8s ease-out ${index * 0.1}s both;">
            <div class="event-image-container">
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="event-date-badge">${event.date}</div>
                <div class="event-category-badge">${event.category}</div>
            </div>
            <div class="event-content">
                <h5 class="event-title">${event.title}</h5>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <i class="bi bi-clock-fill"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="bi bi-geo-alt-fill"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="bi bi-people-fill"></i>
                        <span>${event.attendees} attendees</span>
                    </div>
                    <div class="event-meta-item">
                        <i class="bi bi-tag-fill"></i>
                        <span class="fw-bold" style="color: var(--primary-orange);">${event.price}</span>
                    </div>
                </div>
                <button class="event-register-btn" onclick="registerEvent(${event.id})">
                    <i class="bi bi-calendar-plus me-2"></i>Register Now
                </button>
            </div>
        </div>
    `).join('');
    
    // Initialize events slider after loading content
    setTimeout(() => {
        initEventsSlider();
    }, 100);
}

// Initialize Enhanced Events Slider (similar to courses slider)
function initEventsSlider() {
    const sliderTrack = document.getElementById('eventsSliderTrack');
    const prevBtn = document.querySelector('.events-prev');
    const nextBtn = document.querySelector('.events-next');
    const indicators = document.querySelectorAll('.events-indicator');
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    const originalCards = Array.from(sliderTrack.querySelectorAll('.event-card-enhanced'));
    const totalCards = originalCards.length;
    
    // Create seamless infinite scroll by duplicating cards
    sliderTrack.innerHTML = '';
    
    // Add original cards first
    originalCards.forEach(card => {
        sliderTrack.appendChild(card.cloneNode(true));
    });
    
    // Add duplicate cards for seamless loop
    originalCards.forEach(card => {
        sliderTrack.appendChild(card.cloneNode(true));
    });
    
    const cardWidth = 380; // 350px card + 30px gap
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Update slider position
    function updateSlider(smooth = true) {
        sliderTrack.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        sliderTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        
        // Update indicators based on position within original set
        const indicatorIndex = currentIndex % totalCards;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === indicatorIndex);
        });
    }
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        
        currentIndex--;
        updateSlider();
        
        // Reset to end when reaching beginning
        if (currentIndex < 0) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = totalCards - 1;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    });
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        
        currentIndex++;
        updateSlider();
        
        // Reset to beginning when reaching end of first set
        if (currentIndex >= totalCards) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto-play functionality
    let autoPlayInterval = setInterval(() => {
        if (isTransitioning) return;
        
        currentIndex++;
        updateSlider();
        
        // Reset to beginning when reaching end of first set
        if (currentIndex >= totalCards) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    }, 4000);
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.events-slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            if (isTransitioning) return;
            
            currentIndex++;
            updateSlider();
            
            if (currentIndex >= totalCards) {
                isTransitioning = true;
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                    isTransitioning = false;
                }, 500);
            }
        }, 4000);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });
    
    sliderTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    sliderTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                currentIndex++;
                updateSlider();
                if (currentIndex >= totalCards) {
                    setTimeout(() => {
                        currentIndex = 0;
                        updateSlider(false);
                    }, 500);
                }
            } else {
                currentIndex--;
                updateSlider();
                if (currentIndex < 0) {
                    setTimeout(() => {
                        currentIndex = totalCards - 1;
                        updateSlider(false);
                    }, 500);
                }
            }
        }
        
        // Restart auto-play
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            updateSlider();
            
            if (currentIndex >= totalCards) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                }, 500);
            }
        }, 4000);
    });
    
    // Add hover effects to navigation buttons
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-50%) scale(1.1)';
            btn.style.boxShadow = '0 8px 25px rgba(3, 55, 205, 0.5)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(-50%) scale(1)';
            btn.style.boxShadow = '0 4px 15px rgba(3, 55, 205, 0.3)';
        });
    });
    
    // Initialize
    updateSlider(false);
}

// Load Upcoming Competitions
function loadUpcomingCompetitions() {
    const competitionsContainer = document.getElementById('upcomingCompetitions');
    if (!competitionsContainer) return;
    
    const competitions = [
        {
            id: 1,
            title: "Coding Challenge 2024",
            prize: "$5,000",
            participants: 500,
            deadline: "Jan 15, 2024"
        },
        {
            id: 2,
            title: "Data Science Hackathon",
            prize: "$3,000",
            participants: 250,
            deadline: "Jan 20, 2024"
        },
        {
            id: 3,
            title: "Design Innovation Contest",
            prize: "$2,000",
            participants: 150,
            deadline: "Jan 25, 2024"
        }
    ];
    
    competitionsContainer.innerHTML = competitions.map(comp => `
        <div class="col-md-4">
            <div class="card competition-card h-100">
                <div class="card-body text-center">
                    <i class="bi bi-trophy-fill fs-1 mb-3"></i>
                    <h5 class="card-title">${comp.title}</h5>
                    <p class="card-text">Prize Pool: <strong>${comp.prize}</strong></p>
                    <p class="card-text small">${comp.participants} participants</p>
                    <p class="card-text small">Deadline: ${comp.deadline}</p>
                    <button class="btn btn-warning btn-sm" onclick="joinCompetition(${comp.id})">
                        Join Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Top Students with Enhanced Design
function loadTopStudents() {
    const studentsContainer = document.getElementById('studentsSliderTrack');
    if (!studentsContainer) return;
    
    const students = [
        {
            id: 1,
            name: "Alex Johnson",
            rank: 1,
            score: 98.5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            field: "Computer Science",
            coursesCompleted: 12,
            totalHours: 240,
            achievements: 8
        },
        {
            id: 2,
            name: "Sarah Williams",
            rank: 2,
            score: 96.8,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            field: "UI/UX Design",
            coursesCompleted: 10,
            totalHours: 195,
            achievements: 6
        },
        {
            id: 3,
            name: "Michael Brown",
            rank: 3,
            score: 95.2,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            field: "Web Development",
            coursesCompleted: 11,
            totalHours: 220,
            achievements: 7
        },
        {
            id: 4,
            name: "Emma Davis",
            rank: 4,
            score: 93.7,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            field: "Digital Marketing",
            coursesCompleted: 9,
            totalHours: 180,
            achievements: 5
        },
        {
            id: 5,
            name: "David Wilson",
            rank: 5,
            score: 92.4,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            field: "Artificial Intelligence",
            coursesCompleted: 8,
            totalHours: 165,
            achievements: 4
        }
    ];
    
    studentsContainer.innerHTML = students.map(student => `
        <div class="student-card-enhanced">
            <div class="student-avatar">
                <img src="${student.avatar}" alt="${student.name}">
            </div>
            <div class="student-name">${student.name}</div>
            <div class="student-field">${student.field}</div>
            <div class="student-score">Score: ${student.score}%</div>
            <div class="student-stats">
                <div class="student-stat">
                    <span class="student-stat-value">${student.coursesCompleted}</span>
                    <span class="student-stat-label">Courses</span>
                </div>
                <div class="student-stat">
                    <span class="student-stat-value">${student.totalHours}</span>
                    <span class="student-stat-label">Hours</span>
                </div>
                <div class="student-stat">
                    <span class="student-stat-value">${student.achievements}</span>
                    <span class="student-stat-label">Awards</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Initialize students slider after loading content
    setTimeout(() => {
        initStudentsSlider();
    }, 100);
}

// Initialize Students Slider (similar to events and courses sliders)
function initStudentsSlider() {
    const sliderTrack = document.getElementById('studentsSliderTrack');
    const prevBtn = document.querySelector('.students-prev');
    const nextBtn = document.querySelector('.students-next');
    const indicators = document.querySelectorAll('.students-indicator');
    
    if (!sliderTrack || !prevBtn || !nextBtn) return;
    
    const originalCards = Array.from(sliderTrack.querySelectorAll('.student-card-enhanced'));
    const totalCards = originalCards.length;
    
    // Create seamless infinite scroll by duplicating cards
    sliderTrack.innerHTML = '';
    
    // Add original cards first
    originalCards.forEach(card => {
        sliderTrack.appendChild(card.cloneNode(true));
    });
    
    // Add duplicate cards for seamless loop
    originalCards.forEach(card => {
        sliderTrack.appendChild(card.cloneNode(true));
    });
    
    const cardWidth = 380; // 350px card + 30px gap
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Update slider position
    function updateSlider(smooth = true) {
        sliderTrack.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        sliderTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        
        // Update indicators based on position within original set
        const indicatorIndex = currentIndex % totalCards;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === indicatorIndex);
        });
    }
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        
        currentIndex--;
        updateSlider();
        
        // Reset to end when reaching beginning
        if (currentIndex < 0) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = totalCards - 1;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    });
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        
        currentIndex++;
        updateSlider();
        
        // Reset to beginning when reaching end of first set
        if (currentIndex >= totalCards) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto-play functionality
    let autoPlayInterval = setInterval(() => {
        if (isTransitioning) return;
        
        currentIndex++;
        updateSlider();
        
        // Reset to beginning when reaching end of first set
        if (currentIndex >= totalCards) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        }
    }, 5000);
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.students-slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            if (isTransitioning) return;
            
            currentIndex++;
            updateSlider();
            
            if (currentIndex >= totalCards) {
                isTransitioning = true;
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                    isTransitioning = false;
                }, 500);
            }
        }, 5000);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoPlayInterval);
    });
    
    sliderTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    sliderTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                currentIndex++;
                updateSlider();
                if (currentIndex >= totalCards) {
                    setTimeout(() => {
                        currentIndex = 0;
                        updateSlider(false);
                    }, 500);
                }
            } else {
                currentIndex--;
                updateSlider();
                if (currentIndex < 0) {
                    setTimeout(() => {
                        currentIndex = totalCards - 1;
                        updateSlider(false);
                    }, 500);
                }
            }
        }
        
        // Restart auto-play
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            updateSlider();
            
            if (currentIndex >= totalCards) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                }, 500);
            }
        }, 5000);
    });
    
    // Add hover effects to navigation buttons
    [prevBtn, nextBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-50%) scale(1.1)';
            btn.style.boxShadow = '0 8px 25px rgba(3, 55, 205, 0.5)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(-50%) scale(1)';
            btn.style.boxShadow = '0 4px 15px rgba(3, 55, 205, 0.3)';
        });
    });
    
    // Initialize
    updateSlider(false);
}

// Load Started Courses (for logged-in users)
function loadStartedCourses() {
    const coursesContainer = document.getElementById('startedCourses');
    if (!coursesContainer) return;
    
    const startedCourses = [
        {
            id: 1,
            title: "JavaScript Fundamentals",
            progress: 75,
            nextLesson: "Async/Await Patterns",
            instructor: "John Doe"
        },
        {
            id: 2,
            title: "Python for Beginners",
            progress: 45,
            nextLesson: "Object-Oriented Programming",
            instructor: "Jane Smith"
        },
        {
            id: 3,
            title: "Digital Marketing Basics",
            progress: 90,
            nextLesson: "Social Media Analytics",
            instructor: "Mike Johnson"
        }
    ];
    
    coursesContainer.innerHTML = startedCourses.map(course => `
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="text-muted small">by ${course.instructor}</p>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="small">Progress</span>
                            <span class="small">${course.progress}%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" style="width: ${course.progress}%"></div>
                        </div>
                    </div>
                    <p class="small text-muted mb-3">Next: ${course.nextLesson}</p>
                    <button class="btn btn-primary btn-sm w-100" onclick="continueCourse(${course.id})">
                        Continue Learning
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Testimonials
function loadTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials');
    if (!testimonialsContainer) return;
    
    const testimonials = [
        {
            id: 1,
            name: "Emily Rodriguez",
            role: "Software Developer",
            content: "KoMoJa transformed my career! The courses are well-structured and the instructors are incredibly knowledgeable. I landed my dream job after completing the Full Stack Development program.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Thompson",
            role: "Data Scientist",
            content: "The Data Science track here is outstanding. Real-world projects, excellent mentorship, and a supportive community. I couldn't have asked for a better learning experience.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5
        },
        {
            id: 3,
            name: "Sarah Kim",
            role: "UX Designer",
            content: "As someone transitioning careers, KoMoJa provided exactly what I needed. The UI/UX courses are practical, engaging, and taught by industry experts.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            rating: 5
        }
    ];
    
    testimonialsContainer.innerHTML = testimonials.map((testimonial, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="testimonial-card">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="rating mb-3">
                    ${generateStars(testimonial.rating)}
                </div>
                <p class="mb-3">"${testimonial.content}"</p>
                <h6 class="mb-1">${testimonial.name}</h6>
                <small class="text-muted">${testimonial.role}</small>
            </div>
        </div>
    `).join('');
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Animation on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll('.card, .hero-section h1, .hero-section p');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Utility Functions
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star"></i>';
    }
    
    return stars;
}

function getRankClass(rank) {
    switch(rank) {
        case 1: return 'gold';
        case 2: return 'silver';
        case 3: return 'bronze';
        default: return '';
    }
}

// Event Handlers
function enrollCourse(courseId) {
    alert(`Enrolling in course ${courseId}. Please login to continue.`);
    // Redirect to login or course page
}

function registerEvent(eventId) {
    alert(`Registering for event ${eventId}. Please login to continue.`);
    // Redirect to login or event registration
}

function joinCompetition(competitionId) {
    alert(`Joining competition ${competitionId}. Please login to continue.`);
    // Redirect to login or competition page
}

function continueCourse(courseId) {
    alert(`Continuing course ${courseId}...`);
    // Redirect to course learning page
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        // Implement search logic here
        console.log('Searching for:', query);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Newsletter subscription
function subscribeNewsletter(email) {
    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }
    
    alert('Thank you for subscribing to our newsletter!');
    // Implement newsletter subscription logic
}
