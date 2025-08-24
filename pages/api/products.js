// pages/api/products.js
import { connectDB } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectDB();

  if (req.method === 'GET') {
    try {
      const { category, location, startDate, endDate } = req.query;
      
      let query = {};
      
      if (category) query.category = category;
      if (location) query.location = location;
      
      if (startDate && endDate) {
        query['availability.startDate'] = { $lte: new Date(endDate) };
        query['availability.endDate'] = { $gte: new Date(startDate) };
      }
      
      const products = await db
        .collection('products')
        .find(query)
        .toArray();
      
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else if (req.method === 'POST') {
    try {
      const product = req.body;
      const result = await db.collection('products').insertOne(product);
      res.status(201).json({ success: true, productId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}