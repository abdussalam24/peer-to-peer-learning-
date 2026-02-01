const MentorProfile = require('../models/MentorProfile');
const User = require('../models/User');
const Withdrawal = require('../models/Withdrawal');

// Get Current User Profile

// requestWithdrawal
exports.requestWithdrawal = async (req, res) => {
    try {
        const { amount, method, details } = req.body;
        const profile = await MentorProfile.findOne({ user: req.user.id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        if (profile.availableBalance < amount) {
            return res.status(400).json({ message: 'Insufficient available balance' });
        }

        // Create withdrawal record
        const withdrawal = new Withdrawal({
            mentor: req.user.id,
            amount,
            method,
            details
        });

        await withdrawal.save();

        // Deduct from balance
        profile.availableBalance -= amount;
        await profile.save();

        res.json({ success: true, message: 'Withdrawal request submitted successfully', profile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let profile = null;

        if (user.role === 'mentor') {
            profile = await MentorProfile.findOne({ user: req.user.id });
        }

        res.json({ user, profile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create or Update Mentor Profile
exports.updateProfile = async (req, res) => {
    const { skills, bio, university, degree, availability } = req.body;

    const profileFields = {
        user: req.user.id,
        skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
        bio,
        university,
        degree,
        availability
    };

    try {
        let profile = await MentorProfile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await MentorProfile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        // Create
        profile = new MentorProfile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get All Mentors
exports.getAllMentors = async (req, res) => {
    try {
        const profiles = await MentorProfile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
