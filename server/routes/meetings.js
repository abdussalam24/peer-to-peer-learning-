const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const User = require('../models/User');
const MentorProfile = require('../models/MentorProfile');
const auth = require('../middleware/auth');
const googleMeetService = require('../services/googleMeetService');

// @route   POST /api/meetings/create
// @desc    Create a new meeting with Google Meet link
// @access  Private
router.post('/create', auth, async (req, res) => {
    try {
        const { mentorId, subject, description, scheduledAt, duration } = req.body;

        // Validate required fields
        if (!mentorId || !subject || !scheduledAt || !duration) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Get mentor and learner details
        let mentor = await User.findById(mentorId);

        // If not found as User, it might be a MentorProfile ID
        if (!mentor) {
            const mentorProfile = await MentorProfile.findById(mentorId).populate('user');
            if (mentorProfile) {
                mentor = mentorProfile.user;
            }
        }

        const learner = await User.findById(req.user.id);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        // Create Google Meet meeting
        const meetingData = {
            subject,
            description,
            startTime: new Date(scheduledAt),
            duration: parseInt(duration),
            attendees: [mentor.email, learner.email]
        };

        const { meetingLink, meetingId } = await googleMeetService.createMeeting(meetingData);

        // Save meeting to database
        const meeting = new Meeting({
            mentor: mentor._id, // Save the User ID, not the Profile ID
            learner: req.user.id,
            subject,
            description,
            scheduledAt: new Date(scheduledAt),
            duration: parseInt(duration),
            meetingLink,
            meetingId,
            status: 'scheduled'
        });

        await meeting.save();

        // Populate user details
        await meeting.populate('mentor', 'name email');
        await meeting.populate('learner', 'name email');

        res.status(201).json({
            success: true,
            message: 'Meeting created successfully',
            meeting
        });

    } catch (error) {
        console.error('Create meeting error:', error);
        res.status(500).json({ message: error.message || 'Failed to create meeting' });
    }
});

// @route   GET /api/meetings
// @desc    Get all meetings for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const { status, upcoming } = req.query;

        let query = {
            $or: [
                { mentor: req.user.id },
                { learner: req.user.id }
            ]
        };

        if (status) {
            query.status = status;
        }

        if (upcoming === 'true') {
            query.scheduledAt = { $gte: new Date() };
            query.status = 'scheduled';
        }

        const meetings = await Meeting.find(query)
            .populate('mentor', 'name email')
            .populate('learner', 'name email')
            .sort({ scheduledAt: -1 });

        res.json({
            success: true,
            count: meetings.length,
            meetings
        });

    } catch (error) {
        console.error('Get meetings error:', error);
        res.status(500).json({ message: 'Failed to fetch meetings' });
    }
});

// @route   GET /api/meetings/:id
// @desc    Get a specific meeting
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id)
            .populate('mentor', 'name email')
            .populate('learner', 'name email');

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        // Check if user is part of the meeting
        if (meeting.mentor._id.toString() !== req.user.id &&
            meeting.learner._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json({
            success: true,
            meeting
        });

    } catch (error) {
        console.error('Get meeting error:', error);
        res.status(500).json({ message: 'Failed to fetch meeting' });
    }
});

// @route   PUT /api/meetings/:id
// @desc    Update a meeting
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const { subject, description, scheduledAt, duration } = req.body;

        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        // Only mentor or learner can update
        if (meeting.mentor.toString() !== req.user.id &&
            meeting.learner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update Google Calendar event
        if (meeting.meetingId) {
            await googleMeetService.updateMeeting(meeting.meetingId, {
                subject: subject || meeting.subject,
                description: description || meeting.description,
                startTime: scheduledAt ? new Date(scheduledAt) : meeting.scheduledAt,
                duration: duration || meeting.duration
            });
        }

        // Update database
        if (subject) meeting.subject = subject;
        if (description) meeting.description = description;
        if (scheduledAt) meeting.scheduledAt = new Date(scheduledAt);
        if (duration) meeting.duration = parseInt(duration);

        await meeting.save();
        await meeting.populate('mentor', 'name email');
        await meeting.populate('learner', 'name email');

        res.json({
            success: true,
            message: 'Meeting updated successfully',
            meeting
        });

    } catch (error) {
        console.error('Update meeting error:', error);
        res.status(500).json({ message: 'Failed to update meeting' });
    }
});

// @route   DELETE /api/meetings/:id
// @desc    Cancel a meeting
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        // Only mentor or learner can cancel
        if (meeting.mentor.toString() !== req.user.id &&
            meeting.learner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Cancel Google Calendar event
        if (meeting.meetingId) {
            await googleMeetService.cancelMeeting(meeting.meetingId);
        }

        // Update status instead of deleting
        meeting.status = 'cancelled';
        await meeting.save();

        res.json({
            success: true,
            message: 'Meeting cancelled successfully'
        });

    } catch (error) {
        console.error('Cancel meeting error:', error);
        res.status(500).json({ message: 'Failed to cancel meeting' });
    }
});

// @route   POST /api/meetings/:id/join
// @desc    Mark meeting as in-progress when user joins
// @access  Private
router.post('/:id/join', auth, async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        // Check if user is part of the meeting
        if (meeting.mentor.toString() !== req.user.id &&
            meeting.learner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (meeting.status === 'scheduled') {
            meeting.status = 'in-progress';
            await meeting.save();
        }

        res.json({
            success: true,
            meetingLink: meeting.meetingLink
        });

    } catch (error) {
        console.error('Join meeting error:', error);
        res.status(500).json({ message: 'Failed to join meeting' });
    }
});

// @route   POST /api/meetings/:id/complete
// @desc    Mark meeting as completed and add rating/feedback
// @access  Private
router.post('/:id/complete', auth, async (req, res) => {
    try {
        const { rating, feedback, notes } = req.body;

        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        // Check if user is part of the meeting
        if (meeting.mentor.toString() !== req.user.id &&
            meeting.learner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        meeting.status = 'completed';
        if (rating) meeting.rating = rating;
        if (feedback) meeting.feedback = feedback;
        if (notes) meeting.notes = notes;

        await meeting.save();

        res.json({
            success: true,
            message: 'Meeting marked as completed',
            meeting
        });

    } catch (error) {
        console.error('Complete meeting error:', error);
        res.status(500).json({ message: 'Failed to complete meeting' });
    }
});

module.exports = router;
