import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../contexts/AuthContext';

function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const { user } = useAuth();
  const orderId = location.state?.orderId;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Fetch order details if orderId is available
    const fetchOrderDetails = async () => {
      if (!orderId || !user) {
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          setOrder(data.data);
        } else {
          setError(data.error || 'Failed to fetch order details');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('An error occurred while fetching order details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId, user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <CheckCircleIcon style={{ fontSize: 64, color: '#4CAF50' }} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <div className="border-t border-b py-4 my-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium">
              {order ? order._id : `ORD-${Math.floor(100000 + Math.random() * 900000)}`}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Date:</span>
            <span className="font-medium">
              {order ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">
              {order ? order.paymentMethod : 'Mock Payment (Test)'}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-medium text-primary">
              ₹{order ? order.totalPrice.toLocaleString() : '0'}
            </span>
          </div>
        </div>

        {order && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-4 pb-4 border-b last:border-b-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          {order && order.shippingAddress ? (
            <div className="text-gray-600">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          ) : (
            <p className="text-gray-600">
              Your order will be processed and shipped soon. You will receive an email with tracking information once your order ships.
            </p>
          )}
        </div>

        <div className="text-center">
          <Link 
            to="/catalog" 
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation; 