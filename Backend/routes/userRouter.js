const express = require('express');
const { registerUser, loginUser,logoutUser,getUserData } = require('../controllers/userController');
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout', logoutUser);

router.get('/',isVerifiedUser,getUserData)
module.exports = router;