// pages/category/fashion/dresses.js
import ProductCard from "../../../components/ProductCard";

export default function DressesPage() {
  const dresses = [
    {
      id: "1",
      name: "Red Designer Dress",
      description: "Perfect for weddings and formal events.",
      price: 2500,
      category: "Fashion",
      image: "https://via.placeholder.com/300x400?text=Red+Dress",
    },
    {
      id: "2",
      name: "Blue Party Gown",
      description: "Elegant evening gown for parties.",
      price: 4500,
      category: "Fashion",
      image: "https://via.placeholder.com/300x400?text=Blue+Gown",
    },
    {
      id: "3",
      name: "Golden Bridal Lehenga",
      description: "Traditional bridal lehenga for weddings.",
      price: 12000,
      category: "Fashion",
      image: "https://via.placeholder.com/300x400?text=Golden+Lehenga",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dresses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dresses.map((dress) => (
          <ProductCard key={dress.id} product={dress} />
        ))}
      </div>
    </div>
  );
}
