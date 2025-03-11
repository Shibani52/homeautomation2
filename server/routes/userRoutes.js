const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAddress,
  updateAddress,
  deleteAddress
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// Address routes
router.route('/address').post(protect, addAddress);
router.route('/address/:id')
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

// Admin routes
router.route('/')
  .get(protect, authorize('admin'), getUsers);
router.route('/:id')
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router; 