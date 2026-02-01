const MentorProfile = require('../models/MentorProfile');

// Find mentors based on skills and availability
exports.findMentors = async (req, res) => {
    try {
        const { skill, day, gender } = req.query;

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
            .populate({
                path: 'user',
                select: 'name avatar gender'
            })
            .sort({ rating: -1 });

        // Filter by gender if provided
        let filteredMentors = mentors;
        if (gender && gender !== 'any') {
            filteredMentors = mentors.filter(m =>
                m.user && m.user.gender === gender.toLowerCase()
            );
        }
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
            .populate('user', ['name', 'email', 'avatar', 'gender']);

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
