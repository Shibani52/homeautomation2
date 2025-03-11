const express = require('express');
const router = express.Router();
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getRazorpayKey,
  processMockPayment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// Test route - no authentication required
router.get('/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Payment API is working!'
  });
});

// Razorpay routes
router.route('/razorpay').post(protect, createRazorpayOrder);
router.route('/razorpay/verify').post(protect, verifyRazorpayPayment);
router.route('/razorpay/key').get(protect, getRazorpayKey);

// Mock payment route (simplified flow)
router.route('/mock').post(protect, processMockPayment);

module.exports = router; 