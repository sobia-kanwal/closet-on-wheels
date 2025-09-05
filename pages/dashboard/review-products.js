// pages/dashboard/review-products.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

const ReviewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/dashboard/review-products');
      return;
    }

    if (user.type !== 'admin') {
      router.push('/');
      return;
    }

    // Fetch products under review
    const fetchProducts = async () => {
      try {
        // Simulate API call
        const mockProducts = [
          {
            id: 1,
            name: "Designer Handbag",
            price: 15000,
            rentalPrice: 1200,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            category: "fashion",
            location: "Lahore",
            lender: "Fatima Ahmed",
            submittedDate: "2023-06-15",
            status: "pending"
          },
          {
            id: 2,
            name: "Persian Carpet",
            price: 45000,
            rentalPrice: 2500,
            image: "https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc2lhbiUyMGNhcnBldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            category: "home",
            location: "Islamabad",
            lender: "Ali Khan",
            submittedDate: "2023-06-14",
            status: "pending"
          }
        ];
        
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, router]);

  const handleApprove = (productId) => {
    // Update product status to approved
    setProducts(products.map(product => 
      product.id === productId ? {...product, status: 'approved'} : product
    ));
  };

  const handleReject = (productId) => {
    // Update product status to rejected
    setProducts(products.map(product => 
      product.id === productId ? {...product, status: 'rejected'} : product
    ));
  };

  if (!user || user.type !== 'admin') {
    return null;
  }

  return (
    <>
      <Head>
        <title>Products Under Review - Closet on Wheels</title>
        <meta name="description" content="Review products submitted by lenders" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Products Under Review</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Products to Review</h2>
            <p className="text-gray-600">All products have been reviewed. Check back later for new submissions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      product.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">Category: {product.category}</p>
                  <p className="text-gray-600 text-sm mb-2">Location: {product.location}</p>
                  <p className="text-gray-600 text-sm mb-2">Lender: {product.lender}</p>
                  <p className="text-gray-600 text-sm mb-4">Submitted: {product.submittedDate}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-teal-600 font-bold">Rs. {product.rentalPrice}/day</span>
                      <span className="text-gray-400 text-sm line-through ml-2">Rs. {product.price}</span>
                    </div>
                  </div>
                  
                  {product.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleApprove(product.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(product.id)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  
                  {product.status !== 'pending' && (
                    <div className={`text-center py-2 px-4 rounded ${
                      product.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      Product has been {product.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewProducts;