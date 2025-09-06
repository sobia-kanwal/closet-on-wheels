// pages/product/[id].js
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rentalDays, setRentalDays] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product data
  const product = {
    id: 1,
    name: "Designer Evening Gown",
    price: 2500,
    rentalPrice: 1500,
    images: [
      "/images/products/evening-gown.jpg",
      "/images/products/evening-gown-2.jpg",
      "/images/products/evening-gown-3.jpg"
    ],
    category: "fashion",
    location: "Lahore",
    description: "Beautiful designer evening gown with intricate embroidery and sequin work. Perfect for weddings, parties, and special occasions. Made from high-quality fabric with a comfortable fit.",
    details: [
      "Color: Navy Blue with Gold Embroidery",
      "Size: Medium (custom sizing available)",
      "Fabric: Silk and Organza",
      "Condition: Excellent (worn only once)",
      "Includes: Matching clutch purse"
    ],
    lender: {
      name: "Fatima Ahmed",
      rating: 4.8,
      reviews: 47
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const incrementDays = () => setRentalDays(rentalDays + 1);
  const decrementDays = () => {
    if (rentalDays > 1) setRentalDays(rentalDays - 1);
  };

  const totalPrice = product.rentalPrice * rentalDays;

  return (
    <>
      <Head>
        <title>{product.name} - Closet on Wheels</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="relative h-96 w-full bg-gray-200 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 bg-gray-200 rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-teal-500' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-gray-600">4.8 (47 reviews)</span>
              <span className="mx-2 text-gray-400">•</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-600">{product.location}</span>
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold text-teal-600">Rs. {product.rentalPrice}/day</span>
              <span className="text-gray-400 text-sm line-through ml-2">Rs. {product.price}</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Details</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Lender Information</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">{product.lender.name}</p>
                  <p className="text-sm text-gray-600">{product.lender.rating} rating • {product.lender.reviews} reviews</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Rental Period</h3>
              
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-3">Number of days:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementDays}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{rentalDays}</span>
                  <button 
                    onClick={incrementDays}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-teal-600">Rs. {totalPrice}</span>
              </div>

              <button className="btn-primary w-full py-3 text-lg">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;