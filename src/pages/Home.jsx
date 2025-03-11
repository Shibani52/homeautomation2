import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowForward, Lightbulb, Security, Thermostat, Speed, TouchApp, PhoneAndroid } from '@mui/icons-material';
import { products } from '../data/products';
import OfferSlider from '../components/OfferSlider';
import ProductOfferSlider from '../components/ProductOfferSlider';

// Get one featured product from each category
const featuredProducts = [
  products.find(p => p.category === 'smart-lighting' && p.id === 'sl1'), // Smart LED Bulb
  products.find(p => p.category === 'security' && p.id === 'ss1'), // Smart Security Camera
  products.find(p => p.category === 'climate' && p.id === 'cc1'), // Smart Thermostat
];

// Get products by category for sliders
const lightingProducts = products
  .filter(p => p.category === 'smart-lighting')
  .map(p => ({
    ...p,
    rating: p.reviews ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length : 4.5,
    reviewCount: p.reviews ? p.reviews.length : Math.floor(Math.random() * 100) + 10,
    discount: p.onSale ? `${Math.floor((1 - (p.price / p.originalPrice)) * 100)}% OFF` : null
  }));

const securityProducts = products
  .filter(p => p.category === 'security')
  .map(p => ({
    ...p,
    rating: p.reviews ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length : 4.5,
    reviewCount: p.reviews ? p.reviews.length : Math.floor(Math.random() * 100) + 10,
    discount: p.onSale ? `${Math.floor((1 - (p.price / p.originalPrice)) * 100)}% OFF` : null
  }));

const climateProducts = products
  .filter(p => p.category === 'climate')
  .map(p => ({
    ...p,
    rating: p.reviews ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length : 4.5,
    reviewCount: p.reviews ? p.reviews.length : Math.floor(Math.random() * 100) + 10,
    discount: p.onSale ? `${Math.floor((1 - (p.price / p.originalPrice)) * 100)}% OFF` : null
  }));

// Get top deals - products with highest discount
const topDeals = products
  .filter(p => p.onSale && p.originalPrice)
  .sort((a, b) => (1 - (a.price / a.originalPrice)) - (1 - (b.price / b.originalPrice)))
  .slice(0, 10)
  .map(p => ({
    ...p,
    rating: p.reviews ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length : 4.5,
    reviewCount: p.reviews ? p.reviews.length : Math.floor(Math.random() * 100) + 10,
    discount: `${Math.floor((1 - (p.price / p.originalPrice)) * 100)}% OFF`
  }));

// Testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Smart Home Enthusiast',
    rating: 5,
    comment: 'The smart lighting system has completely transformed my home. The app is intuitive and the integration with other devices is seamless.',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Tech Blogger',
    rating: 4.5,
    comment: 'I\'ve tested dozens of security systems, and this one stands out for its reliability and ease of installation. Highly recommended!',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Interior Designer',
    rating: 5,
    comment: 'My clients love the climate control solutions. They\'re not only functional but also blend seamlessly with any interior design style.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

// Benefits data
const benefits = [
  {
    icon: <Speed className="w-6 h-6" />,
    title: 'Easy Setup',
    description: 'Get your smart home up and running in minutes with our simple setup process.',
  },
  {
    icon: <TouchApp className="w-6 h-6" />,
    title: 'Intuitive Control',
    description: 'Control all your devices with a simple, user-friendly interface.',
  },
  {
    icon: <PhoneAndroid className="w-6 h-6" />,
    title: 'Mobile Access',
    description: 'Manage your home from anywhere using our mobile app.',
  },
];

function Home() {
  const [animateHero, setAnimateHero] = useState(false);
  
  useEffect(() => {
    setAnimateHero(true);
  }, []);

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gray-50">
      {/* Main Banner Slider */}
      <section className="w-full">
        <OfferSlider />
      </section>

      {/* Top Deals Slider */}
      <section className="container mx-auto px-4 mt-8">
        <ProductOfferSlider 
          title="Top Deals" 
          products={topDeals} 
          bgColor="#FFF8E1" 
          titleColor="#FF9800"
        />
      </section>

      {/* Transform Your Home Section */}
      <section className="bg-gray-900 text-white py-16 mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">
              Transform Your Home
              <span className="block text-green-400">with Smart Technology</span>
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Discover our range of cutting-edge smart devices for
              lighting, security, and climate control. Make your home
              more efficient, secure, and comfortable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
              >
                Shop Now <ArrowForward className="ml-2" />
              </Link>
              <Link
                to="/about"
                className="bg-transparent hover:bg-white/10 text-white border border-white font-bold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
              >
                Learn More <ArrowForward className="ml-2" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 mt-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Smart Control</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Energy Efficient</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">24/7 Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Lighting Slider */}
      <section className="container mx-auto px-4 mt-12">
        <ProductOfferSlider 
          title="Smart Lighting" 
          products={lightingProducts} 
          bgColor="#E8F5E9" 
          titleColor="#2E7D32"
        />
      </section>

      {/* Security Products Slider */}
      <section className="container mx-auto px-4 mt-12">
        <ProductOfferSlider 
          title="Security Systems" 
          products={securityProducts} 
          bgColor="#E3F2FD" 
          titleColor="#1565C0"
        />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 mt-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Smart Home Hub?</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            We provide innovative solutions that make your home smarter, safer, and more efficient.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-green-600">{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate Control Slider */}
      <section className="container mx-auto px-4 mt-12">
        <ProductOfferSlider 
          title="Climate Control" 
          products={climateProducts} 
          bgColor="#F3E5F5" 
          titleColor="#6A1B9A"
        />
      </section>

      {/* Featured Products Section */}
      <section className="py-16 mt-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Products</h2>
          <p className="text-center text-gray-600 mb-12">Discover our most popular smart home solutions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[450px] flex flex-col"
              >
                <div className="relative h-64">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain bg-white p-4"
                  />
                  {product.isNewProduct && (
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded shadow-sm">NEW</span>
                  )}
                  {product.onSale && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded shadow-sm min-w-[60px] text-center">SALE</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl mb-2 line-clamp-2 h-14">{product.name}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {renderRating(product.rating || 4.5)}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                      ({product.reviews ? product.reviews.length : Math.floor(Math.random() * 100) + 10})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-center py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </Link>
                    <button
                      className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {renderRating(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Home?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Start your smart home journey today with our cutting-edge products and solutions.
          </p>
          <Link
            to="/catalog"
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ title, icon, image, path }) {
  return (
    <Link 
      to={path}
      className="group block relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-64 animate-scale-in"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-gray-900 transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7,
        }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white z-10">
        <div className="bg-primary/80 backdrop-blur-sm rounded-full p-3 mb-4 animate-fade-in">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2 text-center text-shadow animate-fade-in group-hover:scale-105 transition-transform duration-300">
          {title}
        </h3>
        <span className="inline-flex items-center text-sm font-medium animate-fade-in">
          View Products
          <ArrowForward className="ml-1 w-4 h-4" />
        </span>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/40 transition-colors" />
    </Link>
  );
}

export default Home; 