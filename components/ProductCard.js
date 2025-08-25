// components/ProductCard.js
import Link from 'next/link';
import AddToWishlistButton from './AddToWishlistButton';
import AddToCartButton from './AddToCartButton'; // Assuming you have this component

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      <AddToWishlistButton product={product} />
      
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer">
          <img
            src={product.image || '/images/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-purple-600">PKR {product.price}/day</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <AddToCartButton product={product} variant="secondary" />
      </div>
    </div>
  );
};

export default ProductCard;