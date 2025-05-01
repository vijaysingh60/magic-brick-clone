export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatArea = (area) => {
  return `${area.toLocaleString()} sq ft`;
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const getPropertyTypeLabel = (type) => {
  const typeMap = {
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    commercial: 'Commercial',
    land: 'Land',
  };
  
  return typeMap[type] || type;
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};