// pages/category/[category].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import FilterBar from '../../components/FilterBar';
import ProductGrid from '../../components/ProductGrid';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    size: '',
    color: ''
  });

  const categoryTitles = {
    fashion: "Fashion",
    home: "Home Items",
    events: "Events",
    dresses: "Dresses",
    accessories: "Accessories",
    footwear: "Footwear",
    jewelry: "Jewelry",
    furniture: "Furniture",
    decor: "Decor",
    kitchen: "Kitchen",
    electronics: "Electronics",
    wedding: "Wedding",
    party: "Party",
    corporate: "Corporate",
    photography: "Photography"
  };

  const categoryDescriptions = {
    fashion: "Rent designer dresses, accessories, and traditional wear for any occasion",
    home: "Find furniture, decor, and appliances to make your home beautiful",
    events: "Everything you need for weddings, parties, and corporate events",
    dresses: "Beautiful dresses for every occasion",
    accessories: "Complete your look with our premium accessories",
    footwear: "Stylish shoes and sandals for every style",
    jewelry: "Elegant jewelry pieces to complement your outfit",
    furniture: "Quality furniture for your home",
    decor: "Home decoration items and accessories",
    kitchen: "Kitchen appliances and utensils",
    electronics: "Latest electronic gadgets and appliances",
    wedding: "Everything for your perfect wedding day",
    party: "Party supplies and decorations",
    corporate: "Professional equipment for corporate events",
    photography: "Photography equipment and accessories"
  };

  const fetchProducts = async (categoryFilter, filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (categoryFilter) queryParams.append('category', categoryFilter);
      if (filterParams.location) queryParams.append('location', filterParams.location);
      if (filterParams.minPrice) queryParams.append('minPrice', filterParams.minPrice);
      if (filterParams.maxPrice) queryParams.append('maxPrice', filterParams.maxPrice);
      if (filterParams.size) queryParams.append('size', filterParams.size);
      if (filterParams.color) queryParams.append('color', filterParams.color);

      const response = await fetch(`/api/products/category/${categoryFilter}?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProducts(category, filters);
    }
  }, [category]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (category) {
      fetchProducts(category, newFilters);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  const displayTitle = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1);
  const displayDescription = categoryDescriptions[category] || `Browse our ${category} collection`;

  return (
    <>
      <Head>
        <title>{displayTitle} - Closet on Wheels</title>
        <meta name="description" content={displayDescription} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{displayTitle}</h1>
          <p className="text-gray-600">{displayDescription}</p>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        <div className="mt-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading products: {error}</p>
              <button
                onClick={() => fetchProducts(category, filters)}
                className="mt-4 btn-outline"
              >
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <p className="mt-4 text-gray-500">No products found in this category</p>
              <p className="text-sm text-gray-400">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;