const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/').get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/:id').get(getProduct);

// Protected routes
router.route('/').post(protect, authorize('admin'), createProduct);
router.route('/:id')
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

// Review routes
router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router; 