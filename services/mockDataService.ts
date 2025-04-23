import { Product } from '@/contexts/CartContext';

// Simulated database for feed
export const getMockFeed = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: '1',
      user: {
        id: 'farmer1',
        name: 'Green Valley Farms',
        avatar: 'https://images.pexels.com/photos/5461541/pexels-photo-5461541.jpeg',
        location: 'Nashik, Maharashtra',
      },
      content: 'Fresh harvest of organic tomatoes! 🍅 Grown with love and care, these juicy tomatoes are perfect for your salads and sauces.',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      timestamp: '2023-09-14T10:30:00.000Z',
      likes: 142,
      comments: 23,
      shares: 12,
      product: {
        id: 'p1',
        name: 'Organic Tomatoes',
        price: 2.99,
        description: 'Fresh organic tomatoes grown without pesticides',
        image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
        quantity: 100,
        unit: 'kg',
        farmerId: 'farmer1',
        farmerName: 'Green Valley Farms',
        category: 'Vegetables',
      },
    },
    {
      id: '2',
      user: {
        id: 'farmer2',
        name: 'Sunshine Orchards',
        avatar: 'https://images.pexels.com/photos/1441101/pexels-photo-1441101.jpeg',
        location: 'Ratnagiri, Maharashtra',
      },
      content: 'Alphonso mangoes are back in season! 🥭 Pre-book now to get the finest quality directly from our orchard to your home.',
      image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg',
      timestamp: '2023-09-13T14:45:00.000Z',
      likes: 256,
      comments: 42,
      shares: 31,
      product: {
        id: 'p2',
        name: 'Alphonso Mangoes',
        price: 8.99,
        description: 'Premium quality Alphonso mangoes from Ratnagiri',
        image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg',
        quantity: 50,
        unit: 'dozen',
        farmerId: 'farmer2',
        farmerName: 'Sunshine Orchards',
        category: 'Fruits',
      },
    },
    {
      id: '3',
      user: {
        id: 'farmer3',
        name: 'Organic Hill Farms',
        avatar: 'https://images.pexels.com/photos/4604336/pexels-photo-4604336.jpeg',
        location: 'Ooty, Tamil Nadu',
      },
      content: 'Our farm-fresh carrots are harvested this morning! 🥕 Rich in vitamins and perfect for your healthy recipes. Limited stock available!',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
      timestamp: '2023-09-12T09:15:00.000Z',
      likes: 98,
      comments: 15,
      shares: 5,
      product: {
        id: 'p3',
        name: 'Fresh Carrots',
        price: 1.49,
        description: 'Fresh carrots harvested from hill farms of Ooty',
        image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
        quantity: 200,
        unit: 'kg',
        farmerId: 'farmer3',
        farmerName: 'Organic Hill Farms',
        category: 'Vegetables',
      },
    },
  ];
};

