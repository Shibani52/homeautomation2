import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  NavigateNext as NavigateNextIcon,
  Star as StarIcon,
  StarHalf as StarHalfIcon,
  StarBorder as StarBorderIcon,
  KeyboardArrowDown as ChevronDownIcon,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'smart-lighting', name: 'Smart Lighting' },
  { id: 'security', name: 'Security Systems' },
  { id: 'climate', name: 'Climate Control' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

function Catalog() {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  
  // Filtered and sorted products
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Products per page
  const productsPerPage = 12;
  
  // New state for suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions when search query changes
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      const matchedProducts = products
        .filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        )
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(matchedProducts);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
  };
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by stock
    if (inStockOnly) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Filter by sale
    if (onSaleOnly) {
      result = result.filter(product => product.onSale);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        // Assuming featured products have a 'featured' property
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, sortBy, priceRange, searchQuery, inStockOnly, onSaleOnly]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handlePriceChange = (e) => {
    // This is a simplified version - in a real app, you'd need a proper range slider
    const value = e.target.value.split(',').map(Number);
    setPriceRange(value);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleFilterDrawer = (open) => {
    setFilterDrawerOpen(open);
  };
  
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Show a success message
    alert(`${product.name} added to cart!`);
  };
  
  const handleToggleFavorite = (productId) => {
    console.log(`Toggled favorite for product ${productId}`);
    // Implement favorites functionality here
  };

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={`full-${i}`} className="text-yellow-400 w-4 h-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" className="text-yellow-400 w-4 h-4" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorderIcon key={`empty-${i}`} className="text-yellow-400 w-4 h-4" />);
    }
    
    return stars;
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pt-6 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Section with Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
        {/* Breadcrumbs */}
            <div className="flex items-center text-sm mb-4">
          <Link to="/" className="text-gray-500 hover:text-primary">
            Home
          </Link>
          <NavigateNextIcon className="text-gray-400 mx-1 w-4 h-4" />
          <span className="text-gray-700 font-medium">Catalog</span>
        </div>
        
        {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Product Catalog
          </h1>
          <p className="text-gray-600">
            Browse our collection of smart home products
          </p>
        </div>
        
          {/* Search Bar */}
          <div className="relative w-full md:w-96 mt-4 md:mt-0" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {suggestions.map((product) => (
              <button 
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{product.name}</div>
                      <div className="text-xs text-gray-500">₹{product.price.toLocaleString()}</div>
                    </div>
              </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filters and Sort Controls */}
        <div className="flex items-center gap-4 mb-6">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
            
            {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={handleSortChange}
            className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            
            {/* Results Count */}
            <div className="ml-auto text-sm text-gray-500">
              Showing {filteredProducts.length} products
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filter Panel */}
          {!isMobile && (
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Categories</h3>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Product Status</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">In Stock Only</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onSaleOnly}
                        onChange={(e) => setOnSaleOnly(e.target.checked)}
                        className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700">On Sale</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Product Grid */}
          <div className="flex-1">
            {currentProducts.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <div key={product.id} className="group">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col relative">
                        {/* Favorite Button */}
                        <button
                          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm transition-colors"
                          onClick={() => handleToggleFavorite(product.id)}
                        >
                          {product.isFavorite ? (
                            <FavoriteIcon className="text-red-500 w-5 h-5" />
                          ) : (
                            <FavoriteBorderIcon className="text-gray-500 w-5 h-5" />
                          )}
                        </button>
                        
                        {/* Product Image */}
                        <Link 
                          to={`/product/${product.id}`}
                          className="block overflow-hidden"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
                          />
                        </Link>
                        
                        {/* Product Tags */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.onSale && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Sale
                            </span>
                          )}
                          {product.isNewProduct && (
                            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                              New
                            </span>
                          )}
                        </div>
                        
                        {/* Product Content */}
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="text-xs text-gray-500 uppercase mb-1">
                            {categories.find(c => c.id === product.category)?.name}
                          </div>
                          
                          <Link 
                            to={`/product/${product.id}`}
                            className="text-gray-800 font-semibold mb-1 hover:text-primary transition-colors line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {renderRating(product.rating || 4)}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">
                              ({product.reviewCount || 0})
                            </span>
                          </div>
                          
                          <div className="flex items-center mb-4">
                            <span className="text-lg font-bold text-primary">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2 mt-auto">
                          <button
                              className={`w-full py-2 px-3 rounded-md flex items-center justify-center transition-colors ${
                                product.stock > 0 
                                  ? 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                              onClick={() => product.stock > 0 && handleAddToCart(product)}
                              disabled={!product.stock}
                          >
                              <ShoppingCartIcon className="w-4 h-4" />
                              <span className="ml-1">Add to Cart</span>
                          </button>
                            <Link
                              to={`/product/${product.id}`}
                              className={`w-full py-2 px-3 rounded-md flex items-center justify-center transition-colors ${
                                product.stock > 0 
                                  ? 'bg-white border border-[#2E7D32] text-[#2E7D32] hover:bg-gray-50' 
                                  : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Buy Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        Prev
                      </button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === i + 1
                              ? 'bg-primary text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 border-dashed rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 20000]);
                    setSearchQuery('');
                    setInStockOnly(false);
                    setOnSaleOnly(false);
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Drawer */}
      {isMobile && (
        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          filterDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} onClick={() => toggleFilterDrawer(false)}>
          <div 
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              filterDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => toggleFilterDrawer(false)}
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-800 mb-3">Categories</h3>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-800 mb-3">Product Status</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700">On Sale</span>
                </label>
              </div>
            </div>
            
            <div className="p-4">
              <button 
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                onClick={() => toggleFilterDrawer(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catalog; 