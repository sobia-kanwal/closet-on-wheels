import prisma from '../../../lib/db';
import { getSessionUser } from '../../../utils/encryption';

export default async function handler(req, res) {
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
      
      const products = await prisma.product.findMany({
        where: filter,
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
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { status, feedback } = req.body;

      const product = await prisma.product.update({
        where: {
          id: parseInt(id)
        },
        data: {
          status: status || undefined,
          feedback: feedback || undefined,
          updatedAt: new Date()
        },
        include: {
          owner: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}