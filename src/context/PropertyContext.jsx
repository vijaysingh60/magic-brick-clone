import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.API_URL

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoriteProperties, setFavoriteProperties] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteProperties');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteProperties', JSON.stringify(favoriteProperties));
  }, [favoriteProperties]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/properties`);
      setProperties(data);
      applyFilters(data, filters);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch properties');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const applyFilters = (propertiesList, currentFilters) => {
    if (!Object.keys(currentFilters).length) {
      setFilteredProperties(propertiesList);
      return;
    }

    const filtered = propertiesList.filter((property) => {
      // Filter by type
      if (currentFilters.type && currentFilters.type.length > 0 && !currentFilters.type.includes(property.type)) {
        return false;
      }
      
      // Filter by price range
      if (currentFilters.priceMin && property.price < currentFilters.priceMin) {
        return false;
      }
      if (currentFilters.priceMax && property.price > currentFilters.priceMax) {
        return false;
      }
      
      // Filter by bedrooms
      if (currentFilters.bedrooms && property.bedrooms < currentFilters.bedrooms) {
        return false;
      }
      
      // Filter by bathrooms
      if (currentFilters.bathrooms && property.bathrooms < currentFilters.bathrooms) {
        return false;
      }
      
      // Filter by area range
      if (currentFilters.areaMin && property.area < currentFilters.areaMin) {
        return false;
      }
      if (currentFilters.areaMax && property.area > currentFilters.areaMax) {
        return false;
      }
      
      // Filter by location (city or state)
      if (currentFilters.location) {
        const locationLower = currentFilters.location.toLowerCase();
        if (!property.location.city.toLowerCase().includes(locationLower) && 
            !property.location.state.toLowerCase().includes(locationLower)) {
          return false;
        }
      }
      
      return true;
    });

    setFilteredProperties(filtered);
  };

  useEffect(() => {
    applyFilters(properties, filters);
  }, [filters, properties]);

  const addProperty = async (property) => {
    try {
      const { data } = await axios.post(`${API_URL}/properties`, property);
      setProperties([...properties, data]);
      return data;
    } catch (err) {
      setError('Failed to add property');
      console.error(err);
      throw err;
    }
  };

  const updateProperty = async (id, updatedProperty) => {
    try {
      const { data } = await axios.put(`${API_URL}/properties/${id}`, updatedProperty);
      setProperties(
        properties.map((property) =>
          property._id === id ? data : property
        )
      );
      return data;
    } catch (err) {
      setError('Failed to update property');
      console.error(err);
      throw err;
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`${API_URL}/properties/${id}`);
      setProperties(properties.filter((property) => property._id !== id));
      // Also remove from favorites if it exists
      if (favoriteProperties.includes(id)) {
        toggleFavorite(id);
      }
    } catch (err) {
      setError('Failed to delete property');
      console.error(err);
      throw err;
    }
  };

  const getPropertyById = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/properties/${id}`);
      return data;
    } catch (err) {
      setError('Failed to fetch property details');
      console.error(err);
      throw err;
    }
  };

  const toggleFavorite = (id) => {
    if (favoriteProperties.includes(id)) {
      setFavoriteProperties(favoriteProperties.filter(propId => propId !== id));
    } else {
      setFavoriteProperties([...favoriteProperties, id]);
    }
  };

  const refreshProperties = () => {
    fetchProperties();
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        filteredProperties,
        filters,
        setFilters,
        addProperty,
        updateProperty,
        deleteProperty,
        getPropertyById,
        favoriteProperties,
        toggleFavorite,
        loading,
        error,
        refreshProperties
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};