import prisma from '../../lib/db';
import { getSessionUser } from '../../utils/encryption';

export default async function handler(req, res) {
  const user = getSessionUser();
  if (!user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  if (req.method === 'GET') {
    try {
     console.log("Fetching approved products");
      // Get all approved products
      const products = await prisma.product.findMany({
        where: {
          status: 'APPROVED'
        },
        include: {
          owner: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
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
      
      const product = await prisma.product.create(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}