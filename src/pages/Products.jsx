import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Breadcrumbs,
  Link,
  Stack,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { products } from '../data/products';

const categoryTitles = {
  'smart-lighting': 'Smart Lighting',
  'security': 'Security Systems',
  'climate': 'Climate Control',
};

function Products() {
  const { category } = useParams();
  const filteredProducts = products.filter(product => product.category === category);

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart`);
    // Implement cart functionality here
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">{categoryTitles[category]}</Typography>
      </Breadcrumbs>

      {/* Category Title */}
      <Typography variant="h3" component="h1" gutterBottom>
        {categoryTitles[category]}
      </Typography>

      {/* Products Grid */}
      <Grid container spacing={4} sx={{ width: '100%' }}>
        {filteredProducts.map((product) => (
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
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {product.description}
                </Typography>
                <Box>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </Typography>
                  <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0}
                      sx={{
                        bgcolor: '#2E7D32',
                        '&:hover': {
                          bgcolor: '#1B5E20',
                        },
                        textTransform: 'none',
                      }}
                    >
                      Cart
                    </Button>
                    <Button
                      component={RouterLink}
                      to={`/product/${product.id}`}
                      variant="outlined"
                      fullWidth
                      disabled={product.stock === 0}
                      sx={{
                        borderColor: '#2E7D32',
                        color: '#2E7D32',
                        '&:hover': {
                          borderColor: '#1B5E20',
                          bgcolor: 'grey.50',
                        },
                        textTransform: 'none',
                      }}
                    >
                      Buy Now
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Products; 