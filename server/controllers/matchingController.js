const MentorProfile = require('../models/MentorProfile');

// Find mentors based on skills and availability
exports.findMentors = async (req, res) => {
    try {
        const { skill, day } = req.query;

        // Base query: only show approved mentors
        // UNLESS it's the current user's own profile (so they can see themselves)
        let query = {
            $or: [
                { isApproved: true },
            ]
        };

        if (req.user && req.user.id) {
            query.$or.push({ user: req.user.id });
        }

        const mentors = await MentorProfile.find(query)
            .populate('user', ['name', 'avatar'])
            .sort({ rating: -1 });

        // Filter by skill if provided
        let filteredMentors = mentors;
        if (skill) {
            const regex = new RegExp(skill, 'i');
            filteredMentors = mentors.filter(m =>
                m.skills.some(s => regex.test(s))
            );
        }

        if (day) {
            const regex = new RegExp(day, 'i');
            filteredMentors = filteredMentors.filter(m =>
                m.availability.some(a => regex.test(a.day))
            );
        }

        res.json(filteredMentors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get a specific mentor by ID
exports.getMentorById = async (req, res) => {
    try {
        const mentor = await MentorProfile.findById(req.params.id)
            .populate('user', ['name', 'email', 'avatar']);

        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        res.json(mentor);
    } catch (err) {
        console.error('Get mentor by ID error:', err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};
