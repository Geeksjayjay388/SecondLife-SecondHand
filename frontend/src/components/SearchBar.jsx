import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Star, Search, Menu, X, Plus, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
// SearchBar Component
function SearchBar({ searchTerm, setSearchTerm, selectedFilter, setSelectedFilter }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 
            onClick={() => navigate('/')}
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            BlackVendors
          </h1>
          
          {/* Desktop Search, Filter, and Upload */}
          <div className="hidden md:flex items-center gap-4">
            
            
            
            {/* Upload Button - Desktop */}
            <button
              onClick={handleUploadClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-colors duration-200"
            >
              <Upload className="w-4 h-4" />
              <span>Sell Item</span>
            </button>
            <Link to="/profile">
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-colors duration-200">
              About us
             </button>
           </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Upload Button */}
            <button
              onClick={handleUploadClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search and Filter */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4 border-t pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Conditions</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
}

export default SearchBar;