const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');

// Import the security guard
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// ADDED: The "protect" middleware runs BEFORE the "getMe" controller
router.get('/me', protect, getMe); 

module.exports = router;