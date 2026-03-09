// Teacher Courses Detail JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initProgress();
    loadSyllabus();
    loadDocuments();
    renderStudents();
    renderAttendance();
    initStudentSearch();
    initSidebar();
});

// Mock Course Data
const courseDetail = {
    title: 'Advanced JavaScript & React',
    category: 'Programming',
    startDate: 'March 15, 2026',
    estimatedEnd: 'June 20, 2026',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    students: 124,
    syllabus: [
        { id: 1, title: 'Introduction to React 18', duration: '45 mins', completed: true },
        { id: 2, title: 'Understanding Hooks API', duration: '1.2 hours', completed: true },
        { id: 3, title: 'Managing Global State with Redux', duration: '2 hours', completed: true },
        { id: 4, title: 'Server-Side Rendering with Next.js', duration: '1.5 hours', completed: false },
        { id: 5, title: 'Deploying React Apps', duration: '1 hour', completed: false }
    ],
    documents: [
        { id: 1, name: 'react-fundamentals.pdf', size: '2.4 MB', type: 'PDF' },
        { id: 2, name: 'advanced-js-exercises.docx', size: '1.1 MB', type: 'DOCX' },
        { id: 3, name: 'project-blueprint.fig', size: '5.6 MB', type: 'FIGMA' }
    ]
};

// Initialize Progress Bar
function initProgress() {
    const progressBar = document.getElementById('courseProgressBar');
    const progressText = document.getElementById('progressPercentage');

    if (progressBar && progressText) {
        setTimeout(() => {
            progressBar.style.width = courseDetail.progress + '%';
            progressText.innerText = courseDetail.progress + '%';
        }, 300);
    }
}

// Load Syllabus
function loadSyllabus() {
    const syllabusList = document.getElementById('syllabusList');
    if (!syllabusList) return;

    syllabusList.innerHTML = courseDetail.syllabus.map(lesson => `
        <div class="lesson-card-detailed ${lesson.completed ? 'completed' : ''}">
            <div class="status-icon">
                <i class="bi ${lesson.completed ? 'bi-check-circle-fill' : 'bi-play-circle'}"></i>
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1 fw-bold">${lesson.title}</h6>
                <small class="text-muted"><i class="bi bi-clock me-1"></i> ${lesson.duration}</small>
            </div>
            <div>
                ${lesson.completed ? '<span class="badge bg-success-soft text-success rounded-pill px-3">Done</span>' : '<button class="btn btn-sm btn-outline-primary rounded-pill px-3">Start</button>'}
            </div>
        </div>
    `).join('');
}

// Load Documents
function loadDocuments() {
    const docList = document.getElementById('documentList');
    if (!docList) return;

    docList.innerHTML = courseDetail.documents.map(doc => `
        <div class="doc-item-premium">
            <div class="doc-info">
                <div class="doc-icon">
                    <i class="bi ${getFileIcon(doc.type)}"></i>
                </div>
                <div>
                    <h6 class="mb-0 fw-bold">${doc.name}</h6>
                    <small class="text-muted">${doc.size} • ${doc.type}</small>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-light rounded-circle" title="Download"><i class="bi bi-download"></i></button>
                <button class="btn btn-sm btn-light rounded-circle text-danger" title="Delete"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    `).join('');
}

// Helpers
function getFileIcon(type) {
    switch (type) {
        case 'PDF': return 'bi-file-pdf';
        case 'DOCX': return 'bi-file-word';
        case 'FIGMA': return 'bi-figma';
        default: return 'bi-file-earmark';
    }
}

// Advanced Mock Student Data
let studentsData = [
    { id: 101, name: "Ali Rezayi", xp: 2450, avatar: "https://i.pravatar.cc/150?u=1", joinDate: "Jan 12, 2026", trend: "+5", status: "excellent", attHistory: { present: 22, late: 1, absent: 0 } },
    { id: 102, name: "Sara Ahmadi", xp: 1820, avatar: "https://i.pravatar.cc/150?u=2", joinDate: "Feb 05, 2026", trend: "-2", status: "good", attHistory: { present: 18, late: 3, absent: 2 } },
    { id: 103, name: "Mohammad Alavi", xp: 1250, avatar: "https://i.pravatar.cc/150?u=3", joinDate: "Feb 15, 2026", trend: "+10", status: "good", attHistory: { present: 15, late: 5, absent: 3 } },
    { id: 104, name: "Zahra Moradi", xp: 450, avatar: "https://i.pravatar.cc/150?u=4", joinDate: "Mar 01, 2026", trend: "-15", status: "poor", attHistory: { present: 5, late: 2, absent: 8 } }
];

