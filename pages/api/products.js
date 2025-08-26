import connectDB from '../../lib/mongodb';
import Product from '../../models/Product';
import { getSessionUser } from '../../utils/encryption';

export default async function handler(req, res) {
  await connectDB();

  const user = getSessionUser();
  if (!user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method === 'GET') {
    try {
      // Get all approved products
      const products = await Product.find({ status: 'approved' }).populate('lenderId', 'name email');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const productData = {
        ...req.body,
        lenderId: user.id
      };
      
      const product = await Product.create(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}