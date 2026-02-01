const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sessionController = require('../controllers/sessionController');

// @route   POST api/sessions
// @desc    Request a session
// @access  Private
router.post('/', auth, sessionController.requestSession);

// @route   GET api/sessions
// @desc    Get my sessions
// @access  Private
router.get('/', auth, sessionController.getMySessions);

// @route   PUT api/sessions/:id
// @desc    Update session status
// @access  Private
router.put('/:id', auth, sessionController.updateSessionStatus);

module.exports = router;
