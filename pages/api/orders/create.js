// pages/api/orders/create.ts
import { NextApiResponse } from 'next';
import prisma from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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
    
    // Create order with Prisma
    const order = await prisma.order.create({
      data: {
        orderId,
        customer: {
          create: {
            firstName: req.body.customer.firstName,
            lastName: req.body.customer.lastName,
            email: req.body.customer.email,
            phone: req.body.customer.phone,
            address: req.body.customer.address,
            city: req.body.customer.city,
            // Add other customer fields if they exist in your schema
          }
        },
        items: {
          create: req.body.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
            // Add other item fields if needed
          }))
        },
        subtotal: req.body.subtotal,
        tax: req.body.tax,
        total: req.body.total,
        paymentMethod: req.body.paymentMethod,
        status: 'PENDING', // Or whatever default status you want
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        // Include other fields from your Order model
      },
      include: {
        customer: true,
        items: true,
      }
    });

    res.status(201).json({ 
      success: true, 
      orderId: order.orderId,
      order: order 
    });
  } catch (error) {
    console.error('Order creation error:', error);
    
    if (error.code === 'P2002') { // Prisma unique constraint violation
      return res.status(409).json({ 
        success: false, 
        message: 'Order ID already exists' 
      });
    }
    
    if (error.code === 'P2003') { // Foreign key constraint violation
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid data reference' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}