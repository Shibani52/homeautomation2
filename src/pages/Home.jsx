import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
} from '@mui/material';
import { products } from '../data/products';

// Get one featured product from each category
const featuredProducts = [
  products.find(p => p.category === 'smart-lighting'),
  products.find(p => p.category === 'security'),
  products.find(p => p.category === 'climate'),
];

function Home() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://source.unsplash.com/random/?smarthome)',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h2" color="inherit" gutterBottom>
            Welcome to Smart Home Hub
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Transform your home with cutting-edge automation technology.
            Discover our range of smart devices for lighting, security, and climate control.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/products/smart-lighting"
            sx={{ mt: 2 }}
          >
            Shop Now
          </Button>
        </Box>
      </Paper>

      {/* Featured Products Section */}
      <Box sx={{ p: 3, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4} sx={{ width: '100%' }}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    ${product.price}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/product/${product.id}`}
                    variant="outlined"
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Categories Section */}
        <Box sx={{ my: 8, width: '100%' }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Browse Categories
          </Typography>
          <Grid container spacing={4} sx={{ width: '100%' }}>
            <Grid item xs={12} sm={4}>
              <Card
                component={RouterLink}
                to="/products/smart-lighting"
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  width: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random/?smartlight"
                  alt="Smart Lighting"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Smart Lighting
                  </Typography>
                  <Typography>
                    Illuminate your space with intelligent lighting solutions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                component={RouterLink}
                to="/products/security"
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  width: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random/?security"
                  alt="Security Systems"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Security Systems
                  </Typography>
                  <Typography>
                    Protect your home with advanced security technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                component={RouterLink}
                to="/products/climate"
                sx={{
                  textDecoration: 'none',
                  height: '100%',
                  width: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="https://source.unsplash.com/random/?thermostat"
                  alt="Climate Control"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Climate Control
                  </Typography>
                  <Typography>
                    Maintain perfect comfort with smart climate solutions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Home; 