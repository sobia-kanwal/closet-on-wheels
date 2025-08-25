// components/MainHeader.js
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);
  const router = useRouter();
  const { user, logout } = useAuth();
  const { cartCount, wishlistCount } = useCart(); // Get both cart and wishlist counts

  
  // A list of the navigation items to make the component more maintainable.
  const navItems = [
    {
      title: "Fashion",
      id: "fashion",
      links: [
        { name: "Dresses", href: "/category/fashion/dresses" },
        { name: "Accessories", href: "/category/fashion/accessories" },
        { name: "Footwear", href: "/category/fashion/footwear" },
        { name: "Jewelry", href: "/category/fashion/jewelry" },
      ]
    },
    {
      title: "Home Items",
      id: "home",
      links: [
        { name: "Furniture", href: "/category/home/furniture" },
        { name: "Decor", href: "/category/home/decor" },
        { name: "Kitchen", href: "/category/home/kitchen" },
        { name: "Electronics", href: "/category/home/electronics" },
      ]
    },
    {
      title: "Events",
      id: "events",
      links: [
        { name: "Wedding", href: "/category/events/wedding" },
        { name: "Party", href: "/category/events/party" },
        { name: "Corporate", href: "/category/events/corporate" },
        { name: "Photography", href: "/category/events/photography" },
      ]
    },
  ];

  // Function to close all dropdowns.
  const closeAllDropdowns = () => setActiveDropdown(null);

  // Function to toggle a dropdown menu.
  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is outside the header, close all dropdowns
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleLogout = () => {
    logout();
    closeAllDropdowns();
    router.push('/');
  };


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans" ref={headerRef}>
      <div className="container mx-auto px-4">
        {/* Main header grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between py-3">
          {/* Left side: Social Icons */}
          <div className="flex-1 flex items-center space-x-2 sm:space-x-4 flex-wrap order-3 md:order-1 col-span-1 md:col-span-1 mt-4 md:mt-0 justify-center md:justify-start">
            <a href="#" className="text-gray-600 hover:text-purple-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center order-1 md:order-2 col-span-1 md:col-span-1">
            <Link href="/" onClick={closeAllDropdowns}>
              <div className="cursor-pointer">
                <Logo />
              </div>
            </Link>
          </div>

          {/* Right side: Icons and User */}
          <div className="flex flex-wrap items-center justify-center md:justify-end space-x-4 order-2 md:order-3 col-span-1 md:col-span-1 mt-4 md:mt-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('currency')}
                className="text-gray-600 hover:text-purple-600 flex items-center"
              >
                <span>PKR</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'currency' && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <button onClick={() => {}} className="block px-4 py-2 text-gray-800 hover:bg-purple-50 w-full text-left text-sm">PKR</button>
                  <button onClick={() => {}} className="block px-4 py-2 text-gray-800 hover:bg-purple-50 w-full text-left text-sm">USD</button>
                  <button onClick={() => {}} className="block px-4 py-2 text-gray-800 hover:bg-purple-50 w-full text-left text-sm">EUR</button>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('language')}
                className="text-gray-600 hover:text-purple-600 flex items-center"
              >
                <span>EN</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 4 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'language' && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                  <button onClick={() => {}} className="block px-4 py-2 text-gray-800 hover:bg-purple-50 w-full text-left text-sm">English</button>
                  <button onClick={() => {}} className="block px-4 py-2 text-gray-800 hover:bg-purple-50 w-full text-left text-sm">Urdu</button>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

            {/* Search Icon */}
            <button className="text-gray-600 hover:text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist */}
<Link href="/wishlist" className="text-gray-600 hover:text-purple-600 relative">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
      {wishlistCount}
    </span>
  )}
</Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="text-gray-600 hover:text-purple-600 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
              )}
            </Link>

            {/* User Account or Login */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('user')}
                  className="text-gray-600 hover:text-purple-600 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                      <p className="text-xs text-purple-600 capitalize">{user.type}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                      Profile
                    </Link>
                    <Link href="/my-rentals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                      My Rentals
                    </Link>
                    {user.type === 'lender' && (
                      <Link href="/my-listings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                        My Listings
                      </Link>
                    )}
                    {user.type === 'admin' && (
                      <Link href="/dashboard/review-products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                        Review Products
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth" className="text-gray-600 hover:text-purple-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

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
        <nav className="hidden md:flex items-center justify-center py-1 border-t border-gray-100">
          <div className="flex items-center space-x-8">
            {navItems.map(item => (
              <div 
                key={item.id} 
                className="relative" 
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={closeAllDropdowns}
              >
                <button 
                  className="font-medium text-gray-700 hover:text-purple-600 focus:outline-none flex items-center text-sm uppercase tracking-wide py-2"
                >
                  {item.title}
                  <svg xmlns="http://www.w3.org/2000/svg" className=" h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200 transition-all duration-300 transform origin-top ${
                    activeDropdown === item.id 
                      ? "opacity-100 visible scale-y-100" 
                      : "opacity-0 invisible scale-y-0"
                  }`}
                >
                  {item.links.map(link => (
                    <Link key={link.name} href={link.href} onClick={closeAllDropdowns}>
                      <div className="block px-4 py-2 hover:bg-purple-50 cursor-pointer text-gray-700 hover:text-purple-600 text-sm">
                        {link.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/about" onClick={closeAllDropdowns}>
              <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer text-sm uppercase tracking-wide py-2">About Us</div>
            </Link>
            <Link href="/contact" onClick={closeAllDropdowns}>
              <div className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer text-sm uppercase tracking-wide py-2">Contact</div>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map(item => (
                <div key={item.id}>
                  <button 
                    onClick={() => toggleDropdown(item.id)}
                    className="font-medium text-gray-700 hover:text-purple-600 cursor-pointer py-2 text-left flex items-center justify-between text-sm uppercase w-full"
                  >
                    <span>{item.title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d={activeDropdown === item.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                      />
                    </svg>
                  </button>
                  {activeDropdown === item.id && (
                    <div className="pl-4 space-y-2">
                      {item.links.map(link => (
                        <Link key={link.name} href={link.href} onClick={closeAllDropdowns}>
                          <div className="text-gray-600 hover:text-purple-600 cursor-pointer py-1 text-sm">
                            {link.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
    </header>
  );
};

export default MainHeader;
