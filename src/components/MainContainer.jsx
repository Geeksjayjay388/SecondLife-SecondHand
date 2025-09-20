import { useState } from 'react';
import { Heart, MapPin, Star, X, Phone, MessageCircle, Calendar, Package } from 'lucide-react';
export default MainContainer;
function MainContainer({ searchTerm = '', selectedFilter = 'all', items = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    name: 'Vintage Leather Chair',
    location: 'Nairobi',
    price: 'Ksh 2,000',
    originalPrice: 'Ksh 4,500',
    condition: 'Good',
    rating: 4.5,
    liked: false,
    seller: 'John K.',
    postedTime: '2 hours ago'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop',
    name: 'Rustic Oak Table',
    location: 'Mombasa',
    price: 'Ksh 3,500',
    originalPrice: 'Ksh 8,000',
    condition: 'Excellent',
    rating: 4.8,
    liked: true,
    seller: 'Sarah M.',
    postedTime: '1 day ago'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    name: 'Modern Desk Lamp',
    location: 'Kisumu',
    price: 'Ksh 800',
    originalPrice: 'Ksh 2,200',
    condition: 'Fair',
    rating: 4.2,
    liked: false,
    seller: 'Mike T.',
    postedTime: '3 days ago'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop',
    name: 'Vintage Bookshelf',
    location: 'Nakuru',
    price: 'Ksh 4,200',
    originalPrice: 'Ksh 9,500',
    condition: 'Good',
    rating: 4.6,
    liked: false,
    seller: 'Grace W.',
    postedTime: '5 days ago'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop',
    name: 'Retro Coffee Machine',
    location: 'Eldoret',
    price: 'Ksh 1,500',
    originalPrice: 'Ksh 3,800',
    condition: 'Good',
    rating: 4.3,
    liked: true,
    seller: 'Peter N.',
    postedTime: '1 week ago'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1551298370-9c50423f2fb8?w=400&h=400&fit=crop',
    name: 'Gaming Monitor',
    location: 'Thika',
    price: 'Ksh 8,500',
    originalPrice: 'Ksh 15,000',
    condition: 'Excellent',
    rating: 4.9,
    liked: false,
    seller: 'Alex W.',
    postedTime: '4 days ago'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    name: 'Antique Mirror',
    location: 'Machakos',
    price: 'Ksh 2,800',
    originalPrice: 'Ksh 6,200',
    condition: 'Fair',
    rating: 4.1,
    liked: false,
    seller: 'Mary K.',
    postedTime: '2 weeks ago'
  }
], toggleLike = () => {} }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  const getConditionColor = (condition) => {
    switch(condition.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'fair': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.condition.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <p className="text-gray-600">Showing {filteredItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <span className="text-sm text-gray-600">{item.rating}</span>
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
                    <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
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

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No items found</div>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-t-2xl"
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
                  <span className="text-sm font-medium text-gray-700">{selectedItem.rating}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-indigo-600">{selectedItem.price}</span>
                  <span className="text-lg text-gray-400 line-through">{selectedItem.originalPrice}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    {Math.round((1 - parseInt(selectedItem.price.replace(/\D/g, '')) / parseInt(selectedItem.originalPrice.replace(/\D/g, ''))) * 100)}% OFF
                  </span>
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
                  This beautiful {selectedItem.name.toLowerCase()} is in {selectedItem.condition.toLowerCase()} condition and ready for a new home. 
                  Perfect for anyone looking to add character to their space while saving money. The item has been well-maintained 
                  and shows minimal signs of wear. Located in {selectedItem.location} for easy pickup or delivery can be arranged.
                </p>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <Phone className="w-4 h-4" />
                  Call Seller
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
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