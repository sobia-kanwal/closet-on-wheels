// pages/api/cart.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });
  const userId = (session.user as { id: string }).id; // String cuid

  if (req.method === "GET") {
    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
    return res.json(items);
  }

  if (req.method === "POST") {
    const { productId, quantity } = req.body as { productId?: number | string; quantity?: number };
    const productIdNum = typeof productId === "string" ? Number(productId) : productId;
    const qty = typeof quantity === "number" && quantity > 0 ? quantity : 1;
    if (!Number.isInteger(productIdNum)) return res.status(400).json({ error: "productId must be an integer" });

    // ensure product exists
    const product = await prisma.product.findUnique({ where: { id: productIdNum! } });
    if (!product) return res.status(404).json({ error: "Product not found" });

    const existing = await prisma.cartItem.findFirst({ where: { userId, productId: productIdNum! } });
    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + qty },
      });
      return res.json(updated);
    } else {
      const created = await prisma.cartItem.create({
        data: { userId, productId: productIdNum!, quantity: qty },
      });
      return res.json(created);
    }
  }

  if (req.method === "PATCH") {
    const { id, quantity } = req.body as { id?: number; quantity?: number };
    if (!id || !Number.isInteger(id)) return res.status(400).json({ error: "id must be an integer" });
    if (typeof quantity !== "number" || quantity < 1) return res.status(400).json({ error: "quantity must be >= 1" });

    const updated = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
    return res.json(updated);
  }

  if (req.method === "DELETE") {
    const { id, productId } = req.body as { id?: number; productId?: number | string };

    if (id) {
      if (!Number.isInteger(id)) return res.status(400).json({ error: "id must be an integer" });
      await prisma.cartItem.delete({ where: { id } });
      return res.json({ success: true });
    }

    if (productId !== undefined) {
      const productIdNum = typeof productId === "string" ? Number(productId) : productId;
      if (!Number.isInteger(productIdNum)) return res.status(400).json({ error: "productId must be an integer" });
      await prisma.cartItem.deleteMany({ where: { userId, productId: productIdNum! } });
      return res.json({ success: true });
    }

    return res.status(400).json({ error: "Provide id or productId" });
  }

  res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}