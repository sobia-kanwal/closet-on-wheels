// components/FilterBar.js
import { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    dateRange: ''
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      // Handle search functionality
      console.log('Search for:', searchTerm);
    }
  };

  return (
    <div className="bg-white shadow-sm py-4 font-sans">
      <div className="container mx-auto px-4">
        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select 
              id="location" 
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
            >
              <option value="">All Locations</option>
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
              <option value="rawalpindi">Rawalpindi</option>
              <option value="peshawar">Peshawar</option>
              <option value="quetta">Quetta</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              id="category" 
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
            >
              <option value="">All Categories</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home Items</option>
              <option value="events">Events</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Rental Period</label>
            <select 
              id="dateRange" 
              name="dateRange"
              value={filters.dateRange}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
            >
              <option value="">Any Dates</option>
              <option value="today">Today</option>
              <option value="weekend">This Weekend</option>
              <option value="next-week">Next Week</option>
              <option value="next-month">Next Month</option>
              <option value="custom">Custom Dates</option>
            </select>
          </div>
        </div>

        {/* Search Bar - Below Filters */}
        <div className="flex items-center">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="mr-3 text-gray-600 hover:text-teal-600 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <form onSubmit={handleSearchSubmit} className={`flex-1 ${isSearchOpen ? 'block' : 'hidden md:flex'}`}>
            <div className="flex w-full">
              <input
                type="text"
                name="search"
                placeholder="Search for products, brands, or categories..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
              <button
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-r-sm hover:bg-teal-700 transition duration-300 text-sm"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;