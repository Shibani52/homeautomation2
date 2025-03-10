import { useState, useRef, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar, 
  Box, 
  Fab, 
  Zoom, 
  Tooltip, 
  CircularProgress,
  Collapse,
  Badge
} from '@mui/material';
import { 
  Send as SendIcon, 
  SmartToy as BotIcon, 
  Close as CloseIcon,
  QuestionAnswer as QuestionIcon,
  ArrowUpward as ScrollTopIcon,
  Psychology as AIIcon,
  SmartToyOutlined as RobotIcon
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Define a pulsing animation
const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(46, 125, 50, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(46, 125, 50, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(46, 125, 50, 0);
  }
`;

// Define a subtle floating animation for the robot icon
const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Define a thinking animation for the robot icon
const thinkingAnimation = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I'm your Smart Home assistant. How can I help you today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Sample responses for common questions
  const sampleResponses = {
    'shipping': "We offer free shipping on all orders above ₹10,000. Standard delivery takes 3-5 business days.",
    'return': "Our return policy allows you to return products within 30 days of delivery for a full refund.",
    'warranty': "All our smart home products come with a 1-year manufacturer warranty.",
    'payment': "We accept all major credit/debit cards, UPI, net banking, and cash on delivery.",
    'installation': "We provide free installation for all our smart home systems. Our technician will contact you within 24 hours of delivery.",
    'compatibility': "Our smart home devices are compatible with Amazon Alexa, Google Assistant, and Apple HomeKit.",
    'discount': "You can use code SMARTHOME10 for 10% off on your first purchase.",
    'track': "You can track your order in the 'My Orders' section of your account.",
    'cancel': "Orders can be cancelled anytime before shipping. Once shipped, you'll need to return the product.",
    'hello': "Hello! How can I assist you with your smart home needs today?",
    'hi': "Hi there! How can I help you with your smart home shopping experience?",
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query) => {
    setIsTyping(true);
    
    // Simulate API delay
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      let response = "I'm not sure about that. Would you like me to connect you with customer support?";
      
      // Check for keywords in the query
      for (const [keyword, answer] of Object.entries(sampleResponses)) {
        if (lowercaseQuery.includes(keyword)) {
          response = answer;
          break;
        }
      }
      
      // Product specific responses
      if (lowercaseQuery.includes('smart bulb') || lowercaseQuery.includes('led')) {
        response = "Our Smart LED Bulbs support 16 million colors and can be controlled via voice commands or our mobile app. They're energy-efficient and have a lifespan of 25,000 hours.";
      } else if (lowercaseQuery.includes('camera') || lowercaseQuery.includes('security')) {
        response = "Our Smart Security Cameras offer 1080p HD video, night vision, motion detection, and two-way audio. They integrate seamlessly with our Smart Home ecosystem.";
      } else if (lowercaseQuery.includes('thermostat') || lowercaseQuery.includes('temperature')) {
        response = "Our Smart Thermostats learn your schedule and preferences to optimize energy usage. They can be controlled remotely and integrate with weather forecasts.";
      }
      
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    generateResponse(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Chat Button */}
      <Zoom in={true}>
        <Tooltip title={isOpen ? "Close Assistant" : "AI Smart Home Assistant"} placement="left">
          <Fab
            color="primary"
            aria-label="chat"
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              bgcolor: '#2E7D32',
              '&:hover': {
                bgcolor: '#1B5E20',
              },
              zIndex: 1000,
              animation: !isOpen ? `${pulseAnimation} 2s infinite` : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={toggleChat}
          >
            {isOpen ? (
              <CloseIcon />
            ) : (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                badgeContent={
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#4caf50',
                      border: '2px solid white',
                    }}
                  />
                }
              >
                <AIIcon sx={{ fontSize: 26 }} />
              </Badge>
            )}
          </Fab>
        </Tooltip>
      </Zoom>

      {/* Chat Window */}
      <Collapse in={isOpen} timeout={300}>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: { xs: '90%', sm: 350 },
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid rgba(46, 125, 50, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: '#2E7D32',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(90deg, #2E7D32 0%, #388E3C 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  mr: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      animation: `${pulseAnimation} 2s infinite`,
                    },
                  }}
                >
                  <RobotIcon 
                    sx={{ 
                      animation: `${floatAnimation} 2s infinite ease-in-out`,
                      fontSize: 22,
                      color: 'white',
                    }} 
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>
                  AI Smart Home Assistant
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Powered by Smart Home AI
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={toggleChat} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box
            ref={chatContainerRef}
            sx={{
              p: 2,
              flexGrow: 1,
              overflow: 'auto',
              bgcolor: '#f8f9fa',
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(46, 125, 50, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(46, 125, 50, 0.05) 2%, transparent 0%)',
              backgroundSize: '100px 100px',
              position: 'relative',
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                {message.sender === 'bot' && (
                  <Avatar
                    sx={{
                      bgcolor: '#2E7D32',
                      width: 32,
                      height: 32,
                      mr: 1,
                      mt: 0.5,
                      border: '2px solid rgba(46, 125, 50, 0.2)',
                    }}
                  >
                    <RobotIcon fontSize="small" />
                  </Avatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    borderRadius: 2,
                    bgcolor: message.sender === 'user' ? '#E8F5E9' : 'white',
                    borderTopRightRadius: message.sender === 'user' ? 0 : 2,
                    borderTopLeftRadius: message.sender === 'bot' ? 0 : 2,
                    boxShadow: message.sender === 'bot' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                    border: message.sender === 'user' ? '1px solid rgba(46, 125, 50, 0.3)' : 'none',
                    position: 'relative',
                    '&::before': message.sender === 'bot' ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05) 0%, transparent 100%)',
                      borderRadius: 'inherit',
                      pointerEvents: 'none',
                    } : {},
                  }}
                >
                  <Typography variant="body2">{message.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{ display: 'block', mt: 0.5, color: 'text.secondary', textAlign: message.sender === 'user' ? 'right' : 'left' }}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 5 }}>
                <CircularProgress size={16} sx={{ mr: 1, color: '#2E7D32' }} />
                <Typography variant="body2" color="text.secondary">
                  AI Assistant is thinking...
                </Typography>
                <RobotIcon 
                  fontSize="small" 
                  sx={{ 
                    ml: 1, 
                    color: '#2E7D32', 
                    animation: `${thinkingAnimation} 1.5s infinite ease-in-out`,
                    fontSize: 16
                  }} 
                />
              </Box>
            )}
            <div ref={messagesEndRef} />

            {/* Scroll to top button */}
            {messages.length > 5 && (
              <Fab
                size="small"
                color="primary"
                aria-label="scroll to top"
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  opacity: 0.7,
                  bgcolor: '#2E7D32',
                  '&:hover': {
                    bgcolor: '#1B5E20',
                    opacity: 1,
                  },
                }}
                onClick={scrollToTop}
              >
                <ScrollTopIcon fontSize="small" />
              </Fab>
            )}
          </Box>

          {/* Chat Input */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'white',
              borderTop: '1px solid',
              borderColor: 'divider',
              background: 'linear-gradient(180deg, #f8f9fa 0%, white 100%)',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <TextField
                fullWidth
                placeholder="Ask me anything..."
                variant="outlined"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    '&.Mui-focused fieldset': {
                      borderColor: '#2E7D32',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#2E7D32',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px',
                  },
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={input.trim() === '' || isTyping}
                sx={{
                  ml: 1,
                  color: '#2E7D32',
                  bgcolor: input.trim() !== '' ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(46, 125, 50, 0.2)',
                  },
                  '&.Mui-disabled': {
                    color: 'rgba(0, 0, 0, 0.26)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </>
  );
};

export default AIAssistant; 