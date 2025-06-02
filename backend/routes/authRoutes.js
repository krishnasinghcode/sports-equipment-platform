import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import {
  signup,
  login,
  sendVerificationOTP,
  verifyOTP,
  sendResetOTP,
  verifyResetOTP,
  resetPassword,
  logout
} from '../controllers/authController.js';

const router = express.Router();

// Standard Auth Routes (for normal signup/login)
router.post('/signup', signup);
router.post('/login', login);
router.post('/verify', sendVerificationOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', sendResetOTP);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

// OAuth Routes

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Step 2: Google OAuth Callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.cookie('token', token, {
  httpOnly: true, // Ensures the cookie is not accessible from JavaScript
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  sameSite: 'strict', // Prevents the cookie from being sent in cross-site requests
  maxAge: 3600000 // 1 hour in milliseconds
});


    res.redirect('http://localhost:5173/dashboard'); // or wherever you want
  }
);
export default router;
