import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import PropertyForm from './PropertyForm';
import { useProperty } from '../../context/PropertyContext';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, updateProperty } = useProperty();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await getPropertyById(id);
        setProperty(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load property details');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, getPropertyById]);

  const handleSubmit = async (data) => {
    try {
      setSaving(true);
      setError(null);
      await updateProperty(id, data);
      navigate('/admin');
    } catch (err) {
      setError('Failed to update property. Please try again.');
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="flex items-center">
          <Loader className="animate-spin text-blue-900 mr-2" size={24} />
          <span>Loading property details...</span>
        </div>
      </div>
    );
  }

  if (error && !property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <Link to="/admin" className="text-blue-900 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/admin" className="text-blue-900 hover:text-blue-700 mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <PropertyForm 
          initialData={property}
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isLoading={saving}
        />
      </div>
    </div>
  );
};

export default EditProperty;