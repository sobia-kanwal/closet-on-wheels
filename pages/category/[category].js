// pages/category/[category].js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import FilterBar from '../../components/FilterBar';
import ProductGrid from '../../components/ProductGrid';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [filters, setFilters] = useState({
    location: '',
    subcategory: '',
    startDate: '',
    endDate: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Sample products based on category
  const categoryProducts = {
    fashion: [
      {
        id: 1,
        name: "Designer Evening Gown",
        price: 2500,
        rentalPrice: 1500,
        image: "/images/products/evening-gown.jpg",
        category: "fashion",
        location: "Lahore"
      },
      {
        id: 4,
        name: "Designer Handbag",
        price: 15000,
        rentalPrice: 1200,
        image: "/images/products/designer-handbag.jpg",
        category: "fashion",
        location: "Lahore"
      },
      {
        id: 7,
        name: "Traditional Kurta",
        price: 8000,
        rentalPrice: 800,
        image: "/images/products/traditional-kurta.jpg",
        category: "fashion",
        location: "Lahore"
      }
    ],
    home: [
      {
        id: 2,
        name: "Persian Carpet",
        price: 45000,
        rentalPrice: 2500,
        image: "/images/products/persian-carpet.jpg",
        category: "home",
        location: "Islamabad"
      },
      {
        id: 5,
        name: "Dining Table Set",
        price: 35000,
        rentalPrice: 3000,
        image: "/images/products/dining-set.jpg",
        category: "home",
        location: "Karachi"
      },
      {
        id: 8,
        name: "Coffee Machine",
        price: 15000,
        rentalPrice: 1000,
        image: "/images/products/coffee-machine.jpg",
        category: "home",
        location: "Rawalpindi"
      }
    ],
    events: [
      {
        id: 3,
        name: "Wedding Decor Set",
        price: 30000,
        rentalPrice: 8000,
        image: "/images/products/wedding-decor.jpg",
        category: "events",
        location: "Karachi"
      },
      {
        id: 6,
        name: "Sound System",
        price: 20000,
        rentalPrice: 2500,
        image: "/images/products/sound-system.jpg",
        category: "events",
        location: "Islamabad"
      }
    ]
  };

  const categoryTitles = {
    fashion: "Fashion",
    home: "Home Items",
    events: "Events"
  };

  const categoryDescription = {
    fashion: "Rent designer dresses, accessories, and traditional wear for any occasion",
    home: "Find furniture, decor, and appliances to make your home beautiful",
    events: "Everything you need for weddings, parties, and corporate events"
  };

  if (!category || !categoryProducts[category]) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{categoryTitles[category]} - Closet on Wheels</title>
        <meta name="description" content={categoryDescription[category]} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryTitles[category]}</h1>
          <p className="text-gray-600">{categoryDescription[category]}</p>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="mt-8">
          <ProductGrid products={categoryProducts[category]} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;