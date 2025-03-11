import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Badge,
  Tooltip,
  Zoom
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon
} from '@mui/icons-material';

// Very simple chatbot with hardcoded responses
const BasicChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([
    { text: "Hello! I'm your Smart Home assistant. How can I help you today?", sender: 'bot' }
  ]);
  // Add debug mode state
  const [debugMode, setDebugMode] = useState(false);
  // Add badge state
  const [showBadge, setShowBadge] = useState(true);
  // Add tooltip state
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Show tooltip after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) {
        setTooltipOpen(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setTooltipOpen(false);
        }, 5000);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [open]);

  // Hide badge when chat is opened
  useEffect(() => {
    if (open) {
      setShowBadge(false);
    }
  }, [open]);

  // Hardcoded responses - completely different implementation
  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Log the input and processing
    console.log('Processing message:', lowerMessage);
    
    // Offers and discounts
    if (lowerMessage.includes('offer') || 
        lowerMessage.includes('discount') || 
        lowerMessage.includes('deal') || 
        lowerMessage.includes('sale') || 
        lowerMessage.includes('promotion') || 
        lowerMessage.includes('coupon')) {
      console.log('Matched: offers/discounts');
      return "We currently have several offers: 20% off on all smart bulbs, buy one get one free on security cameras, and free installation on purchases above ₹20,000. Use code SMARTHOME10 for an additional 10% off on your first purchase!";
    }
    
    // Product questions
    if (lowerMessage.includes('bulb') || 
        lowerMessage.includes('light') || 
        lowerMessage.includes('lamp') || 
        lowerMessage.includes('lighting')) {
      console.log('Matched: bulbs/lights');
      return "Our Smart LED Bulbs offer 16 million colors, voice control, and can be scheduled through our app. They're energy efficient with a 25,000 hour lifespan.";
    }
    
    if (lowerMessage.includes('camera') || 
        lowerMessage.includes('security') || 
        lowerMessage.includes('surveillance') || 
        lowerMessage.includes('cctv')) {
      console.log('Matched: cameras/security');
      return "Our security cameras feature 1080p HD video, night vision, motion detection, and two-way audio. They integrate seamlessly with our other smart home products.";
    }
    
    if (lowerMessage.includes('thermostat') || 
        lowerMessage.includes('temperature') || 
        lowerMessage.includes('heating') || 
        lowerMessage.includes('cooling') || 
        lowerMessage.includes('climate')) {
      console.log('Matched: thermostat/temperature');
      return "Our smart thermostats learn your preferences and help save energy. They can be controlled remotely and integrate with weather forecasts.";
    }
    
    // Shipping and returns
    if (lowerMessage.includes('shipping') || 
        lowerMessage.includes('delivery') || 
        lowerMessage.includes('ship') || 
        lowerMessage.includes('receive') || 
        lowerMessage.includes('when will') || 
        lowerMessage.includes('how long')) {
      console.log('Matched: shipping/delivery');
      return "We offer free shipping on orders over ₹10,000. Standard delivery takes 3-5 business days.";
    }
    
    if (lowerMessage.includes('return') || 
        lowerMessage.includes('refund') || 
        lowerMessage.includes('money back') || 
        lowerMessage.includes('exchange')) {
      console.log('Matched: returns/refunds');
      return "You can return products within 30 days of delivery for a full refund, as long as they're in original condition.";
    }
    
    // Payment and pricing
    if (lowerMessage.includes('payment') || 
        lowerMessage.includes('pay') || 
        lowerMessage.includes('transaction') || 
        lowerMessage.includes('card') || 
        lowerMessage.includes('upi') || 
        lowerMessage.includes('cash')) {
      console.log('Matched: payment');
      return "We accept all major credit/debit cards, UPI, net banking, and cash on delivery.";
    }
    
    if (lowerMessage.includes('price') || 
        lowerMessage.includes('cost') || 
        lowerMessage.includes('how much') || 
        lowerMessage.includes('expensive') || 
        lowerMessage.includes('cheap')) {
      console.log('Matched: price/cost');
      return "Our products range from ₹1,999 for smart bulbs to ₹15,999 for advanced security systems. Can I help you with a specific product?";
    }
    
    // Product catalog
    if (lowerMessage.includes('product') || 
        lowerMessage.includes('what do you sell') || 
        lowerMessage.includes('what do you offer') || 
        lowerMessage.includes('catalog') || 
        lowerMessage.includes('items') || 
        lowerMessage.includes('devices') || 
        lowerMessage.includes('what are your') || 
        lowerMessage.includes('what products')) {
      console.log('Matched: products/catalog');
      return "We offer a wide range of smart home products including: Smart LED Bulbs, Security Cameras, Smart Locks, Thermostats, Motion Sensors, Smart Plugs, and complete Home Automation Systems. What product are you interested in?";
    }
    
    // General questions
    if (lowerMessage.includes('hello') || 
        lowerMessage.includes('hi') || 
        lowerMessage.includes('hey') || 
        lowerMessage.includes('greetings') || 
        lowerMessage.includes('good morning') || 
        lowerMessage.includes('good afternoon') || 
        lowerMessage.includes('good evening')) {
      console.log('Matched: greeting');
      return "Hello! How can I help you with your smart home needs today?";
    }
    
    if (lowerMessage.includes('thank') || 
        lowerMessage.includes('appreciate') || 
        lowerMessage.includes('helpful')) {
      console.log('Matched: thanks');
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Default response
    console.log('No match found, using default response');
    return "I'm not sure I understand. Could you please rephrase your question? You can ask about our products, offers, shipping, returns, or payment options.";
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Check for debug mode toggle
    if (input.toLowerCase() === 'debug mode') {
      setDebugMode(!debugMode);
      setConversation(prev => [...prev, 
        { text: input, sender: 'user' },
        { text: debugMode ? "Debug mode turned OFF" : "Debug mode turned ON - console logs will show matching patterns", sender: 'bot' }
      ]);
      setInput('');
      return;
    }
    
    // Add user message to conversation
    const userMessage = { text: input, sender: 'user' };
    setConversation([...conversation, userMessage]);
    
    // Get bot response
    const botResponse = { text: getResponse(input), sender: 'bot' };
    
    // If in debug mode, add additional debug info
    if (debugMode) {
      console.log('Debug info:', {
        userInput: input,
        lowercaseInput: input.toLowerCase(),
        responseText: botResponse.text
      });
    }
    
    // Simulate typing delay
    setTimeout(() => {
      setConversation(prev => [...prev, botResponse]);
    }, 1000);
    
    // Clear input
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat button with enhanced styling */}
      <Tooltip
        title="Ask me anything about our smart home products!"
        open={tooltipOpen}
        onClose={() => setTooltipOpen(false)}
        onOpen={() => setTooltipOpen(true)}
        placement="left"
        TransitionComponent={Zoom}
        arrow
      >
        <Badge
          color="error"
          variant="dot"
          invisible={!showBadge}
          overlap="circular"
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            zIndex: 1001,
            '& .MuiBadge-badge': {
              width: 12,
              height: 12,
              borderRadius: '50%',
            }
          }}
        >
          <Fab
            color="primary"
            aria-label="chat"
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              backgroundColor: '#2E7D32',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              width: 65,
              height: 65,
              zIndex: 1000,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#1B5E20',
                transform: 'scale(1.05)',
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
              }
            }}
            onClick={handleOpen}
          >
            <ChatIcon style={{ fontSize: 30 }} />
          </Fab>
        </Badge>
      </Tooltip>

      {/* Pulsing effect for the chat button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          width: 65,
          height: 65,
          borderRadius: '50%',
          backgroundColor: 'rgba(46, 125, 50, 0.3)',
          zIndex: 999,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 0.7,
            },
            '50%': {
              transform: 'scale(1.2)',
              opacity: 0.3,
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 0.7,
            },
          },
          display: open ? 'none' : 'block',
        }}
      />

      {/* Chat dialog with enhanced styling */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '380px',
            height: '550px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#2E7D32',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ChatIcon sx={{ mr: 1.5, fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Smart Home Assistant</Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              } 
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent
          sx={{
            flexGrow: 1,
            padding: 2,
            overflow: 'auto',
            backgroundColor: '#f8f9fa',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url("https://www.transparenttextures.com/patterns/cubes.png")',
          }}
        >
          <List>
            {conversation.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  padding: 0.5,
                  marginBottom: 1,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    padding: '10px 16px',
                    maxWidth: '85%',
                    backgroundColor: message.sender === 'user' ? '#E8F5E9' : 'white',
                    borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: message.sender === 'user' 
                      ? '0 2px 8px rgba(46, 125, 50, 0.15)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border: message.sender === 'user' 
                      ? '1px solid rgba(46, 125, 50, 0.1)' 
                      : '1px solid rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <ListItemText 
                    primary={message.text} 
                    primaryTypographyProps={{
                      style: { 
                        color: message.sender === 'user' ? '#1B5E20' : '#333',
                        fontWeight: message.sender === 'user' ? 500 : 400,
                        lineHeight: 1.5,
                      }
                    }}
                  />
                </Paper>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        
        <DialogActions
          sx={{
            padding: '16px 24px',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ display: 'flex', width: '100%' }}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#2E7D32',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2E7D32',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              disabled={input.trim() === ''}
              sx={{
                marginLeft: 1,
                backgroundColor: '#2E7D32',
                borderRadius: '24px',
                minWidth: '50px',
                '&:hover': {
                  backgroundColor: '#1B5E20',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <SendIcon />
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BasicChatbot; 