import { useState, useEffect } from 'react';
import { Heart, MapPin, Star, X, Phone, MessageCircle, Calendar, Package, Search, Filter, Loader, AlertCircle, RefreshCw } from 'lucide-react';

function MainContainer({ searchTerm = '', selectedFilter = 'all', onSearch, onFilterChange }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [currentFilter, setCurrentFilter] = useState(selectedFilter);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loadingMore, setLoadingMore] = useState(false);

  // API Base URL - adjust this to your backend URL
  const API_BASE = 'http://localhost:5000/api';

  // Fetch items from API
  const fetchItems = async (page = 1, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams({
        search: searchInput,
        condition: currentFilter === 'all' ? '' : currentFilter,
        page: page.toString(),
        limit: '12'
      });

      const response = await fetch(`${API_BASE}/items?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        if (append) {
          setItems(prevItems => [...prevItems, ...data.data]);
        } else {
          setItems(data.data);
        }
        setPagination(data.pagination);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch items');
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err.message);
      if (!append) setItems([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Toggle like functionality
  const toggleLike = async (itemId) => {
    try {
      const response = await fetch(`${API_BASE}/items/${itemId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Update items state
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === itemId 
              ? { ...item, liked: data.data.liked }
              : item
          )
        );

        // Update selected item if modal is open
        if (selectedItem && selectedItem.id === itemId) {
          setSelectedItem(prev => ({ ...prev, liked: data.data.liked }));
        }
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      // Fallback to local state update
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, liked: !item.liked }
            : item
        )
      );
    }
  };

  // Initial load
  useEffect(() => {
    fetchItems();
  }, []);

  // Search and filter effects
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchItems(1);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, currentFilter]);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const getConditionColor = (condition) => {
    switch(condition?.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    if (onSearch) onSearch(value);
  };

  const handleFilterChange = (value) => {
    setCurrentFilter(value);
    if (onFilterChange) onFilterChange(value);
  };

  const loadMoreItems = () => {
    if (pagination.page < pagination.totalPages && !loadingMore) {
      fetchItems(pagination.page + 1, true);
    }
  };

  const refreshItems = () => {
    fetchItems(1);
  };

  // Get seller phone for contact actions
  const getSellerPhone = (item) => {
    return item.sellerPhone || '+254700000000';
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter Bar */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items, locations..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Condition Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={currentFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white min-w-[150px]"
            >
              <option value="all">All Conditions</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refreshItems}
            disabled={loading}
            className="px-4 py-3 bg-indigo-100 hover:bg-indigo-200 disabled:bg-gray-100 text-indigo-600 rounded-xl transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Results Count and Status */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Loading items...
            </span>
          ) : (
            `Showing ${items.length} of ${pagination.total} items`
          )}
        </p>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Items Grid */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image || item.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={item.name} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      item.liked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.liked ? 'fill-current' : ''}`} />
                  </button>
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating || '4.0'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-indigo-600">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        by {item.seller} • {item.postedTime}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => openModal(item)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {pagination.page < pagination.totalPages && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreItems}
                disabled={loadingMore}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-xl font-medium transition-colors flex items-center gap-2 mx-auto"
              >
                {loadingMore ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  `Load More (${pagination.total - items.length} remaining)`
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No items found</div>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-12">
          <div className="text-red-400 text-lg mb-2">Error loading items</div>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={refreshItems}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedItem.image || selectedItem.images?.[0] || 'https://via.placeholder.com/600x300?text=No+Image'}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-t-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x300?text=No+Image';
                }}
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 p-2 rounded-full backdrop-blur-sm transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleLike(selectedItem.id)}
                className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                  selectedItem.liked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${selectedItem.liked ? 'fill-current' : ''}`} />
              </button>
              <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(selectedItem.condition)}`}>
                {selectedItem.condition}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Title and Rating */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{selectedItem.rating || '4.0'}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-indigo-600">{selectedItem.price}</span>
                  {selectedItem.originalPrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">{selectedItem.originalPrice}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {Math.round((1 - parseInt(selectedItem.price.replace(/\D/g, '')) / parseInt(selectedItem.originalPrice.replace(/\D/g, ''))) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedItem.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Posted {selectedItem.postedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>Condition: {selectedItem.condition}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs">S</span>
                  <span>Sold by {selectedItem.seller}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedItem.description || `This beautiful ${selectedItem.name?.toLowerCase()} is in ${selectedItem.condition?.toLowerCase()} condition and ready for a new home. Perfect for anyone looking to add character to their space while saving money. The item has been well-maintained and shows minimal signs of wear. Located in ${selectedItem.location} for easy pickup or delivery can be arranged.`}
                </p>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-3 mb-3">
                <a 
                  href={`tel:${getSellerPhone(selectedItem)}`}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-center no-underline"
                >
                  <Phone className="w-4 h-4" />
                  Call Seller
                </a>
                <a 
                  href={`sms:${getSellerPhone(selectedItem)}?body=Hi! I'm interested in your ${selectedItem.name} listed for ${selectedItem.price}. Is it still available?`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-center no-underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  SMS
                </a>
              </div>

              {/* WhatsApp Button */}
              <div className="mb-4">
                <a
                  href={`https://wa.me/${getSellerPhone(selectedItem).replace(/\D/g, '')}?text=Hi! I'm interested in your *${selectedItem.name}* listed for *${selectedItem.price}*. Is it still available?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors no-underline"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Safety Tips */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">Safety Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Meet in a public place for item exchange</li>
                  <li>• Inspect the item thoroughly before purchase</li>
                  <li>• Use secure payment methods</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MainContainer;