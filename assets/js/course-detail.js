// Course Detail JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initCourseDetail();
    loadCourseData();
});

// Sample course data
const courseDatabase = {
    'web-development': {
        title: 'Complete Web Development Bootcamp',
        category: 'Programming',
        level: 'Intermediate',
        description: 'Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career as a full-stack developer.',
        overview: 'This comprehensive web development course takes you from beginner to professional level. You\'ll learn the latest technologies and frameworks used by top companies worldwide. Through hands-on projects and real-world applications, you\'ll build a portfolio that showcases your skills to potential employers.',
        price: '$49',
        rating: '4.8',
        students: '15,234',
        duration: '12 weeks',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
        instructor: {
            name: 'Dr. Michael Chen',
            title: 'Senior Full-Stack Developer',
            bio: '10+ years of experience in web development. Former lead developer at Google and Microsoft. Passionate about teaching and helping students succeed.',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            students: '50K+',
            courses: '12',
            rating: '4.9'
        },
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Git', 'API Development'],
        learningObjectives: [
            'HTML5 & CSS3 Fundamentals',
            'JavaScript ES6+ Features',
            'React.js & Component Architecture',
            'Node.js & Express.js Backend',
            'Database Integration (MongoDB)',
            'Deployment & DevOps Basics'
        ]
    },
    'ui-ux-design': {
        title: 'UI/UX Design Mastery',
        category: 'Design',
        level: 'Beginner',
        description: 'Learn to create beautiful and user-friendly interfaces with modern design principles, prototyping tools, and user research methods.',
        overview: 'Dive deep into the world of user interface and user experience design. This course covers everything from design theory to practical application using industry-standard tools.',
        price: '$39',
        rating: '4.9',
        students: '9,876',
        duration: '8 weeks',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
        instructor: {
            name: 'Sarah Williams',
            title: 'Lead UX Designer',
            bio: '8+ years in design industry. Former design lead at Apple and Airbnb. Expert in user-centered design.',
            photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            students: '30K+',
            courses: '8',
            rating: '4.9'
        },
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems', 'Wireframing', 'Visual Design'],
        learningObjectives: [
            'Design Thinking Process',
            'User Research & Personas',
            'Wireframing & Prototyping',
            'Visual Design Principles',
            'Design Systems Creation',
            'Usability Testing'
        ]
    },
    'machine-learning': {
        title: 'Machine Learning Fundamentals',
        category: 'Data Science',
        level: 'Advanced',
        description: 'Dive into AI and machine learning with hands-on projects and real-world applications. Learn Python, TensorFlow, and advanced algorithms.',
        overview: 'Comprehensive introduction to machine learning concepts, algorithms, and practical applications. Build real ML models and understand the mathematics behind them.',
        price: '$79',
        rating: '4.7',
        students: '7,543',
        duration: '16 weeks',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop',
        instructor: {
            name: 'Dr. Alex Rodriguez',
            title: 'AI Research Scientist',
            bio: '12+ years in AI/ML research. PhD in Computer Science. Former researcher at MIT and Google AI.',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            students: '25K+',
            courses: '6',
            rating: '4.8'
        },
        skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Deep Learning', 'Neural Networks', 'Data Analysis'],
        learningObjectives: [
            'Machine Learning Algorithms',
            'Python for Data Science',
            'Deep Learning & Neural Networks',
            'Model Training & Evaluation',
            'Real-world ML Projects',
            'AI Ethics & Best Practices'
        ]
    }
};

function initCourseDetail() {
    // Get course ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course') || 'web-development';
    
    // Load course data
    loadCourseData(courseId);
    
    // Initialize event listeners
    initEventListeners();
}

