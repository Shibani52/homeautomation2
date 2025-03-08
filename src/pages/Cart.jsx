import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Grid,
  CardMedia,
  Button,
  IconButton,
  Box,
  TextField,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// TODO: Replace with actual cart state management
const initialCartItems = [
  {
    id: 'sl1',
    name: 'Smart LED Bulb',
    price: 29.99,
    image: 'https://example.com/smart-bulb.jpg',
    quantity: 2,
  },
  {
    id: 'ss1',
    name: 'Smart Security Camera',
    price: 129.99,
    image: 'https://example.com/security-camera.jpg',
    quantity: 1,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-container">
      <Typography variant="h4" sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ 
                p: 3,
                borderBottom: 1, 
                borderColor: 'divider',
                '&:last-child': {
                  borderBottom: 0
                }
              }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'contain' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      ${item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
                      <IconButton
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        inputProps={{
                          min: 1,
                          style: { textAlign: 'center' },
                        }}
                        sx={{ width: 60 }}
                      />
                      <IconButton
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <Box sx={{ 
              position: 'sticky', 
              top: 0, 
              p: 3,
              height: '100%'
            }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography>Subtotal</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography>Shipping</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${shipping.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography>Tax</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>${tax.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
              <Box sx={{ my: 2 }}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">Total</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">${total.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                component={RouterLink}
                to="/payment"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart; 