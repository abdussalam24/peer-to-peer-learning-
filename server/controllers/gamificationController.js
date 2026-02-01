const MentorProfile = require('../models/MentorProfile');

// Award Points
exports.awardPoints = async (req, res) => {
    try {
        const { userId, points, reason } = req.body;

        const profile = await MentorProfile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        profile.points += points;

        // Dynamic Level Calculation based on User Request:
        // Above 1000: Gold
        // Above 900: Silver
        // Above 700: Bronze
        if (profile.points >= 1000) {
            profile.level = 'Gold';
        } else if (profile.points >= 900) {
            profile.level = 'Silver';
        } else if (profile.points >= 700) {
            profile.level = 'Bronze';
        } else {
            profile.level = 'Rookie';
        }

        // Check for badges
        if (profile.points >= 100 && !profile.badges.some(b => b.name === 'Rookie Mentor')) {
            profile.badges.push({ name: 'Rookie Mentor', icon: '🥉', earnedAt: new Date() });
        }
        if (profile.points >= 500 && !profile.badges.some(b => b.name === 'Expert Mentor')) {
            profile.badges.push({ name: 'Expert Mentor', icon: '🥈', earnedAt: new Date() });
        }
        if (profile.points >= 1000 && !profile.badges.some(b => b.name === 'Master Mentor')) {
            profile.badges.push({ name: 'Master Mentor', icon: '🥇', earnedAt: new Date() });
        }

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const profiles = await MentorProfile.find()
            .populate('user', ['name', 'avatar'])
            .sort({ points: -1 })
            .limit(10);

        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Redeem Reward
exports.redeemReward = async (req, res) => {
    try {
        const { rewardType } = req.body;
        const profile = await MentorProfile.findOne({ user: req.user.id });

        if (!profile) {
            return res.status(404).json({ message: 'Mentor profile not found' });
        }

        if (profile.points < 1000) {
            return res.status(400).json({ message: 'Insufficient points (Minimum 1000 XP required)' });
        }

        if (rewardType === 'badge') {
            // Add Elite Mentor Badge
            if (profile.badges.some(b => b.name === 'Elite Mentor')) {
                return res.status(400).json({ message: 'You already have the Elite Mentor Badge!' });
            }
            profile.badges.push({ name: 'Elite Mentor', icon: '👑', earnedAt: new Date() });
            profile.points -= 1000;
        }
        else if (rewardType === 'cash') {
            // Redeem for $100
            profile.totalEarnings += 100;
            profile.points -= 1000;
        }
        else if (rewardType === 'theme') {
            // Unlock theme (logic would go here, for now just deduct points)
            profile.points -= 1500;
        } else {
            return res.status(400).json({ message: 'Invalid reward type' });
        }

        await profile.save();
        res.json({
            success: true,
            message: `Successfully redeemed ${rewardType === 'cash' ? '$100 Cash' : 'Elite Reward'}!`,
            profile
        });
    } catch (err) {
        console.error('Redeem error:', err.message);
        res.status(500).send('Server Error');
    }
};
