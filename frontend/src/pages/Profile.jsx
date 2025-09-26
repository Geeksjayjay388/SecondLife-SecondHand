
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Info, Heart, Shield, HelpCircle, MessageCircle, FileText, ExternalLink, Edit3, Check, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Jacob Sihul',
    email: 'jacobsihul911@gmail.com',
    phone: '+254 794787682',
    location: 'Nairobi, Kenya',
    bio: 'App Administrator and Developer. Passionate about creating innovative solutions and providing excellent user experiences. Available for support and inquiries.',
  });
  
  const [tempInfo, setTempInfo] = useState(userInfo);
  const [contactConfirmed, setContactConfirmed] = useState({
    email: true,
    phone: false
  });

  const handleEdit = () => {
    setTempInfo(userInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserInfo(tempInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempInfo(userInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const confirmContact = (type) => {
    setContactConfirmed(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Admin Profile Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              Administrator
            </div>
          </div>

          <div className="pt-20 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{userInfo.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-900">{userInfo.email}</span>
                    )}
                    <button
                      onClick={() => confirmContact('email')}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contactConfirmed.email 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {contactConfirmed.email ? 'Confirmed' : 'Unconfirmed'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-900">{userInfo.phone}</span>
                    )}
                    <button
                      onClick={() => confirmContact('phone')}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contactConfirmed.phone 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {contactConfirmed.phone ? 'Confirmed' : 'Unconfirmed'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempInfo.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-900">{userInfo.location}</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
                {isEditing ? (
                  <textarea
                    value={tempInfo.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{userInfo.bio}</p>
                )}
                
               
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* About the App Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">About Our App</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We're dedicated to creating innovative solutions that simplify your daily life. Our app is designed with user experience at the forefront, ensuring every interaction is intuitive and meaningful.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Built with cutting-edge technology and a passion for excellence, we continuously evolve to meet your needs and exceed your expectations.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Seamless user experience across all devices
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Advanced security and privacy protection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Real-time synchronization and updates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  24/7 customer support and assistance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Regular updates with new features
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;