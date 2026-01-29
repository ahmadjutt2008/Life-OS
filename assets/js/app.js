document.addEventListener('DOMContentLoaded', () => {
    // Clock & Date
    const updateTime = () => {
        const now = new Date();
        const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

        document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', dateOptions);
        document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', timeOptions);
    };

    setInterval(updateTime, 1000);
    updateTime();

    // View Templates
    const templates = {
        dashboard: `
            <div class="welcome-section mb-4 animate-fade-in">
                <h2 class="fw-bold mb-1" id="greetingText">Good Afternoon, John</h2>
                <p class="text-muted">Here's what's happening with your life today.</p>
            </div>
            <div class="row g-4 animate-fade-in">
                <div class="col-md-4">
                    <div class="glass-card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                        <h5 class="text-muted mb-3">Productivity Score</h5>
                        <div class="score-circle position-relative mb-3">
                            <svg width="120" height="120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8" />
                                <circle cx="60" cy="60" r="54" fill="none" stroke="url(#blueGradient)" stroke-width="8" 
                                        stroke-dasharray="339.292" stroke-dashoffset="339.292" stroke-linecap="round" />
                            </svg>
                            <div class="position-absolute top-50 start-50 translate-middle">
                                <h2 class="fw-bold m-0" id="scoreValue">0%</h2>
                            </div>
                        </div>
                        <p class="text-muted small m-0">Excellent progress today!</p>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="glass-card h-100">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="m-0">Today's Focus</h5>
                            <button class="btn btn-sm btn-outline-primary rounded-pill">Add Task</button>
                        </div>
                        <div class="tasks-list"></div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="glass-card">
                        <h5 class="mb-4">Habit Streaks</h5>
                        <div class="d-flex justify-content-around flex-wrap gap-4" id="habitContainer"></div>
                    </div>
                </div>
            </div>
        `,
        goals: `
            <div class="section-header mb-4 animate-fade-in">
                <div class="d-flex justify-content-between align-items-end">
                    <div>
                        <h2 class="fw-bold mb-1">Goal Management</h2>
                        <p class="text-muted">Visualize your future and track your milestones.</p>
                    </div>
                    <div class="filter-tabs d-flex gap-2">
                        <button class="btn btn-sm glass-card py-1 px-3 active">All</button>
                        <button class="btn btn-sm glass-card py-1 px-3">Short-term</button>
                        <button class="btn btn-sm glass-card py-1 px-3">Long-term</button>
                    </div>
                </div>
            </div>
            <div class="row g-4 animate-fade-in" id="goalsGrid"></div>
        `,
        habits: `
            <div class="section-header mb-4 animate-fade-in">
                <h2 class="fw-bold mb-1">Habit Tracking</h2>
                <p class="text-muted">Small steps lead to big change. Stay consistent!</p>
            </div>
            <div class="row g-4 animate-fade-in">
                <div class="col-lg-8">
                    <div class="glass-card mb-4">
                        <h5 class="mb-4">Daily Checklist</h5>
                        <div id="habitsList"></div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="glass-card mb-4 text-center">
                        <h5 class="mb-3">Weekly Consistency</h5>
                        <div class="d-flex justify-content-between align-items-end mt-4 px-2" style="height: 100px;">
                            <div class="bg-primary opacity-25 rounded-top" style="width: 15px; height: 60%;"></div>
                            <div class="bg-primary opacity-50 rounded-top" style="width: 15px; height: 80%;"></div>
                            <div class="bg-primary rounded-top" style="width: 15px; height: 100%;"></div>
                            <div class="bg-primary opacity-75 rounded-top" style="width: 15px; height: 40%;"></div>
                            <div class="bg-primary opacity-50 rounded-top" style="width: 15px; height: 90%;"></div>
                            <div class="bg-primary rounded-top" style="width: 15px; height: 75%;"></div>
                            <div class="bg-primary opacity-25 rounded-top" style="width: 15px; height: 30%;"></div>
                        </div>
                        <div class="d-flex justify-content-between mt-2 px-2 text-muted extra-small">
                            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        planner: `
            <div class="section-header mb-4 animate-fade-in">
                <h2 class="fw-bold mb-1">Daily Planner</h2>
                <p class="text-muted">Master your time. Master your life.</p>
            </div>
            <div class="glass-card animate-fade-in p-0 overflow-hidden">
                <div class="planner-header d-flex border-bottom border-light border-opacity-10 p-3 bg-white bg-opacity-5">
                    <div class="time-col" style="width: 80px;"></div>
                    <div class="flex-grow-1 fw-bold">Schedule</div>
                </div>
                <div class="planner-body" style="max-height: 500px; overflow-y: auto;" id="plannerBody"></div>
            </div>
        `,
        vault: `
            <div class="section-header mb-4 animate-fade-in">
                <div class="d-flex justify-content-between align-items-end">
                    <div>
                        <h2 class="fw-bold mb-1">Knowledge Vault</h2>
                        <p class="text-muted">Capture ideas, snippets, and wisdom.</p>
                    </div>
                    <button class="btn btn-primary btn-sm rounded-pill px-4"><i class="fa-solid fa-plus me-2"></i> New Note</button>
                </div>
            </div>
            <div class="row g-4 animate-fade-in">
                <div class="col-md-4">
                    <div class="glass-card mb-4">
                        <input type="text" class="form-control bg-white bg-opacity-5 border-0 text-white mb-3" placeholder="Search notes...">
                        <div class="vault-categories d-flex flex-column gap-2">
                             <a href="#" class="nav-link active py-2 small">All Notes</a>
                             <a href="#" class="nav-link py-2 small">Personal</a>
                             <a href="#" class="nav-link py-2 small">Business</a>
                             <a href="#" class="nav-link py-2 small">Snippets</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="row g-3" id="vaultGrid"></div>
                </div>
            </div>
        `,
        mood: `
            <div class="section-header mb-4 animate-fade-in">
                <h2 class="fw-bold mb-1">Mood & Energy</h2>
                <p class="text-muted">Track your inner state to optimize your output.</p>
            </div>
            <div class="row g-4 animate-fade-in">
                <div class="col-md-6">
                    <div class="glass-card mb-4">
                        <h5 class="mb-4">How are you feeling?</h5>
                        <div class="d-flex justify-content-between mb-4">
                            <button class="btn btn-lg bg-white bg-opacity-5 p-3 rounded-4"><i class="fa-solid fa-face-angry fs-2 text-danger"></i></button>
                            <button class="btn btn-lg bg-white bg-opacity-5 p-3 rounded-4"><i class="fa-solid fa-face-frown fs-2 text-warning"></i></button>
                            <button class="btn btn-lg bg-white bg-opacity-5 p-3 rounded-4 active border-primary"><i class="fa-solid fa-face-meh fs-2 text-info"></i></button>
                            <button class="btn btn-lg bg-white bg-opacity-5 p-3 rounded-4"><i class="fa-solid fa-face-smile fs-2 text-success"></i></button>
                            <button class="btn btn-lg bg-white bg-opacity-5 p-3 rounded-4"><i class="fa-solid fa-face-laugh-beam fs-2 text-primary"></i></button>
                        </div>
                        <h5 class="mb-3">Energy Level</h5>
                        <input type="range" class="form-range" id="energySlider" min="0" max="100" value="75">
                        <div class="d-flex justify-content-between text-muted extra-small mt-2">
                            <span>Exhausted</span><span>Charged</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="glass-card h-100">
                        <h5 class="mb-4">Mood Trends</h5>
                        <canvas id="moodChart" height="200"></canvas>
                    </div>
                </div>
            </div>
        `,
        analytics: `
            <div class="section-header mb-4 animate-fade-in">
                <h2 class="fw-bold mb-1">Performance Analytics</h2>
                <p class="text-muted">Data-driven insights into your productivity.</p>
            </div>
            <div class="row g-4 animate-fade-in">
                <div class="col-md-8">
                    <div class="glass-card mb-4">
                        <h5 class="mb-4">Weekly Focus Distribution</h5>
                        <canvas id="analyticsChart" height="300"></canvas>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="glass-card mb-4">
                        <h5 class="mb-4">Key Metrics</h5>
                        <div class="d-flex flex-column gap-3">
                            <div class="p-3 bg-white bg-opacity-5 rounded-4">
                                <p class="text-muted small m-0">Habit Completion</p>
                                <h3 class="m-0 fw-bold">92%</h3>
                            </div>
                            <div class="p-3 bg-white bg-opacity-5 rounded-4">
                                <p class="text-muted small m-0">Goal Velocity</p>
                                <h3 class="m-0 fw-bold">14.2% / wk</h3>
                            </div>
                             <div class="p-3 bg-white bg-opacity-5 rounded-4">
                                <p class="text-muted small m-0">Focus Rating</p>
                                <h3 class="m-0 fw-bold">4.8 / 5</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        settings: `
            <div class="section-header mb-4 animate-fade-in">
                <h2 class="fw-bold mb-1">Application Settings</h2>
                <p class="text-muted">Customize your LifeOS experience.</p>
            </div>
            <div class="max-width-md mx-auto animate-fade-in">
                <div class="glass-card mb-4">
                    <h5 class="mb-4">Preferences</h5>
                    <div class="form-check form-switch mb-4">
                        <input class="form-check-input" type="checkbox" id="themeSwitch" checked>
                        <label class="form-check-label" for="themeSwitch">Dark Mode Universe</label>
                    </div>
                    <div class="mb-4">
                        <label class="form-label text-muted small">Accent Color</label>
                        <div class="d-flex gap-2">
                            <div class="rounded-circle cursor-pointer" style="width: 25px; height: 25px; background: var(--primary);"></div>
                            <div class="rounded-circle cursor-pointer" style="width: 25px; height: 25px; background: var(--accent-purple);"></div>
                            <div class="rounded-circle cursor-pointer" style="width: 25px; height: 25px; background: var(--accent-lime);"></div>
                            <div class="rounded-circle cursor-pointer" style="width: 25px; height: 25px; background: #ff4d4d;"></div>
                        </div>
                    </div>
                    <hr class="opacity-10">
                    <button class="btn btn-outline-danger btn-sm mt-3">Reset All Data</button>
                </div>
            </div>
        `
    };

    const renderView = (viewName) => {
        const container = document.getElementById('content-container');
        if (!container || !templates[viewName]) return;

        container.innerHTML = templates[viewName];

        if (viewName === 'dashboard') {
            updateGreeting();
            populateTasks();
            populateHabits();
            animateScore();
        } else if (viewName === 'goals') {
            populateGoals();
        } else if (viewName === 'habits') {
            populateHabitsList();
        } else if (viewName === 'planner') {
            populatePlanner();
        } else if (viewName === 'vault') {
            populateVault();
        } else if (viewName === 'mood') {
            initMoodChart();
        } else if (viewName === 'analytics') {
            initAnalyticsChart();
        }
    };

    // Navigation logic update
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.page) {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                renderView(link.dataset.page);
            }
        });
    });

    // Greeting Logic
    const updateGreeting = () => {
        const hour = new Date().getHours();
        let greeting = "Good Morning";
        if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
        else if (hour >= 17) greeting = "Good Evening";

        const greetingElement = document.getElementById('greetingText');
        if (greetingElement) {
            greetingElement.textContent = `${greeting}, ${LifeOSData.user.name}`;
        }
    };

    // Populate Tasks
    const populateTasks = () => {
        const tasksContainer = document.querySelector('.tasks-list');
        if (!tasksContainer) return;

        tasksContainer.innerHTML = LifeOSData.tasks.map(task => `
            <div class="task-item d-flex align-items-center gap-3 mb-3 p-3 rounded-4 bg-white bg-opacity-5">
                <input type="checkbox" class="form-check-input mt-0" ${task.completed ? 'checked' : ''}>
                <div class="flex-grow-1">
                    <p class="m-0 fw-medium ${task.completed ? 'text-decoration-line-through opacity-50' : ''}">${task.title}</p>
                    <span class="badge extra-small" style="background: rgba(0, 122, 255, 0.1); color: var(--primary);">${task.category}</span>
                </div>
                <span class="text-muted small">${task.time}</span>
            </div>
        `).join('');
    };

    // Populate Habit Streaks
    const populateHabits = () => {
        const habitsContainer = document.querySelector('#habitContainer'); // Changed selector to match template
        if (!habitsContainer) return;

        habitsContainer.innerHTML = LifeOSData.habits.map(habit => `
            <div class="habit-mini text-center">
                <div class="mini-ring mb-2 d-flex align-items-center justify-content-center" 
                     style="width: 55px; height: 55px; border: 3px solid ${habit.color}; border-radius: 50%; border-top-color: transparent;">
                     <i class="fa-solid ${habit.icon}" style="color: ${habit.color}"></i>
                </div>
                <span class="extra-small d-block text-muted">${habit.name}</span>
                <span class="extra-small d-block fw-bold">${habit.streak}d</span>
            </div>
        `).join('');
    };

    // Productivity Score Animation
    const animateScore = () => {
        const scoreCircle = document.querySelector('.score-circle circle:last-child');
        const scoreText = document.querySelector('.score-circle h2');
        if (!scoreCircle || !scoreText) return;

        const targetScore = LifeOSData.user.productivityScore;
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (targetScore / 100) * circumference;

        scoreCircle.style.strokeDasharray = circumference;
        scoreCircle.style.strokeDashoffset = circumference;

        setTimeout(() => {
            scoreCircle.style.transition = 'stroke-dashoffset 1.5s ease-out';
            scoreCircle.style.strokeDashoffset = offset;

            let current = 0;
            const step = () => {
                if (current < targetScore) {
                    current++;
                    scoreText.textContent = `${current}%`;
                    requestAnimationFrame(step);
                }
            };
            step();
        }, 500);
    };

    // Populate Goals
    const populateGoals = () => {
        const goalsGrid = document.getElementById('goalsGrid');
        if (!goalsGrid) return;

        goalsGrid.innerHTML = LifeOSData.goals.map(goal => `
            <div class="col-md-4">
                <div class="glass-card h-100 p-4">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="badge extra-small bg-primary bg-opacity-10 text-primary">${goal.category}</span>
                        <span class="text-muted extra-small">${goal.type}</span>
                    </div>
                    <h5 class="fw-bold mb-3">${goal.title}</h5>
                    <div class="progress mb-3" style="height: 6px; background: rgba(255,255,255,0.05);">
                        <div class="progress-bar" style="width: ${goal.progress}%; background: linear-gradient(90deg, var(--primary), var(--accent-blue));"></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted extra-small">Deadline: ${goal.deadline}</span>
                        <span class="fw-bold small">${goal.progress}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Populate Habits List (Daily Tracker)
    const populateHabitsList = () => {
        const habitsList = document.getElementById('habitsList');
        if (!habitsList) return;

        habitsList.innerHTML = LifeOSData.habits.map(habit => `
            <div class="habit-row d-flex align-items-center gap-3 mb-3 p-3 rounded-4 bg-white bg-opacity-5">
                <div class="d-flex align-items-center justify-content-center bg-white bg-opacity-10 rounded-3" style="width: 45px; height: 45px;">
                    <i class="fa-solid ${habit.icon}" style="color: ${habit.color}"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="d-flex justify-content-between mb-1">
                        <p class="m-0 fw-medium">${habit.name}</p>
                        <span class="text-muted extra-small">${habit.streak} day streak</span>
                    </div>
                    <div class="progress" style="height: 4px; background: rgba(255,255,255,0.05);">
                        <div class="progress-bar" style="width: ${habit.progress}%; background: ${habit.color};"></div>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-light border-0 rounded-circle"><i class="fa-solid fa-check"></i></button>
            </div>
        `).join('');
    };

    // Populate Planner
    const populatePlanner = () => {
        const plannerBody = document.getElementById('plannerBody');
        if (!plannerBody) return;

        const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 9 PM
        plannerBody.innerHTML = hours.map(hour => {
            const timeLabel = hour > 12 ? `${hour - 12} PM` : (hour === 12 ? '12 PM' : `${hour} AM`);
            const task = LifeOSData.tasks.find(t => t.time.startsWith(timeLabel.padStart(5, '0').split(' ')[0]));

            return `
                <div class="planner-row d-flex border-bottom border-light border-opacity-5">
                    <div class="time-col p-3 border-end border-light border-opacity-5 text-muted small" style="width: 80px;">${timeLabel}</div>
                    <div class="flex-grow-1 p-2 position-relative">
                        ${task ? `
                            <div class="time-block p-2 rounded-3 bg-primary bg-opacity-10 border-start border-4 border-primary">
                                <span class="fw-medium small d-block">${task.title}</span>
                                <span class="extra-small text-muted">${task.category}</span>
                            </div>
                        ` : '<div class="h-100 w-100 cursor-pointer opacity-0 hover-opacity-25 bg-white"></div>'}
                    </div>
                </div>
            `;
        }).join('');
    };

    // Populate Knowledge Vault
    const populateVault = () => {
        const vaultGrid = document.getElementById('vaultGrid');
        if (!vaultGrid) return;

        const dummyNotes = [
            { title: "LifeOS Roadmap", content: "Architecture design and MVP features...", tag: "Business", date: "Jan 28" },
            { title: "Reading List 2026", content: "1. Atomic Habits\n2. The Alchemist...", tag: "Personal", date: "Jan 25" },
            { title: "CSS Tips", content: "Glassmorphism: backdrop-filter: blur(12px)...", tag: "Snippets", date: "Jan 20" },
            { title: "Project Alpha", content: "Stakeholder meeting notes and next steps...", tag: "Business", date: "Jan 15" }
        ];

        vaultGrid.innerHTML = dummyNotes.map(note => `
            <div class="col-sm-6">
                <div class="glass-card h-100 p-3 hover-lift">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="badge extra-small bg-white bg-opacity-10 text-muted">${note.tag}</span>
                        <span class="text-muted extra-small">${note.date}</span>
                    </div>
                    <h6 class="fw-bold mb-2">${note.title}</h6>
                    <p class="text-muted small mb-0 text-truncate-2">${note.content}</p>
                </div>
            </div>
        `).join('');
    };

    // Charts
    const initMoodChart = () => {
        const ctx = document.getElementById('moodChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: LifeOSData.moods.map(m => m.date.split('-').slice(1).join('/')),
                datasets: [{
                    label: 'Mood Level',
                    data: LifeOSData.moods.map(m => m.score),
                    borderColor: '#007aff',
                    backgroundColor: 'rgba(0, 122, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { min: 1, max: 5 } }
            }
        });
    };

    const initAnalyticsChart = () => {
        const ctx = document.getElementById('analyticsChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Productivity', 'Focus', 'Health', 'Learning', 'Business', 'Consistency'],
                datasets: [{
                    label: 'Personal Growth',
                    data: [85, 90, 65, 75, 80, 95],
                    borderColor: '#9d50bb',
                    backgroundColor: 'rgba(157, 80, 187, 0.2)',
                }]
            },
            options: {
                scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' } } }
            }
        });
    };

    // Initialize initial view
    renderView('dashboard');
});
