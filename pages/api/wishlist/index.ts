// pages/api/wishlist/index.ts
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  const userId = parseInt((session.user as { id: string }).id);

  if (req.method === "GET") {
    // Get all wishlist items for this user
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return res.json(wishlist);
  }

  if (req.method === "POST") {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "Missing productId" });

    const exists = await prisma.wishlistItem.findFirst({
      where: { userId, productId },
    });

    if (exists) return res.json(exists);

    const item = await prisma.wishlistItem.create({
      data: { userId, productId },
    });
    return res.json(item);
  }

  if (req.method === "DELETE") {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: "Missing productId" });

    await prisma.wishlistItem.deleteMany({
      where: { userId, productId },
    });
    return res.json({ success: true });
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
