import prisma from '../../../../lib/db';

export default async function handler(req, res) {
 console.log("API /products/category/[category] called with method:", req.method);
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category } = req.query;
    console.log("Category parameter:", category);
    const { location, minPrice, maxPrice, size, color } = req.query;

    console.log("Query parameters:", req.query);
    // Build filter object
    let where = {
      status: 'APPROVED', // Only fetch approved products
    };

    // Add category filter - match the category field in the database
    if (category && category !== 'all') {
      where.category = {
      contains: category,
      mode: 'insensitive'
    };
    }

    // Add location filter (assuming location is stored in product or we need to add it)
    if (location && location !== 'all') {
      // For now, we'll skip location filter as it's not in the current schema
      // This would need to be added to the Product model if needed
    }

    // Add price filters
    if (minPrice || maxPrice) {
      where.rentalPrice = {};
      if (minPrice) {
        where.rentalPrice.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.rentalPrice.lte = parseFloat(maxPrice);
      }
    }

    // Add size filter
    if (size && size !== 'all') {
      where.size = size;
    }

    // Add color filter
    if (color && color !== 'all') {
      where.color = color;
    }

    console.log("Constructed where filter:", where);
    const products = await prisma.product.findMany({
      where,
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          }
        },
        reviews: {
          select: {
            rating: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log("Raw products fetched from DB:", await prisma.product.findMany());

    console.log("Fetched products:", products);
    // Calculate average rating for each product
    const productsWithRating = products.map(product => ({
      ...product,
      averageRating: product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0,
      reviewCount: product.reviews.length
    }));

    res.status(200).json({
      products: productsWithRating,
      count: productsWithRating.length,
      category: category || 'all'
    });

  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}