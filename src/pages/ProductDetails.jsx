import { useState, useMemo, useRef, Suspense } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Box,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
  TextField,
  Snackbar,
  Alert,
  Rating,
  Divider,
  Tabs,
  Tab,
  Paper,
  Chip,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Fade,
  Backdrop,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Check as CheckIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Assignment as SpecsIcon,
  Description as DescriptionIcon,
  Star as StarIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ZoomIn as ZoomInIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  ZoomOut as ZoomOutIcon,
  ThreeDRotation as ThreeDRotationIcon,
  ViewInAr as ViewInArIcon,
} from '@mui/icons-material';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import ProductViewer3D from '../components/ProductViewer3D';

const categoryTitles = {
  'smart-lighting': 'Smart Lighting',
  'security': 'Security Systems',
  'climate': 'Climate Control',
};

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const { addToCart } = useCart();
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    author: '',
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Add new state for image handling
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [modalZoomLevel, setModalZoomLevel] = useState(1);
  const [modalZoomed, setModalZoomed] = useState(false);
  const [modalMousePosition, setModalMousePosition] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState('normal');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const modalImageRef = useRef(null);

  const product = products.find(p => p.id === id);

  // Add new recommendation logic
  const recommendations = useMemo(() => {
    const sameCategory = products.filter(p => 
      p.category === product.category && 
      p.id !== product.id
    );
    
    // Sort by price similarity and limit to 4 items
    return sameCategory
      .sort((a, b) => 
        Math.abs(a.price - product.price) - Math.abs(b.price - product.price)
      )
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4">Product not found</Typography>
      </div>
    );
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbarOpen(true);
  };

  const handleBuyNow = () => {
    navigate(`/checkout?product=${product.id}`);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleReviewChange = (field) => (event) => {
    setNewReview(prev => ({
      ...prev,
      [field]: field === 'rating' ? Number(event.target.value) : event.target.value
    }));
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    console.log('New Review:', newReview);
    setReviewSubmitted(true);
    setNewReview({
      rating: 5,
      author: '',
      comment: ''
    });
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleImageChange = (index) => {
    setSelectedImage(index);
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
    setIsZoomed(false);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    setIsZoomed(false);
  };

  const handleImageHover = (event) => {
    if (!isZoomed) return;
    
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleImageMouseEnter = () => {
    // Don't automatically zoom on mouse enter
    // setIsZoomed(true);
  };

  const handleImageMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleImageClick = (event) => {
    // Prevent opening modal when in zoom mode
    if (isZoomed) {
      setIsZoomed(false);
      event.stopPropagation();
    } else {
      // Toggle zoom on click
      setIsZoomed(true);
      event.stopPropagation();
    }
  };

  const handleOpenModal = (index) => {
    // Only open modal if not in zoom mode
    if (!isZoomed) {
      setModalImage(index);
      setModalZoomed(false);
      setModalZoomLevel(1);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowThumbnails(true);
    setModalZoomed(false);
  };

  const handleModalPrev = (e) => {
    e.stopPropagation();
    setModalImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleModalNext = (e) => {
    e.stopPropagation();
    setModalImage((prev) => (prev + 1) % product.images.length);
  };

  const toggleThumbnails = () => {
    setShowThumbnails(prev => !prev);
  };

  const handleZoomChange = (event, newValue) => {
    setZoomLevel(newValue);
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
      setIsZoomed(false);
      setRotation({ x: 0, y: 0 });
    }
  };

  const handle3DDragStart = (e) => {
    if (viewMode !== '3d') return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - rotation.x,
      y: e.clientY - rotation.y,
    });
  };

  const handle3DDrag = (e) => {
    if (!isDragging || viewMode !== '3d') return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setRotation({
      x: newX % 360,
      y: Math.max(-45, Math.min(45, newY)),
    });
  };

  const handle3DDragEnd = () => {
    setIsDragging(false);
  };

  const handleModalImageHover = (event) => {
    if (!modalZoomed) return;
    
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    
    setModalMousePosition({ x, y });
  };

  const handleModalImageClick = (event) => {
    // Don't toggle thumbnails when clicking on the image
    event.stopPropagation();
    
    if (!modalZoomed) {
      setModalZoomed(true);
    } else {
      // Toggle zoom off on second click
      setModalZoomed(false);
    }
  };

  const handleModalZoomChange = (event, newValue) => {
    setModalZoomLevel(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs>
            <Link component={RouterLink} to="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link
              component={RouterLink}
              to={`/products/${product.category}`}
              className="text-gray-600 hover:text-primary"
            >
              {categoryTitles[product.category]}
            </Link>
            <Typography color="text.primary">{product.name}</Typography>
          </Breadcrumbs>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              {/* Main Image Container */}
              {viewMode === 'normal' ? (
                <Paper 
                  elevation={0} 
                  className="relative rounded-lg overflow-hidden cursor-zoom-in"
                  sx={{
                    aspectRatio: '1',
                  }}
                  onClick={() => handleOpenModal(selectedImage)}
                  onMouseMove={handleImageHover}
                  onMouseEnter={handleImageMouseEnter}
                  onMouseLeave={handleImageMouseLeave}
                  ref={imageRef}
                >
                  <div 
                    className="relative w-full h-full"
                    onClick={handleImageClick}
                  >
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className={`w-full h-full object-contain transition-all duration-200 ${
                        isZoomed ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={viewMode === '3d' ? {
                        transform: `perspective(1000px) rotateY(${rotation.x * 0.2}deg) rotateX(${rotation.y * 0.2}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.2s ease'
                      } : undefined}
                    />
                    {viewMode === 'normal' && isZoomed && (
                      <div
                        className="absolute inset-0 overflow-hidden cursor-zoom-out"
                        style={{
                          backgroundImage: `url(${product.images[selectedImage]})`,
                          backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                          backgroundSize: `${zoomLevel * 100}%`,
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    )}
                    {viewMode === 'normal' && !isZoomed && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                        <ZoomInIcon className="text-white opacity-0 hover:opacity-100 transform scale-150" />
                      </div>
                    )}
                    
                    {/* Zoom Indicator */}
                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-75 rounded-full p-2 shadow-md">
                      <Tooltip title={isZoomed ? "Click to exit zoom" : "Click to zoom"}>
                        {isZoomed ? 
                          <ZoomOutIcon className="text-gray-700" /> : 
                          <ZoomInIcon className="text-gray-700" />
                        }
                      </Tooltip>
                    </div>
                    
                    {viewMode === '3d' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <ViewInArIcon className="text-white opacity-50 transform scale-150" />
                      </div>
                    )}
                  </div>

                  {/* Labels */}
                  {product.isNewProduct && (
                    <Chip
                      label="New"
                      color="primary"
                      size="small"
                      className="absolute top-4 left-4 z-10"
                    />
                  )}
                  {product.onSale && (
                    <Chip
                      label="Sale"
                      color="error"
                      size="small"
                      className="absolute top-4 right-4 z-10"
                    />
                  )}

                  {/* Navigation Arrows - Only show when not zoomed */}
                  {!isZoomed && product.images.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 left-0 flex items-center z-10">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                          }}
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                            ml: 1,
                          }}
                        >
                          <ChevronLeftIcon />
                        </IconButton>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center z-10">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                          }}
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' },
                            mr: 1,
                          }}
                        >
                          <ChevronRightIcon />
                        </IconButton>
                      </div>
                    </>
                  )}
                </Paper>
              ) : (
                <Paper
                  elevation={0}
                  className="relative rounded-lg overflow-hidden"
                  sx={{
                    aspectRatio: '1',
                  }}
                >
                  <Suspense fallback={
                    <Box
                      sx={{
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.100',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  }>
                    <ProductViewer3D
                      modelUrl={product.modelUrl}
                      fallbackImage={product.images[0]}
                    />
                  </Suspense>
                </Paper>
              )}

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {product.images.map((img, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => handleImageChange(index)}
                      sx={{
                        width: 80,
                        height: 80,
                        transition: 'border-color 0.2s ease',
                        '&:hover': {
                          borderColor: '#2E7D32',
                        },
                      }}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </Paper>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {/* Product Title and Price */}
              <Paper elevation={0} className="p-6 rounded-lg">
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <div className="flex items-center gap-2 mb-4">
                  <Rating value={product.rating} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    ({product.reviewCount || 0} reviews)
                  </Typography>
                </div>
                <div className="flex items-baseline gap-4 mb-4">
                  <Typography variant="h4" color="primary" className="font-bold">
                    ₹{product.price.toLocaleString()}
                  </Typography>
                  {product.onSale && (
                    <Typography variant="h6" color="text.secondary" className="line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </Typography>
                  )}
                </div>
                <Typography
                  variant="body1"
                  color={product.stock > 0 ? 'success.main' : 'error.main'}
                  className="mb-6"
                >
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Typography>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <Typography variant="subtitle1">Quantity:</Typography>
                  <div className="flex items-center border rounded-md">
                    <IconButton onClick={decrementQuantity} disabled={quantity <= 1}>
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={quantity}
                      onChange={handleQuantityChange}
                      type="number"
                      inputProps={{ min: 1, max: product.stock }}
                      sx={{ width: '60px' }}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton onClick={incrementQuantity} disabled={quantity >= product.stock}>
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    sx={{
                      bgcolor: '#2E7D32',
                      '&:hover': { bgcolor: '#1B5E20' },
                      py: 1.5
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    sx={{
                      borderColor: '#2E7D32',
                      color: '#2E7D32',
                      '&:hover': {
                        borderColor: '#1B5E20',
                        bgcolor: 'rgba(46, 125, 50, 0.04)',
                      },
                      py: 1.5
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </Paper>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Paper elevation={0} className="p-4 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <ShippingIcon color="primary" />
                    <div>
                      <Typography variant="subtitle2">Free Delivery</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Orders over ₹10,000
                      </Typography>
                    </div>
                  </div>
                </Paper>
                <Paper elevation={0} className="p-4 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <SecurityIcon color="primary" />
                    <div>
                      <Typography variant="subtitle2">1 Year Warranty</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Manufacturer warranty
                      </Typography>
                    </div>
                  </div>
                </Paper>
                <Paper elevation={0} className="p-4 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <StarIcon color="primary" />
                    <div>
                      <Typography variant="subtitle2">Top Rated</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.rating} out of 5
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </div>

              {/* Detailed Information Tabs */}
              <Paper elevation={0} className="rounded-lg overflow-hidden">
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: 'white',
                    '& .MuiTab-root': {
                      py: 2,
                    },
                  }}
                >
                  <Tab 
                    icon={<DescriptionIcon />} 
                    label="Description" 
                    sx={{
                      '&.Mui-selected': {
                        color: '#2E7D32',
                      },
                    }}
                  />
                  <Tab 
                    icon={<SpecsIcon />} 
                    label="Specifications"
                    sx={{
                      '&.Mui-selected': {
                        color: '#2E7D32',
                      },
                    }}
                  />
                  <Tab 
                    icon={<StarIcon />} 
                    label="Reviews"
                    sx={{
                      '&.Mui-selected': {
                        color: '#2E7D32',
                      },
                    }}
                  />
                </Tabs>

                <div className="bg-white">
                  <TabPanel value={selectedTab} index={0}>
                    <Typography variant="body1" paragraph className="text-gray-700">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3, color: '#2E7D32' }}>
                      Key Features
                    </Typography>
                    <List>
                      {product.features.map((feature, index) => (
                        <ListItem key={index} sx={{ py: 1 }}>
                          <ListItemIcon>
                            <CheckIcon sx={{ color: '#2E7D32' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            primaryTypographyProps={{
                              className: "text-gray-700"
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>

                  <TabPanel value={selectedTab} index={1}>
                    <div className="space-y-4">
                      {Object.entries(product.specifications || {}).map(([key, value], index) => (
                        <div key={index} className="flex border-b last:border-b-0 py-3 hover:bg-gray-50">
                          <Typography variant="subtitle2" sx={{ width: 200, color: '#1B5E20' }}>
                            {key}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {value}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </TabPanel>

                  <TabPanel value={selectedTab} index={2}>
                    <div className="space-y-6">
                      {/* Review Summary */}
                      <Paper elevation={0} className="p-6 bg-gray-50 rounded-lg mb-6">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <Typography variant="h3" color="primary" className="font-bold">
                              {product.rating}
                            </Typography>
                            <Rating value={product.rating} precision={0.5} readOnly size="large" />
                            <Typography variant="body2" color="text.secondary">
                              {product.reviewCount} reviews
                            </Typography>
                          </div>
                          <Divider orientation="vertical" flexItem />
                          <div className="flex-grow">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="flex items-center gap-2">
                                <Typography variant="body2" sx={{ width: 20 }}>{star}</Typography>
                                <StarIcon sx={{ color: '#FFB400', fontSize: 16 }} />
                                <div className="flex-grow bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary rounded-full h-2"
                                    style={{
                                      width: `${(product.reviews?.filter(r => Math.floor(r.rating) === star).length / product.reviewCount) * 100}%`
                                    }}
                                  />
                                </div>
                                <Typography variant="body2" sx={{ width: 30 }}>
                                  {product.reviews?.filter(r => Math.floor(r.rating) === star).length || 0}
                                </Typography>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Paper>

                      {/* Review Submission Form */}
                      <Paper elevation={0} className="p-6 rounded-lg border border-gray-200">
                        <Typography variant="h6" gutterBottom color="primary">
                          Write a Review
                        </Typography>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                          <div>
                            <Typography component="legend" className="text-gray-600 mb-1">
                              Your Rating
                            </Typography>
                            <Rating
                              name="rating"
                              value={newReview.rating}
                              onChange={handleReviewChange('rating')}
                              precision={0.5}
                              size="large"
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: '#FFB400',
                                },
                              }}
                            />
                          </div>
                          <TextField
                            fullWidth
                            label="Your Name"
                            value={newReview.author}
                            onChange={handleReviewChange('author')}
                            required
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#2E7D32',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#2E7D32',
                                },
                              },
                            }}
                          />
                          <TextField
                            fullWidth
                            label="Your Review"
                            value={newReview.comment}
                            onChange={handleReviewChange('comment')}
                            required
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#2E7D32',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#2E7D32',
                                },
                              },
                            }}
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                              bgcolor: '#2E7D32',
                              '&:hover': { bgcolor: '#1B5E20' },
                              py: 1.5,
                            }}
                          >
                            Submit Review
                          </Button>
                          {reviewSubmitted && (
                            <Alert severity="success" className="mt-4">
                              Thank you for your review! It will be visible after moderation.
                            </Alert>
                          )}
                        </form>
                      </Paper>

                      {/* Existing Reviews */}
                      <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 6 }}>
                        Customer Reviews
                      </Typography>
                      <div className="space-y-4">
                        {(product.reviews || []).map((review, index) => (
                          <Paper
                            key={index}
                            elevation={0}
                            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Rating
                                value={review.rating}
                                size="small"
                                readOnly
                                sx={{
                                  '& .MuiRating-iconFilled': {
                                    color: '#FFB400',
                                  },
                                }}
                              />
                              <Typography variant="subtitle2" color="primary">
                                {review.author}
                              </Typography>
                            </div>
                            <Typography variant="body2" className="text-gray-600">
                              {review.comment}
                            </Typography>
                          </Paper>
                        ))}
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>

      {/* Add Recommendations Section before the closing div */}
      <div className="container mx-auto px-4 py-12">
        <Typography variant="h5" gutterBottom sx={{ color: '#1B5E20', mb: 4 }}>
          Recommended Products
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <Paper
              key={rec.id}
              elevation={0}
              className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <Link
                component={RouterLink}
                to={`/product/${rec.id}`}
                className="block"
                underline="none"
              >
                <div className="relative pt-[100%]">
                  <img
                    src={rec.images[0]}
                    alt={rec.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  {rec.isNewProduct && (
                    <Chip
                      label="New"
                      color="primary"
                      size="small"
                      className="absolute top-2 left-2"
                    />
                  )}
                  {rec.onSale && (
                    <Chip
                      label="Sale"
                      color="error"
                      size="small"
                      className="absolute top-2 right-2"
                    />
                  )}
                </div>
                <div className="p-4">
                  <Typography
                    variant="subtitle1"
                    className="font-medium text-gray-900 line-clamp-2 mb-2"
                    sx={{ minHeight: '48px' }}
                  >
                    {rec.name}
                  </Typography>
                  <div className="flex items-center gap-2 mb-2">
                    <Rating value={rec.rating} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({rec.reviewCount || 0})
                    </Typography>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <Typography variant="h6" color="primary" className="font-bold">
                      ₹{rec.price.toLocaleString()}
                    </Typography>
                    {rec.onSale && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        className="line-through"
                      >
                        ₹{rec.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </div>
                </div>
              </Link>
            </Paper>
          ))}
        </div>
      </div>

      {/* Full View Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="flex items-center justify-center"
      >
        <Fade in={isModalOpen}>
          <div className="relative w-full h-full flex flex-col bg-black bg-opacity-95 outline-none">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 text-white">
              <Typography variant="h6">{product.name}</Typography>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                  <ZoomOutIcon sx={{ color: 'white', fontSize: 20 }} />
                  <Slider
                    value={modalZoomLevel}
                    onChange={handleModalZoomChange}
                    min={1}
                    max={4}
                    step={0.5}
                    sx={{
                      width: 100,
                      color: 'white',
                      '& .MuiSlider-thumb': {
                        color: 'white',
                      },
                      '& .MuiSlider-track': {
                        color: 'white',
                      },
                    }}
                  />
                  <ZoomInIcon sx={{ color: 'white', fontSize: 20 }} />
                </div>
                <Tooltip title={modalZoomed ? "Click to exit zoom" : "Click to zoom"}>
                  <IconButton 
                    onClick={() => setModalZoomed(!modalZoomed)} 
                    sx={{ color: 'white' }}
                  >
                    {modalZoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
                  </IconButton>
                </Tooltip>
                <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-grow flex">
              {/* Left Navigation */}
              <div className="flex items-center px-4">
                <IconButton
                  onClick={handleModalPrev}
                  sx={{ color: 'white' }}
                >
                  <ChevronLeftIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </div>

              {/* Main Image */}
              <div 
                className="flex-grow flex items-center justify-center relative"
                onClick={toggleThumbnails}
              >
                <div
                  className="relative max-h-[80vh] max-w-[80vw]"
                  onClick={handleModalImageClick}
                  onMouseMove={handleModalImageHover}
                  ref={modalImageRef}
                  style={{ cursor: modalZoomed ? 'zoom-out' : 'zoom-in' }}
                >
                  {!modalZoomed ? (
                    <img
                      src={product.images[modalImage]}
                      alt={product.name}
                      className="max-h-[80vh] max-w-[80vw] object-contain"
                    />
                  ) : (
                    <div 
                      className="w-[80vw] h-[80vh] overflow-hidden"
                      style={{
                        backgroundImage: `url(${product.images[modalImage]})`,
                        backgroundPosition: `${modalMousePosition.x}% ${modalMousePosition.y}%`,
                        backgroundSize: `${modalZoomLevel * 100}%`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center px-4">
                <IconButton
                  onClick={handleModalNext}
                  sx={{ color: 'white' }}
                >
                  <ChevronRightIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </div>
            </div>

            {/* Thumbnails */}
            <Fade in={showThumbnails}>
              <div className="p-4 bg-black bg-opacity-75">
                <div className="flex justify-center gap-4 overflow-x-auto py-2">
                  {product.images.map((img, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${
                        modalImage === index ? 'border-white' : 'border-transparent'
                      }`}
                      onClick={() => setModalImage(index)}
                      sx={{
                        width: 80,
                        height: 80,
                        transition: 'border-color 0.2s ease',
                        '&:hover': {
                          borderColor: 'white',
                        },
                      }}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </Paper>
                  ))}
                </div>
              </div>
            </Fade>

            {/* Image Counter */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 px-4 py-2 rounded-full">
              <Typography variant="body2" className="text-white">
                {modalImage + 1} / {product.images.length}
              </Typography>
            </div>
          </div>
        </Fade>
      </Modal>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductDetails; 