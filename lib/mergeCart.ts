import prisma from "./db";

export async function mergeGuestCart(userId: number) {
  if (typeof window === "undefined") return;

  const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (!guestCart.length) return;

  for (const item of guestCart) {
    const existing = await prisma.cartItem.findFirst({
      where: { userId: userId.toString(), productId: item.productId },
    });

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + item.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: { userId: userId.toString(), productId: item.productId, quantity: item.quantity },
      });
    }
  }

  // Clear guest cart
  localStorage.removeItem("cart");
}
