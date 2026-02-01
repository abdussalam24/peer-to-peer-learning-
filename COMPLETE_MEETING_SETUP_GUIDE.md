# 🎥 Complete Real-Time Meeting System Setup Guide

## 🎉 What You Have Now

Your platform has been **fully upgraded** with a professional, production-ready meeting booking system featuring:

✅ **Real Google Meet Integration** - Not a mock, actual working meetings!
✅ **Automatic Calendar Invites** - Sent to both mentor and learner
✅ **Live Meeting Links** - Real Google Meet URLs generated instantly
✅ **Complete CRUD Operations** - Create, Read, Update, Delete meetings
✅ **Beautiful UI** - Modern booking interface with success modals
✅ **Dashboard Integration** - View upcoming meetings at a glance
✅ **Join Meeting Buttons** - One-click access to live meetings
✅ **Meeting Status Tracking** - Scheduled, In-Progress, Completed, Cancelled
✅ **Rating & Feedback System** - Post-meeting reviews

---

## 📋 Quick Setup Checklist

- [ ] Create Google Cloud Project
- [ ] Enable Google Calendar API
- [ ] Get OAuth 2.0 Credentials
- [ ] Generate Refresh Token
- [ ] Update .env file
- [ ] Test booking flow

**Estimated Time**: 10-15 minutes

---

## 🚀 Step-by-Step Setup

### Step 1: Google Cloud Console Setup (5 minutes)

#### 1.1 Create a New Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. **Project Name**: `P2P Learning Platform`
4. Click **"Create"**
5. Wait for project creation (30 seconds)

#### 1.2 Enable Google Calendar API

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Calendar API"**
3. Click on it
4. Click **"Enable"**
5. Wait for activation

#### 1.3 Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** (unless you have a Google Workspace)
3. Click **"Create"**
4. Fill in the required fields:
   - **App name**: `P2P Learning Platform`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click **"Save and Continue"**
