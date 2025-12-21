const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const router = express.Router();
router.post('/register', protect, authorizeRoles('superadmin'), registerUser);
router.post('/login', loginUser);

module.exports = router;
