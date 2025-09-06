
const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Product = require('../models/Product');
const User = require('../models/User');

// Admin dashboard
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const pendingProductsCount = await Product.countDocuments({ 
      status: 'pending_review' 
    });
    
    res.json({
      pendingProducts: pendingProductsCount,
      message: 'Admin dashboard accessed successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products needing review
router.get('/products/pending', adminAuth, async (req, res) => {
  try {
    const products = await Product.find({ status: 'pending_review' })
      .populate('createdBy', 'email name')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve product
router.patch('/products/:id/approve', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    
    res.json({ message: 'Product approved', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject product
router.patch('/products/:id/reject', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    
    res.json({ message: 'Product rejected', product });
  } catch ( error) {
    res.status(500).json({ message: error.message });
  }
});

// Make user admin (for initial setup)
router.patch('/users/:id/make-admin', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      { new: true }
    );
    
    res.json({ message: 'User promoted to admin', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;