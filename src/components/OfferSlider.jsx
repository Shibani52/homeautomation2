import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Paper, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, FiberManualRecord } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const offerSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'Smart Home Festival',
    subtitle: 'Up to 40% off on all smart devices',
    buttonText: 'Shop Now',
    buttonLink: '/catalog',
    color: '#1B5E20',
    textColor: 'white'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'New Arrival',
    subtitle: 'Smart Security Camera with AI Detection',
    buttonText: 'Explore',
    buttonLink: '/product/ss1',
    color: '#0D47A1',
    textColor: 'white'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'Bundle & Save',
    subtitle: 'Get 15% off when you buy 3 or more items',
    buttonText: 'View Bundles',
    buttonLink: '/catalog?bundle=true',
    color: '#C62828',
    textColor: 'white'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'Smart Lighting Sale',
    subtitle: 'Buy 2 Get 1 Free on all Smart Bulbs',
    buttonText: 'Shop Lighting',
    buttonLink: '/catalog?category=smart-lighting',
    color: '#F57C00',
    textColor: 'white'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: 'Limited Time Offer',
    subtitle: 'Free Installation on orders above ₹20,000',
    buttonText: 'Learn More',
    buttonLink: '/offers',
    color: '#4A148C',
    textColor: 'white'
  }
];

const OfferSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % offerSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + offerSlides.length) % offerSlides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    // Auto-advance slides
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, currentSlide]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const slideHeight = isMobile ? '220px' : isTablet ? '350px' : '450px';

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height: slideHeight,
        overflow: 'hidden',
        mb: 0,
        borderRadius: 0,
        boxShadow: 'none'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.5 }}
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%',
            backgroundImage: `url(${offerSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Gradient overlay */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, ${offerSlides[currentSlide].color}DD 0%, ${offerSlides[currentSlide].color}88 40%, transparent 70%)`,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ ml: { xs: 3, sm: 6, md: 12 }, maxWidth: { xs: '80%', sm: '60%', md: '45%' } }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  color: offerSlides[currentSlide].textColor,
                  fontWeight: 'bold',
                  mb: 1,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {offerSlides[currentSlide].title}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: offerSlides[currentSlide].textColor,
                  mb: 3,
                  opacity: 0.95,
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  maxWidth: '90%'
                }}
              >
                {offerSlides[currentSlide].subtitle}
              </Typography>
              <Button 
                component={Link} 
                to={offerSlides[currentSlide].buttonLink}
                variant="contained" 
                sx={{ 
                  bgcolor: 'white', 
                  color: offerSlides[currentSlide].color,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  },
                  fontWeight: 'bold',
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.5 },
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  borderRadius: '50px',
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {offerSlides[currentSlide].buttonText}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <IconButton 
        sx={{ 
          position: 'absolute', 
          left: { xs: 8, sm: 16, md: 24 }, 
          top: '50%', 
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.4)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.7)' },
          zIndex: 2,
          color: 'rgba(0, 0, 0, 0.7)',
          display: { xs: 'none', sm: 'flex' },
          width: { sm: 40, md: 48 },
          height: { sm: 40, md: 48 },
        }}
        onClick={prevSlide}
      >
        <ArrowBackIos sx={{ fontSize: { sm: 18, md: 22 }, ml: 1 }} />
      </IconButton>
      <IconButton 
        sx={{ 
          position: 'absolute', 
          right: { xs: 8, sm: 16, md: 24 }, 
          top: '50%', 
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.4)',
          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.7)' },
          zIndex: 2,
          color: 'rgba(0, 0, 0, 0.7)',
          display: { xs: 'none', sm: 'flex' },
          width: { sm: 40, md: 48 },
          height: { sm: 40, md: 48 },
        }}
        onClick={nextSlide}
      >
        <ArrowForwardIos sx={{ fontSize: { sm: 18, md: 22 } }} />
      </IconButton>

      {/* Dots Indicator */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: { xs: 8, sm: 16 }, 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1.5,
          zIndex: 2,
          p: 1,
          borderRadius: 10,
          bgcolor: 'rgba(0, 0, 0, 0.2)',
        }}
      >
        {offerSlides.map((_, index) => (
          <Box 
            key={index}
            onClick={() => goToSlide(index)}
            sx={{ 
              width: { xs: 8, sm: 10, md: 12 }, 
              height: { xs: 8, sm: 10, md: 12 }, 
              borderRadius: '50%',
              bgcolor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                transform: 'scale(1.2)'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OfferSlider; 