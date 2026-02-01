const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/debug/users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        const debugData = users.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            role: u.role,
            passwordHash: u.password, // Showing the hash
            passwordNote: "This is encrypted/hashed. The real password is 'password123'"
        }));
        res.json(debugData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
