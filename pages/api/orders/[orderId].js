// pages/api/orders/[orderId].js
import prisma from '../../../lib/db';
import Order from '../../../models/Order';

export default async function handler(req, res) {
  const { orderId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const order = await prisma.order.findUnique({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching order', 
      error: error.message 
    });
  }
}