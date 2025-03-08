import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { products } from '../data/products';

const categoryTitles = {
  'smart-lighting': 'Smart Lighting',
  'security': 'Security Systems',
  'climate': 'Climate Control',
};

function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="cart-container">
        <Typography variant="h4" sx={{ p: 3 }}>Product not found</Typography>
      </div>
    );
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    setSnackbarOpen(true);
  };

  return (
    <div className="cart-container">
      {/* Breadcrumbs */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Breadcrumbs>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link
            component={RouterLink}
            to={`/products/${product.category}`}
            color="inherit"
          >
            {categoryTitles[product.category]}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </Box>

      <div className="cart-grid">
        {/* Product Image */}
        <div className="cart-items">
          <Box sx={{ position: 'sticky', top: 0 }}>
            <CardMedia
              component="img"
              height="600"
              image={product.image}
              alt={product.name}
              sx={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
        </div>

        {/* Product Info */}
        <div className="cart-summary">
          <Box sx={{ 
            p: 4,
            height: '100%'
          }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            {/* Features List */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Key Features
            </Typography>
            <List>
              {product.features.map((feature, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>

            {/* Add to Cart Section */}
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="body2"
                color={product.stock > 0 ? 'success.main' : 'error.main'}
                gutterBottom
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{
                      min: 1,
                      max: product.stock,
                    }}
                    disabled={product.stock === 0}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductDetails; 