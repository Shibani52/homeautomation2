import { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const contactReasons = [
  'General Inquiry',
  'Product Support',
  'Sales',
  'Technical Support',
  'Other',
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }
    setSubmitted(true);
    setError('');
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
        We're here to help and answer any questions you might have
      </Typography>

      <Grid container spacing={4} sx={{ width: '100%' }}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">Phone</Typography>
                      <Typography variant="body1">1-800-SMART-HOME</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Mon-Fri: 9AM - 6PM EST
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">Email</Typography>
                      <Typography variant="body1">support@smarthomehub.com</Typography>
                      <Typography variant="body2" color="text.secondary">
                        We'll respond within 24 hours
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">Address</Typography>
                      <Typography variant="body1">
                        123 Smart Street
                        <br />
                        Tech City, ST 12345
                        <br />
                        United States
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              {submitted ? (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Thank you for your message! We'll get back to you soon.
                </Alert>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Reason for Contact"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                      >
                        {contactReasons.map((reason) => (
                          <MenuItem key={reason} value={reason}>
                            {reason}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contact; 