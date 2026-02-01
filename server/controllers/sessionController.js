const Session = require('../models/Session');
const MentorProfile = require('../models/MentorProfile');

// Request a Session
exports.requestSession = async (req, res) => {
    try {
        const { mentorId, topic, description, scheduledAt, duration } = req.body;

        // Check if mentor exists
        const mentorProfile = await MentorProfile.findById(mentorId);
        if (!mentorProfile) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        const session = new Session({
            learner: req.user.id,
            mentor: mentorId,
            topic,
            description,
            scheduledAt,
            duration
        });

        await session.save();
        res.json(session);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get My Sessions (as Learner or Mentor)
exports.getMySessions = async (req, res) => {
    try {
        // Find sessions where user is learner OR mentor (need to find mentor profile id first if mentor)
        let query = { learner: req.user.id };

        // If user is also a mentor, include sessions where they are the mentor
        const mentorProfile = await MentorProfile.findOne({ user: req.user.id });
        if (mentorProfile) {
            query = { $or: [{ learner: req.user.id }, { mentor: mentorProfile._id }] };
        }

        const sessions = await Session.find(query)
            .populate('learner', ['name', 'avatar'])
            .populate({
                path: 'mentor',
                populate: { path: 'user', select: 'name avatar' }
            })
            .sort({ scheduledAt: 1 });

        res.json(sessions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Session Status (Accept/Reject/Complete)
exports.updateSessionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Verify user is part of the session
        // In a real app, strict checks on who can do what (e.g. only mentor can accept)

        session.status = status;
        await session.save();
        res.json(session);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
