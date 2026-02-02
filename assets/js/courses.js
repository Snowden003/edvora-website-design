// Courses Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    initFilters();
    initSearch();
    initLoadMore();
});

// Sample courses data
const coursesData = [
    {
        id: 1,
        title: "Advanced JavaScript & React",
        instructor: "Dr. Sarah Johnson",
        price: 99,
        originalPrice: 149,
        rating: 4.9,
        students: 1250,
        duration: "12 weeks",
        level: "intermediate",
        category: "programming",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
        description: "Master modern JavaScript and React development with hands-on projects and real-world applications.",
        features: ["Live coding sessions", "Real projects", "Certificate", "Lifetime access"],
        popular: true,
        new: false
    },
    {
        id: 2,
        title: "Data Science with Python",
        instructor: "Prof. Michael Chen",
        price: 129,
        originalPrice: 199,
        rating: 4.8,
        students: 980,
        duration: "16 weeks",
        level: "beginner",
        category: "data-science",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        description: "Learn data analysis, machine learning, and visualization using Python and popular libraries.",
        features: ["Jupyter notebooks", "Real datasets", "ML projects", "Career support"],
        popular: true,
        new: false
    },
    {
        id: 3,
        title: "Digital Marketing Mastery",
        instructor: "Emma Rodriguez",
        price: 79,
        originalPrice: 119,
        rating: 4.7,
        students: 1500,
        duration: "8 weeks",
        level: "beginner",
        category: "marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        description: "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
        features: ["Campaign creation", "Analytics tools", "Case studies", "Templates"],
        popular: false,
        new: false
    },
    {
        id: 4,
        title: "UI/UX Design Fundamentals",
        instructor: "Alex Thompson",
        price: 89,
        originalPrice: 139,
        rating: 4.6,
        students: 750,
        duration: "10 weeks",
        level: "beginner",
        category: "design",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
        description: "Learn user-centered design principles and create stunning interfaces with industry tools.",
        features: ["Design tools", "Portfolio projects", "User research", "Prototyping"],
        popular: false,
        new: true
    },
    {
        id: 5,
        title: "Machine Learning Basics",
        instructor: "Dr. Lisa Wang",
        price: 149,
        originalPrice: 229,
        rating: 4.8,
        students: 650,
        duration: "14 weeks",
        level: "intermediate",
        category: "data-science",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
        description: "Introduction to machine learning algorithms, implementation, and practical applications.",
        features: ["Algorithm deep-dive", "Python libraries", "Real projects", "Research papers"],
        popular: true,
        new: false
    },
    {
        id: 6,
        title: "Business Analytics",
        instructor: "Robert Davis",
        price: 109,
        originalPrice: 159,
        rating: 4.5,
        students: 890,
        duration: "12 weeks",
        level: "intermediate",
        category: "business",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        description: "Learn to analyze business data and make data-driven decisions using modern tools.",
        features: ["Excel mastery", "SQL queries", "Dashboard creation", "Business cases"],
        popular: false,
        new: false
    },
    {
        id: 7,
        title: "Full Stack Web Development",
        instructor: "John Martinez",
        price: 199,
        originalPrice: 299,
        rating: 4.9,
        students: 2100,
        duration: "20 weeks",
        level: "advanced",
        category: "programming",
        image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
        description: "Complete web development bootcamp covering frontend, backend, and deployment.",
        features: ["Full stack projects", "Modern frameworks", "Database design", "DevOps basics"],
        popular: true,
        new: false
    },
    {
        id: 8,
        title: "Graphic Design Essentials",
        instructor: "Maria Garcia",
        price: 69,
        originalPrice: 99,
        rating: 4.4,
        students: 1200,
        duration: "6 weeks",
        level: "beginner",
        category: "design",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop",
        description: "Master graphic design principles and create professional designs using industry tools.",
        features: ["Adobe Creative Suite", "Design principles", "Brand identity", "Print design"],
        popular: false,
        new: true
    },
    {
        id: 9,
        title: "Social Media Marketing",
        instructor: "David Kim",
        price: 59,
        originalPrice: 89,
        rating: 4.3,
        students: 1800,
        duration: "4 weeks",
        level: "beginner",
        category: "marketing",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250&fit=crop",
        description: "Learn to create engaging social media campaigns and grow your online presence.",
        features: ["Platform strategies", "Content creation", "Analytics", "Influencer marketing"],
        popular: false,
        new: false
    },
    {
        id: 10,
        title: "Project Management Professional",
        instructor: "Jennifer Lee",
        price: 139,
        originalPrice: 199,
        rating: 4.7,
        students: 560,
        duration: "10 weeks",
        level: "intermediate",
        category: "business",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
        description: "Master project management methodologies and tools for successful project delivery.",
        features: ["Agile & Scrum", "PM tools", "Risk management", "PMP prep"],
        popular: false,
        new: true
    }
];

let filteredCourses = [...coursesData];
let displayedCourses = 6;

