// Teacher Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    loadMyCourses();
    loadPendingReviews();
    loadTodaySchedule();
    loadRecentActivity();
    loadNotifications();
    initNavigation();
});

// Initialize Charts
function initCharts() {
    // Earnings Chart
    const earningsCtx = document.getElementById('earningsChart').getContext('2d');
    new Chart(earningsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Earnings ($)',
                data: [5200, 5800, 6200, 6800, 7200, 7600, 8000, 8200, 8100, 8300, 8400, 8450],
                borderColor: '#FF6D00',
                backgroundColor: 'rgba(255, 109, 0, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Engagement Chart
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    new Chart(engagementCtx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Moderate', 'Low'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    '#28a745',
                    '#FFAC1E',
                    '#dc3545'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Load My Courses
function loadMyCourses() {
    const coursesTable = document.getElementById('myCoursesTable');
    if (!coursesTable) return;

    const courses = [
        {
            id: 1,
            title: 'Advanced JavaScript & React',
            students: 89,
            progress: 75,
            rating: 4.9,
            status: 'Active'
        },
        {
            id: 2,
            title: 'Data Science with Python',
            students: 67,
            progress: 60,
            rating: 4.8,
            status: 'Active'
        },
        {
            id: 3,
            title: 'UI/UX Design Fundamentals',
            students: 45,
            progress: 90,
            rating: 4.7,
            status: 'Active'
        },
        {
            id: 4,
            title: 'Machine Learning Basics',
            students: 34,
            progress: 40,
            rating: 4.6,
            status: 'Draft'
        },
        {
            id: 5,
            title: 'Web Development Bootcamp',
            students: 156,
            progress: 100,
            rating: 4.9,
            status: 'Completed'
        }
    ];

    coursesTable.innerHTML = courses.map(course => `
        <tr>
            <td>
                <div>
                    <h6 class="mb-1">${course.title}</h6>
                    <span class="badge ${getStatusBadgeClass(course.status)}">${course.status}</span>
                </div>
            </td>
            <td>
                <span class="badge bg-primary">${course.students} students</span>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress me-2" style="width: 60px; height: 8px;">
                        <div class="progress-bar" style="width: ${course.progress}%; background: linear-gradient(90deg, #FF6D00, #FFAC1E);"></div>
                    </div>
                    <small>${course.progress}%</small>
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <span class="me-1">${course.rating}</span>
                    <div class="text-warning">
                        ${generateStars(course.rating)}
                    </div>
                </div>
            </td>
            <td>
                <div class="dropdown">
                    <button class="btn btn-sm btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                        Actions
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="viewCourse(${course.id})">
                            <i class="bi bi-eye me-2"></i>View
                        </a></li>
                        <li><a class="dropdown-item" href="#" onclick="editCourse(${course.id})">
                            <i class="bi bi-pencil me-2"></i>Edit
                        </a></li>
                        <li><a class="dropdown-item" href="#" onclick="viewStudents(${course.id})">
                            <i class="bi bi-people me-2"></i>Students
                        </a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="duplicateCourse(${course.id})">
                            <i class="bi bi-files me-2"></i>Duplicate
                        </a></li>
                    </ul>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load Pending Reviews
function loadPendingReviews() {
    const reviewsContainer = document.getElementById('pendingReviews');
    if (!reviewsContainer) return;

    const reviews = [
        {
            id: 1,
            student: 'Alice Johnson',
            assignment: 'React Components Project',
            course: 'Advanced JavaScript',
            submitted: '2 hours ago',
            type: 'assignment'
        },
        {
            id: 2,
            student: 'Bob Smith',
            assignment: 'Data Analysis Report',
            course: 'Data Science',
            submitted: '5 hours ago',
            type: 'assignment'
        },
        {
            id: 3,
            student: 'Carol Davis',
            assignment: 'UI Design Challenge',
            course: 'UI/UX Design',
            submitted: '1 day ago',
            type: 'project'
        }
    ];

    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="d-flex align-items-start p-2 border-bottom">
            <div class="flex-shrink-0 me-3">
                <div class="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                    <i class="bi bi-file-text"></i>
                </div>
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1">${review.assignment}</h6>
                <p class="small text-muted mb-1">by ${review.student}</p>
                <p class="small text-muted mb-2">${review.course}</p>
                <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-outline-primary" onclick="reviewAssignment(${review.id})">
                        Review
                    </button>
                    <small class="text-muted align-self-center">${review.submitted}</small>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Today's Schedule
function loadTodaySchedule() {
    const scheduleContainer = document.getElementById('todaySchedule');
    if (!scheduleContainer) return;

    const schedule = [
        {
            id: 1,
            title: 'React Hooks Deep Dive',
            course: 'Advanced JavaScript & React',
            time: '10:00 AM - 11:30 AM',
            students: 45,
            type: 'live',
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'Q&A Session',
            course: 'Data Science with Python',
            time: '2:00 PM - 3:00 PM',
            students: 32,
            type: 'qa',
            status: 'upcoming'
        },
        {
            id: 3,
            title: 'Portfolio Review',
            course: 'UI/UX Design Fundamentals',
            time: '4:00 PM - 5:00 PM',
            students: 28,
            type: 'review',
            status: 'completed'
        }
    ];

    scheduleContainer.innerHTML = schedule.map(item => `
        <div class="col-md-4">
            <div class="card border-0 shadow-sm h-100 ${item.status === 'completed' ? 'opacity-75' : ''}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge ${getClassTypeBadge(item.type)}">${item.type.toUpperCase()}</span>
                        <span class="badge ${item.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}">${item.status}</span>
                    </div>
                    <h6 class="fw-bold">${item.title}</h6>
                    <p class="small text-muted mb-2">${item.course}</p>
                    <p class="small mb-2">
                        <i class="bi bi-clock me-1"></i>${item.time}
                    </p>
                    <p class="small mb-3">
                        <i class="bi bi-people me-1"></i>${item.students} students
                    </p>
                    <div class="d-flex gap-2">
                        ${item.status === 'upcoming' ? 
                            `<button class="btn btn-primary btn-sm" onclick="startClass(${item.id})">
                                <i class="bi bi-play-circle me-1"></i>Start
                            </button>` :
                            `<button class="btn btn-outline-secondary btn-sm" disabled>
                                <i class="bi bi-check-circle me-1"></i>Completed
                            </button>`
                        }
                        <button class="btn btn-outline-primary btn-sm" onclick="viewClassDetails(${item.id})">
                            <i class="bi bi-info-circle"></i>
                        </button>
                    </div>
                </div>
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
            type: 'student',
            icon: 'bi-person-plus',
            message: 'New student Alice Johnson enrolled in Advanced JavaScript course',
            time: '30 minutes ago',
            color: 'success'
        },
        {
            type: 'assignment',
            icon: 'bi-file-text',
            message: 'Bob Smith submitted React Components Project assignment',
            time: '2 hours ago',
            color: 'info'
        },
        {
            type: 'rating',
            icon: 'bi-star',
            message: 'Received 5-star rating from Carol Davis for UI/UX Design course',
            time: '4 hours ago',
            color: 'warning'
        },
        {
            type: 'class',
            icon: 'bi-camera-video',
            message: 'Completed live class "Data Visualization Techniques"',
            time: '1 day ago',
            color: 'primary'
        },
        {
            type: 'course',
            icon: 'bi-book',
            message: 'Published new lesson "Advanced React Patterns" in JavaScript course',
            time: '2 days ago',
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

// Load Notifications
function loadNotifications() {
    const notificationsContent = document.getElementById('notificationsContent');
    if (!notificationsContent) return;

    const notifications = [
        {
            id: 1,
            title: 'New Assignment Submission',
            message: 'Alice Johnson submitted React Components Project',
            time: '2 hours ago',
            read: false,
            type: 'assignment'
        },
        {
            id: 2,
            title: 'Course Rating',
            message: 'Your Data Science course received a 5-star rating',
            time: '4 hours ago',
            read: false,
            type: 'rating'
        },
        {
            id: 3,
            title: 'Live Class Reminder',
            message: 'React Hooks Deep Dive class starts in 30 minutes',
            time: '6 hours ago',
            read: false,
            type: 'reminder'
        },
        {
            id: 4,
            title: 'Student Question',
            message: 'Bob Smith asked a question in your course forum',
            time: '1 day ago',
            read: true,
            type: 'question'
        }
    ];

    notificationsContent.innerHTML = notifications.map(notification => `
        <div class="d-flex align-items-start p-3 border-bottom ${!notification.read ? 'bg-light' : ''}">
            <div class="flex-shrink-0 me-3">
                <div class="bg-${getNotificationColor(notification.type)} text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                    <i class="bi ${getNotificationIcon(notification.type)}"></i>
                </div>
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1 ${!notification.read ? 'fw-bold' : ''}">${notification.title}</h6>
                <p class="mb-1 small">${notification.message}</p>
                <small class="text-muted">${notification.time}</small>
            </div>
            ${!notification.read ? '<div class="bg-primary rounded-circle" style="width: 8px; height: 8px;"></div>' : ''}
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
function createCourse() {
    const form = document.getElementById('createCourseForm');
    const formData = new FormData(form);
    
    console.log('Creating course:', Object.fromEntries(formData));
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('createCourseModal'));
    modal.hide();
    
    showToast('Course created successfully!', 'success');
    
    setTimeout(() => {
        loadMyCourses();
    }, 500);
}

function viewCourse(courseId) {
    console.log('Viewing course:', courseId);
    showToast(`Viewing course ${courseId}`, 'info');
}

function editCourse(courseId) {
    console.log('Editing course:', courseId);
    showToast(`Editing course ${courseId}`, 'info');
}

function viewStudents(courseId) {
    console.log('Viewing students for course:', courseId);
    showToast(`Viewing students for course ${courseId}`, 'info');
}

function duplicateCourse(courseId) {
    console.log('Duplicating course:', courseId);
    showToast('Course duplicated successfully!', 'success');
}

// Schedule Functions
function scheduleClass() {
    const form = document.getElementById('scheduleClassForm');
    const formData = new FormData(form);
    
    console.log('Scheduling class:', Object.fromEntries(formData));
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('scheduleClassModal'));
    modal.hide();
    
    showToast('Class scheduled successfully!', 'success');
    
    setTimeout(() => {
        loadTodaySchedule();
    }, 500);
}

function startClass(classId) {
    console.log('Starting class:', classId);
    showToast('Starting live class...', 'info');
    // In a real app, this would open the live class interface
}

function viewClassDetails(classId) {
    console.log('Viewing class details:', classId);
    showToast(`Viewing details for class ${classId}`, 'info');
}

// Review Functions
function reviewAssignment(reviewId) {
    console.log('Reviewing assignment:', reviewId);
    showToast('Opening assignment for review...', 'info');
    // In a real app, this would open the assignment review interface
}

// Notification Functions
function markAllRead() {
    console.log('Marking all notifications as read');
    showToast('All notifications marked as read', 'success');
    loadNotifications();
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

function getStatusBadgeClass(status) {
    switch(status) {
        case 'Active': return 'bg-success';
        case 'Draft': return 'bg-warning text-dark';
        case 'Completed': return 'bg-secondary';
        default: return 'bg-primary';
    }
}

function getClassTypeBadge(type) {
    switch(type) {
        case 'live': return 'bg-danger';
        case 'qa': return 'bg-info';
        case 'review': return 'bg-warning text-dark';
        default: return 'bg-primary';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'assignment': return 'info';
        case 'rating': return 'warning';
        case 'reminder': return 'primary';
        case 'question': return 'success';
        default: return 'secondary';
    }
}

function getNotificationIcon(type) {
    switch(type) {
        case 'assignment': return 'bi-file-text';
        case 'rating': return 'bi-star';
        case 'reminder': return 'bi-bell';
        case 'question': return 'bi-question-circle';
        default: return 'bi-info-circle';
    }
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
