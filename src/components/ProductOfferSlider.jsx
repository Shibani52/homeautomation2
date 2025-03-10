import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, IconButton, Card, CardMedia, CardContent, Button, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ProductOfferSlider = ({ title, products, bgColor = '#f5f5f5', titleColor = '#2E7D32' }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Check arrows on mount
    handleScroll();
    
    // Add resize listener
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [products]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 240 : isTablet ? 400 : 600;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 240 : isTablet ? 400 : 600;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Adjust card dimensions for better consistency
  const cardWidth = isMobile ? 180 : isTablet ? 220 : 250;
  const imageHeight = 180;
  const cardHeight = 340; // Fixed height for all cards

  return (
    <Box sx={{ mb: 4, position: 'relative' }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
          px: { xs: 2, md: 3 }
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            color: titleColor,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: 40,
              height: 3,
              backgroundColor: titleColor,
              borderRadius: 2
            }
          }}
        >
          {title}
        </Typography>
        
        <Button 
          component={Link} 
          to={`/catalog?category=${title.toLowerCase().replace(/\s+/g, '-')}`}
          variant="text" 
          sx={{ 
            color: titleColor,
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          View All
        </Button>
      </Box>

      {/* Slider Container */}
      <Box 
        sx={{ 
          position: 'relative',
          bgcolor: bgColor,
          py: 3,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        {/* Left Arrow */}
        {showLeftArrow && (
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: 'absolute',
              left: { xs: -12, sm: -16, md: -20 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                bgcolor: 'white',
              },
              display: { xs: 'none', sm: 'flex' },
              width: { sm: 36, md: 40 },
              height: { sm: 36, md: 40 },
            }}
          >
            <ArrowBackIos sx={{ fontSize: { sm: 16, md: 18 }, ml: 1 }} />
          </IconButton>
        )}

        {/* Products Scroll Container */}
        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            px: { xs: 2, md: 3 },
            gap: 2,
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none' // Chrome, Safari, Edge
            },
            '-ms-overflow-style': 'none', // IE
            pb: 1, // Add padding to avoid shadow cutoff
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              component={Link}
              to={`/product/${product.id}`}
              sx={{
                minWidth: cardWidth,
                maxWidth: cardWidth,
                width: cardWidth,
                height: cardHeight,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'white',
              }}
            >
              {/* Product Image */}
              <Box sx={{ position: 'relative', height: imageHeight }}>
                <CardMedia
                  component="img"
                  height={imageHeight}
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'contain', 
                    bgcolor: 'white', 
                    p: 2,
                    height: '100%'
                  }}
                />
                {product.discount && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      bgcolor: '#C62828',
                      color: 'white',
                      fontWeight: 'bold',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.8rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '60px',
                      textAlign: 'center',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {product.discount}
                  </Box>
                )}
              </Box>

              {/* Product Info */}
              <CardContent sx={{ 
                flexGrow: 1, 
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: `calc(${cardHeight}px - ${imageHeight}px)`,
              }}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    component="h3"
                    sx={{
                      fontWeight: 'medium',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      height: 40,
                      color: 'text.primary'
                    }}
                  >
                    {product.name}
                  </Typography>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#388E3C',
                        color: 'white',
                        px: 0.5,
                        borderRadius: 0.5,
                        fontSize: '0.75rem',
                        mr: 1
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {product.rating.toFixed(1)}
                      </Typography>
                      <Star sx={{ fontSize: 12, ml: 0.25 }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      ({product.reviewCount})
                    </Typography>
                  </Box>
                </Box>

                {/* Price */}
                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                      ₹{product.price.toLocaleString()}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        ₹{product.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}

          {/* Loading Skeletons - Show when products are loading */}
          {products.length === 0 && Array.from(new Array(5)).map((_, index) => (
            <Card
              key={index}
              sx={{
                minWidth: cardWidth,
                maxWidth: cardWidth,
                width: cardWidth,
                height: cardHeight,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Skeleton variant="rectangular" height={imageHeight} />
              <CardContent>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Right Arrow */}
        {showRightArrow && (
          <IconButton
            onClick={scrollRight}
            sx={{
              position: 'absolute',
              right: { xs: -12, sm: -16, md: -20 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                bgcolor: 'white',
              },
              display: { xs: 'none', sm: 'flex' },
              width: { sm: 36, md: 40 },
              height: { sm: 36, md: 40 },
            }}
          >
            <ArrowForwardIos sx={{ fontSize: { sm: 16, md: 18 } }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ProductOfferSlider; 