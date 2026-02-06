// Student Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadMyCourses();
    loadUpcomingEvents();
    loadActiveCompetitions();
    loadAchievements();
    loadLeaderboard();
    loadRecentActivity();
    initNavigation();
});

// Load My Courses
function loadMyCourses() {
    const coursesContainer = document.getElementById('myCourses');
    if (!coursesContainer) return;

    const myCourses = [
        {
            id: 1,
            title: 'Advanced JavaScript & React',
            instructor: 'Dr. Sarah Johnson',
            progress: 75,
            totalLessons: 24,
            completedLessons: 18,
            nextLesson: 'React Hooks Deep Dive',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
            category: 'Programming',
            timeLeft: '2 weeks left'
        },
        {
            id: 2,
            title: 'Data Science with Python',
            instructor: 'Prof. Michael Chen',
            progress: 45,
            totalLessons: 32,
            completedLessons: 14,
            nextLesson: 'Machine Learning Basics',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            category: 'Data Science',
            timeLeft: '1 month left'
        },
        {
            id: 3,
            title: 'Digital Marketing Mastery',
            instructor: 'Emma Rodriguez',
            progress: 90,
            totalLessons: 20,
            completedLessons: 18,
            nextLesson: 'Final Project',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
            category: 'Marketing',
            timeLeft: '3 days left'
        }
    ];

    coursesContainer.innerHTML = myCourses.map(course => `
        <div class="col-lg-4 col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="position-relative">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}" style="height: 200px; object-fit: cover;">
                    <span class="badge bg-primary position-absolute top-0 start-0 m-2">${course.category}</span>
                    <span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2">${course.timeLeft}</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title fw-bold">${course.title}</h6>
                    <p class="text-muted small mb-2">by ${course.instructor}</p>
                    
                    <div class="mb-3">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="small">Progress</span>
                            <span class="small">${course.progress}% (${course.completedLessons}/${course.totalLessons})</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar" style="width: ${course.progress}%; background: linear-gradient(90deg, #1F8FFF, #1F8FFF);"></div>
                        </div>
                    </div>
                    
                    <div class="mt-auto">
                        <p class="small text-muted mb-2">
                            <i class="bi bi-play-circle me-1"></i>Next: ${course.nextLesson}
                        </p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary btn-sm flex-grow-1" onclick="continueCourse(${course.id})">
                                Continue
                            </button>
                            <button class="btn btn-outline-primary btn-sm" onclick="viewCourseProgress(${course.id})">
                                <i class="bi bi-bar-chart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Upcoming Events
function loadUpcomingEvents() {
    const eventsContainer = document.getElementById('upcomingEvents');
    if (!eventsContainer) return;

    const events = [
        {
            id: 1,
            title: 'AI & Machine Learning Summit',
            date: 'Dec 15, 2024',
            time: '10:00 AM',
            type: 'Virtual',
            registered: true
        },
        {
            id: 2,
            title: 'Web Development Workshop',
            date: 'Dec 18, 2024',
            time: '2:00 PM',
            type: 'In-Person',
            registered: false
        },
        {
            id: 3,
            title: 'Career Guidance Session',
            date: 'Dec 20, 2024',
            time: '4:00 PM',
            type: 'Virtual',
            registered: true
        }
    ];

    eventsContainer.innerHTML = events.map(event => `
        <div class="d-flex align-items-center p-2 border-bottom">
            <div class="flex-shrink-0 me-3">
                <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                    <i class="bi bi-calendar-event"></i>
                </div>
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1">${event.title}</h6>
                <p class="small text-muted mb-1">
                    <i class="bi bi-clock me-1"></i>${event.date} at ${event.time}
                </p>
                <span class="badge ${event.type === 'Virtual' ? 'bg-info' : 'bg-success'} me-2">${event.type}</span>
                ${event.registered ? 
                    '<span class="badge bg-success">Registered</span>' : 
                    '<button class="btn btn-outline-primary btn-sm" onclick="registerEvent(' + event.id + ')">Register</button>'
                }
            </div>
        </div>
    `).join('');
}

// Load Active Competitions
function loadActiveCompetitions() {
    const competitionsContainer = document.getElementById('activeCompetitions');
    if (!competitionsContainer) return;

    const competitions = [
        {
            id: 1,
            title: 'Coding Challenge 2024',
            prize: '$5,000',
            deadline: 'Jan 15, 2025',
            participants: 1250,
            myRank: 45,
            joined: true
        },
        {
            id: 2,
            title: 'Data Science Hackathon',
            prize: '$3,000',
            deadline: 'Jan 20, 2025',
            participants: 680,
            myRank: null,
            joined: false
        },
        {
            id: 3,
            title: 'Design Innovation Contest',
            prize: '$2,000',
            deadline: 'Jan 25, 2025',
            participants: 340,
            myRank: 12,
            joined: true
        }
    ];

    competitionsContainer.innerHTML = competitions.map(comp => `
        <div class="d-flex align-items-center p-2 border-bottom">
            <div class="flex-shrink-0 me-3">
                <div class="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                    <i class="bi bi-trophy"></i>
                </div>
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1">${comp.title}</h6>
                <p class="small text-muted mb-1">
                    <i class="bi bi-currency-dollar me-1"></i>Prize: ${comp.prize} | 
                    <i class="bi bi-people me-1"></i>${comp.participants} participants
                </p>
                <p class="small text-muted mb-2">Deadline: ${comp.deadline}</p>
                ${comp.joined ? 
                    `<span class="badge bg-success me-2">Joined</span>
                     ${comp.myRank ? `<span class="badge bg-primary">Rank #${comp.myRank}</span>` : ''}` :
                    `<button class="btn btn-outline-warning btn-sm" onclick="joinCompetition(${comp.id})">Join Now</button>`
                }
            </div>
        </div>
    `).join('');
}

// Load Achievements
function loadAchievements() {
    const achievementsContainer = document.getElementById('achievements');
    if (!achievementsContainer) return;

    const achievements = [
        {
            id: 1,
            title: 'First Course Completed',
            description: 'Completed your first course',
            icon: 'bi-award',
            color: 'success',
            earned: true,
            date: '2024-01-15'
        },
        {
            id: 2,
            title: 'Speed Learner',
            description: 'Completed 3 courses in a month',
            icon: 'bi-lightning',
            color: 'warning',
            earned: true,
            date: '2024-02-10'
        },
        {
            id: 3,
            title: 'Top 10%',
            description: 'Ranked in top 10% globally',
            icon: 'bi-trophy',
            color: 'primary',
            earned: true,
            date: '2024-03-05'
        },
        {
            id: 4,
            title: 'Competition Winner',
            description: 'Won a coding competition',
            icon: 'bi-star',
            color: 'danger',
            earned: false,
            date: null
        },
        {
            id: 5,
            title: 'Knowledge Master',
            description: 'Completed 10 courses',
            icon: 'bi-mortarboard',
            color: 'info',
            earned: false,
            date: null
        },
        {
            id: 6,
            title: 'Community Helper',
            description: 'Helped 50+ students',
            icon: 'bi-people',
            color: 'secondary',
            earned: false,
            date: null
        }
    ];

    achievementsContainer.innerHTML = achievements.map(achievement => `
        <div class="col-md-4">
            <div class="card border-0 shadow-sm h-100 ${!achievement.earned ? 'opacity-50' : ''}">
                <div class="card-body text-center">
                    <div class="mb-3">
                        <i class="bi ${achievement.icon} fs-1 text-${achievement.color}"></i>
                    </div>
                    <h6 class="fw-bold">${achievement.title}</h6>
                    <p class="small text-muted mb-2">${achievement.description}</p>
                    ${achievement.earned ? 
                        `<span class="badge bg-${achievement.color}">Earned ${achievement.date}</span>` :
                        '<span class="badge bg-light text-dark">Not Earned</span>'
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// Load Leaderboard
function loadLeaderboard() {
    const leaderboardContainer = document.getElementById('leaderboard');
    if (!leaderboardContainer) return;

    const leaderboard = [
        {
            rank: 1,
            name: 'Alice Johnson',
            score: 2850,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
            isMe: false
        },
        {
            rank: 2,
            name: 'David Chen',
            score: 2720,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
            isMe: false
        },
        {
            rank: 3,
            name: 'Sarah Wilson',
            score: 2680,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
            isMe: false
        },
        {
            rank: 15,
            name: 'John Doe (You)',
            score: 2150,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
            isMe: true
        }
    ];

    leaderboardContainer.innerHTML = leaderboard.map(user => `
        <div class="d-flex align-items-center p-2 ${user.isMe ? 'bg-light rounded' : ''}">
            <div class="flex-shrink-0 me-3">
                <div class="position-relative">
                    <img src="${user.avatar}" alt="${user.name}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                    <span class="position-absolute top-0 start-0 bg-${getRankColor(user.rank)} text-white rounded-circle d-flex align-items-center justify-content-center" 
                          style="width: 20px; height: 20px; font-size: 0.7rem; margin-top: -5px; margin-left: -5px;">
                        ${user.rank}
                    </span>
                </div>
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-0 ${user.isMe ? 'fw-bold' : ''}">${user.name}</h6>
                <small class="text-muted">${user.score} points</small>
            </div>
        </div>
    `).join('');
}

// Load Recent Activity
function loadRecentActivity() {
    const activityContainer = document.getElementById('recentActivity');
    if (!activityContainer) return;

    const activities = [
        {
            type: 'course',
            icon: 'bi-play-circle',
            message: 'Completed lesson "React Hooks Deep Dive" in Advanced JavaScript course',
            time: '2 hours ago',
            color: 'success'
        },
        {
            type: 'achievement',
            icon: 'bi-trophy',
            message: 'Earned "Top 10%" achievement for excellent performance',
            time: '1 day ago',
            color: 'warning'
        },
        {
            type: 'competition',
            icon: 'bi-award',
            message: 'Moved up to rank #45 in Coding Challenge 2024',
            time: '2 days ago',
            color: 'primary'
        },
        {
            type: 'event',
            icon: 'bi-calendar-check',
            message: 'Registered for AI & Machine Learning Summit',
            time: '3 days ago',
            color: 'info'
        },
        {
            type: 'course',
            icon: 'bi-book',
            message: 'Started new course "Data Science with Python"',
            time: '1 week ago',
            color: 'secondary'
        }
    ];

    activityContainer.innerHTML = activities.map(activity => `
        <div class="d-flex align-items-start mb-3 pb-3 border-bottom">
            <div class="flex-shrink-0 me-3">
                <div class="bg-${activity.color} text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                    <i class="bi ${activity.icon}"></i>
                </div>
            </div>
            <div class="flex-grow-1">
                <p class="mb-1">${activity.message}</p>
                <small class="text-muted">${activity.time}</small>
            </div>
        </div>
    `).join('');
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to section
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Course Functions
function continueCourse(courseId) {
    console.log('Continuing course:', courseId);
    // In a real app, this would redirect to the course learning page
    showToast('Redirecting to course...', 'info');
}

function viewCourseProgress(courseId) {
    console.log('Viewing progress for course:', courseId);
    
    // Load course progress details
    const progressContent = document.getElementById('courseProgressContent');
    progressContent.innerHTML = `
        <div class="text-center mb-4">
            <h4>Advanced JavaScript & React</h4>
            <p class="text-muted">by Dr. Sarah Johnson</p>
        </div>
        
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body text-center">
                        <h2 class="text-primary">75%</h2>
                        <p class="mb-0">Overall Progress</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body text-center">
                        <h2 class="text-success">18/24</h2>
                        <p class="mb-0">Lessons Completed</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-4">
            <h5>Recent Lessons</h5>
            <div class="list-group">
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">React Hooks Deep Dive</h6>
                        <small class="text-muted">Completed 2 hours ago</small>
                    </div>
                    <span class="badge bg-success">100%</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">State Management with Redux</h6>
                        <small class="text-muted">Completed yesterday</small>
                    </div>
                    <span class="badge bg-success">95%</span>
                </div>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">Advanced Component Patterns</h6>
                        <small class="text-muted">In progress</small>
                    </div>
                    <span class="badge bg-warning">60%</span>
                </div>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('courseProgressModal'));
    modal.show();
}

// Event Functions
function registerEvent(eventId) {
    console.log('Registering for event:', eventId);
    showToast('Successfully registered for event!', 'success');
    setTimeout(() => {
        loadUpcomingEvents();
    }, 1000);
}

// Competition Functions
function joinCompetition(competitionId) {
    console.log('Joining competition:', competitionId);
    showToast('Successfully joined competition!', 'success');
    setTimeout(() => {
        loadActiveCompetitions();
    }, 1000);
}

// Profile Functions
function saveProfile() {
    const form = document.getElementById('profileForm');
    const formData = new FormData(form);
    
    console.log('Saving profile:', Object.fromEntries(formData));
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('profileModal'));
    modal.hide();
    
    showToast('Profile updated successfully!', 'success');
}

// Utility Functions
function getRankColor(rank) {
    if (rank === 1) return 'warning';
    if (rank <= 3) return 'primary';
    if (rank <= 10) return 'success';
    return 'secondary';
}

function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }
    
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}
