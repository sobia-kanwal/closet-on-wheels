// File: pages/become-a-lender.js
import Head from 'next/head';

const BecomeALender = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Become a Lender - Closet on Wheels</title>
        <meta name="description" content="Rent out your products with Closet on Wheels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Become a Lender</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">List Your Items</h3>
              <p className="text-gray-600">Create a profile and list your items with photos and descriptions.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Get Booking Requests</h3>
              <p className="text-gray-600">Receive booking requests from customers interested in your items.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Earn Money</h3>
              <p className="text-gray-600">Earn money from renting out your items while they&apos;re not in use.</p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/lender-form"
              className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300 inline-block"
            >
              Get Started Now
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Rent With Us?</h2>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Earn extra income from items you don&apos;t use regularly</li>
            <li>We handle payments and provide insurance coverage</li>
            <li>Reach thousands of potential customers across Pakistan</li>
            <li>Set your own prices and availability</li>
            <li>Dedicated support team to help you succeed</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">What Can You Rent?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Fashion Items</h3>
              <p className="text-gray-600">Designer dresses, accessories, handbags, shoes, and jewelry</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Home Items</h3>
              <p className="text-gray-600">Furniture, kitchen appliances, decor, and electronics</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Event Supplies</h3>
              <p className="text-gray-600">Party equipment, wedding decor, sound systems, and tents</p>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default BecomeALender;