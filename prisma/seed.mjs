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

  // --- Sample Products for All Categories ---

  // Fashion Category Products
  const fashionProducts = [
    {
      title: "Designer Evening Gown",
      description: "Elegant evening gown perfect for formal events and parties. Made with premium fabric and intricate embroidery.",
      brand: "Elan",
      category: "Dresses",
      size: "M",
      color: "Red",
      price: 75000,
      rentalPrice: 5000,
      images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Bridal Lehenga",
      description: "Traditional Pakistani bridal lehenga with heavy embroidery and mirror work. Perfect for weddings.",
      brand: "Sana Safinaz",
      category: "Dresses",
      size: "L",
      color: "Gold",
      price: 150000,
      rentalPrice: 10000,
      images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Designer Handbag",
      description: "Luxury leather handbag from Gucci. Perfect accessory for any outfit.",
      brand: "Gucci",
      category: "Accessories",
      size: "One Size",
      color: "Black",
      price: 120000,
      rentalPrice: 3000,
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Diamond Earrings",
      description: "Elegant diamond stud earrings. Perfect for formal occasions and weddings.",
      brand: "Jewelry Co",
      category: "Jewelry",
      size: "One Size",
      color: "Silver",
      price: 200000,
      rentalPrice: 8000,
      images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "High Heel Sandals",
      description: "Stylish high heel sandals perfect for parties and formal events.",
      brand: "Jimmy Choo",
      category: "Footwear",
      size: "8",
      color: "Nude",
      price: 80000,
      rentalPrice: 2500,
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Silk Scarf",
      description: "Luxurious silk scarf with beautiful patterns. Perfect accessory for any outfit.",
      brand: "Hermes",
      category: "Accessories",
      size: "One Size",
      color: "Blue",
      price: 45000,
      rentalPrice: 1500,
      images: ["https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    }
  ];

  // Home Category Products
  const homeProducts = [
    {
      title: "Persian Carpet",
      description: "Handwoven Persian carpet with traditional patterns. Perfect for living room or dining area.",
      brand: "Persian Crafts",
      category: "Decor",
      size: "8x10 ft",
      color: "Red",
      price: 150000,
      rentalPrice: 5000,
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Dining Table Set",
      description: "Modern 6-seater dining table set with chairs. Perfect for family gatherings.",
      brand: "IKEA",
      category: "Furniture",
      size: "Large",
      color: "Oak",
      price: 200000,
      rentalPrice: 8000,
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Coffee Machine",
      description: "Professional espresso coffee machine. Perfect for home or office use.",
      brand: "Nespresso",
      category: "Kitchen",
      size: "Medium",
      color: "Black",
      price: 80000,
      rentalPrice: 2500,
      images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Wall Art Set",
      description: "Modern abstract wall art set. Perfect for home decoration.",
      brand: "Artisan",
      category: "Decor",
      size: "24x36 inches",
      color: "Mixed",
      price: 30000,
      rentalPrice: 1200,
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "LED TV 55 inch",
      description: "4K LED Smart TV with all streaming apps. Perfect for entertainment.",
      brand: "Samsung",
      category: "Electronics",
      size: "55 inch",
      color: "Black",
      price: 250000,
      rentalPrice: 5000,
      images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Standing Lamp",
      description: "Modern floor standing lamp with adjustable brightness.",
      brand: "Philips",
      category: "Decor",
      size: "Tall",
      color: "White",
      price: 25000,
      rentalPrice: 800,
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    }
  ];

  // Events Category Products
  const eventsProducts = [
    {
      title: "Wedding Decor Set",
      description: "Complete wedding decoration set including flowers, lights, and backdrops.",
      brand: "Event Masters",
      category: "Wedding",
      size: "Full Set",
      color: "White/Gold",
      price: 150000,
      rentalPrice: 15000,
      images: ["https://images.unsplash.com/photo-1519741497674-611481863552?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Sound System",
      description: "Professional sound system with speakers and mixer. Perfect for events and parties.",
      brand: "JBL",
      category: "Party",
      size: "Large",
      color: "Black",
      price: 100000,
      rentalPrice: 5000,
      images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Projector Screen",
      description: "High-quality projector screen for presentations and movie nights.",
      brand: "Epson",
      category: "Corporate",
      size: "100 inch",
      color: "White",
      price: 50000,
      rentalPrice: 2000,
      images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Photography Lighting Kit",
      description: "Professional photography lighting setup with softboxes and stands.",
      brand: "Canon",
      category: "Photography",
      size: "Complete Kit",
      color: "Black",
      price: 80000,
      rentalPrice: 3000,
      images: ["https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Balloon Arch Kit",
      description: "Colorful balloon arch decoration kit for parties and celebrations.",
      brand: "Party Supplies",
      category: "Party",
      size: "Large",
      color: "Rainbow",
      price: 15000,
      rentalPrice: 1000,
      images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    },
    {
      title: "Stage Backdrop",
      description: "Professional stage backdrop with lighting for events and performances.",
      brand: "Event Pro",
      category: "Corporate",
      size: "10x20 ft",
      color: "Black",
      price: 30000,
      rentalPrice: 2500,
      images: ["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500"],
      status: "APPROVED",
      ownerId: user.id,
    }
  ];

  // Create all products
  const allProducts = [...fashionProducts, ...homeProducts, ...eventsProducts];

  for (const productData of allProducts) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log("✅ Database seeded with admin, user, and sample product");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