let attendanceData = studentsData.map(s => ({ ...s, attendance: 'present' }));

// Render Elite Student Grid
function renderStudents(filteredData = studentsData) {
    const grid = document.getElementById('studentList');
    if (!grid) return;

    grid.innerHTML = filteredData.map(student => `
        <div class="student-row-premium">
            <div class="student-main">
                <img src="${student.avatar}" class="student-avatar-premium" alt="${student.name}">
                <div>
                    <div class="student-name-premium">${student.name}</div>
                    <div class="student-id">Enrolled: ${student.joinDate}</div>
                </div>
            </div>
            
            <div class="performance-metric">
                <span class="metric-label">Current Experience</span>
                <span class="metric-value ${student.status}">${student.xp} <small class="fs-6 fw-normal text-muted">XP</small></span>
            </div>

            <div class="performance-metric">
                <span class="metric-label">Performance Trend</span>
                <div class="trend-indicator ${student.trend.startsWith('+') ? 'trend-up' : 'trend-down'}">
                    <i class="bi ${student.trend.startsWith('+') ? 'bi-graph-up' : 'bi-graph-down'}"></i>
                    ${student.trend}% this week
                </div>
            </div>

            <div class="management-actions">
                <button class="btn-score-adjust me-2" onclick="openXPModal(${student.id})" title="Manage XP">
                    <i class="bi bi-lightning-charge-fill"></i>
                </button>
                <button class="btn-tactical btn-warn-tactical" onclick="openWarnModal(${student.id})">
                    <i class="bi bi-megaphone me-1"></i> WARN
                </button>
                <button class="btn-tactical btn-kick-tactical" onclick="kickStudent(${student.id})">
                    <i class="bi bi-person-x me-1"></i> KICK
                </button>
            </div>
        </div>
    `).join('');

    updateSummaryBar();
}

function updateSummaryBar() {
    const total = studentsData.length;
    const avgXP = total > 0 ? (studentsData.reduce((sum, s) => sum + s.xp, 0) / total).toFixed(0) : 0;
    const atRisk = studentsData.filter(s => s.xp < 1000).length;

    const totalEl = document.getElementById('totalEnrolled');
    const avgEl = document.getElementById('avgPerformance');
    const atRiskEl = document.getElementById('atRiskCount');

    if (totalEl) totalEl.innerText = `${total} Students`;
    if (avgEl) avgEl.innerText = `${avgXP} XP`;
    if (atRiskEl) atRiskEl.innerText = `${atRisk} Students`;
}

// XP Modal Handlers
let currentTargetId = null;

function openXPModal(id) {
    const student = studentsData.find(s => s.id === id);
    if (!student) return;

    currentTargetId = id;
    document.getElementById('xpModalAvatar').src = student.avatar;
    document.getElementById('xpModalName').innerText = student.name;
    document.getElementById('xpModalCurrent').innerText = student.xp;
    document.getElementById('xpAmountInput').value = '';

    const modal = new bootstrap.Modal(document.getElementById('xpModal'));
    modal.show();
}

function saveXP() {
    const amount = parseInt(document.getElementById('xpAmountInput').value);
    if (isNaN(amount)) return;

    const student = studentsData.find(s => s.id === currentTargetId);
    if (student) {
        student.xp = Math.max(0, student.xp + amount);

        // Update status based on XP
        if (student.xp >= 2000) student.status = "excellent";
        else if (student.xp >= 1000) student.status = "good";
        else student.status = "poor";

        renderStudents();
        bootstrap.Modal.getInstance(document.getElementById('xpModal')).hide();
    }
}

