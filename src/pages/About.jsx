import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Container,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LightMode as LightbulbIcon,
  VerifiedUser as SecurityIcon,
  Public as EarthIcon,
  Groups as PeopleIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Wrap MUI components with motion for animations
const MotionCard = motion(Card);
const MotionBox = motion(Box);

function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { label: 'Products Installed', number: '50K+' },
    { number: '24/7', label: 'Customer Support' },
    { number: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1558002038-1055907df827)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              About Smart Home Hub
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4, 
                fontWeight: 300,
                color: '#E8F5E9' 
              }}
            >
              Transforming homes into intelligent living spaces
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* Mission and Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                height: '100%',
                p: 4,
                background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
                color: 'white',
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph sx={{ opacity: 0.9 }}>
                At Smart Home Hub, our mission is to make smart home technology accessible,
                affordable, and easy to use for everyone. We believe that home automation
                should enhance your life, not complicate it.
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                We strive to provide cutting-edge solutions that seamlessly integrate
                into your daily routine, making your home more comfortable, secure,
                and energy-efficient.
              </Typography>
            </MotionCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                height: '100%',
                p: 4,
                bgcolor: 'grey.50',
              }}
            >
              <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph>
                We envision a future where every home is a smart home, where technology
                works in harmony with human needs to create sustainable, efficient,
                and comfortable living spaces.
              </Typography>
              <Typography variant="body1">
                Our goal is to lead the way in this transformation by providing
                innovative solutions that make this vision a reality for our customers.
              </Typography>
            </MotionCard>
          </Grid>
        </Grid>

        {/* Company Values */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}>
          Our Values
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            { icon: <LightbulbIcon sx={{ fontSize: 40 }} />, title: 'Innovation', description: 'We continuously strive to develop and offer the latest in smart home technology, ensuring our customers have access to cutting-edge solutions.' },
            { icon: <SecurityIcon sx={{ fontSize: 40 }} />, title: 'Quality', description: 'We maintain the highest standards in product selection and customer service, ensuring reliability and satisfaction in every interaction.' },
            { icon: <EarthIcon sx={{ fontSize: 40 }} />, title: 'Sustainability', description: 'We are committed to promoting energy-efficient solutions that help reduce environmental impact while saving our customers money.' },
            { icon: <PeopleIcon sx={{ fontSize: 40 }} />, title: 'Customer Focus', description: 'We put our customers first, providing expert guidance and support to help them find the perfect smart home solutions for their needs.' },
          ].map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {value.icon}
                </Box>
                <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default About; 