// Course Request System Logic

const availableCourses = [
    {
        id: 1,
        title: "Introduction to Artificial Intelligence",
        category: "Tech",
        complexity: "Intermediate",
        duration: "12 Weeks",
        icon: "bi-cpu-fill",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        description: "Explore the fundamentals of machine learning, neural networks, and AI ethics.",
        roadmap: [
            "Introduction to Neural Networks",
            "Supervised vs Unsupervised Learning",
            "Natural Language Processing Basics",
            "Ethics in AI and Automation"
        ],
        tools: "Python, TensorFlow, PyTorch, Jupyter Notebooks"
    },
    {
        id: 2,
        title: "Modern UI/UX Design Trends",
        category: "Design",
        complexity: "Advanced",
        duration: "8 Weeks",
        icon: "bi-palette2",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
        description: "Master Figma, design systems, and user psychology for modern applications.",
        roadmap: [
            "Advanced Prototyping in Figma",
            "Atomic Design Principles",
            "Accessibility (WCAG 2.1)",
            "User Research Methodologies"
        ],
        tools: "Figma, Adobe XD, Miro, Zeplin"
    },
    {
        id: 3,
        title: "Blockchain & DeFi Fundamentals",
        category: "Finance",
        complexity: "Intermediate",
        duration: "10 Weeks",
        icon: "bi-link-45deg",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
        description: "Understand decentralized finance, smart contracts, and Web3 technologies.",
        roadmap: [
            "History of Blockchain",
            "Smart Contract Architecture",
            "DeFi Protocols (Uniswap, Aave)",
            "Tokenomics and Governance"
        ],
        tools: "Solidity, Hardhat, MetaMask, Ethers.js"
    },
    {
        id: 4,
        title: "Full-Stack Web Development (Rust)",
        category: "Tech",
        complexity: "Expert",
        duration: "16 Weeks",
        icon: "bi-box-seam",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        description: "Build high-performance web applications using Rust and WebAssembly.",
        roadmap: [],
        tools: "Rust, Actix-web, Diesel, PostgreSQL, React"
    },
    {
        id: 5,
        title: "Graphic Design Masterclass",
        category: "Design",
        complexity: "Beginner",
        duration: "6 Weeks",
        icon: "bi-pen-fill",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
        description: "Learn the core principles of typography, layout, and visual branding.",
        roadmap: [
            "Color Theory Basics",
            "Typography and Composition",
            "Logo Design Workflow",
            "Print vs Digital Layouts"
        ],
        tools: "Adobe Illustrator, Photoshop, InDesign"
    }
];

let myRequests = [
    {
        id: 101,
        title: "Advanced React Patterns",
        category: "Tech",
        status: "approved",
        date: "2026-03-01"
    },
    {
        id: 102,
        title: "Data Science with Python",
        category: "Tech",
        status: "pending",
        date: "2026-03-05"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    renderMarketplace();
    renderMyRequests();
    initFilters();
});

