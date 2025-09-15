// pages/api/wishlist/index.ts
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  // userId is a String (cuid) in the schema; do NOT parseInt
  const userId = (session.user as { id: string }).id;

  if (req.method === "GET") {
    // Get all wishlist items for this user
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
    });

    return res.json(wishlist);
  }

  if (req.method === "POST") {
    const { productId } = req.body as { productId?: number | string };
    if (productId === undefined || productId === null)
      return res.status(400).json({ error: "Missing productId" });

    // Ensure productId is an integer
    const productIdNum = typeof productId === "string" ? Number(productId) : productId;
    if (!Number.isInteger(productIdNum)) {
      return res.status(400).json({ error: "productId must be an integer" });
    }

    // Verify the product exists to avoid FK violations
    const product = await prisma.product.findUnique({ where: { id: productIdNum } });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const exists = await prisma.wishlistItem.findFirst({
      where: { userId, productId: productIdNum },
    });

    if (exists) return res.json(exists);

    const item = await prisma.wishlistItem.create({
      data: { userId, productId: productIdNum },
    });
    return res.json(item);
  }

  if (req.method === "DELETE") {
    const { productId } = req.body as { productId?: number | string };
    if (productId === undefined || productId === null)
      return res.status(400).json({ error: "Missing productId" });

    const productIdNum = typeof productId === "string" ? Number(productId) : productId;
    if (!Number.isInteger(productIdNum)) {
      return res.status(400).json({ error: "productId must be an integer" });
    }

    await prisma.wishlistItem.deleteMany({
      where: { userId, productId: productIdNum },
    });
    return res.json({ success: true });
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
