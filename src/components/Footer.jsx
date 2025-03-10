import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  LocationOn,
  Phone,
  KeyboardArrowUp,
} from '@mui/icons-material';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="mt-auto">
      {/* Scroll to top button */}
      <div className="flex justify-center relative z-10" style={{ transform: 'translateY(50%)' }}>
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-primary text-white rounded-full shadow-md flex items-center justify-center hover:bg-primary-dark hover:shadow-lg transition-all hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <KeyboardArrowUp />
        </button>
      </div>

      {/* Newsletter section */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Stay Updated</h3>
              <p className="text-gray-600 leading-relaxed">
                Subscribe to our newsletter for the latest smart home products, tips, and exclusive offers.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 font-medium rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/favicon.svg" 
                  alt="Smart Home Hub" 
                  className="w-8 h-8 mr-2"
                />
                <h4 className="text-xl font-semibold">Smart Home Hub</h4>
              </div>
              <p className="mb-6 opacity-80 leading-relaxed">
                Making your home smarter, safer, and more efficient with cutting-edge automation solutions.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Facebook">
                  <Facebook fontSize="small" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Twitter">
                  <Twitter fontSize="small" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Instagram">
                  <Instagram fontSize="small" />
                </a>
                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="LinkedIn">
                  <LinkedIn fontSize="small" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/products/smart-lighting" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Smart Lighting
                  </Link>
                </li>
                <li>
                  <Link to="/products/security" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Security Systems
                  </Link>
                </li>
                <li>
                  <Link to="/products/climate" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Climate Control
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/policies" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Policies
                  </Link>
                </li>
                <li>
                  <Link to="/payment" className="opacity-80 hover:opacity-100 transition-opacity inline-block">
                    Payment Options
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-5">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <LocationOn className="mr-3 opacity-80 shrink-0 mt-1" fontSize="small" />
                  <span className="opacity-80">123 Smart Street, Tech City, 10001</span>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 opacity-80 shrink-0 mt-1" fontSize="small" />
                  <span className="opacity-80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start">
                  <Email className="mr-3 opacity-80 shrink-0 mt-1" fontSize="small" />
                  <span className="opacity-80">info@smarthomehub.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="bg-primary-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="opacity-80 text-sm">
                © {new Date().getFullYear()} Smart Home Hub. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link to="/policies#terms" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
              <Link to="/policies#privacy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/policies#cookies" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 