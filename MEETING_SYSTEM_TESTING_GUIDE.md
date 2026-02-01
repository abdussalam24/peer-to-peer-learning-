# 🧪 Meeting System Testing Guide

## 🎯 Purpose

This guide will help you test every aspect of the real-time meeting booking system to ensure everything works perfectly.

---

## 📋 Pre-Testing Checklist

Before you start testing, ensure:

- [ ] Backend server is running (`http://localhost:5000`)
- [ ] Frontend client is running (`http://localhost:5173` or `5174`)
- [ ] You have at least 2 user accounts (1 mentor, 1 learner)
- [ ] MongoDB is connected
- [ ] (Optional) Google API credentials are configured

---

## 🧪 Test Suite

### Test 1: User Authentication ✅

**Objective**: Verify users can login

**Steps**:
1. Navigate to `http://localhost:5174`
2. Click "Log In"
3. Enter credentials:
   - Email: `mentor@test.com`
   - Password: `password123`
4. Click "Login"

**Expected Result**:
- ✅ Redirected to Dashboard
- ✅ Welcome message shows user name
- ✅ Stats cards display

**Status**: [ ] Pass [ ] Fail

---

### Test 2: Access Booking Page ✅

**Objective**: Verify booking page loads correctly

**Steps**:
1. From Dashboard, click "Find Mentors"
2. Click "Book Session" on any mentor card
3. Observe the booking form

**Expected Result**:
- ✅ Booking form displays
- ✅ Mentor profile shown at top
- ✅ All form fields visible:
  - Subject
  - Description
  - Date
  - Time
  - Duration
- ✅ "Book Session with Google Meet" button visible

**Status**: [ ] Pass [ ] Fail

---

### Test 3: Form Validation ✅

**Objective**: Verify form validation works

**Steps**:
1. On booking page, leave all fields empty
2. Click "Book Session with Google Meet"
3. Try to select a past date
4. Fill only subject, leave others empty

**Expected Result**:
- ✅ Browser shows "Please fill out this field" for required fields
- ✅ Cannot select past dates
- ✅ Form doesn't submit with missing fields

**Status**: [ ] Pass [ ] Fail

---

### Test 4: Create Meeting (Automatic Mock Mode) ✅

**Objective**: Test meeting creation without Google API credentials

**Steps**:
1. Fill out the booking form:
   - **Subject**: "Test React Session"
   - **Description**: "Learning React hooks"
   - **Date**: Tomorrow's date
   - **Time**: 10:00 AM
   - **Duration**: 60 minutes
2. Click "Book Session with Google Meet"
3. Wait for response

**Expected Result**:
- ✅ Loading spinner appears
- ✅ Success modal appears (System automatically falls back to mock mode)
- ✅ Meeting link starts with `https://meet.google.com/mock-`
- ✅ Meeting saved to database

**Status**: [ ] Pass [ ] Fail

---

### Test 5: Create Meeting (With Google API) ✅

**Objective**: Test real Google Meet link generation

**Prerequisites**: Google API credentials configured in `.env`

**Steps**:
1. Fill out the booking form:
   - **Subject**: "Real Google Meet Test"
   - **Description**: "Testing Google Meet integration"
   - **Date**: Tomorrow's date
   - **Time**: 2:00 PM
   - **Duration**: 60 minutes
2. Click "Book Session with Google Meet"
3. Wait for response

**Expected Result**:
- ✅ Loading spinner appears
- ✅ Success modal appears
- ✅ Modal shows:
  - Meeting subject
  - Mentor name
  - Date and time
  - Duration
  - **Real Google Meet link** (starts with `https://meet.google.com/`)
- ✅ "Copy" button works
- ✅ "Add to Calendar" button opens Google Calendar

**Status**: [ ] Pass [ ] Fail

---

### Test 6: View Meeting in Dashboard ✅

**Objective**: Verify meeting appears in dashboard

**Steps**:
1. From success modal, click "Go to Dashboard"
2. Scroll to "Upcoming Meetings" section
3. Look for your created meeting

**Expected Result**:
- ✅ "Upcoming Meetings" section visible
- ✅ Meeting card displays with:
  - Subject
  - Mentor/Learner name
  - Date and time
  - Duration
  - Countdown timer ("In X hours")
  - Status badge ("SCHEDULED")
- ✅ Meeting details are correct

**Status**: [ ] Pass [ ] Fail

---

### Test 7: Meeting Card Functionality ✅

**Objective**: Test meeting card interactions

