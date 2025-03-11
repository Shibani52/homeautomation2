const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Mock payment system instead of Razorpay
const mockPaymentSystem = {
  orders: {
    create: async (options) => {
      // Generate a random order ID
      const orderId = 'order_' + crypto.randomBytes(8).toString('hex');
      
      return {
        id: orderId,
        entity: 'order',
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: 'created',
        created_at: Date.now()
      };
    }
  }
};

// @desc    Create mock payment order
// @route   POST /api/payments/razorpay
// @access  Private
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes, orderData } = req.body;

    const options = {
      amount: amount * 100, // Amount in smallest currency unit (like paise)
      currency,
      receipt,
      notes
    };

    // Use mock payment system
    const paymentOrder = await mockPaymentSystem.orders.create(options);

    // If orderData is provided, create an order in the database
    let dbOrder = null;
    if (orderData && req.user) {
      const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = orderData;
      
      dbOrder = await Order.create({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentResult: {
          id: paymentOrder.id,
          status: 'pending'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: paymentOrder,
      order: dbOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Verify mock payment
// @route   POST /api/payments/razorpay/verify
// @access  Private
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id = 'pay_' + crypto.randomBytes(8).toString('hex'),
      orderId
    } = req.body;

    // In a mock system, we'll assume all payments are successful
    const isAuthentic = true;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed'
      });
    }

    // Update order if orderId is provided
    let updatedOrder = null;
    if (orderId) {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: razorpay_payment_id,
        status: 'completed',
        update_time: Date.now(),
        email_address: req.user ? req.user.email : 'demo@example.com'
      };

      updatedOrder = await order.save();
      
      // Update product stock
      for (const item of order.orderItems) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock = Math.max(0, product.stock - item.quantity);
          await product.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Process mock payment directly (simplified flow)
// @route   POST /api/payments/mock
// @access  Private
exports.processMockPayment = async (req, res) => {
  try {
    console.log('Processing mock payment...');
    console.log('Request body:', req.body);
    console.log('User:', req.user);
    
    const { orderData } = req.body;
    
    if (!orderData) {
      console.log('No order data provided');
      return res.status(400).json({
        success: false,
        error: 'Order data is required'
      });
    }
    
    if (!req.user) {
      console.log('No user found in request');
      return res.status(401).json({
        success: false,
        error: 'User authentication required'
      });
    }
    
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = orderData;
    
    // Validate required fields
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      console.log('Invalid or empty order items');
      return res.status(400).json({
        success: false,
        error: 'Order items are required and must be an array'
      });
    }
    
    if (!shippingAddress) {
      console.log('No shipping address provided');
      return res.status(400).json({
        success: false,
        error: 'Shipping address is required'
      });
    }
    
    // Generate mock payment IDs
    const paymentId = 'pay_' + crypto.randomBytes(8).toString('hex');
    
    try {
      // Create a modified version of orderItems with valid MongoDB ObjectIds
      const processedOrderItems = [];
      
      // Find products in the database by name instead of ID
      for (const item of orderItems) {
        try {
          // Create a dummy ObjectId for the product
          // This is a workaround for testing purposes
          const dummyProductId = new mongoose.Types.ObjectId();
          
          processedOrderItems.push({
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: dummyProductId
          });
        } catch (err) {
          console.error('Error processing order item:', err);
        }
      }
      
      // Create order in database with processed items
      const order = await Order.create({
        orderItems: processedOrderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod: paymentMethod || 'mock_payment',
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: {
          id: paymentId,
          status: 'completed',
          update_time: Date.now(),
          email_address: req.user.email || 'demo@example.com'
        }
      });
      
      console.log('Order created successfully:', order._id);
      
      return res.status(201).json({
        success: true,
        message: 'Payment processed and order created successfully',
        order
      });
    } catch (dbError) {
      console.error('Database error creating order:', dbError);
      return res.status(500).json({
        success: false,
        error: 'Failed to create order in database',
        details: dbError.message
      });
    }
  } catch (error) {
    console.error('Error in processMockPayment:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error processing payment',
      details: error.message
    });
  }
};

// @desc    Get mock payment key
// @route   GET /api/payments/razorpay/key
// @access  Private
exports.getRazorpayKey = async (req, res) => {
  // Return a mock key
  res.status(200).json({
    success: true,
    data: 'rzp_test_mock_key_for_demo'
  });
}; 