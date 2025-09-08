import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Create Admin User ---
  const passwordHash = await bcrypt.hash("Admin@123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@example.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  // --- Create Normal User ---
  const userPassword = await bcrypt.hash("User@123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  // --- Sample Product ---
  await prisma.product.create({
    data: {
      title: "Designer Dress",
      description: "Luxury Pakistani brand dress for rent",
      brand: "Elan",
      category: "Formal",
      size: "M",
      color: "Red",
      price: 50000,
      rentalPrice: 5000,
      images: ["https://example.com/dress.jpg"],
      status: "APPROVED",
      ownerId: user.id,
    },
  });

  console.log("✅ Database seeded with admin, user, and sample product");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
