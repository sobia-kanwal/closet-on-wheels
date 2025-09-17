// pages/api/cart/index.js
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

interface CartItemResponse {
 id: number;
 productId: number;
 quantity: number;
 name: string;
 price: number;
 image: string | null;
 brand: string | null;
 category: string | null;
 size: string | null;
 color: string | null;
 total: number;
 createdAt: Date;
 updatedAt: Date;
}

interface CartSummary {
 total: number;
 itemCount: number;
 itemTypes: number;
}

interface CartGetResponse {
 items: CartItemResponse[];
 summary: CartSummary;
}

interface CartPostBody {
 productId: number | string;
 quantity?: number;
}

interface CartPutBody {
 productId: number | string;
 quantity?: number;
 days?: number;
}

interface CartDeleteBody {
 id?: number | string;
 clearAll?: boolean;
}

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
): Promise<void> {
 const session = await getServerSession(req, res, authOptions);

 if (!session?.user) {
  return res.status(401).json({ error: "Unauthorized" });
 }

 const userId = session.user.id;

 if (req.method === "POST") {
  try {
   const { productId, quantity = 1 }: CartPostBody = req.body;

   // Validate input
   if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
   }

   const parsedProductId = parseInt(productId as string);
   if (isNaN(parsedProductId)) {
    return res.status(400).json({ error: "Invalid Product ID" });
   }

   if (quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
   }

   // Check if product is already in cart
   const existingItem = await prisma.cartItem.findFirst({
    where: {
     userId: userId,
     productId: parsedProductId
    }
   });

   if (existingItem) {
    // Update quantity
    const updatedItem = await prisma.cartItem.update({
     where: { id: existingItem.id },
     data: { quantity: existingItem.quantity + quantity },
     include: {
      product: {
       select: {
        id: true,
        title: true,
        price: true,
        rentalPrice: true,
        images: true
       }
      }
     }
    });

    return res.status(200).json({
     success: true,
     message: "Cart item quantity updated",
     item: updatedItem
    });
   } else {
    // Add new item to cart
    const newItem = await prisma.cartItem.create({
     data: {
      userId: userId,
      productId: parsedProductId,
      quantity: quantity
     },
     include: {
      product: {
       select: {
        id: true,
        title: true,
        price: true,
        rentalPrice: true,
        images: true
       }
      }
     }
    });

    console.log("Item added to cart successfully");

    return res.status(201).json({
     success: true,
     message: "Item added to cart",
     item: newItem
    });
   }

  } catch (error) {
   console.error("Error adding to cart:", error);

   if (typeof error === "object" && error !== null && "code" in error && (error as any).code === 'P2003') {
    return res.status(404).json({ error: "Product not found" });
   }

   return res.status(500).json({
    error: "Failed to add to cart",
    details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
   });
  }
 }

 if (req.method === "GET") {
  try {
   // Get cart items for the user with product details
   const cartItems = await prisma.cartItem.findMany({
    where: { userId: userId },
    include: {
     product: {
      select: {
       id: true,
       title: true,
       price: true,
       rentalPrice: true,
       images: true,
       brand: true,
       category: true,
       size: true,
       color: true
      }
     }
    },
    orderBy: { createdAt: 'desc' }
   });

   // Format the response with calculated totals
   const formattedCartItems: CartItemResponse[] = cartItems.map(item => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    name: item.product.title,
    price: item.product.rentalPrice || item.product.price,
    image: item.product.images[0] || null,
    brand: item.product.brand,
    category: item.product.category,
    size: item.product.size,
    color: item.product.color,
    total: (item.product.rentalPrice || item.product.price) * item.quantity,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
   }));

   // Calculate cart summary
   const cartTotal = formattedCartItems.reduce((total, item) => total + item.total, 0);
   const itemCount = formattedCartItems.reduce((count, item) => count + item.quantity, 0);

   const response: CartGetResponse = {
    items: formattedCartItems,
    summary: {
     total: cartTotal,
     itemCount: itemCount,
     itemTypes: formattedCartItems.length
    }
   };

   return res.status(200).json(response);

  } catch (error) {
   console.error("Error fetching cart:", error);
   return res.status(500).json({
    error: "Failed to fetch cart",
    details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
   });
  }
 }

 if (req.method === "PUT") {
  try {
   const { productId, quantity, days }: CartPutBody = req.body;

   // Validate input
   if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
   }

   const parsedProductId = parseInt(productId as string);
   if (isNaN(parsedProductId)) {
    return res.status(400).json({ error: "Invalid Product ID" });
   }

   if (quantity !== undefined && quantity < 1) {
    return res.status(400).json({ error: "Quantity must be at least 1" });
   }

   if (days !== undefined && days < 1) {
    return res.status(400).json({ error: "Days must be at least 1" });
   }

   // Check if item exists in cart
   const existingItem = await prisma.cartItem.findFirst({
    where: {
     userId: userId,
     productId: parsedProductId
    }
   });

   if (!existingItem) {
    return res.status(404).json({ error: "Item not found in cart" });
   }

   // Update the item
   const updatedItem = await prisma.cartItem.update({
    where: { id: existingItem.id },
    data: {
     ...(quantity !== undefined && { quantity }),
     ...(days !== undefined && { days })
    },
    include: {
     product: {
      select: {
       id: true,
       title: true,
       price: true,
       rentalPrice: true,
       images: true
      }
     }
    }
   });

   return res.status(200).json({
    success: true,
    message: "Cart item updated",
    item: updatedItem
   });

  } catch (error) {
   console.error("Error updating cart:", error);
   return res.status(500).json({
    error: "Failed to update cart",
    details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
   });
  }
 }

 if (req.method === "DELETE") {
  try {
   const { id, clearAll }: CartDeleteBody = req.body;

   if (clearAll) {
    // Clear entire cart
    await prisma.cartItem.deleteMany({
     where: { userId: userId }
    });

    return res.status(200).json({
     success: true,
     message: "Cart cleared successfully"
    });
   } else if (id) {
    const parsedId = parseInt(id as string);

    if (isNaN(parsedId)) {
     return res.status(400).json({ error: "Invalid Product ID" });
    }

    // Remove specific item
    const deletedItem = await prisma.cartItem.deleteMany({
     where: {
      userId: userId,
      productId: parsedId
     }
    });

    if (deletedItem.count === 0) {
     return res.status(404).json({ error: "Item not found in cart" });
    }

    return res.status(200).json({
     success: true,
     message: "Item removed from cart"
    });
   } else {
    return res.status(400).json({ error: "Either id or clearAll must be provided" });
   }

  } catch (error) {
   console.error("Error removing from cart:", error);
   return res.status(500).json({
    error: "Failed to remove from cart",
    details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : undefined) : undefined
   });
  }
 }

 res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
 return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}