function loadCourseData(courseId = 'web-development') {
    const course = courseDatabase[courseId];
    
    if (!course) {
        console.error('Course not found:', courseId);
        return;
    }
    
    // Update page title
    document.title = `${course.title} - KoMoJa`;
    
    // Update breadcrumb
    document.getElementById('courseBreadcrumb').textContent = course.title;
    
    // Update course info
    document.getElementById('courseCategory').textContent = course.category;
    document.getElementById('courseLevel').textContent = course.level;
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseDescription').textContent = course.description;
    document.getElementById('courseOverview').textContent = course.overview;
    document.getElementById('coursePrice').textContent = course.price;
    document.getElementById('courseRating').textContent = course.rating;
    document.getElementById('enrolledStudents').textContent = course.students;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseThumbnail').src = course.thumbnail;
    
    // Update instructor info
    document.getElementById('instructorName').textContent = course.instructor.name;
    document.getElementById('instructorTitle').textContent = course.instructor.title;
    document.getElementById('instructorBio').textContent = course.instructor.bio;
    document.getElementById('instructorPhoto').src = course.instructor.photo;
    document.getElementById('instructorStudents').textContent = course.instructor.students;
    document.getElementById('instructorCourses').textContent = course.instructor.courses;
    document.getElementById('instructorRating').textContent = course.instructor.rating;
    
    // Update learning objectives
    updateLearningObjectives(course.learningObjectives);
    
    // Update skills
    updateSkills(course.skills);
}

function updateLearningObjectives(objectives) {
    const container = document.getElementById('learningObjectives');
    container.innerHTML = '';
    
    objectives.forEach(objective => {
        const div = document.createElement('div');
        div.className = 'col-md-6';
        div.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <span>${objective}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

function updateSkills(skills) {
    const container = document.getElementById('courseSkills');
    container.innerHTML = '';
    
    skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-badge';
        span.textContent = skill;
        container.appendChild(span);
    });
}

function initEventListeners() {
    // Enroll button
    const enrollBtn = document.querySelector('.enroll-btn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            // Check if user is logged in
            const userSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
            
            if (userSession) {
                // User is logged in, proceed with enrollment
                showEnrollmentModal();
            } else {
                // Redirect to login
                window.location.href = 'login.html';
            }
        });
    }
    
    // Wishlist button
    const wishlistBtn = document.querySelector('button[data-action="wishlist"]');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            toggleWishlist();
        });
    }
    
    // Curriculum accordion
    const curriculumButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    curriculumButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                icon.className = 'bi bi-chevron-up';
            } else {
                icon.className = 'bi bi-chevron-down';
            }
        });
    });
}

function showEnrollmentModal() {
    // Create enrollment modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'enrollmentModal';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Enroll in Course</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center">
                        <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                        <h4 class="mt-3 mb-3">Enrollment Successful!</h4>
                        <p class="text-muted">You have successfully enrolled in this course. You can now access all course materials and start learning.</p>
                        <div class="d-grid gap-2 mt-4">
                            <button class="btn btn-primary btn-lg" onclick="goToCourse()">
                                <i class="bi bi-play-circle me-2"></i>Start Learning
                            </button>
                            <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Continue Browsing
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Remove modal from DOM when hidden
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}

function toggleWishlist() {
    const wishlistBtn = document.querySelector('button[data-action="wishlist"]');
    const icon = wishlistBtn.querySelector('i');
    
    if (icon.classList.contains('bi-heart')) {
        icon.className = 'bi bi-heart-fill me-2';
        wishlistBtn.innerHTML = '<i class="bi bi-heart-fill me-2"></i>Added to Wishlist';
        wishlistBtn.classList.remove('btn-outline-light');
        wishlistBtn.classList.add('btn-success');
        
        // Show success message
        showToast('Added to wishlist!', 'success');
    } else {
        icon.className = 'bi bi-heart me-2';
        wishlistBtn.innerHTML = '<i class="bi bi-heart me-2"></i>Add to Wishlist';
        wishlistBtn.classList.remove('btn-success');
        wishlistBtn.classList.add('btn-outline-light');
        
        // Show info message
        showToast('Removed from wishlist!', 'info');
    }
}

function goToCourse() {
    // Redirect to student dashboard or course player
    window.location.href = 'student-dashboard.html';
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();
    
    // Remove toast from DOM when hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toastContainer.removeChild(toast);
    });
}

// Function to get course ID from URL or default
function getCourseIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('course') || 'web-development';
}

// Function to navigate to course detail page
function goToCourseDetail(courseId) {
    window.location.href = `course-detail.html?course=${courseId}`;
}

// Export functions for use in other scripts
window.courseDetailFunctions = {
    goToCourseDetail,
    getCourseIdFromUrl,
    courseDatabase
};
