const express = require('express');
const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const {
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/adminController');
const router = express.Router();
router.use(protect);
router.use(authorizeRoles('superadmin'));
router.get('/', getAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);
module.exports = router;