function renderMarketplace(filter = 'all') {
    const grid = document.getElementById('marketplaceGrid');
    if (!grid) return;

    const filtered = filter === 'all'
        ? availableCourses
        : availableCourses.filter(c => c.category === filter);

    grid.innerHTML = filtered.map(course => `
        <div class="col-md-6 col-lg-4 animate-fadeIn mb-4">
            <div class="course-request-card h-100">
                <div class="card-img-wrapper">
                    <img src="${course.image}" alt="${course.title}">
                </div>
                <div class="card-content-premium">
                    <div class="mb-3">
                        <h5 class="fw-bold mb-2">${course.title}</h5>
                        <div class="d-flex gap-2">
                            <span class="badge bg-soft-primary text-primary rounded-pill small">${course.complexity}</span>
                            <span class="badge bg-soft-info text-info rounded-pill small"><i class="bi bi-clock me-1"></i>${course.duration}</span>
                        </div>
                    </div>
                    <p class="text-muted small description-text">${course.description}</p>
                    <div class="mt-auto">
                        <button class="btn btn-apply-premium w-100" onclick="openRequestModal(${course.id})">
                            <i class="bi bi-plus-circle me-2"></i>Request This Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderMyRequests() {
    const list = document.getElementById('myRequestsList');
    if (!list) return;

    list.innerHTML = myRequests.map(req => `
        <div class="request-card-premium p-3 mb-3">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div class="d-flex align-items-center gap-3">
                    <div class="icon-sm bg-primary-soft rounded-circle p-2 text-primary">
                        <i class="bi bi-file-earmark-text"></i>
                    </div>
                    <div>
                        <h6 class="fw-bold mb-0">${req.title}</h6>
                        <small class="text-muted">${req.category} • Requested on ${req.date}</small>
                    </div>
                </div>
                <span class="status-badge bg-status-${req.status}">${req.status}</span>
            </div>
        </div>
    `).join('');
}

function initFilters() {
    const filters = document.querySelectorAll('.filter-pill');
    filters.forEach(f => {
        f.addEventListener('click', function () {
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderMarketplace(this.dataset.filter);
        });
    });
}

function switchTab(tab) {
    const btns = document.querySelectorAll('.request-tab-btn');
    const sections = ['marketplaceSection', 'myRequestsSection'];

    btns.forEach((b, i) => {
        if (i === (tab === 'marketplace' ? 0 : 1)) b.classList.add('active');
        else b.classList.remove('active');
    });

    sections.forEach(s => {
        document.getElementById(s).classList.add('d-none');
    });
    document.getElementById(tab + 'Section').classList.remove('d-none');
}

function openRequestModal(id) {
    const course = availableCourses.find(c => c.id === id);
    if (!course) return;

    // Populate Left Pane (Info)
    document.getElementById('modalCourseTitle').innerText = course.title;
    document.getElementById('modalCourseCategory').innerText = course.category;
    document.getElementById('modalCourseDescription').innerText = course.description || 'Join us in teaching this high-impact course to our global community.';
    document.getElementById('modalCourseDuration').innerText = course.duration || 'Flexible';
    document.getElementById('modalCourseComplexity').innerText = course.complexity || 'All Levels';

    // Populate Roadmap Preview (Left Pane)
    const roadmapPreview = document.getElementById('modalRoadmapPreview');
    if (course.roadmap && course.roadmap.length > 0) {
        roadmapPreview.innerHTML = course.roadmap.map(item => `
            <li class="roadmap-preview-item">${item}</li>
        `).join('');
    } else {
        roadmapPreview.innerHTML = '<li class="text-muted small">No roadmap suggested by admin yet.</li>';
    }

    // Populate Right Pane (Form) - Reset to defaults
    document.getElementById('modalTeachingFormat').value = 'recorded';
    document.getElementById('modalTeacherDuration').value = course.duration ? parseInt(course.duration) : '';
    document.getElementById('modalDurationUnit').value = 'weeks';
    document.getElementById('modalTargetAudience').value = '';
    document.getElementById('modalCourseTools').value = course.tools || '';
    document.getElementById('modalPrerequisites').value = '';
    document.getElementById('modalOutcomes').value = '';
    document.getElementById('modalPersonalNote').value = '';

    const roadmapInput = document.getElementById('courseRoadmapInput');
    if (course.roadmap && course.roadmap.length > 0) {
        roadmapInput.value = course.roadmap.join('\n');
    } else {
        roadmapInput.value = '';
        roadmapInput.placeholder = "Enter your proposed roadmap (one item per line)...";
    }

    const modal = new bootstrap.Modal(document.getElementById('applicationModal'));
    modal.show();
}

function submitApplication() {
    const btn = document.getElementById('submitAppBtn');
    const originalText = btn.innerText;

    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = 'Application Sent!';
        btn.classList.replace('btn-primary', 'btn-success');

        setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('applicationModal'));
            modal.hide();

            // Revert button for next time
            btn.innerText = originalText;
            btn.classList.replace('btn-success', 'btn-primary');
            btn.disabled = false;

            // Mock adding to requests
            // (In real app, refresh from DB)
            alert('Your request has been submitted to Edvora Admins! 🚀');
        }, 1000);
    }, 1500);
}
