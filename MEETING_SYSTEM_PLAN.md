# Real-Time Meeting System Implementation Plan

## Technology Choice: Google Meet API (via Google Calendar API)

**Why Google Meet?**
- ✅ Completely FREE (no paid tier needed)
- ✅ Automatic Google Meet link generation
- ✅ Better for students (most have Google accounts)
- ✅ Easier OAuth2 setup
- ✅ Calendar integration built-in
- ✅ No meeting duration limits on free tier

## Implementation Steps

### Phase 1: Backend Setup
1. Create Meeting model in MongoDB
2. Set up Google Calendar API credentials
3. Create meeting routes (create, get, cancel, update)
4. Implement Google OAuth2 authentication
5. Add meeting creation service

### Phase 2: Frontend Implementation
1. Update BookSession page with real booking form
2. Create MeetingCard component
3. Add upcoming meetings section to Dashboard
4. Implement meeting join/start buttons
5. Add calendar view
6. Create confirmation modals

### Phase 3: Notifications & Real-time Updates
1. Socket.io events for meeting updates
2. Email notifications (optional)
3. In-app notifications

### Phase 4: Testing & Polish
1. Test full booking flow
2. Test cancellation
3. Test rescheduling
4. Verify meeting links work

## Database Schema

```javascript
Meeting {
  mentorId: ObjectId,
  learnerId: ObjectId,
  subject: String,
  description: String,
  scheduledAt: Date,
  duration: Number, // in minutes
  meetingLink: String,
  meetingId: String, // Google Calendar Event ID
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled',
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

- `POST /api/meetings/create` - Create new meeting
- `GET /api/meetings` - Get user's meetings
- `GET /api/meetings/:id` - Get specific meeting
- `PUT /api/meetings/:id` - Update meeting
- `DELETE /api/meetings/:id` - Cancel meeting
- `POST /api/meetings/:id/join` - Mark as joined

## Google Calendar API Setup Steps

1. Go to Google Cloud Console
2. Create new project
3. Enable Google Calendar API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Download credentials JSON
7. Store in .env file

## Environment Variables Needed

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

## Next: Implementation