// Simulated database for products
export const getMockProducts = async (searchQuery?: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const products = [
    {
      id: 'p1',
      name: 'Organic Tomatoes',
      price: 2.99,
      description: 'Fresh organic tomatoes grown without pesticides',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      quantity: 100,
      unit: 'kg',
      farmerId: 'farmer1',
      farmerName: 'Green Valley Farms',
      category: 'Vegetables',
    },
    {
      id: 'p2',
      name: 'Alphonso Mangoes',
      price: 8.99,
      description: 'Premium quality Alphonso mangoes from Ratnagiri',
      image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg',
      quantity: 50,
      unit: 'dozen',
      farmerId: 'farmer2',
      farmerName: 'Sunshine Orchards',
      category: 'Fruits',
    },
    {
      id: 'p3',
      name: 'Fresh Carrots',
      price: 1.49,
      description: 'Fresh carrots harvested from hill farms of Ooty',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
      quantity: 200,
      unit: 'kg',
      farmerId: 'farmer3',
      farmerName: 'Organic Hill Farms',
      category: 'Vegetables',
    },
    {
      id: 'p4',
      name: 'Fresh Spinach',
      price: 1.99,
      description: 'Nutritious spinach leaves, perfect for salads and smoothies',
      image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg',
      quantity: 75,
      unit: 'kg',
      farmerId: 'farmer1',
      farmerName: 'Green Valley Farms',
      category: 'Vegetables',
    },
    {
      id: 'p5',
      name: 'Free-Range Eggs',
      price: 3.49,
      description: 'Fresh eggs from free-range chickens',
      image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
      quantity: 100,
      unit: 'dozen',
      farmerId: 'farmer4',
      farmerName: 'Happy Hen Farm',
      category: 'Dairy & Eggs',
    },
    {
      id: 'p6',
      name: 'Organic Honey',
      price: 6.99,
      description: 'Pure wildflower honey, raw and unfiltered',
      image: 'https://images.pexels.com/photos/1120574/pexels-photo-1120574.jpeg',
      quantity: 30,
      unit: 'bottle',
      farmerId: 'farmer5',
      farmerName: 'Bee Haven Apiary',
      category: 'Other',
    },
  ];

  if (searchQuery) {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return products;
};

// Simulated database for farmers
export const getMockFarmers = async (searchQuery?: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const farmers = [
    {
      id: 'farmer1',
      name: 'Green Valley Farms',
      avatar: 'https://images.pexels.com/photos/5461541/pexels-photo-5461541.jpeg',
      location: 'Nashik, Maharashtra',
      bio: 'Growing organic vegetables since 1995. Specializing in tomatoes, leafy greens, and peppers.',
      rating: 4.8,
      followers: 345,
      products: 24,
    },
    {
      id: 'farmer2',
      name: 'Sunshine Orchards',
      avatar: 'https://images.pexels.com/photos/1441101/pexels-photo-1441101.jpeg',
      location: 'Ratnagiri, Maharashtra',
      bio: 'Family-owned orchard specializing in Alphonso mangoes, cashews, and coconuts.',
      rating: 4.9,
      followers: 512,
      products: 12,
    },
    {
      id: 'farmer3',
      name: 'Organic Hill Farms',
      avatar: 'https://images.pexels.com/photos/4604336/pexels-photo-4604336.jpeg',
      location: 'Ooty, Tamil Nadu',
      bio: 'Hill station farm growing carrots, potatoes, and exotic vegetables in cool climate.',
      rating: 4.7,
      followers: 278,
      products: 18,
    },
    {
      id: 'farmer4',
      name: 'Happy Hen Farm',
      avatar: 'https://images.pexels.com/photos/2310642/pexels-photo-2310642.jpeg',
      location: 'Pune, Maharashtra',
      bio: 'Free-range poultry farm providing eggs and chicken with humane practices.',
      rating: 4.6,
      followers: 203,
      products: 8,
    },
    {
      id: 'farmer5',
      name: 'Bee Haven Apiary',
      avatar: 'https://images.pexels.com/photos/442606/pexels-photo-442606.jpeg',
      location: 'Coorg, Karnataka',
      bio: 'Sustainable beekeeping producing various types of honey and beeswax products.',
      rating: 4.9,
      followers: 187,
      products: 10,
    },
    {
      id: 'farmer6',
      name: 'Himalayan Herb Garden',
      avatar: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
      location: 'Dehradun, Uttarakhand',
      bio: 'Growing medicinal herbs and spices using traditional farming methods.',
      rating: 4.7,
      followers: 231,
      products: 15,
    },
  ];

  if (searchQuery) {
    return farmers.filter(
      (farmer) =>
        farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return farmers;
};

// Simulated database for events
export const getMockEvents = () => {
  return [
    {
      id: 'evt1',
      title: 'Harvest Festival 2023',
      description: 'Join us for a celebration of the harvest season with activities, food tasting, and farm tours.',
      date: '2023-10-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Green Valley Farms, Nashik',
      image: 'https://images.pexels.com/photos/5049348/pexels-photo-5049348.jpeg',
      organizer: {
        id: 'farmer1',
        name: 'Green Valley Farms',
        avatar: 'https://images.pexels.com/photos/5461541/pexels-photo-5461541.jpeg',
      },
      attendees: 87,
      isFree: true,
    },
    {
      id: 'evt2',
      title: 'Mango Picking Workshop',
      description: 'Learn how to pick the perfect mango and taste various varieties fresh from the trees.',
      date: '2023-05-20',
      time: '9:00 AM - 12:00 PM',
      location: 'Sunshine Orchards, Ratnagiri',
      image: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg',
      organizer: {
        id: 'farmer2',
        name: 'Sunshine Orchards',
        avatar: 'https://images.pexels.com/photos/1441101/pexels-photo-1441101.jpeg',
      },
      attendees: 42,
      isFree: false,
      price: 250,
    },
    {
      id: 'evt3',
      title: 'Organic Farming Workshop',
      description: 'Learn the basics of organic farming, composting, and sustainable agriculture practices.',
      date: '2023-11-05',
      time: '2:00 PM - 5:00 PM',
      location: 'Organic Hill Farms, Ooty',
      image: 'https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg',
      organizer: {
        id: 'farmer3',
        name: 'Organic Hill Farms',
        avatar: 'https://images.pexels.com/photos/4604336/pexels-photo-4604336.jpeg',
      },
      attendees: 35,
      isFree: false,
      price: 500,
    },
    {
      id: 'evt4',
      title: 'Beekeeping Demonstration',
      description: 'See how honey is harvested and learn about the importance of bees in agriculture.',
      date: '2023-09-30',
      time: '11:00 AM - 1:00 PM',
      location: 'Bee Haven Apiary, Coorg',
      image: 'https://images.pexels.com/photos/1179049/pexels-photo-1179049.jpeg',
      organizer: {
        id: 'farmer5',
        name: 'Bee Haven Apiary',
        avatar: 'https://images.pexels.com/photos/442606/pexels-photo-442606.jpeg',
      },
      attendees: 28,
      isFree: true,
    },
  ];
};

// Simulated database for farmer events
export const getMockFarmerEvents = () => {
  return [
    {
      id: 'evt1',
      title: 'Harvest Festival 2023',
      description: 'Join us for a celebration of the harvest season with activities, food tasting, and farm tours.',
      date: '2023-10-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Green Valley Farms, Nashik',
      image: 'https://images.pexels.com/photos/5049348/pexels-photo-5049348.jpeg',
      attendees: 87,
      isFree: true,
      isPublished: true,
    },
    {
      id: 'evt2',
      title: 'Farm Tour & Tasting',
      description: 'Tour of our organic farm followed by a tasting session of our fresh produce.',
      date: '2023-12-10',
      time: '9:00 AM - 12:00 PM',
      location: 'Green Valley Farms, Nashik',
      image: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg',
      attendees: 0,
      isFree: false,
      price: 150,
      isPublished: false,
    },
  ];
};

// Simulated database for crop requests
export const getMockCropRequests = () => {
  return [
    {
      id: 'req1',
      cropName: 'Organic Kale',
      description: 'Looking for organically grown kale for regular weekly delivery.',
      quantityNeeded: 50,
      unit: 'kg',
      location: 'Mumbai, Maharashtra',
      consumerCount: 35,
      popularity: 87,
      createdAt: '2023-09-10T14:30:00.000Z',
      isFulfilled: false,
    },
    {
      id: 'req2',
      cropName: 'Dragon Fruit',
      description: 'Interested in sourcing dragon fruit directly from farmers.',
      quantityNeeded: 100,
      unit: 'kg',
      location: 'Bengaluru, Karnataka',
      consumerCount: 28,
      popularity: 65,
      createdAt: '2023-09-05T09:15:00.000Z',
      isFulfilled: true,
      farmerFulfilling: 'Exotic Fruits Farm',
    },
    {
      id: 'req3',
      cropName: 'Fresh Turmeric Root',
      description: 'Need fresh turmeric root for medicinal purposes and cooking.',
      quantityNeeded: 30,
      unit: 'kg',
      location: 'Pune, Maharashtra',
      consumerCount: 42,
      popularity: 93,
      createdAt: '2023-09-12T11:45:00.000Z',
      isFulfilled: false,
    },
    {
      id: 'req4',
      cropName: 'Avocados',
      description: 'Seeking locally grown avocados, preferably organic.',
      quantityNeeded: 75,
      unit: 'kg',
      location: 'Mumbai, Maharashtra',
      consumerCount: 31,
      popularity: 79,
      createdAt: '2023-09-08T16:20:00.000Z',
      isFulfilled: false,
    },
  ];
};