const express = require('express');

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  searchVehicle,
} = require('../controllers/vehicleController');
const router = express.Router();

router
  .route('/')
  .post(protect, authorizeRoles('superadmin', 'admin'), createVehicle)
  .get(protect, authorizeRoles('superadmin', 'admin', 'guard'), getVehicles);

router.route('/search').get(protect, authorizeRoles('superadmin', 'admin', 'guard'), searchVehicle);

router
  .route('/:id')
  .get(protect, authorizeRoles('superadmin', 'admin', 'guard'), getVehicleById)
  .put(protect, authorizeRoles('superadmin', 'admin'), updateVehicle)
  .delete(protect, authorizeRoles('superadmin'), deleteVehicle);

module.exports = router;
