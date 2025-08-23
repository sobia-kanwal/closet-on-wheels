// components/Header.js
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={closeAllDropdowns}>
            <div className="text-2xl font-bold text-purple-600 cursor-pointer flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Closet on Wheels
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                name="search"
                placeholder="Search for products..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('fashion')}
                className="font-medium text-gray-700 hover:text-purple-600 focus:outline-none flex items-center"
              >
                Fashion
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'fashion' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link href="/category/fashion/dresses" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Dresses</div>
                  </Link>
                  <Link href="/category/fashion/accessories" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Accessories</div>
                  </Link>
                  <Link href="/category/fashion/footwear" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Footwear</div>
                  </Link>
                  <Link href="/category/fashion/jewelry" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Jewelry</div>
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('home')}
                className="font-medium text-gray-700 hover:text-purple-600 focus:outline-none flex items-center"
              >
                Home Items
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'home' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link href="/category/home/furniture" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Furniture</div>
                  </Link>
                  <Link href="/category/home/decor" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Decor</div>
                  </Link>
                  <Link href="/category/home/kitchen" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Kitchen</div>
                  </Link>
                  <Link href="/category/home/electronics" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Electronics</div>
                  </Link>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('events')}
                className="font-medium text-gray-700 hover:text-purple-600 focus:outline-none flex items-center"
              >
                Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'events' && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <Link href="/category/events/wedding" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Wedding</div>
                  </Link>
                  <Link href="/category/events/party" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Party</div>
                  </Link>
                  <Link href="/category/events/corporate" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Corporate</div>
                  </Link>
                  <Link href="/category/events/photography" onClick={closeAllDropdowns}>
                    <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600">Photography</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" onClick={closeAllDropdowns}>
              <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer">About Us</div>
            </Link>
            <Link href="/contact" onClick={closeAllDropdowns}>
              <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer">Contact</div>
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link href="/become-a-lender" onClick={closeAllDropdowns}>
              <div className="hidden md:block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 cursor-pointer font-medium">
                Rent With Us
              </div>
            </Link>
            
            <Link href="/cart" onClick={closeAllDropdowns}>
              <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </div>
            </Link>

            <Link href="/auth/login" onClick={closeAllDropdowns}>
              <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                name="search"
                placeholder="Search for products..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => toggleDropdown('fashion-mobile')}
                className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-left flex items-center justify-between"
              >
                <span>Fashion</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'fashion-mobile' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {activeDropdown === 'fashion-mobile' && (
                <div className="pl-4 space-y-2">
                  <Link href="/category/fashion/dresses" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Dresses</div>
                  </Link>
                  <Link href="/category/fashion/accessories" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Accessories</div>
                  </Link>
                  <Link href="/category/fashion/footwear" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Footwear</div>
                  </Link>
                  <Link href="/category/fashion/jewelry" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Jewelry</div>
                  </Link>
                </div>
              )}

              <button 
                onClick={() => toggleDropdown('home-mobile')}
                className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-left flex items-center justify-between"
              >
                <span>Home Items</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'home-mobile' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {activeDropdown === 'home-mobile' && (
                <div className="pl-4 space-y-2">
                  <Link href="/category/home/furniture" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Furniture</div>
                  </Link>
                  <Link href="/category/home/decor" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Decor</div>
                  </Link>
                  <Link href="/category/home/kitchen" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Kitchen</div>
                  </Link>
                  <Link href="/category/home/electronics" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Electronics</div>
                  </Link>
                </div>
              )}

              <button 
                onClick={() => toggleDropdown('events-mobile')}
                className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-left flex items-center justify-between"
              >
                <span>Events</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeDropdown === 'events-mobile' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {activeDropdown === 'events-mobile' && (
                <div className="pl-4 space-y-2">
                  <Link href="/category/events/wedding" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Wedding</div>
                  </Link>
                  <Link href="/category/events/party" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Party</div>
                  </Link>
                  <Link href="/category/events/corporate" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Corporate</div>
                  </Link>
                  <Link href="/category/events/photography" onClick={closeAllDropdowns}>
                    <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1">Photography</div>
                  </Link>
                </div>
              )}

              <Link href="/about" onClick={closeAllDropdowns}>
                <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2">About Us</div>
              </Link>
              <Link href="/contact" onClick={closeAllDropdowns}>
                <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2">Contact</div>
              </Link>
              <Link href="/become-a-lender" onClick={closeAllDropdowns}>
                <div className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 cursor-pointer text-center font-medium">
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

export default Header;