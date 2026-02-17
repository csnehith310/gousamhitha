const express = require('express');
const router = express.Router();
const { exchangeCodeForUserInfo, googleSignIn, googleSignUp } = require('../controllers/googleAuthController');

// Exchange authorization code for user info
router.post('/google', exchangeCodeForUserInfo);

// Google Sign In
router.post('/google/signin', googleSignIn);

// Google Sign Up
router.post('/google/signup', googleSignUp);

module.exports = router;
