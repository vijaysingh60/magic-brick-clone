import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['apartment', 'house', 'villa', 'commercial', 'land']
  },
  price: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  location: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  description: {
    type: String,
    required: true
  },
  features: [String],
  images: [String],
  postedDate: {
    type: Date,
    default: Date.now
  },
  agent: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    photo: String
  },
  available: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;