// Warning Modal Handlers
const drafts = {
    attendance: "Dear student, we have noticed frequent absences in your recent sessions. Consistent attendance is crucial for your progress.",
    performance: "Dear student, your recent assignment scores are below the expected threshold. Please reach out if you need additional support.",
    behavior: "Dear student, your participation in class discussions has been noted. We encourage a more professional and focused approach."
};

function openWarnModal(id) {
    const student = studentsData.find(s => s.id === id);
    if (!student) return;

    currentTargetId = id;
    document.getElementById('warnModalAvatar').src = student.avatar;
    document.getElementById('warnModalName').innerText = student.name;
    document.getElementById('warnModalId').innerText = id;
    document.getElementById('warningMessageInput').value = '';

    const modal = new bootstrap.Modal(document.getElementById('warnModal'));
    modal.show();
}

function loadDraft(type) {
    document.getElementById('warningMessageInput').value = drafts[type];
}

function sendWarning() {
    const msg = document.getElementById('warningMessageInput').value;
    if (!msg.trim()) return;

    const student = studentsData.find(s => s.id === currentTargetId);
    alert(`Warning sent to ${student.name}:\n\n${msg}`);
    bootstrap.Modal.getInstance(document.getElementById('warnModal')).hide();
}


function kickStudent(id) {
    const student = studentsData.find(s => s.id === id);
    if (confirm(`Are you sure you want to remove ${student.name} from this course?`)) {
        studentsData = studentsData.filter(s => s.id !== id);
        renderStudents();
    }
}

function initStudentSearch() {
    const input = document.getElementById('searchStudents');
    if (input) {
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = studentsData.filter(s => s.name.toLowerCase().includes(term));
            renderStudents(filtered);
        });
    }
}

function showToast(msg) {
    console.log("Toast:", msg); // Placeholder for a real toast notification
}

// Attendance Log Logic
function renderAttendance() {
    const list = document.getElementById('attendanceList');
    if (!list) return;

    list.innerHTML = attendanceData.map(student => `
        <div class="attendance-row-premium" id="att-row-${student.id}">
            <div class="student-main">
                <img src="${student.avatar}" class="student-avatar-premium" style="width: 45px; height: 45px;" alt="">
                <div>
                    <div class="fw-bold" style="font-size: 0.95rem;">${student.name}</div>
                    <div class="text-muted small">Current status: <span id="att-status-lbl-${student.id}" class="fw-bold text-capitalize">${student.attendance}</span></div>
                </div>
            </div>
            
            <div class="attendance-status-group">
                <button class="att-btn present ${student.attendance === 'present' ? 'active' : ''}" 
                    onclick="toggleAttendance(${student.id}, 'present')">P</button>
                <button class="att-btn late ${student.attendance === 'late' ? 'active' : ''}" 
                    onclick="toggleAttendance(${student.id}, 'late')">L</button>
                <button class="att-btn absent ${student.attendance === 'absent' ? 'active' : ''}" 
                    onclick="toggleAttendance(${student.id}, 'absent')">A</button>
            </div>

            <div class="attendance-trend-mini">
                <div class="badge ${student.status === 'excellent' ? 'bg-success-soft text-success' : 'bg-light text-muted'} rounded-pill">
                    ${student.status}
                </div>
            </div>
        </div>
    `).join('');
}

function toggleAttendance(id, status) {
    const student = attendanceData.find(s => s.id === id);
    if (student) {
        student.attendance = status;

        // UI Updates without full re-render for performance
        const row = document.getElementById(`att-row-${id}`);
        const buttons = row.querySelectorAll('.att-btn');
        const label = document.getElementById(`att-status-lbl-${id}`);

        buttons.forEach(btn => btn.classList.remove('active'));
        row.querySelector(`.att-btn.${status}`).classList.add('active');
        label.innerText = status;
    }
}

function markAllPresent() {
    attendanceData.forEach(s => s.attendance = 'present');
    renderAttendance();
}

function resetAttendance() {
    if (confirm("Reset today's attendance log?")) {
        attendanceData.forEach(s => s.attendance = 'present');
        renderAttendance();
    }
}

