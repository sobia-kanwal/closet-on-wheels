import db from '../../../lib/db';
import Product from '../../../models/Product';
import { getSessionUser } from '../../../utils/encryption';

export default async function handler(req, res) {
  await db();

  const user = getSessionUser();
  if (!user || user.role !== 'admin') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  if (req.method === 'GET') {
    try {
      const { status } = req.query;
      let filter = {};
      
      if (status && status !== 'all') {
        filter.status = status;
      }
      
      const products = await Product.find(filter).populate('lenderId', 'name email');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { status, adminFeedback } = req.body;
      
      const product = await Product.findByIdAndUpdate(
        id,
        { status, adminFeedback, updatedAt: new Date() },
        { new: true }
      ).populate('lenderId', 'name email');
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}