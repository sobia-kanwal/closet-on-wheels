// components/MainHeader.js
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4">
        {/* Logo and right icons row */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" onClick={closeAllDropdowns}>
            <div className="text-2xl font-bold text-purple-600 cursor-pointer flex items-center tracking-tight">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-semibold">CLOSET ON WHEELS</span>
            </div>
          </Link>

          {/* Right side icons - Like StyleWise Direct */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button className="text-gray-600 hover:text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

{/* User Account */}
<Link href="/auth/login" className="text-gray-600 hover:text-purple-600">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</Link>

            {/* Wishlist */}
            <button className="text-gray-600 hover:text-purple-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </button>

            {/* Shopping Cart */}
            <Link href="/cart" className="text-gray-600 hover:text-purple-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex items-center space-x-8">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('fashion')}
                className="font-medium text-gray-700 hover:text-purple-600 focus:outline-none flex items-center text-sm uppercase tracking-wide"
              >
                Fashion
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'fashion' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link href="/category/fashion/dresses" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Dresses</div>
                  </Link>
                  <Link href="/category/fashion/accessories" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Accessories</div>
                  </Link>
                  <Link href="/category/fashion/footwear" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Footwear</div>
                  </Link>
                  <Link href="/category/fashion/jewelry" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Jewelry</div>
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('home')}
                className="font-medium text-gray-700 hover:text-purple-600 focus:outline-none flex items-center text-sm uppercase tracking-wide"
              >
                Home Items
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'home' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link href="/category/home/furniture" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Furniture</div>
                  </Link>
                  <Link href="/category/home/decor" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Decor</div>
                  </Link>
                  <Link href="/category/home/kitchen" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Kitchen</div>
                  </Link>
                  <Link href="/category/home/electronics" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Electronics</div>
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('events')}
                className="font-medium text-gray-700 hover:text-purple-600 focus:outline-none flex items-center text-sm uppercase tracking-wide"
              >
                Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'events' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link href="/category/events/wedding" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Wedding</div>
                  </Link>
                  <Link href="/category/events/party" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Party</div>
                  </Link>
                  <Link href="/category/events/corporate" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Corporate</div>
                  </Link>
                  <Link href="/category/events/photography" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">Photography</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" onClick={closeAllDropdowns}>
              <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer text-sm uppercase tracking-wide">About Us</div>
            </Link>
            <Link href="/contact" onClick={closeAllDropdowns}>
              <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer text-sm uppercase tracking-wide">Contact</div>
            </Link>
          </div>

          {/* Rent With Us button */}
          <Link href="/become-a-lender" onClick={closeAllDropdowns}>
            <div className="bg-purple-600 text-white px-4 py-2 rounded-sm hover:bg-purple-700 transition duration-300 cursor-pointer font-medium text-sm uppercase tracking-wide">
              Rent With Us
            </div>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => toggleDropdown('fashion-mobile')}
                className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-left flex items-center justify-between text-sm uppercase"
              >
                <span>Fashion</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'fashion-mobile' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {activeDropdown === 'fashion-mobile' && (
                <div className="pl-4 space-y-2">
                  <Link href="/category/fashion/dresses" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Dresses</div>
                  </Link>
                  <Link href="/category/fashion/accessories" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Accessories</div>
                  </Link>
                  <Link href="/category/fashion/footwear" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Footwear</div>
                  </Link>
                  <Link href="/category/fashion/jewelry" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Jewelry</div>
                  </Link>
                </div>
              )}

              <button 
                onClick={() => toggleDropdown('home-mobile')}
                className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-left flex items-center justify-between text-sm uppercase"
              >
                <span>Home Items</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'home-mobile' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {activeDropdown === 'home-mobile' && (
                <div className="pl-4 space-y-2">
                  <Link href="/category/home/furniture" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Furniture</div>
                  </Link>
                  <Link href="/category/home/decor" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Decor</div>
                  </Link>
                  <Link href="/category/home/kitchen" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Kitchen</div>
                  </Link>
                  <Link href="/category/home/electronics" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Electronics</div>
                  </Link>
                </div>
              )}

              <button 
                onClick={() => toggleDropdown('events-mobile')}
                className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-left flex items-center justify-between text-sm uppercase"
              >
                <span>Events</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'events-mobile' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {activeDropdown === 'events-mobile' && (
                <div className="pl-4 space-y-2">
                  <Link href="/category/events/wedding" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Wedding</div>
                  </Link>
                  <Link href="/category/events/party" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Party</div>
                  </Link>
                  <Link href="/category/events/corporate" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Corporate</div>
                  </Link>
                  <Link href="/category/events/photography" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">Photography</div>
                  </Link>
                </div>
              )}

              <Link href="/about" onClick={closeAllDropdowns}>
                <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-sm uppercase">About Us</div>
              </Link>
              <Link href="/contact" onClick={closeAllDropdowns}>
                <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-sm uppercase">Contact</div>
              </Link>
              <Link href="/become-a-lender" onClick={closeAllDropdowns}>
                <div className="bg-purple-600 text-white px-4 py-2 rounded-sm hover:bg-purple-700 transition duration-300 cursor-pointer text-center font-medium text-sm uppercase">
                  Rent With Us
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close dropdowns when clicking outside */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        ></div>
      )}
    </header>
  );
};

export default MainHeader;