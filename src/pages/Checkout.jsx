import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { products } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Alert } from '@mui/material';

function Checkout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const source = params.get('source');
      const productId = params.get('product');
      
      if (source === 'cart') {
        // Cart checkout
        if (cartItems.length === 0) {
          setError('Cart is empty');
          setLoading(false);
          return;
        }
      } else if (productId) {
        // Direct product purchase
        const selectedProduct = products.find(p => p.id === productId);
        if (!selectedProduct) {
          setError('Product not found');
          setLoading(false);
          return;
        }
        setProduct(selectedProduct);
      } else {
        setError('Invalid checkout');
        setLoading(false);
        return;
      }

      // Pre-fill email from user data
      setFormData(prev => ({
        ...prev,
        email: user.email || ''
      }));
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load checkout');
      setLoading(false);
    }
  }, [location, user.email, cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError('');
  };

  const validateForm = () => {
    const requiredFields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      address: 'Address',
      city: 'City',
      zipCode: 'ZIP Code'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field].trim()) {
        setValidationError(`${label} is required`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }

    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(formData.zipCode)) {
      setValidationError('Please enter a valid 6-digit PIN code');
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    if (!user || !user.token) {
      alert("You need to be logged in to complete this purchase.");
      navigate('/login', { state: { from: location } });
      return;
    }

    const params = new URLSearchParams(location.search);
    const source = params.get('source');
    const total = source === 'cart' ? getCartTotal() : (product ? product.price : 0);

    try {
      // Show loading message
      alert("Processing payment...");
      
      // Prepare order data
      const orderItems = source === 'cart' 
        ? cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item.id
          }))
        : [{
            name: product.name,
            quantity: 1,
            image: product.image,
            price: product.price,
            product: product.id
          }];
      
      const shippingAddress = {
        addressType: 'Home',
        street: formData.address,
        city: formData.city,
        state: formData.state || 'State',
        zipCode: formData.zipCode,
        country: 'India'
      };
      
      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod: 'mock_payment',
        itemsPrice: total,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: total
      };
      
      console.log('Sending order data:', orderData);
      console.log('User token:', user.token);
      
      // Define the API URL
      const apiUrl = 'http://localhost:5000/api/payments/mock';
      console.log('API URL:', apiUrl);
      
      // Call the mock payment API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ orderData })
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText || 'No error details'}`);
      }
      
      // Check if response has content before parsing JSON
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!responseText) {
        throw new Error('Empty response from server');
      }
      
      const data = JSON.parse(responseText);
      console.log('Payment response data:', data);
      
      if (data.success) {
        // Clear cart if payment was from cart
        if (source === 'cart') {
          clearCart();
        }
        
        alert("Payment successful! Order confirmed.");
        navigate('/order-confirmation', { state: { orderId: data.order._id } });
      } else {
        alert(`Payment failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed. Please try again. Error: ${error.message || 'Unknown error'}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/cart" replace />;
  }

  const params = new URLSearchParams(location.search);
  const source = params.get('source');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {source === 'cart' ? (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4 mb-4 pb-4 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-xl font-bold text-primary mt-2">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">₹{getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : product ? (
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-xl font-bold text-primary mt-2">₹{product.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span className="text-primary">₹{product.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No items selected</p>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          {validationError && (
            <Alert severity="error" className="mb-4">
              {validationError}
            </Alert>
          )}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  placeholder="6-digit PIN code"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout; 