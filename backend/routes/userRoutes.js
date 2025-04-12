const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require('../controllers/userController');

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Verify OTP route
router.post('/verify-otp', verifyOtp);

// Reset Password route
router.post('/reset-password', resetPassword);

module.exports = router;