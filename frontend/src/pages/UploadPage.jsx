import { useState } from 'react';
import { Upload, X, Camera, Package, User, ArrowLeft, Check, AlertCircle, Loader } from 'lucide-react';

function UploadPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    condition: 'good',
    location: '',
    category: '',
    sellerName: '',
    sellerPhone: '',
    images: []
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  // API Base URL - adjust this to your backend URL
  const API_BASE = 'http://localhost:5000/api';

  // Kenyan locations for dropdown
  const kenyanCities = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 
    'Kitale', 'Garissa', 'Kakamega', 'Machakos', 'Meru', 'Nyeri', 'Kericho',
    'Kisii', 'Embu', 'Lamu', 'Isiolo', 'Nanyuki', 'Voi'
  ];

  const categories = [
    'Furniture', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 
    'Sports', 'Vehicles', 'Art & Collectibles', 'Musical Instruments', 
    'Appliances', 'Tools', 'Jewelry', 'Toys & Games', 'Other'
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent - Like new' },
    { value: 'good', label: 'Good - Minor wear' },
    { value: 'fair', label: 'Fair - Noticeable wear' }
  ];

  // Phone number validation for Kenyan numbers
  const validatePhoneNumber = (phone) => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check for valid Kenyan number formats
    const kenyanPatterns = [
      /^254[17]\d{8}$/, // +254 7XXXXXXXX or +254 1XXXXXXXX
      /^0[17]\d{8}$/,   // 07XXXXXXXX or 01XXXXXXXX
      /^[17]\d{8}$/     // 7XXXXXXXX or 1XXXXXXXX
    ];

    return kenyanPatterns.some(pattern => pattern.test(cleanPhone));
  };

  // Format phone number to international format
  const formatPhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.startsWith('254')) {
      return `+${cleanPhone}`;
    } else if (cleanPhone.startsWith('0')) {
      return `+254${cleanPhone.substring(1)}`;
    } else if (cleanPhone.length === 9) {
      return `+254${cleanPhone}`;
    }
    
    return phone;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number
    if (name === 'sellerPhone') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Validate phone number
      if (value && !validatePhoneNumber(value)) {
        setPhoneError('Please enter a valid Kenyan phone number (e.g., 0712345678)');
      } else {
        setPhoneError('');
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).slice(0, 5 - formData.images.length); // Max 5 images
    const imageUrls = newImages.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.price || 
          !formData.condition || !formData.location || !formData.category || 
          !formData.sellerName || !formData.sellerPhone) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.images.length === 0) {
        throw new Error('Please add at least one image');
      }

      if (!validatePhoneNumber(formData.sellerPhone)) {
        throw new Error('Please enter a valid Kenyan phone number');
      }

      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form fields
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      if (formData.originalPrice) {
        submitData.append('originalPrice', formData.originalPrice);
      }
      submitData.append('condition', formData.condition);
      submitData.append('location', formData.location);
      submitData.append('category', formData.category);
      submitData.append('sellerName', formData.sellerName);
      submitData.append('sellerPhone', formatPhoneNumber(formData.sellerPhone));

      // Add images
      formData.images.forEach((image, index) => {
        submitData.append('images', image.file);
      });

      // Submit to API
      const response = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to post item');
      }

      if (result.success) {
        setIsSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            description: '',
            price: '',
            originalPrice: '',
            condition: 'good',
            location: '',
            category: '',
            sellerName: '',
            sellerPhone: '',
            images: []
          });
          onBack();
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to post item');
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Listed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your item has been posted and is now live on SecondLife marketplace.</p>
          <button
            onClick={onBack}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Sell Your Item
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-600" />
              Photos ({formData.images.length}/5) *
            </h2>
            
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-indigo-400 bg-indigo-50' 
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Item Photos</h3>
              <p className="text-gray-600 mb-4">Drag & drop images here, or click to select (Max 5MB each)</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="image-upload"
                disabled={formData.images.length >= 5}
              />
              <label
                htmlFor="image-upload"
                className={`inline-block px-6 py-2 rounded-lg cursor-pointer transition-colors font-medium ${
                  formData.images.length >= 5
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {formData.images.length >= 5 ? 'Max Images Reached' : 'Choose Photos'}
              </label>
            </div>

            {/* Image Preview */}
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {formData.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" />
              Item Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Vintage Leather Chair"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Location</option>
                  {kenyanCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Price (Ksh) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="2000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (Ksh) <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="4500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe your item's condition, features, and why you're selling..."
                />
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              Your Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="sellerPhone"
                  value={formData.sellerPhone}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    phoneError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'
                  }`}
                  placeholder="0712345678 or +254712345678"
                />
                {phoneError && (
                  <p className="text-red-600 text-sm mt-1">{phoneError}</p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  Buyers will use this to contact you via call, SMS, or WhatsApp
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || formData.images.length === 0 || phoneError}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Item'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UploadPage;