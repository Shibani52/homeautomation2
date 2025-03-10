import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function OrderConfirmation() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

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
            <span className="font-medium">ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">Mock Payment (Test)</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <p className="text-gray-600">
            Your order will be processed and shipped soon. You will receive an email with tracking information once your order ships.
          </p>
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