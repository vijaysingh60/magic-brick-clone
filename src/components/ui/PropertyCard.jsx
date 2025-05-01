import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Move } from 'lucide-react';
import { formatPrice, formatArea, truncateText } from '../../utils/formatters';
import { useProperty } from '../../context/PropertyContext';

const PropertyCard = ({ property }) => {
  const { favoriteProperties, toggleFavorite } = useProperty();
  const isFavorite = favoriteProperties.includes(property._id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link to={`/property/${property._id}`}>
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(property._id);
          }}
          className="absolute top-4 right-4 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 transition-colors duration-200"
        >
          <Heart 
            size={18} 
            className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
        {property.featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mb-1 hover:text-blue-800 transition-colors duration-200">
            <Link to={`/property/${property._id}`}>
              {truncateText(property.title, 35)}
            </Link>
          </h3>
          <span className="font-bold text-blue-900">{formatPrice(property.price)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{`${property.location.city}, ${property.location.state}`}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {truncateText(property.description, 100)}
        </p>
        
        <div className="flex justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <Move size={16} className="mr-1" />
            <span>{formatArea(property.area)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;