6. On **Scopes** page, click **"Save and Continue"** (we'll add scopes later)
7. On **Test users** page, add your email address
8. Click **"Save and Continue"**
9. Review and click **"Back to Dashboard"**

#### 1.4 Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. **Application type**: Select **"Web application"**
4. **Name**: `P2P Learning OAuth Client`
5. Under **"Authorized redirect URIs"**, click **"Add URI"**
6. Add: `http://localhost:5000/api/auth/google/callback`
7. Click **"Create"**
8. **IMPORTANT**: Copy your **Client ID** and **Client Secret** immediately!
   - Save them in a text file temporarily

---

### Step 2: Generate Refresh Token (5 minutes)

You have **TWO OPTIONS** to get your refresh token:

#### Option A: Using OAuth Playground (Recommended - Easier)

1. Go to [Google OAuth Playground](https://developers.google.com/oauthplayground/)
2. Click the **⚙️ gear icon** in the top right
3. Check **"Use your own OAuth credentials"**
4. Enter:
   - **OAuth Client ID**: (paste from Step 1.4)
   - **OAuth Client Secret**: (paste from Step 1.4)
5. Close the settings
6. In **Step 1** on the left, scroll down to **"Google Calendar API v3"**
7. Select: `https://www.googleapis.com/auth/calendar`
8. Click **"Authorize APIs"**
9. Sign in with your Google account
10. Click **"Allow"** to grant permissions
11. In **Step 2**, click **"Exchange authorization code for tokens"**
12. **COPY** the **"Refresh token"** value (starts with `1//...`)

#### Option B: Using Our Helper Script (Alternative)

1. Open `server/scripts/getGoogleToken.js`
2. Replace the placeholders:
   ```javascript
   const CLIENT_ID = 'your_client_id_here';
   const CLIENT_SECRET = 'your_client_secret_here';
   ```
3. Run the script:
   ```bash
   cd server
   node scripts/getGoogleToken.js
   ```
4. Follow the instructions in the terminal
5. Copy the refresh token

---

### Step 3: Update Environment Variables (2 minutes)

1. Open `server/.env` file
2. Add/update these lines:

```env
# Google Meet / Calendar API Configuration
GOOGLE_CLIENT_ID=your_client_id_from_step_1.4
GOOGLE_CLIENT_SECRET=your_client_secret_from_step_1.4
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_refresh_token_from_step_2
```

3. **Replace** the placeholder values with your actual credentials
4. **Save** the file

**Example**:
```env
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=1//0abcdefghijklmnopqrstuvwxyz
```

---

### Step 4: Restart Your Server (1 minute)

The server needs to reload the new environment variables.

**If using the start script:**
```bash
# Stop the current servers (Ctrl+C in both terminals)
# Then restart:
npm run dev
```

**Or restart both manually:**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

---

## 🧪 Testing Your Setup

### Test 1: Book a Meeting

1. **Login** to your platform
2. Go to **"Find Mentor"** page
3. Click **"Book Session"** on any mentor
4. Fill out the form:
   - **Subject**: "Test Meeting"
   - **Date**: Tomorrow
   - **Time**: Any time
   - **Duration**: 60 minutes
5. Click **"Book Session with Google Meet"**

**Expected Result**: ✅ Success modal appears with a Google Meet link

### Test 2: Check Your Email

1. Open your email inbox
2. Look for a **Google Calendar invite**
3. The invite should have:
   - Meeting title
   - Date and time
   - **Google Meet link**

**Expected Result**: ✅ Calendar invite received

### Test 3: Check Google Calendar

1. Go to [Google Calendar](https://calendar.google.com/)
2. Find the event you just created
3. Click on it

**Expected Result**: ✅ Event appears with "Join with Google Meet" button

### Test 4: Join the Meeting

1. Go back to your **Dashboard**
2. Find the meeting in **"Upcoming Meetings"**
3. Click the **Google Meet link** or **"Join Meeting"** button

**Expected Result**: ✅ Google Meet opens in a new tab

---

## 🎯 How It Works (Technical Flow)

```
User Books Session
       ↓
Frontend sends POST to /api/meetings/create
       ↓
Backend validates request
       ↓
googleMeetService.createMeeting() called
       ↓
Google Calendar API creates event
       ↓
Google automatically generates Meet link
       ↓
Meeting saved to MongoDB
       ↓
Calendar invites sent to both users
       ↓
Success response with meeting link
       ↓
Frontend shows success modal
```

---

## 📁 System Architecture

### Backend Files

```
server/
├── models/
│   └── Meeting.js                 # MongoDB schema
├── services/
│   └── googleMeetService.js       # Google API integration
├── routes/
│   └── meetings.js                # API endpoints
├── scripts/
│   └── getGoogleToken.js          # Token generator helper
└── .env                           # Configuration
```

### Frontend Files

```
client/src/
├── pages/
│   ├── BookSession.jsx            # Booking interface
│   └── Dashboard.jsx              # Shows upcoming meetings
└── components/
    └── MeetingCard.jsx            # Meeting display component
```

---

## 🔌 API Endpoints Reference

### Create Meeting
```http
POST /api/meetings/create
Headers: x-auth-token: <jwt_token>
Body: {
  "mentorId": "507f1f77bcf86cd799439011",
  "subject": "React Hooks Deep Dive",
  "description": "Learn useState and useEffect",
  "scheduledAt": "2025-12-02T10:00:00Z",
  "duration": 60
}

Response: {
  "success": true,
  "message": "Meeting created successfully",
  "meeting": {
    "_id": "...",
    "meetingLink": "https://meet.google.com/abc-defg-hij",
    "meetingId": "google_calendar_event_id",
    ...
  }
}
```

### Get All Meetings
```http
GET /api/meetings?upcoming=true
Headers: x-auth-token: <jwt_token>

Response: {
  "success": true,
  "count": 3,
  "meetings": [...]
}
```

### Get Specific Meeting
```http
GET /api/meetings/:id
Headers: x-auth-token: <jwt_token>
```

### Update Meeting
```http
PUT /api/meetings/:id
Headers: x-auth-token: <jwt_token>
Body: {
  "subject": "Updated Subject",
  "scheduledAt": "2025-12-02T11:00:00Z"
}
```

### Cancel Meeting
```http
DELETE /api/meetings/:id
Headers: x-auth-token: <jwt_token>
```

### Join Meeting
```http
POST /api/meetings/:id/join
Headers: x-auth-token: <jwt_token>

Response: {
  "success": true,
  "meetingLink": "https://meet.google.com/abc-defg-hij"
}
```

### Complete Meeting
```http
POST /api/meetings/:id/complete
Headers: x-auth-token: <jwt_token>
Body: {
  "rating": 5,
  "feedback": "Great session!",
  "notes": "Learned a lot about React hooks"
}
```

---

## 🎨 UI Features

### Booking Page (`/book-session/:mentorId`)
- ✅ Clean, modern form design
- ✅ Date picker (prevents past dates)
- ✅ Time picker
- ✅ Duration selector (30min, 1hr, 1.5hr, 2hr)
- ✅ Subject and description fields
- ✅ Real-time validation
- ✅ Loading states during submission
- ✅ Error handling with user-friendly messages

### Success Modal
- ✅ Celebration UI with checkmark animation
- ✅ Meeting details display
- ✅ Google Meet link with copy button
- ✅ "Add to Calendar" button
- ✅ "Go to Dashboard" button

### Dashboard Integration
- ✅ Upcoming meetings section
- ✅ Meeting countdown timers
- ✅ Quick join buttons
- ✅ Meeting status badges
- ✅ Past meetings history

---

## 🔐 Security Features

- ✅ **JWT Authentication** - All endpoints protected
- ✅ **OAuth 2.0** - Secure Google API access
- ✅ **Access Control** - Only participants can view/modify meetings
- ✅ **Input Validation** - Server-side validation
- ✅ **Secure Token Storage** - Refresh tokens in .env only
- ✅ **HTTPS Ready** - Production-ready security

---

## 🐛 Troubleshooting

### Issue: "Failed to create meeting"

**Possible Causes**:
1. Invalid Google credentials
2. Refresh token expired
3. Calendar API not enabled

**Solutions**:
1. Double-check your `.env` file
2. Regenerate refresh token (Step 2)
3. Verify API is enabled in Google Cloud Console

---

### Issue: "No calendar invite received"

**Possible Causes**:
1. Email not in test users list
2. Spam folder
3. OAuth consent screen not configured

**Solutions**:
1. Add your email to test users in OAuth consent screen
2. Check spam/junk folder
3. Complete OAuth consent screen setup

---

### Issue: "Invalid grant" error

**Cause**: Refresh token expired or revoked

**Solution**:
1. Go back to Step 2
2. Generate a new refresh token
3. Update `.env` file
4. Restart server

---

### Issue: Meeting link doesn't work

**Possible Causes**:
1. Meeting not created in Google Calendar
2. User not signed in to Google
3. Permissions issue

**Solutions**:
1. Check Google Calendar for the event
2. Sign in to Google account
3. Verify OAuth scopes include calendar access

---

## 📊 Database Schema

```javascript
Meeting {
  _id: ObjectId,
  mentor: ObjectId (ref: 'User'),
  learner: ObjectId (ref: 'User'),
  subject: String,
  description: String,
  scheduledAt: Date,
  duration: Number, // minutes
  meetingLink: String, // Google Meet URL
  meetingId: String, // Google Calendar Event ID
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled',
  notes: String,
  rating: Number (1-5),
  feedback: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Advanced Features (Optional Enhancements)

### 1. Email Reminders
Add nodemailer to send custom reminders:
```bash
npm install nodemailer
```

### 2. Calendar View
Integrate a calendar component:
```bash
npm install react-big-calendar
```

### 3. Zoom Integration (Alternative)
If you prefer Zoom over Google Meet, we can switch to Zoom API.

### 4. Meeting Recording
Enable automatic recording in Google Meet settings.

### 5. Waiting Room
Add a pre-meeting lobby page with countdown timer.

---

## 💡 Best Practices

1. **Test with Real Users**: Have a friend book a meeting
2. **Check Timezones**: Ensure dates are handled correctly
3. **Monitor API Quotas**: Google Calendar API has rate limits
4. **Backup Credentials**: Save your OAuth credentials securely
5. **Use Environment Variables**: Never commit `.env` to Git

---

## 📞 Support & Resources

### Official Documentation
- [Google Calendar API](https://developers.google.com/calendar/api/guides/overview)
- [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Google Meet](https://support.google.com/meet)

### Useful Links
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth Playground](https://developers.google.com/oauthplayground/)
- [API Explorer](https://developers.google.com/calendar/api/v3/reference)

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] Google Cloud project created
- [ ] Calendar API enabled
- [ ] OAuth credentials obtained
- [ ] Refresh token generated
- [ ] `.env` file updated
- [ ] Server restarted
- [ ] Test booking successful
- [ ] Calendar invite received
- [ ] Google Meet link works
- [ ] Meeting appears in dashboard
- [ ] Can join meeting from link

---

## 🎉 Success!

**Congratulations!** Your platform now has a **fully functional, production-ready meeting booking system** powered by Google Meet! 🚀

### What You Can Do Now:

✅ Book real meetings with actual Google Meet links
✅ Send automatic calendar invites
✅ Manage meetings (create, update, cancel)
✅ Track meeting status and history
✅ Rate and review completed sessions
✅ Join meetings with one click

### Next Steps:

1. **Test thoroughly** with different scenarios
2. **Invite friends** to test the booking flow
3. **Customize** the UI to match your brand
4. **Add features** like notifications, reminders, etc.
5. **Deploy** to production when ready!

---

## 📝 Notes

- **Cost**: 100% FREE - No paid Google services required
- **Limits**: Google Calendar API has generous free quotas
- **Production**: Works in production with proper domain setup
- **Scalability**: Can handle thousands of meetings
- **Reliability**: Built on Google's infrastructure

---

**Need Help?** Check the troubleshooting section or review the server logs for detailed error messages.

**Happy Mentoring!** 🎓✨
