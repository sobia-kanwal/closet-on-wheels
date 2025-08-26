import { useState, useEffect } from 'react';
import { getSessionUser } from '../../utils/encryption';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/ProtectedRoute.jsx';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('approved');
  const router = useRouter();

  useEffect(() => {
    const user = getSessionUser();
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/admin/products?status=${filter}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/admin/products?id=${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, adminFeedback: feedback }),
      });

      if (response.ok) {
        setSelectedProduct(null);
        setFeedback('');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <label htmlFor="filter" className="mr-2">Filter by status:</label>
        <select 
          id="filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="needs_improvement">Needs Improvement</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products.map(product => (
          <div key={product._id} className="border rounded p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.brand} - Size: {product.size}</p>
            <p className="text-gray-600">Condition: {product.condition}</p>
            <p className="text-gray-600">Rental Price: ${product.rentalPrice}/day</p>
            {product.forSale && <p className="text-gray-600">Sale Price: ${product.sellingPrice}</p>}
            <p className="text-gray-600">Status: <span className={`font-semibold ${
              product.status === 'approved' ? 'text-green-600' : 
              product.status === 'rejected' ? 'text-red-600' : 
              product.status === 'needs_improvement' ? 'text-yellow-600' : 
              'text-blue-600'
            }`}>{product.status}</span></p>
            
            {product.adminFeedback && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="font-semibold">Admin Feedback:</p>
                <p>{product.adminFeedback}</p>
              </div>
            )}
            
            <button 
              onClick={() => setSelectedProduct(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Review Product</h2>
            <form onSubmit={handleReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="approved">Approve</option>
                  <option value="needs_improvement">Needs Improvement</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Feedback</label>
                <textarea 
                  value={feedback} 
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full border rounded p-2"
                  rows="4"
                  placeholder="Provide feedback for the lender..."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Only one default export
export default function ProtectedAdminDashboard() {
  return (
    <ProtectedRoute requireAdmin={false}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}