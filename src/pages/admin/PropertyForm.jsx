import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { propertyTypes } from '../../types/property';

const PropertyForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    type: 'apartment',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      coordinates: {
        lat: '',
        lng: ''
      }
    },
    description: '',
    features: [''],
    images: [''],
    agent: {
      name: '',
      phone: '',
      email: '',
      photo: ''
    },
    available: true,
    featured: false
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else if (name.includes('coordinates.')) {
      const field = name.split('coordinates.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          coordinates: {
            ...formData.location.coordinates,
            [field]: value
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }

    if (error) setError('');
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.type || !formData.price || !formData.area) {
      setError('Please fill in all required fields');
      return;
    }
    
    // Remove empty features and images
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      images: formData.images.filter(i => i.trim() !== '')
    };
    
    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 flex items-start">
          <AlertCircle className="text-red-600 mt-0.5 mr-3" size={18} />
          <div>{error}</div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Property Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type <span className="text-red-600">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq ft) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
            
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              ></textarea>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 focus:ring-blue-800 border-gray-300 rounded"
                />
                <label htmlFor="available" className="text-sm font-medium text-gray-700">
                  Available for Sale/Rent
                </label>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-900 focus:ring-blue-800 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Property
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Location Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="location.address"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="location.city"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location.state" className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="location.state"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location.zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="location.zipCode"
                name="location.zipCode"
                value={formData.location.zipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="coordinates.lat" className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="text"
                id="coordinates.lat"
                name="coordinates.lat"
                value={formData.location.coordinates?.lat}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
            
            <div>
              <label htmlFor="coordinates.lng" className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="text"
                id="coordinates.lng"
                name="coordinates.lng"
                value={formData.location.coordinates?.lng}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Property Features</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addFeature}
              iconLeft={<Plus size={16} />}
            >
              Add Feature
            </Button>
          </div>
          
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Enter a feature"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Images */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Property Images</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addImage}
              iconLeft={<Plus size={16} />}
            >
              Add Image URL
            </Button>
          </div>
          
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Enter image URL"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Agent Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="agent.name" className="block text-sm font-medium text-gray-700 mb-1">
                Agent Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="agent.name"
                name="agent.name"
                value={formData.agent.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="agent.phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="agent.phone"
                name="agent.phone"
                value={formData.agent.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="agent.email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="agent.email"
                name="agent.email"
                value={formData.agent.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
                required
              />
            </div>
            
            <div>
              <label htmlFor="agent.photo" className="block text-sm font-medium text-gray-700 mb-1">
                Agent Photo URL
              </label>
              <input
                type="text"
                id="agent.photo"
                name="agent.photo"
                value={formData.agent.photo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-900 focus:border-blue-900"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Property' : 'Add Property'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;