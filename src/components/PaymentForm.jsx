import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box, Alert } from '@mui/material';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

function PaymentForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Here you would typically send the paymentMethod.id to your server
      // to complete the payment. For demo purposes, we'll simulate success
      console.log('Payment Method:', paymentMethod);
      
      // Simulate payment processing
      setTimeout(() => {
        setProcessing(false);
        onSuccess();
      }, 2000);

    } catch (err) {
      setError('An unexpected error occurred.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </Box>
      
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || processing}
        sx={{
          bgcolor: '#2E7D32',
          '&:hover': {
            bgcolor: '#1B5E20',
          },
          textTransform: 'none',
        }}
      >
        {processing ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
      </Button>
    </form>
  );
}

export default PaymentForm; 