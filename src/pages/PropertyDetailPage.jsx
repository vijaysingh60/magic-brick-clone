import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, Phone, Mail, MapPin, Bed, Bath, Move, CalendarDays, 
  ArrowLeft, Tag, Check, ChevronLeft, ChevronRight, Edit, User
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useProperty } from '../context/PropertyContext';
import { formatPrice, formatArea, formatDate, getPropertyTypeLabel } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, toggleFavorite, favoriteProperties, loading } = useProperty();
  const { currentUser } = useAuth();
  const [property, setProperty] = useState(null);
  const [loadingProperty, setLoadingProperty] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property. Please contact me with more information.'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoadingProperty(true);
        const data = await getPropertyById(id);
        setProperty(data);
        setLoadingProperty(false);
      } catch (err) {
        setError('Failed to load property details');
        setLoadingProperty(false);
      }
    };

    fetchPropertyDetails();
  }, [id, getPropertyById]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    // In a real application, you would send this to the backend
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const isFavorite = property && favoriteProperties.includes(property._id);

  if (loadingProperty || loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error || "Property not found"}</p>
        <Button onClick={handleGoBack} variant="outline" iconLeft={<ArrowLeft size={16} />}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-blue-900 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to listings</span>
        </button>
      </div>

      {/* Image Gallery */}
      <div className="bg-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="relative h-96 md:h-[500px]">
            <img 
              src={property.images[currentImageIndex]} 
              alt={`Property ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <Tag size={16} className="text-amber-500 mr-2" />
                    <span className="text-sm font-medium text-amber-500">
                      {getPropertyTypeLabel(property.type)}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{property.title}</h1>
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-blue-900">{formatPrice(property.price)}</span>
                  <div className="flex mt-2">
                    <button 
                      onClick={() => toggleFavorite(property._id)}
                      className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                      <span className="ml-1">{isFavorite ? 'Saved' : 'Save'}</span>
                    </button>
                    
                    {currentUser && (
                      <button 
                        onClick={() => navigate(`/admin/edit/${property._id}`)}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors ml-4"
                      >
                        <Edit size={20} />
                        <span className="ml-1">Edit</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Specs */}
              <div className="flex flex-wrap gap-6 py-4 border-t border-b border-gray-200 my-4">
                <div className="flex items-center">
                  <Bed size={20} className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-semibold">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath size={20} className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-semibold">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Move size={20} className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold">{formatArea(property.area)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CalendarDays size={20} className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Posted On</p>
                    <p className="font-semibold">{formatDate(property.postedDate)}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-green-600 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Map would be displayed here</p>
              </div>
              <p className="mt-4 text-gray-600">
                {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            {/* Agent Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex items-center mb-4">
                {property.agent.photo ? (
                  <img 
                    src={property.agent.photo} 
                    alt={property.agent.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={24} className="text-gray-400" />
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="font-semibold">{property.agent.name}</h3>
                  <p className="text-sm text-gray-600">Property Agent</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <Phone size={16} className="mr-2" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail size={16} className="mr-2" />
                  <span>{property.agent.email}</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Interested in this property?</h3>
              
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <Check size={24} className="text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-800 mb-1">Thank you for your interest!</h4>
                  <p className="text-green-700 text-sm">
                    We have received your inquiry and will contact you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                        required
                      ></textarea>
                    </div>
                    
                    <Button type="submit" fullWidth>
                      Send Message
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;