// Your Courses JavaScript
document.addEventListener('DOMContentLoaded', function () {
    loadYourCourses();
    initFilters();
    initSidebar();
});

// Mock Course Data
const coursesData = [
    {
        id: 1,
        title: 'Advanced JavaScript & React',
        category: 'Programming',
        students: 89,
        rating: 4.9,
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
    },
    {
        id: 2,
        title: 'Data Science with Python',
        category: 'Data Science',
        students: 67,
        rating: 4.8,
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?w=400&h=250&fit=crop'
    },
    {
        id: 3,
        title: 'UI/UX Design Fundamentals',
        category: 'Design',
        students: 45,
        rating: 4.7,
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop'
    },
    {
        id: 4,
        title: 'Machine Learning Basics',
        category: 'Data Science',
        students: 34,
        rating: 4.6,
        status: 'Draft',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop'
    },
    {
        id: 5,
        title: 'Web Development Bootcamp',
        category: 'Programming',
        students: 156,
        rating: 4.9,
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop'
    },
    {
        id: 6,
        title: 'Digital Marketing Mastery',
        category: 'Marketing',
        students: 112,
        rating: 4.5,
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    }
];

// Load and Render Courses
function loadYourCourses(filteredData = coursesData) {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;

    if (filteredData.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                <h4 class="text-muted">No courses found matching your criteria</h4>
                <button class="btn btn-primary mt-3 rounded-pill" onclick="resetFilters()">Clear Filters</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredData.map((course, index) => `
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="course-card-premium" style="animation-delay: ${index * 0.1}s">
                <div class="card-image-top">
                    <img src="${course.image}" alt="${course.title}">
                    <div class="category-overlay">${course.category}</div>
                    <div class="status-badge-overlay ${getStatusColor(course.status)}">${course.status}</div>
                </div>
                <div class="card-body-premium">
                    <h5 class="course-title-premium">${course.title}</h5>
                    <div class="student-count-mini">
                        <i class="bi bi-people-fill text-primary"></i>
                        <span>${course.students} Students Enrolled</span>
                    </div>
                    <div class="card-footer-premium">
                        <button class="btn-premium-primary btn-premium-sm" onclick="viewCourseDetails(${course.id})">
                            View Details
                        </button>
                        <div class="actions-wrapper">
                            <button class="btn-action-premium btn-action-edit" data-tooltip="Edit Course" onclick="editCourse(${course.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn-action-premium btn-action-students" data-tooltip="Manage Students" onclick="viewStudents(${course.id})">
                                <i class="bi bi-people"></i>
                            </button>
                            <button class="btn-action-premium btn-action-more" data-tooltip="Settings" onclick="courseSettings(${course.id})">
                                <i class="bi bi-gear"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function viewCourseDetails(id) {
    window.location.href = 'teacher-courses-detail.html';
}

// Filter Logic
function initFilters() {
    const searchInput = document.getElementById('searchCourses');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('searchCourses').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = coursesData.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm);
        const matchesCategory = category === '' || course.category === category;
        return matchesSearch && matchesCategory;
    });

    loadYourCourses(filtered);
}

function resetFilters() {
    document.getElementById('searchCourses').value = '';
    document.getElementById('categoryFilter').value = '';
    loadYourCourses();
}

// Sidebar Logic (Reused from Dashboard)
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar-premium');
    const sidebarCollapse = document.getElementById('sidebarCollapse');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    if (sidebarCollapse && sidebar) {
        const wrapper = document.querySelector('.dashboard-wrapper');
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            if (wrapper) wrapper.classList.add('sidebar-collapsed');
        } else {
            if (wrapper) wrapper.classList.remove('sidebar-collapsed');
        }

        sidebarCollapse.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            if (wrapper) wrapper.classList.toggle('sidebar-collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }

    // Close on click outside (mobile)
    document.addEventListener('click', (e) => {
        if (sidebar && sidebarToggle &&
            !sidebar.contains(e.target) &&
            !sidebarToggle.contains(e.target) &&
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}

// Helpers
function getStatusColor(status) {
    switch (status) {
        case 'Active': return 'bg-success';
        case 'Draft': return 'bg-warning text-dark';
        case 'Completed': return 'bg-secondary';
        default: return 'bg-primary';
    }
}

// Actions (Placeholders)
function editCourse(id) { console.log('Editing course:', id); }
function viewStudents(id) { console.log('Viewing students for:', id); }
function courseSettings(id) { console.log('Settings for:', id); }
function createNewCourse() {
    const modal = new bootstrap.Modal(document.getElementById('createCourseModal'));
    modal.show();
}
