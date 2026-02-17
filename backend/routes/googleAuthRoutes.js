const express = require('express');
const router = express.Router();
const { exchangeCodeForUserInfo, googleSignIn, googleSignUp } = require('../controllers/googleAuthController');

router.post('/google', exchangeCodeForUserInfo);

router.post('/google/signin', googleSignIn);

router.post('/google/signup', googleSignUp);
module.exports = router;