function submitAttendance() {
    const date = document.getElementById('attendanceDate').value;
    const summary = {
        date: date,
        present: attendanceData.filter(s => s.attendance === 'present').length,
        late: attendanceData.filter(s => s.attendance === 'late').length,
        absent: attendanceData.filter(s => s.attendance === 'absent').length
    };

    // Update global history for mock demo
    attendanceData.forEach(s => {
        const student = studentsData.find(sd => sd.id === s.id);
        if (student) {
            if (s.attendance === 'present') student.attHistory.present++;
            else if (s.attendance === 'late') student.attHistory.late++;
            else student.attHistory.absent++;
        }
    });

    alert(`Attendance Submitted for ${date}!\n\n✅ Present: ${summary.present}\n⏰ Late: ${summary.late}\n❌ Absent: ${summary.absent}`);
    renderAttendanceHistory(); // Refresh history view
    switchAttView('history');  // Switch to history to see impact
}

function switchAttView(view) {
    const recordView = document.getElementById('attRecordView');
    const historyView = document.getElementById('attHistoryView');
    const btns = document.querySelectorAll('.att-view-btn');

    btns.forEach(btn => btn.classList.remove('active'));

    if (view === 'record') {
        recordView.style.display = 'block';
        historyView.style.display = 'none';
        btns[0].classList.add('active');
    } else {
        recordView.style.display = 'none';
        historyView.style.display = 'block';
        btns[1].classList.add('active');
        renderAttendanceHistory();
    }
}

function renderAttendanceHistory() {
    const list = document.getElementById('attendanceHistoryList');
    if (!list) return;

    list.innerHTML = studentsData.map(student => {
        const totalSessions = student.attHistory.present + student.attHistory.late + student.attHistory.absent;
        const rate = totalSessions > 0 ? ((student.attHistory.present + (student.attHistory.late * 0.5)) / totalSessions * 100).toFixed(0) : 0;
        let rateClass = 'rate-low';
        if (rate >= 90) rateClass = 'rate-high';
        else if (rate >= 70) rateClass = 'rate-mid';

        return `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${student.avatar}" class="att-history-avatar" alt="">
                        <div>
                            <div class="fw-bold">${student.name}</div>
                            <div class="text-muted" style="font-size: 0.75rem;">ID: #${student.id}</div>
                        </div>
                    </div>
                </td>
                <td class="text-center fw-bold text-success">${student.attHistory.present}</td>
                <td class="text-center fw-bold text-warning">${student.attHistory.late}</td>
                <td class="text-center fw-bold text-danger">${student.attHistory.absent}</td>
                <td class="text-center">
                    <span class="attendance-rate-badge ${rateClass}">${rate}%</span>
                </td>
                <td class="text-center">
                    <button class="btn btn-sm btn-light rounded-pill px-3" onclick="viewIndividualLog(${student.id})">
                        View Log
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function viewIndividualLog(id) {
    const student = studentsData.find(s => s.id === id);
    if (!student) return;

    // Set Header
    document.getElementById('attLogAvatar').src = student.avatar;
    document.getElementById('attLogName').innerText = student.name;
    document.getElementById('attLogStats').innerText = `P: ${student.attHistory.present} | L: ${student.attHistory.late} | A: ${student.attHistory.absent}`;

    // Mock Log List
    const mockDates = [
        { date: 'March 07, 2026', status: 'absent' },
        { date: 'March 05, 2026', status: 'late' },
        { date: 'March 03, 2026', status: 'present' },
        { date: 'March 01, 2026', status: 'present' }
    ];

    const list = document.getElementById('attLogList');
    list.innerHTML = mockDates.map(log => `
        <div class="att-log-item ${log.status}">
            <div>
                <span class="status-dot bg-${log.status}"></span>
                <span class="fw-bold">${log.date}</span>
            </div>
            <span class="text-capitalize small fw-bold" style="opacity: 0.8;">${log.status}</span>
        </div>
    `).join('');

    const modal = new bootstrap.Modal(document.getElementById('attLogModal'));
    modal.show();
}

// Sidebar Logic (Reused)
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
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) sidebar.classList.add('collapsed');

        sidebarCollapse.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });
    }
}

// Actions
function startLiveClass() {
    alert('Launching Video Classroom...');
}
