import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, 
         ContactMail as ContactIcon, Close as CloseIcon, Inventory as CatalogIcon, 
         Favorite as FavoriteIcon, Person as PersonIcon, QuestionAnswer as FAQIcon } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  // Handle scroll behavior
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check if the current path matches the menu item
  const isActive = (path) => {
    return location.pathname === path || 
           (path.includes('/products/') && location.pathname.includes(path));
  };

  return (
    <>
      <header className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-3'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleDrawerToggle}
                aria-label="Open menu"
              >
                <MenuIcon className="text-gray-700" />
              </button>

              <Link 
                to="/"
                className="flex items-center"
              >
                <img 
                  src="/favicon.svg" 
                  alt="Smart Home Hub" 
                  className="w-8 h-8 mr-2"
                />
                <span className="text-primary font-bold text-xl tracking-tight">
                  Smart Home
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="/" active={isActive('/')}>
                <HomeIcon className="w-5 h-5 mr-1" />
                <span>Home</span>
              </NavLink>
              
              <NavLink to="/catalog" active={isActive('/catalog')}>
                <CatalogIcon className="w-5 h-5 mr-1" />
                <span>Catalog</span>
              </NavLink>
              
              <NavLink to="/about" active={isActive('/about')}>
                <InfoIcon className="w-5 h-5 mr-1" />
                <span>About</span>
              </NavLink>
              
              <NavLink to="/faqs" active={isActive('/faqs')}>
                <FAQIcon className="w-5 h-5 mr-1" />
                <span>FAQs</span>
              </NavLink>
              
              <NavLink to="/contact" active={isActive('/contact')}>
                <ContactIcon className="w-5 h-5 mr-1" />
                <span>Contact</span>
              </NavLink>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
                aria-label="Favorites"
                onClick={() => navigate('/favorites')}
              >
                <FavoriteIcon className="text-gray-700 hover:text-primary transition-colors" />
              </button>
              
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
                aria-label="Account"
                onClick={() => navigate('/account')}
              >
                <PersonIcon className="text-gray-700 hover:text-primary transition-colors" />
              </button>
              
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Cart"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Drawer - Fixed overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={handleDrawerToggle}
        />
      )}
      
      {/* Mobile Drawer - Content */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white">
          <Link to="/" className="flex items-center" onClick={handleDrawerToggle}>
            <img 
              src="/favicon.svg" 
              alt="Smart Home Hub" 
              className="w-8 h-8 mr-2"
            />
            <span className="text-primary font-bold text-lg">Smart Home Hub</span>
          </Link>
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={handleDrawerToggle}
          >
            <CloseIcon />
          </button>
        </div>
        
        <nav className="p-2">
          <MobileNavLink 
            to="/" 
            active={isActive('/')} 
            onClick={handleDrawerToggle}
            icon={<HomeIcon />}
          >
            Home
          </MobileNavLink>
          
          <MobileNavLink 
            to="/catalog" 
            active={isActive('/catalog')} 
            onClick={handleDrawerToggle}
            icon={<CatalogIcon />}
          >
            Catalog
          </MobileNavLink>
          
          <MobileNavLink 
            to="/about" 
            active={isActive('/about')} 
            onClick={handleDrawerToggle}
            icon={<InfoIcon />}
          >
            About
          </MobileNavLink>
          
          <MobileNavLink 
            to="/faqs" 
            active={isActive('/faqs')} 
            onClick={handleDrawerToggle}
            icon={<FAQIcon />}
          >
            FAQs
          </MobileNavLink>
          
          <MobileNavLink 
            to="/contact" 
            active={isActive('/contact')} 
            onClick={handleDrawerToggle}
            icon={<ContactIcon />}
          >
            Contact
          </MobileNavLink>
        </nav>
        
        <div className="p-4 border-t mt-2">
          <div className="flex justify-around">
            <Link to="/favorites" className="flex flex-col items-center p-2 text-gray-700 hover:text-primary" onClick={handleDrawerToggle}>
              <FavoriteIcon />
              <span className="text-sm mt-1">Favorites</span>
            </Link>
            
            <Link to="/account" className="flex flex-col items-center p-2 text-gray-700 hover:text-primary" onClick={handleDrawerToggle}>
              <PersonIcon />
              <span className="text-sm mt-1">Account</span>
            </Link>
            
            <Link to="/cart" className="flex flex-col items-center p-2 text-primary relative" onClick={handleDrawerToggle}>
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-sm mt-1">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Desktop Navigation Link Component
function NavLink({ to, active, children }) {
  return (
    <Link 
      to={to}
      className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
        active 
          ? 'text-primary bg-primary/10 hover:bg-primary/15' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ to, active, onClick, icon, children }) {
  return (
    <Link 
      to={to}
      className={`flex items-center px-4 py-3 rounded-lg mb-1 ${
        active 
          ? 'text-primary bg-primary/10 border-l-4 border-primary' 
          : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
    </Link>
  );
}

export default Navbar; 