**Steps**:
1. On Dashboard, find a meeting card
2. Check the countdown timer
3. Look for the "Join Google Meet" button
4. Click "Details" button

**Expected Result**:
- ✅ Countdown timer shows time until meeting
- ✅ If meeting is more than 15 mins away:
  - "Join" button is disabled or shows message
- ✅ If meeting is within 15 mins:
  - "Join Google Meet" button is active
- ✅ "Details" button navigates to meeting details page

**Status**: [ ] Pass [ ] Fail

---

### Test 8: Join Meeting ✅

**Objective**: Test joining a Google Meet

**Prerequisites**: Meeting scheduled within 15 minutes OR manually adjust meeting time in database

**Steps**:
1. Find a meeting card with active "Join" button
2. Click "Join Google Meet"
3. Observe what happens

**Expected Result**:
- ✅ New tab opens
- ✅ Google Meet page loads
- ✅ Meeting URL is correct
- ✅ Can join the meeting (if Google API configured)

**Status**: [ ] Pass [ ] Fail

---

### Test 9: Copy Meeting Link ✅

**Objective**: Test copy link functionality

**Steps**:
1. On success modal or meeting card
2. Click "Copy" button next to meeting link
3. Paste into a text editor

**Expected Result**:
- ✅ Alert shows "Meeting link copied!"
- ✅ Clipboard contains the Google Meet URL
- ✅ URL is valid (starts with `https://meet.google.com/`)

**Status**: [ ] Pass [ ] Fail

---

### Test 10: Add to Calendar ✅

**Objective**: Test Google Calendar integration

**Steps**:
1. On success modal, click "Add to Calendar"
2. Observe what happens

**Expected Result**:
- ✅ New tab opens
- ✅ Google Calendar event creation page loads
- ✅ Event details pre-filled:
  - Title (subject)
  - Date and time
  - Duration
  - Location (Google Meet link)
- ✅ Can save event to calendar

**Status**: [ ] Pass [ ] Fail

---

### Test 11: View All Meetings ✅

**Objective**: Test meetings API endpoint

**Steps**:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to Dashboard
4. Look for `/api/meetings` request

**Expected Result**:
- ✅ API request to `/api/meetings` is made
- ✅ Response status is 200
- ✅ Response contains array of meetings
- ✅ Each meeting has:
  - `_id`
  - `subject`
  - `scheduledAt`
  - `meetingLink`
  - `status`
  - `mentor` and `learner` populated

**Status**: [ ] Pass [ ] Fail

---

### Test 12: Filter Upcoming Meetings ✅

**Objective**: Verify only upcoming meetings show

**Steps**:
1. Create 3 meetings:
   - One for tomorrow
   - One for next week
   - One for yesterday (manually in database)
2. Go to Dashboard
3. Check "Upcoming Meetings" section

**Expected Result**:
- ✅ Only future meetings display
- ✅ Past meetings don't appear
- ✅ Meetings sorted by date (earliest first)

**Status**: [ ] Pass [ ] Fail

---

### Test 13: Meeting Status Updates ✅

**Objective**: Test status transitions

**Steps**:
1. Create a meeting
2. Join the meeting (click "Join Google Meet")
3. Check meeting status in database or API

**Expected Result**:
- ✅ Initial status: "scheduled"
- ✅ After joining: status updates to "in-progress"
- ✅ Status badge updates on UI

**Status**: [ ] Pass [ ] Fail

---

### Test 14: Cancel Meeting ✅

**Objective**: Test meeting cancellation

**Steps**:
1. Go to meeting details page
2. Click "Cancel Meeting" button
3. Confirm cancellation
4. Check Dashboard

**Expected Result**:
- ✅ Confirmation dialog appears
- ✅ After confirming:
  - Meeting status → "cancelled"
  - Meeting removed from "Upcoming" section
  - (If Google API) Event deleted from Google Calendar
- ✅ Success message shows

**Status**: [ ] Pass [ ] Fail

---

### Test 15: Complete Meeting with Rating ✅

**Objective**: Test meeting completion and feedback

**Steps**:
1. After a meeting ends, go to meeting details
2. Click "Complete Meeting"
3. Add rating (1-5 stars)
4. Add feedback text
5. Submit

**Expected Result**:
- ✅ Rating form appears
- ✅ Can select 1-5 stars
- ✅ Can add text feedback
- ✅ After submitting:
  - Meeting status → "completed"
  - Rating and feedback saved
  - Displayed on meeting card

**Status**: [ ] Pass [ ] Fail

