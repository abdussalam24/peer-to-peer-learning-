const express = require('express');
const router = express.Router();
const optionalAuth = require('../middleware/optionalAuth');
const matchingController = require('../controllers/matchingController');

// @route   GET api/matching/find
// @desc    Find mentors
// @access  Public (Optional Auth)
router.get('/find', optionalAuth, matchingController.findMentors);

// @route   GET api/matching/mentors/:id
// @desc    Get a specific mentor by ID
// @access  Public
router.get('/mentors/:id', matchingController.getMentorById);

module.exports = router;
