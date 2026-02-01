# Backend API Blueprint (Node.js + Express)

## 1. Middleware Strategy
- **AuthMiddleware**: Verifies JWT token from `Authorization` header. Attaches `user` object to request.
- **RoleMiddleware**: Checks if `req.user.role` matches required role (e.g., 'admin', 'mentor').
- **ValidationMiddleware**: Uses Joi/Zod to validate request body against schemas.
- **ErrorMiddleware**: Centralized error handling, returns structured JSON errors.

## 2. API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register new user (Learner/Mentor) | No |
| POST | `/login` | Login user, return JWT | No |
| POST | `/refresh-token` | Refresh access token | Yes |
| POST | `/logout` | Invalidate token (optional blacklist) | Yes |
| GET | `/me` | Get current user profile | Yes |

### Mentor Management (`/api/mentors`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/` | List mentors with filters (search, skills) | Yes |
| GET | `/:id` | Get public mentor profile | Yes |
| POST | `/apply` | Submit mentor application (docs, bio) | Yes (User) |
| PUT | `/profile` | Update mentor profile | Yes (Mentor) |
| PUT | `/:id/verify` | Approve mentor (Admin only) | Yes (Admin) |

### Sessions (`/api/sessions`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/request` | Request a session with a mentor | Yes (Learner) |
| GET | `/` | Get my sessions (as learner or mentor) | Yes |
| PUT | `/:id/status` | Accept/Reject/Cancel session | Yes |
| POST | `/:id/complete` | Mark session as completed | Yes |

### Reviews (`/api/reviews`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/` | Create a review for a session | Yes |
| GET | `/mentor/:id` | Get reviews for a specific mentor | Yes |

### Gamification (`/api/gamification`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/leaderboard` | Get top mentors by points | Yes |
| GET | `/my-stats` | Get current user's points and badges | Yes |

### Chat (`/api/chat`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/conversations` | Get list of active conversations | Yes |
| GET | `/:userId` | Get message history with a user | Yes |
| POST | `/` | Send a message (also emits socket event) | Yes |

## 3. Response Structure
Standard JSON response format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

Error response:
```json
{
  "success": false,
  "error": "INVALID_CREDENTIALS",
  "message": "Password does not match"
}
```