---

### Test 16: Email Notifications ✅

**Objective**: Verify calendar invites are sent

**Prerequisites**: Google API configured

**Steps**:
1. Create a meeting
2. Check email inbox (both mentor and learner)
3. Look for Google Calendar invite

**Expected Result**:
- ✅ Both users receive email
- ✅ Email contains:
  - Meeting subject
  - Date and time
  - Google Meet link
  - "Add to Calendar" button
- ✅ Clicking link adds to calendar

**Status**: [ ] Pass [ ] Fail

---

### Test 17: Responsive Design ✅

**Objective**: Test mobile responsiveness

**Steps**:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro"
4. Navigate through:
   - Booking page
   - Dashboard
   - Meeting cards

**Expected Result**:
- ✅ All pages display correctly on mobile
- ✅ No horizontal scrolling
- ✅ Buttons are tappable
- ✅ Text is readable
- ✅ Forms are usable

**Status**: [ ] Pass [ ] Fail

---

### Test 18: Error Handling ✅

**Objective**: Test error scenarios

**Steps**:
1. **Test 1**: Try to book meeting without authentication
2. **Test 2**: Try to access another user's meeting
3. **Test 3**: Submit booking form with invalid date
4. **Test 4**: Disconnect internet and try to book

**Expected Result**:
- ✅ Test 1: Redirected to login
- ✅ Test 2: "Access denied" error
- ✅ Test 3: Validation error message
- ✅ Test 4: Network error message
- ✅ All errors are user-friendly

**Status**: [ ] Pass [ ] Fail

---

### Test 19: Performance ✅

**Objective**: Verify system performance

**Steps**:
1. Create 10 meetings
2. Navigate to Dashboard
3. Observe load time
4. Check browser console for errors

**Expected Result**:
- ✅ Dashboard loads in < 2 seconds
- ✅ No console errors
- ✅ Smooth scrolling
- ✅ No UI freezing
- ✅ Meeting cards render quickly

**Status**: [ ] Pass [ ] Fail

---

### Test 20: Google Calendar Sync ✅

**Objective**: Verify Google Calendar integration

**Prerequisites**: Google API configured

**Steps**:
1. Create a meeting via the platform
2. Go to [Google Calendar](https://calendar.google.com/)
3. Find the created event
4. Click on it

**Expected Result**:
- ✅ Event appears in Google Calendar
- ✅ Event details match:
  - Title
  - Date and time
  - Duration
- ✅ "Join with Google Meet" button visible
- ✅ Clicking button opens Google Meet

**Status**: [ ] Pass [ ] Fail

---

## 📊 Test Results Summary

### Overall Results

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | User Authentication | ⬜ | |
| 2 | Access Booking Page | ⬜ | |
| 3 | Form Validation | ⬜ | |
| 4 | Create Meeting (Mock) | ⬜ | |
| 5 | Create Meeting (Real) | ⬜ | |
| 6 | View in Dashboard | ⬜ | |
| 7 | Meeting Card Functionality | ⬜ | |
| 8 | Join Meeting | ⬜ | |
| 9 | Copy Meeting Link | ⬜ | |
| 10 | Add to Calendar | ⬜ | |
| 11 | View All Meetings | ⬜ | |
| 12 | Filter Upcoming | ⬜ | |
| 13 | Status Updates | ⬜ | |
| 14 | Cancel Meeting | ⬜ | |
| 15 | Complete with Rating | ⬜ | |
| 16 | Email Notifications | ⬜ | |
| 17 | Responsive Design | ⬜ | |
| 18 | Error Handling | ⬜ | |
| 19 | Performance | ⬜ | |
| 20 | Google Calendar Sync | ⬜ | |

**Total Passed**: ___ / 20
**Total Failed**: ___ / 20

---

## 🐛 Bug Tracking

If you find any issues during testing, document them here:

### Bug #1
- **Test**: 
- **Description**: 
- **Steps to Reproduce**: 
- **Expected**: 
- **Actual**: 
- **Severity**: High / Medium / Low

---

## ✅ Sign-Off

**Tester Name**: _______________
**Date**: _______________
**Overall Assessment**: _______________

**Ready for Production?**: [ ] Yes [ ] No

**Comments**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## 🎯 Next Steps After Testing

1. [ ] Fix any bugs found
2. [ ] Re-test failed scenarios
3. [ ] Document any edge cases
4. [ ] Update user documentation
5. [ ] Prepare for deployment

---

**Happy Testing!** 🧪✨
