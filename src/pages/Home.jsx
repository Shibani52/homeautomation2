import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowForward, Lightbulb, Security, Thermostat, Speed, TouchApp, PhoneAndroid } from '@mui/icons-material';
import { products } from '../data/products';

// Get one featured product from each category
const featuredProducts = [
  products.find(p => p.category === 'smart-lighting' && p.id === 'sl1'), // Smart LED Bulb
  products.find(p => p.category === 'security' && p.id === 'ss1'), // Smart Security Camera
  products.find(p => p.category === 'climate' && p.id === 'cc1'), // Smart Thermostat
];

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
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-dark text-white min-h-[600px] md:min-h-[650px] flex items-center w-full transition-opacity duration-1000 ${animateHero ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl relative stagger-animation">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight animate-slide-left hover:scale-105 transition-transform cursor-pointer">
              Transform Your Home 
              <span className="block mt-2 text-primary-light">with Smart Technology</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed max-w-xl animate-slide-left">
              Discover our range of cutting-edge smart devices for lighting, security, and climate control.
              Make your home more efficient, secure, and comfortable.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <Link
                to="/catalog"
                className="group bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-lg font-medium flex items-center transition-all hover:-translate-y-1 hover:shadow-lg relative overflow-hidden button-hover"
              >
                <span className="relative z-10">Shop Now</span>
                <ArrowForward className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-medium transition-all hover:-translate-y-1 hover:shadow-lg flex items-center button-hover"
              >
                Learn More
                <ArrowForward className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Feature Tags */}
            <div className="mt-12 flex flex-wrap gap-4 stagger-animation">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white flex items-center animate-fade-in hover-scale">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                Smart Control
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white flex items-center animate-fade-in hover-scale">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                Energy Efficient
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white flex items-center animate-fade-in hover-scale">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                24/7 Security
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 animate-fade-in hover:scale-105 hover:text-primary transition-all duration-300 cursor-pointer">
            Why Choose Smart Home Hub?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            We provide innovative solutions that make your home smarter, safer, and more efficient.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 stagger-animation">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-2 text-center border border-gray-100 animate-scale-in card-hover"
              >
                <div className="bg-primary/10 text-primary rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6 animate-float">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors duration-300 cursor-pointer">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in hover:scale-105 hover:text-primary transition-all duration-300 cursor-pointer">
              Featured Products
            </h2>
            <p className="text-gray-600 mx-auto max-w-2xl animate-fade-in">
              Discover our most popular smart home solutions
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-2 animate-scale-in"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block"
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <div className="absolute top-4 left-4 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                        New
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <div className="flex items-center">
                        {renderRating(product.rating)}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/checkout?product=${product.id}`}
                      className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 text-center"
                    >
                      Buy Now
                    </Link>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full border border-primary text-primary hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors duration-300 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              View All Products
              <ArrowForward className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 animate-fade-in hover:scale-105 hover:text-primary transition-all duration-300 cursor-pointer">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            Read testimonials from our satisfied customers
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 stagger-animation">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-all animate-scale-in card-hover"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-semibold text-lg animate-fade-in hover:text-primary transition-colors duration-300 cursor-pointer">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderRating(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 animate-fade-in hover:scale-105 hover:text-primary transition-all duration-300 cursor-pointer">
            Browse Categories
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            Explore our range of smart home solutions by category
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 stagger-animation">
            <CategoryCard 
              title="Smart Lighting" 
              icon={<Lightbulb className="w-6 h-6" />}
              image="https://source.unsplash.com/random/?smartlighting"
              path="/products/smart-lighting"
            />
            <CategoryCard 
              title="Security Systems" 
              icon={<Security className="w-6 h-6" />}
              image="https://source.unsplash.com/random/?homesecurity"
              path="/products/security"
            />
            <CategoryCard 
              title="Climate Control" 
              icon={<Thermostat className="w-6 h-6" />}
              image="https://source.unsplash.com/random/?thermostat"
              path="/products/climate"
            />
          </div>
        </div>
      </div>
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