// Load and display courses
function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    const coursesToShow = filteredCourses.slice(0, displayedCourses);
    
    coursesGrid.innerHTML = coursesToShow.map(course => `
        <div class="col-lg-4 col-md-6">
            <div class="card course-card h-100">
                <div class="position-relative">
                    <img src="${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="position-absolute top-0 start-0 m-2">
                        ${course.popular ? '<span class="badge bg-danger">Popular</span>' : ''}
                        ${course.new ? '<span class="badge bg-success">New</span>' : ''}
                    </div>
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-dark">$${course.price}</span>
                        ${course.originalPrice > course.price ? 
                            `<br><small class="text-decoration-line-through text-muted">$${course.originalPrice}</small>` : ''
                        }
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <div class="mb-2">
                        <span class="badge bg-primary">${getCategoryName(course.category)}</span>
                        <span class="badge bg-secondary ms-1">${course.level}</span>
                    </div>
                    <h5 class="card-title">${course.title}</h5>
                    <p class="text-muted mb-2">by ${course.instructor}</p>
                    <p class="card-text small text-muted">${course.description}</p>
                    
                    <div class="mt-auto">
                        <div class="d-flex align-items-center mb-3">
                            <div class="rating me-2">
                                ${generateStars(course.rating)}
                            </div>
                            <span class="text-muted small">(${course.rating}) • ${course.students} students</span>
                        </div>
                        
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <small class="text-muted">
                                <i class="bi bi-clock me-1"></i>${course.duration}
                            </small>
                            <small class="text-muted">
                                <i class="bi bi-bar-chart me-1"></i>${course.level}
                            </small>
                        </div>
                        
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary" onclick="enrollCourse(${course.id})">
                                Enroll Now
                            </button>
                            <button class="btn btn-outline-primary" onclick="goToCourseDetail('${getCourseSlug(course)}')">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Update load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = displayedCourses >= filteredCourses.length ? 'none' : 'block';
    }
}

// Initialize filters
function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const sortBy = document.getElementById('sortBy');

    [categoryFilter, levelFilter, sortBy].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', applyFilters);
        }
    });
}

// Initialize search
function initSearch() {
    const searchInput = document.getElementById('searchCourses');
    if (!searchInput) return;

    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300);
    });
}

// Apply filters and search
function applyFilters() {
    const searchTerm = document.getElementById('searchCourses')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const levelFilter = document.getElementById('levelFilter')?.value || '';
    const sortBy = document.getElementById('sortBy')?.value || 'popular';

    // Filter courses
    filteredCourses = coursesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                            course.instructor.toLowerCase().includes(searchTerm) ||
                            course.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || course.category === categoryFilter;
        const matchesLevel = !levelFilter || course.level === levelFilter;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    switch(sortBy) {
        case 'newest':
            filteredCourses.sort((a, b) => b.new - a.new);
            break;
        case 'rating':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredCourses.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
        default:
            filteredCourses.sort((a, b) => b.students - a.students);
            break;
    }

    // Reset displayed courses count
    displayedCourses = 6;
    loadCourses();
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function() {
        displayedCourses += 6;
        loadCourses();
    });
}

// Course actions
function enrollCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        alert(`Enrolling in "${course.title}". Please login to continue.`);
        // In a real app, this would redirect to login or payment page
    }
}

function viewCourseDetails(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    // Create modal if it doesn't exist
    let modal = document.getElementById('courseModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'courseModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="courseModalTitle"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" id="courseModalBody">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="enrollModalBtn">Enroll Now</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Update modal content
    document.getElementById('courseModalTitle').textContent = course.title;
    document.getElementById('courseModalBody').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${course.image}" class="img-fluid rounded mb-3" alt="${course.title}">
            </div>
            <div class="col-md-6">
                <h6>Instructor: ${course.instructor}</h6>
                <p class="text-muted">${course.description}</p>
                
                <div class="mb-3">
                    <div class="d-flex align-items-center mb-2">
                        <div class="rating me-2">
                            ${generateStars(course.rating)}
                        </div>
                        <span>(${course.rating}) • ${course.students} students</span>
                    </div>
                </div>
                
                <div class="row g-3 mb-3">
                    <div class="col-6">
                        <strong>Duration:</strong><br>
                        <span class="text-muted">${course.duration}</span>
                    </div>
                    <div class="col-6">
                        <strong>Level:</strong><br>
                        <span class="text-muted">${course.level}</span>
                    </div>
                    <div class="col-6">
                        <strong>Category:</strong><br>
                        <span class="text-muted">${getCategoryName(course.category)}</span>
                    </div>
                    <div class="col-6">
                        <strong>Price:</strong><br>
                        <span class="text-success fw-bold">$${course.price}</span>
                        ${course.originalPrice > course.price ? 
                            `<small class="text-decoration-line-through text-muted ms-1">$${course.originalPrice}</small>` : ''
                        }
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-4">
            <h6>What you'll learn:</h6>
            <ul class="list-unstyled">
                ${course.features.map(feature => `
                    <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>${feature}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    document.getElementById('enrollModalBtn').onclick = () => enrollCourse(course.id);
}

// Utility functions
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill text-warning"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half text-warning"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star text-warning"></i>';
    }
    
    return stars;
}

function getCategoryName(category) {
    const categories = {
        'programming': 'Programming',
        'data-science': 'Data Science',
        'design': 'Design',
        'marketing': 'Marketing',
        'business': 'Business'
    };
    return categories[category] || category;
}

// Generate course slug for URL
function getCourseSlug(course) {
    const slugMap = {
        1: 'web-development',
        2: 'data-science-python', 
        3: 'digital-marketing',
        4: 'ui-ux-design',
        5: 'machine-learning',
        6: 'business-analytics',
        7: 'web-development',
        8: 'graphic-design',
        9: 'social-media-marketing',
        10: 'project-management'
    };
    return slugMap[course.id] || 'web-development';
}

// Navigate to course detail page
function goToCourseDetail(courseSlug) {
    window.location.href = `course-detail.html?course=${courseSlug}`;
}
