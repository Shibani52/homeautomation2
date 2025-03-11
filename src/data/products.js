export const products = [
  // Smart Lighting Category
  {
    id: 'sl1',
    name: 'Smart LED Bulb',
    category: 'smart-lighting',
    price: 2249,
    images: [
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Color-changing smart LED bulb with voice control compatibility. Features 16 million colors, scheduling, and group control.',
    features: [
      'Voice control compatible',
      '16 million colors',
      'Scheduling functionality',
      'Group control',
      '2-year warranty'
    ],
    specifications: {
      'Wattage': '9W',
      'Lumens': '800lm',
      'Color Temperature': '2700K-6500K',
      'Lifespan': '25,000 hours',
      'Connectivity': 'Wi-Fi 2.4GHz',
      'Voice Assistant': 'Alexa, Google Assistant',
      'Input Voltage': 'AC 220-240V',
      'Base Type': 'E27',
      'Dimensions': '60mm x 120mm'
    },
    reviews: [
      {
        author: 'Rahul M.',
        rating: 5,
        comment: 'Amazing smart bulb! The colors are vibrant and the app control is very intuitive. Highly recommend!'
      },
      {
        author: 'Priya S.',
        rating: 4,
        comment: 'Good product, works well with Alexa. The only minor issue is that sometimes it takes a few seconds to respond to commands.'
      },
      {
        author: 'Amit K.',
        rating: 5,
        comment: 'Perfect addition to my smart home setup. The scheduling feature is particularly useful.'
      }
    ],
    stock: 50,
    rating: 4.7,
    reviewCount: 128,
    isNewProduct: true
  },
  {
    id: 'sl2',
    name: 'Smart Light Strip',
    category: 'smart-lighting',
    price: 3749,
    images: [
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Flexible LED strip light with adhesive backing. Perfect for accent lighting and entertainment areas.',
    features: [
      'Music sync capability',
      'Flexible design',
      'Cut-to-size options',
      'Easy installation',
      'Voice control'
    ],
    specifications: {
      'Length': '5 meters',
      'LED Quantity': '300 LEDs',
      'Power Supply': 'DC 12V',
      'Wattage': '24W',
      'Color': 'RGB + Warm White',
      'Connectivity': 'Wi-Fi 2.4GHz',
      'Waterproof Rating': 'IP65',
      'Controller Type': 'Smart Hub Required',
      'Cutting Interval': 'Every 10cm'
    },
    reviews: [
      {
        author: 'Sneha R.',
        rating: 5,
        comment: 'Perfect for my TV backlight setup! The music sync feature is amazing during parties.'
      },
      {
        author: 'Karthik V.',
        rating: 4,
        comment: 'Good quality strip lights. Installation was easy but the adhesive could be stronger.'
      },
      {
        author: 'Deepa M.',
        rating: 4,
        comment: 'Love the colors and effects. The app has some occasional connectivity issues though.'
      }
    ],
    stock: 30,
    rating: 4.5,
    reviewCount: 95,
    onSale: true,
    originalPrice: 4499,
    isNewProduct: true
  },
  {
    id: 'sl3',
    name: 'Smart Ceiling Light',
    category: 'smart-lighting',
    price: 6749,
    images: [
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Modern smart ceiling light with built-in motion sensor and adjustable white temperature.',
    features: [
      'Motion detection',
      'Adjustable white temperature',
      'Dimming capability',
      'Schedule setting',
      'Remote control'
    ],
    specifications: {
      'Wattage': '36W',
      'Lumens': '2800lm',
      'Color Temperature': '2700K-6500K',
      'Detection Range': 'Up to 5 meters',
      'Detection Angle': '120 degrees',
      'Mounting Type': 'Surface Mount',
      'Input Voltage': 'AC 220-240V',
      'Dimensions': '450mm x 450mm',
      'Material': 'Aluminum + Acrylic'
    },
    reviews: [
      {
        author: 'Vikram S.',
        rating: 4,
        comment: 'Great ceiling light with good motion detection. The white temperature adjustment is perfect for different times of day.'
      },
      {
        author: 'Anita P.',
        rating: 5,
        comment: 'Excellent build quality and the smart features work flawlessly. Very happy with the purchase!'
      },
      {
        author: 'Rajesh K.',
        rating: 4,
        comment: 'Good light output and the motion sensor is reliable. Installation was a bit tricky though.'
      }
    ],
    stock: 25,
    rating: 4.3,
    reviewCount: 72,
    isNewProduct: true
  },

  // Security Systems Category
  {
    id: 'ss1',
    name: 'Smart Security Camera',
    category: 'security',
    price: 9749,
    images: [
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: '1080p HD security camera with night vision and two-way audio. Features motion detection and cloud storage.',
    features: [
      '1080p HD video',
      'Night vision',
      'Two-way audio',
      'Motion detection',
      'Cloud storage'
    ],
    specifications: {
      'Resolution': '1080p Full HD',
      'Field of View': '130 degrees',
      'Night Vision Range': 'Up to 10 meters',
      'Storage': 'Cloud + Local SD Card (up to 128GB)',
      'Audio': 'Two-way with noise cancellation',
      'Connectivity': 'Wi-Fi 2.4GHz',
      'Power Source': 'DC 5V/2A',
      'Weather Resistance': 'IP65',
      'Motion Detection': 'AI-powered with person detection'
    },
    reviews: [
      {
        author: 'Arjun M.',
        rating: 5,
        comment: 'Excellent camera with crystal clear night vision. The AI detection works great and reduces false alerts.'
      },
      {
        author: 'Meera S.',
        rating: 4,
        comment: 'Very good image quality and the two-way audio is clear. Cloud storage could be more generous though.'
      },
      {
        author: 'Suresh P.',
        rating: 5,
        comment: 'Perfect for home security. Easy to set up and the app is user-friendly. Highly recommended!'
      }
    ],
    stock: 40,
    rating: 4.6,
    reviewCount: 156,
    isNewProduct: true
  },
  {
    id: 'ss2',
    name: 'Smart Door Lock',
    category: 'security',
    price: 14999,
    images: [
      'https://images.unsplash.com/photo-1595750223056-1dce17c9d309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1595750223056-1dce17c9d309?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Keyless entry smart lock with fingerprint scanner and mobile app control.',
    features: [
      'Fingerprint scanner',
      'Mobile app control',
      'Guest access',
      'Activity log',
      'Battery backup'
    ],
    stock: 20,
    rating: 4.8,
    reviewCount: 89,
    modelUrl: '/models/smart-lock.glb',
    has3DModel: true,
    isNewProduct: true
  },
  {
    id: 'ss3',
    name: 'Video Doorbell',
    category: 'security',
    price: 11249,
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'HD video doorbell with motion detection and real-time notifications.',
    features: [
      'HD video',
      'Motion alerts',
      'Two-way audio',
      'Night vision',
      'Weather-resistant'
    ],
    stock: 35,
    rating: 4.4,
    reviewCount: 112,
    onSale: true,
    originalPrice: 13499,
    isNewProduct: true
  },

  // Climate Control Category
  {
    id: 'cc1',
    name: 'Smart Thermostat',
    category: 'climate',
    price: 13499,
    images: [
      'https://images.unsplash.com/photo-1567318943997-c0dce6eeea60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1567318943997-c0dce6eeea60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Learning thermostat that adapts to your schedule and preferences for optimal comfort and energy savings.',
    features: [
      'Learning capability',
      'Energy savings',
      'Remote control',
      'Usage reports',
      'Multi-zone support'
    ],
    stock: 45,
    rating: 4.9,
    reviewCount: 203,
    isNewProduct: true
  },
  {
    id: 'cc2',
    name: 'Smart Air Purifier',
    category: 'climate',
    price: 18749,
    images: [
      'https://images.unsplash.com/photo-1585771273093-e4e11f2ad7f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1585771273093-e4e11f2ad7f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'HEPA air purifier with air quality monitoring and automatic mode.',
    features: [
      'HEPA filtration',
      'Air quality monitor',
      'Auto mode',
      'Quiet operation',
      'Filter replacement indicator'
    ],
    stock: 15,
    rating: 4.7,
    reviewCount: 78,
    isNewProduct: true
  },
  {
    id: 'cc3',
    name: 'Smart Humidifier',
    category: 'climate',
    price: 6749,
    images: [
      'https://images.unsplash.com/photo-1548611716-3000815a5803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1563461661004-ba69ba32d2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1548611716-3000815a5803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Smart humidifier with automatic humidity control and mobile app monitoring.',
    features: [
      'Auto humidity control',
      'Mobile monitoring',
      'Large capacity',
      'Quiet operation',
      'Empty tank alert'
    ],
    stock: 30,
    rating: 4.5,
    reviewCount: 64,
    onSale: true,
    originalPrice: 8249,
    isNewProduct: true
  }
]; 