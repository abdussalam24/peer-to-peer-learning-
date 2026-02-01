# Software Requirement Specification (SRS)

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to define the requirements for the "Peer-to-Peer Learning & Mentorship Platform". The platform aims to democratize academic support by connecting students with peer mentors.

### 1.2 Scope
The system will facilitate user registration, mentor verification, session scheduling, real-time video/chat communication, and gamified rewards.

## 2. Functional Requirements

### 2.1 User Roles
- **Learner**: Can search mentors, book sessions, rate mentors.
- **Mentor**: Can manage profile, set availability, accept sessions, earn rewards.
- **Admin**: Can verify mentors, view analytics, ban users.

### 2.2 Core Modules
1.  **Authentication**: Secure login/signup using JWT.
2.  **Matching**: Algorithm to suggest mentors.
3.  **Session Management**: Booking, rescheduling, and cancellation logic.
4.  **Communication**: Text chat and video call integration.
5.  **Gamification**: Points calculation and badge assignment.

## 3. Non-Functional Requirements
- **Performance**: API response time < 200ms.
- **Scalability**: Support 1000+ concurrent users.
- **Security**: Data encryption at rest and in transit.
- **Availability**: 99.9% uptime.
- **Usability**: Mobile-responsive design.

## 4. Use Cases

### UC-01: Book a Session
- **Actor**: Learner
- **Precondition**: Logged in, Mentor selected.
- **Flow**:
  1. Learner clicks "Book Session".
  2. System shows available slots.
  3. Learner selects slot and topic.
  4. System sends request to Mentor.
  5. Mentor accepts.
  6. System creates Session and notifies both.

### UC-02: Verify Mentor
- **Actor**: Admin
- **Precondition**: Mentor uploaded documents.
- **Flow**:
  1. Admin views pending verifications.
  2. Admin reviews documents.
  3. Admin clicks "Approve".
  4. System updates Mentor status and awards "Verified" badge.

## 5. Constraints
- Must use MERN stack.
- Video calls must use free tier APIs initially.
- Deployment must be on free/low-cost cloud providers.

## 6. Assumptions
- Users have stable internet connection.
- Users have valid university email addresses (optional but preferred).
