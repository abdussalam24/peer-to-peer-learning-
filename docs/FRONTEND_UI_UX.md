# Frontend UI/UX (React)

## 1. UI Structure & Routing

### Public Routes
- `/`: Landing Page (Hero, Features, Testimonials)
- `/login`: Login Form
- `/register`: Registration (Role selection)
- `/about`: About Us

### Protected Routes (Learner)
- `/dashboard`: Overview (Upcoming sessions, recommended mentors)
- `/search`: Find mentors (Filter by skill, rating)
- `/sessions`: List of past/upcoming sessions
- `/messages`: Chat interface
- `/profile`: Edit profile

### Protected Routes (Mentor)
- `/mentor/dashboard`: Stats (Earnings/Points, Requests, Upcoming)
- `/mentor/requests`: Manage session requests (Accept/Reject)
- `/mentor/schedule`: Manage availability
- `/mentor/profile`: Edit bio, skills, upload docs

### Admin Routes
- `/admin/dashboard`: Platform stats
- `/admin/verifications`: Approve/Reject mentor applications

## 2. Component Hierarchy

```
App
├── Navbar (Responsive, Auth-aware)
├── Sidebar (Dashboard only)
├── Router
│   ├── LandingPage
│   ├── AuthLayout
│   │   ├── LoginForm
│   │   └── RegisterForm
│   ├── DashboardLayout
│   │   ├── Sidebar
│   │   ├── Header
│   │   └── ContentArea
│   │       ├── MentorCard
│   │       ├── SessionList
│   │       ├── ChatWindow
│   │       └── LeaderboardWidget
│   └── AdminLayout
└── Footer
```

## 3. Key UI Screens

### Dashboard (Learner)
- **Header**: Greeting, Points Balance, Notifications.
- **Main Section**:
  - "Next Session" card with countdown and "Join" button.
  - "Recommended Mentors" carousel.
- **Sidebar**: Navigation links.

### Session Booking UI
1.  **Select Mentor**: View profile.
2.  **Choose Topic**: Dropdown or text input.
3.  **Select Time**: Calendar view showing mentor's available slots.
4.  **Confirm**: Summary and "Request Session" button.

### Gamification UI
- **Profile Badge**: Display badges next to avatar.
- **Progress Bar**: "50 points to next level".
- **Leaderboard**: Table showing Rank, User, Points, and Badges.

## 4. Responsive Layout Rules (Tailwind CSS)
- **Mobile First**: Default styles for mobile.
- **Breakpoints**:
  - `md` (768px): Show sidebar, expand grids to 2 cols.
  - `lg` (1024px): Expand grids to 3 cols.
- **Container**: `max-w-7xl mx-auto px-4`.
- **Colors**:
  - Primary: `indigo-600` (Trust, Academic)
  - Secondary: `emerald-500` (Growth, Success)
  - Background: `slate-50` (Clean, Modern)
  - Dark Mode: `slate-900` background, `slate-100` text.
