import { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Alert,
} from '@mui/material';

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [error, setError] = useState('');

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate shipping info
      if (!Object.values(shippingInfo).every(value => value)) {
        setError('Please fill in all shipping information fields');
        return;
      }
    } else if (activeStep === 1) {
      // Validate payment info
      if (!Object.values(paymentInfo).every(value => value)) {
        setError('Please fill in all payment information fields');
        return;
      }
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // TODO: Implement order submission
    console.log('Order submitted');
  };

  const renderShippingForm = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={shippingInfo.firstName}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={shippingInfo.lastName}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Address"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
          value={shippingInfo.city}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          label="State"
          name="state"
          value={shippingInfo.state}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          required
          fullWidth
          label="ZIP Code"
          name="zipCode"
          value={shippingInfo.zipCode}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={shippingInfo.email}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping Method
        </Typography>
        <RadioGroup
          value={shippingMethod}
          onChange={(e) => setShippingMethod(e.target.value)}
        >
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard Shipping (5-7 business days) - Free"
          />
          <FormControlLabel
            value="express"
            control={<Radio />}
            label="Express Shipping (2-3 business days) - $14.99"
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );

  const renderPaymentForm = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Card Number"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Name on Card"
          name="cardName"
          value={paymentInfo.cardName}
          onChange={handlePaymentInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Expiry Date (MM/YY)"
          name="expiry"
          value={paymentInfo.expiry}
          onChange={handlePaymentInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="CVV"
          name="cvv"
          value={paymentInfo.cvv}
          onChange={handlePaymentInfoChange}
        />
      </Grid>
    </Grid>
  );

  const renderOrderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>
      <Typography>
        {shippingInfo.firstName} {shippingInfo.lastName}
        <br />
        {shippingInfo.address}
        <br />
        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
        <br />
        {shippingInfo.email}
        <br />
        {shippingInfo.phone}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      <Typography>
        Card ending in {paymentInfo.cardNumber.slice(-4)}
        <br />
        {paymentInfo.cardName}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">$189.97</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Shipping</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">
            {shippingMethod === 'express' ? '$14.99' : 'Free'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Tax</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="right">$19.00</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">
            ${shippingMethod === 'express' ? '223.96' : '208.97'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4, width: '100%' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ width: '100%' }}>
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {activeStep === 0 && renderShippingForm()}
          {activeStep === 1 && renderPaymentForm()}
          {activeStep === 2 && renderOrderReview()}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Place Order
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Payment; 