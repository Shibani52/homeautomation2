import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Box, 
  Divider, 
  Paper, 
  TextField, 
  InputAdornment, 
  IconButton,
  Chip,
  Grid,
  Link
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  Search as SearchIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  AssignmentReturn as ReturnIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  Build as InstallationIcon,
  ContactSupport as SupportIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const FAQs = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All FAQs', icon: <ContactSupport /> },
    { id: 'products', label: 'Products', icon: <DevicesIcon /> },
    { id: 'shipping', label: 'Shipping', icon: <ShippingIcon /> },
    { id: 'payment', label: 'Payment', icon: <PaymentIcon /> },
    { id: 'returns', label: 'Returns & Refunds', icon: <ReturnIcon /> },
    { id: 'warranty', label: 'Warranty', icon: <SecurityIcon /> },
    { id: 'installation', label: 'Installation', icon: <InstallationIcon /> },
  ];

  const faqData = [
    {
      id: 'products-1',
      category: 'products',
      question: 'Are your smart home devices compatible with voice assistants?',
      answer: 'Yes, all our smart home devices are compatible with Amazon Alexa, Google Assistant, and Apple HomeKit. You can control your devices using voice commands through these platforms.'
    },
    {
      id: 'products-2',
      category: 'products',
      question: 'Do I need a hub to use your smart devices?',
      answer: 'Most of our devices connect directly to your Wi-Fi network and don\'t require a separate hub. However, some advanced features and integrations may benefit from our Smart Home Hub, which is sold separately.'
    },
    {
      id: 'products-3',
      category: 'products',
      question: 'How many devices can I control with the Smart Home app?',
      answer: 'Our Smart Home app can control an unlimited number of devices. The practical limit depends on your home\'s Wi-Fi network capacity.'
    },
    {
      id: 'products-4',
      category: 'products',
      question: 'Can I group multiple devices together?',
      answer: 'Yes, you can create groups of devices in our app to control multiple devices simultaneously. For example, you can create a "Living Room" group to control all lights in that room with a single command.'
    },
    {
      id: 'products-5',
      category: 'products',
      question: 'Do your devices work during internet outages?',
      answer: 'Basic functions of most devices will continue to work locally during internet outages. However, remote access and some advanced features require an internet connection.'
    },
    {
      id: 'shipping-1',
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days. Express shipping (available at checkout for an additional fee) delivers within 1-2 business days.'
    },
    {
      id: 'shipping-2',
      category: 'shipping',
      question: 'Do you offer free shipping?',
      answer: 'Yes, we offer free standard shipping on all orders above ₹10,000. Orders below this amount incur a shipping fee of ₹99.'
    },
    {
      id: 'shipping-3',
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within India. We plan to expand to international shipping in the future.'
    },
    {
      id: 'shipping-4',
      category: 'shipping',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in the "My Orders" section of your account.'
    },
    {
      id: 'payment-1',
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery (for orders under ₹15,000).'
    },
    {
      id: 'payment-2',
      category: 'payment',
      question: 'Is EMI available?',
      answer: 'Yes, EMI is available on orders above ₹3,000 with select banks. You can see EMI options during checkout.'
    },
    {
      id: 'payment-3',
      category: 'payment',
      question: 'Are there any discount codes available?',
      answer: 'New customers can use code SMARTHOME10 for 10% off their first purchase. We also run seasonal promotions which are announced on our homepage and via email.'
    },
    {
      id: 'payment-4',
      category: 'payment',
      question: 'Is it safe to save my card details on your website?',
      answer: 'Yes, we use industry-standard encryption and security measures. We are PCI DSS compliant and never store your full card details on our servers.'
    },
    {
      id: 'returns-1',
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most products. Items must be in original condition with all packaging and accessories.'
    },
    {
      id: 'returns-2',
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'You can initiate a return through the "My Orders" section of your account. Select the order and click "Return Item" to begin the process.'
    },
    {
      id: 'returns-3',
      category: 'returns',
      question: 'How long does it take to process a refund?',
      answer: 'Once we receive your returned item, refunds are processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and bank.'
    },
    {
      id: 'returns-4',
      category: 'returns',
      question: 'Do I have to pay for return shipping?',
      answer: 'Return shipping is free for defective products. For other returns, a shipping fee of ₹99 will be deducted from your refund amount.'
    },
    {
      id: 'warranty-1',
      category: 'warranty',
      question: 'What warranty do your products come with?',
      answer: 'All our smart home products come with a 1-year manufacturer warranty. Select premium products have extended warranties of up to 3 years.'
    },
    {
      id: 'warranty-2',
      category: 'warranty',
      question: 'How do I claim warranty?',
      answer: 'To claim warranty, contact our customer support with your order details. Our team will guide you through the process and arrange for repair or replacement.'
    },
    {
      id: 'warranty-3',
      category: 'warranty',
      question: 'What does the warranty cover?',
      answer: 'Our warranty covers manufacturing defects and hardware failures under normal use. It does not cover damage from accidents, misuse, or unauthorized modifications.'
    },
    {
      id: 'installation-1',
      category: 'installation',
      question: 'Do you provide installation services?',
      answer: 'Yes, we provide professional installation services for all our smart home systems. Our certified technicians ensure your devices are set up correctly and working optimally.'
    },
    {
      id: 'installation-2',
      category: 'installation',
      question: 'How much does installation cost?',
      answer: 'Basic installation is free for orders above ₹15,000. For other orders, installation fees start at ₹499, depending on the complexity and number of devices.'
    },
    {
      id: 'installation-3',
      category: 'installation',
      question: 'How soon can I get my devices installed?',
      answer: 'Our technician will contact you within 24 hours of delivery to schedule installation. Typically, installation can be completed within 2-3 days of delivery.'
    },
    {
      id: 'installation-4',
      category: 'installation',
      question: 'Can I install the devices myself?',
      answer: 'Yes, most of our devices are designed for easy DIY installation. We provide detailed installation guides and video tutorials in our app and on our website.'
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setExpanded(false);
  };

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
        Frequently Asked Questions
      </Typography>
      
      <Typography variant="subtitle1" align="center" sx={{ mb: 5, color: 'text.secondary' }}>
        Find answers to common questions about our products, services, and policies
      </Typography>
      
      {/* Search Bar */}
      <Paper elevation={0} sx={{ p: 2, mb: 4, border: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="Search FAQs..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#2E7D32',
              },
            },
          }}
        />
      </Paper>
      
      {/* Category Filters */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            icon={category.icon}
            onClick={() => handleCategoryChange(category.id)}
            color={activeCategory === category.id ? 'primary' : 'default'}
            variant={activeCategory === category.id ? 'filled' : 'outlined'}
            sx={{
              px: 1,
              '&.MuiChip-colorPrimary': {
                bgcolor: '#2E7D32',
              },
              '&.MuiChip-outlined': {
                borderColor: '#2E7D32',
                color: '#2E7D32',
              }
            }}
          />
        ))}
      </Box>
      
      {/* FAQ Accordions */}
      <Box sx={{ mb: 6 }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
              sx={{
                mb: 1,
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&.Mui-expanded': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                }}
              >
                <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>No FAQs found</Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or category filter
            </Typography>
          </Paper>
        )}
      </Box>
      
      {/* Still Have Questions Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          bgcolor: '#E8F5E9', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: '#C8E6C9'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
              Still have questions?
            </Typography>
            <Typography variant="body1" paragraph>
              Our customer support team is here to help. Contact us via chat, email, or phone.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Link component={RouterLink} to="/contact" underline="none">
                <Chip 
                  label="Contact Us" 
                  color="primary" 
                  sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' } }} 
                />
              </Link>
              <Chip 
                label="Live Chat" 
                variant="outlined" 
                sx={{ borderColor: '#2E7D32', color: '#2E7D32' }} 
                onClick={() => document.querySelector('[aria-label="chat"]').click()}
              />
              <Chip 
                label="Email Support" 
                variant="outlined" 
                sx={{ borderColor: '#2E7D32', color: '#2E7D32' }} 
                component="a"
                href="mailto:support@smarthome.com"
                clickable
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <SupportIcon sx={{ fontSize: 100, color: '#2E7D32', opacity: 0.8 }} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default FAQs; 