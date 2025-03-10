import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { useCart } from '../contexts/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    getCartTotal 
  } = useCart();

  const shipping = 499; // ₹499
  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-container">
      <Typography variant="h4" sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            component={RouterLink}
            to="/catalog"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="cart-content">
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
                      ₹{item.price.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            updateQuantity(item.id, value);
                          }
                        }}
                        inputProps={{
                          min: 1,
                          style: { textAlign: 'center' }
                        }}
                        sx={{ width: '60px', mx: 1 }}
                      />
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </Typography>
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        color="error"
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
                    <Typography>₹{subtotal.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography>Shipping</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>₹{shipping.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography>GST (18%)</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>₹{tax.toLocaleString()}</Typography>
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
                    <Typography variant="h6">₹{total.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                onClick={() => navigate('/checkout?source=cart')}
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