import { Property } from '../types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Apartment with Sea View',
    type: 'apartment',
    price: 1850000,
    area: 1200,
    bedrooms: 3,
    bathrooms: 2,
    location: {
      address: '123 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      }
    },
    description: 'Beautiful luxury apartment with breathtaking sea views. Features include modern kitchen, spacious living areas, and access to building amenities including pool, gym, and 24-hour security.',
    features: ['Sea View', 'Swimming Pool', 'Fitness Center', 'Private Parking', 'Security', 'Balcony'],
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    ],
    postedDate: new Date('2023-05-15'),
    agent: {
      name: 'Sarah Johnson',
      phone: '(305) 555-1234',
      email: 'sarah.j@realestate.com',
      photo: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg'
    },
    available: true,
    featured: true
  },
  {
    id: '2',
    title: 'Modern Townhouse in Downtown',
    type: 'house',
    price: 750000,
    area: 1800,
    bedrooms: 4,
    bathrooms: 3,
    location: {
      address: '456 Urban Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      coordinates: {
        lat: 41.8781,
        lng: -87.6298
      }
    },
    description: 'Newly renovated townhouse in the heart of downtown. Walking distance to restaurants, shops, and public transportation. Features hardwood floors, gourmet kitchen, and rooftop terrace.',
    features: ['Hardwood Floors', 'Gourmet Kitchen', 'Rooftop Terrace', 'Smart Home', 'Garage'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg'
    ],
    postedDate: new Date('2023-06-02'),
    agent: {
      name: 'Michael Brown',
      phone: '(312) 555-6789',
      email: 'michael.b@realestate.com',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    available: true
  },
  {
    id: '3',
    title: 'Spacious Family Villa',
    type: 'villa',
    price: 2500000,
    area: 3500,
    bedrooms: 5,
    bathrooms: 4,
    location: {
      address: '789 Hillside Road',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      coordinates: {
        lat: 34.0522,
        lng: -118.2437
      }
    },
    description: 'Elegant villa with stunning views and luxurious finishes. Features include a gourmet kitchen, home theater, wine cellar, swimming pool, and landscaped gardens.',
    features: ['Swimming Pool', 'Home Theater', 'Wine Cellar', 'Garden', 'Panoramic Views', 'Guest House'],
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg'
    ],
    postedDate: new Date('2023-04-28'),
    agent: {
      name: 'Jennifer Smith',
      phone: '(213) 555-4321',
      email: 'jennifer.s@realestate.com',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    available: true,
    featured: true
  },
  {
    id: '4',
    title: 'Commercial Space in Business District',
    type: 'commercial',
    price: 1200000,
    area: 2200,
    bedrooms: 0,
    bathrooms: 2,
    location: {
      address: '101 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10007',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    description: 'Prime commercial space in the heart of the financial district. Open floor plan with modern finishes, ideal for offices or retail. Excellent foot traffic and visibility.',
    features: ['High Ceilings', 'Floor-to-Ceiling Windows', 'HVAC System', 'Security System', 'Freight Elevator'],
    images: [
      'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg',
      'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg',
      'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg'
    ],
    postedDate: new Date('2023-05-10'),
    agent: {
      name: 'Robert Wilson',
      phone: '(212) 555-8765',
      email: 'robert.w@realestate.com',
      photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    available: true
  },
  {
    id: '5',
    title: 'Beachfront Land for Development',
    type: 'land',
    price: 3200000,
    area: 10000,
    bedrooms: 0,
    bathrooms: 0,
    location: {
      address: '555 Coastal Highway',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      coordinates: {
        lat: 34.0259,
        lng: -118.7798
      }
    },
    description: 'Rare opportunity to own beachfront land in Malibu. Perfect for custom home development with approved plans. Direct beach access with stunning ocean views.',
    features: ['Beachfront', 'Development Opportunity', 'Approved Plans', 'Utilities Available', 'Private Access'],
    images: [
      'https://images.pexels.com/photos/355288/pexels-photo-355288.jpeg',
      'https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg',
      'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg'
    ],
    postedDate: new Date('2023-06-15'),
    agent: {
      name: 'David Thompson',
      phone: '(310) 555-2468',
      email: 'david.t@realestate.com',
      photo: 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg'
    },
    available: true
  },
  {
    id: '6',
    title: 'Cozy Studio Apartment',
    type: 'apartment',
    price: 320000,
    area: 550,
    bedrooms: 0,
    bathrooms: 1,
    location: {
      address: '202 Downtown Blvd',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      coordinates: {
        lat: 30.2672,
        lng: -97.7431
      }
    },
    description: 'Charming studio apartment in a vibrant neighborhood. Perfect for young professionals or investors. Features include modern finishes, large windows, and building amenities.',
    features: ['Modern Kitchen', 'Large Windows', 'Building Gym', 'Rooftop Lounge', 'Pet-Friendly'],
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
      'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg'
    ],
    postedDate: new Date('2023-05-22'),
    agent: {
      name: 'Emily Carter',
      phone: '(512) 555-1357',
      email: 'emily.c@realestate.com',
      photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
    },
    available: true
  }
];