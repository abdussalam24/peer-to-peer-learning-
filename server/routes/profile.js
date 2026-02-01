const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const profileController = require('../controllers/profileController');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, profileController.getMe);

// @route   POST api/profile
// @desc    Create or update mentor profile
// @access  Private
router.post('/', auth, profileController.updateProfile);

// @route   GET api/profile/mentors
// @desc    Get all mentors
// @access  Public
router.get('/mentors', profileController.getAllMentors);

// @route   POST api/profile/withdraw
// @desc    Request a withdrawal
// @access  Private
router.post('/withdraw', auth, profileController.requestWithdrawal);

module.exports = router;
