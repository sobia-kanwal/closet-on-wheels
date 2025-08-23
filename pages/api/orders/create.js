// pages/api/orders/create.js
import connectDB from '../../../lib/mongodb';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Validate required fields
    const requiredFields = ['customer', 'items', 'subtotal', 'tax', 'total', 'paymentMethod'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ 
          success: false, 
          message: `Missing required field: ${field}` 
        });
      }
    }

    // Validate customer fields
    const customerFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    for (const field of customerFields) {
      if (!req.body.customer[field]) {
        return res.status(400).json({ 
          success: false, 
          message: `Missing required customer field: ${field}` 
        });
      }
    }

    // Validate items
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order must contain at least one item' 
      });
    }

    // Generate a unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const orderData = {
      ...req.body,
      orderId,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({ 
      success: true, 
      orderId: order.orderId,
      order: order 
    });
  } catch (error) {
    console.error('Order creation error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        error: error.message 
      });
    }
    
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Order ID already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}