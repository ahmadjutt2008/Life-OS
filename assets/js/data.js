const LifeOSData = {
    user: {
        name: "John Doe",
        level: "Pro Member",
        productivityScore: 78,
        focusTimeToday: "4h 20m"
    },
    tasks: [
        { id: 1, title: "Complete LifeOS Architecture", category: "Work", time: "09:00 AM", completed: true, priority: "High" },
        { id: 2, title: "Refactor Habit Module", category: "Development", time: "11:30 AM", completed: false, priority: "Medium" },
        { id: 3, title: "Daily Team Sync", category: "Work", time: "02:00 PM", completed: false, priority: "High" },
        { id: 4, title: "Review Goal Progress", category: "Personal", time: "05:00 PM", completed: false, priority: "Low" }
    ],
    habits: [
        { id: 1, name: "Hydration", icon: "fa-glass-water", color: "var(--accent-blue)", progress: 80, streak: 12 },
        { id: 2, name: "Reading", icon: "fa-book-open", color: "var(--accent-purple)", progress: 45, streak: 5 },
        { id: 3, name: "Meditation", icon: "fa-brain", color: "var(--accent-lime)", progress: 100, streak: 8 }
    ],
    goals: [
        { id: 1, title: "Launch LifeOS Beta", category: "Business", deadline: "2026-03-15", progress: 65, type: "Long-term" },
        { id: 2, title: "Read 24 Books", category: "Personal", deadline: "2026-12-31", progress: 15, type: "Long-term" },
        { id: 3, title: "Run 5km", category: "Health", deadline: "2026-02-10", progress: 90, type: "Short-term" }
    ],
    moods: [
        { date: "2026-01-25", score: 4, energy: 80 },
        { date: "2026-01-26", score: 5, energy: 90 },
        { date: "2026-01-27", score: 3, energy: 60 },
        { date: "2026-01-28", score: 4, energy: 75 },
        { date: "2026-01-29", score: 5, energy: 85 }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LifeOSData;
}
