# System Architecture - Peer-to-Peer Learning & Mentorship Platform

## 1. High-Level Architecture Diagram

```mermaid
graph TD
    Client[Client (Web/Mobile)] -->|HTTP/REST| LB[Load Balancer]
    Client -->|WebSocket| Socket[Socket.io Server]
    
    LB --> API[API Gateway / Express Server]
    
    subgraph "Backend Services (Monolithic/Modular)"
        API --> Auth[Auth Service]
        API --> User[User Profile Service]
        API --> Match[Matching Service]
        API --> Session[Session Service]
        API --> Gamification[Gamification Service]
        API --> Chat[Chat Service]
    end
    
    subgraph "Data Layer"
        Auth --> DB[(MongoDB Primary)]
        User --> DB
        Match --> DB
        Session --> DB
        Gamification --> DB
        Chat --> DB
        Chat --> Redis[(Redis Cache - Optional)]
    end
    
    subgraph "External Services"
        API --> Email[Email Service (SendGrid/Nodemailer)]
        API --> Video[Video API (Zoom/Google Meet)]
        API --> Cloud[Cloud Storage (AWS S3/Cloudinary)]
    end
```

## 2. Module Breakdown

### A. User Management Module
- **Registration/Login**: JWT-based auth, role selection (Learner/Mentor).
- **Profile**: Academic details, skills, bio, availability.
- **Verification**: Admin approval workflow for mentors (upload ID/transcript).

### B. Matching Module
- **Smart Algorithm**: Matches learners with mentors based on skills, availability, and rating.
- **Search & Filter**: Manual search for mentors.

### C. Session Management Module
- **Booking**: Request session, accept/reject, schedule time.
- **Video Integration**: Generate meeting links.
- **Feedback**: Post-session ratings and reviews.

### D. Gamification Module
- **Points Engine**: Award points for sessions, reviews, and streaks.
- **Badges**: Unlockable achievements (e.g., "Top Mentor", "Fast Responder").
- **Leaderboard**: Weekly/Monthly rankings.

### E. Communication Module
- **Real-time Chat**: Text messaging between matched users.
- **Notifications**: System alerts for bookings, messages, and achievements.

## 3. Component Communication Flow

1.  **User Request**: Client sends JSON payload via HTTPS.
2.  **Validation**: Middleware validates input (Joi/Zod) and Auth (JWT).
3.  **Controller**: Route handler executes business logic.
4.  **Service Layer**: Interacts with database or external APIs.
5.  **Database**: MongoDB executes query.
6.  **Response**: JSON response sent back to client.
7.  **Real-time**: Socket.io events broadcast updates (e.g., new message) to connected clients.

## 4. Tech Stack Justification

| Component | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Fast, component-based, rich ecosystem, excellent for interactive dashboards. |
| **Styling** | Tailwind CSS | Rapid UI development, consistent design system, responsive by default. |
| **Backend** | Node.js + Express | Non-blocking I/O, unified JS stack, huge community support. |
| **Database** | MongoDB | Flexible schema for evolving user profiles and session data, JSON-like documents. |
| **Real-time** | Socket.io | Reliable WebSocket wrapper for chat and notifications. |
| **Video** | Zoom/Meet API | Reliable infrastructure without building complex WebRTC servers from scratch. |
| **Deployment** | Render/AWS | Scalable hosting, easy CI/CD integration. |
