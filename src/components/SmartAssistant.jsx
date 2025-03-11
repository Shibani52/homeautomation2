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
  Collapse
} from '@mui/material';
import { 
  Send as SendIcon, 
  SmartToy as BotIcon, 
  Close as CloseIcon,
  Psychology as AIIcon
} from '@mui/icons-material';

// Simple chatbot component
const SmartAssistant = () => {
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

  // Simple response mapping
  const responseMap = {
    "hello": "Hello! How can I help you today?",
    "hi": "Hi there! How can I assist you?",
    "how are you": "I'm doing well, thank you for asking! How can I help you with your smart home needs?",
    "what products": "We offer a variety of smart home products including smart bulbs, security cameras, thermostats, and more. What are you interested in?",
    "smart bulb": "Our smart bulbs offer 16 million colors, voice control, and can be scheduled through our app. They're energy efficient with a 25,000 hour lifespan.",
    "security camera": "Our security cameras feature 1080p HD video, night vision, motion detection, and two-way audio. They integrate seamlessly with our other smart home products.",
    "thermostat": "Our smart thermostats learn your preferences and help save energy. They can be controlled remotely and integrate with weather forecasts.",
    "shipping": "We offer free shipping on orders over ₹10,000. Standard delivery takes 3-5 business days.",
    "return policy": "You can return products within 30 days of delivery for a full refund, as long as they're in original condition.",
    "warranty": "All our products come with a 1-year manufacturer warranty. Premium products have extended warranty options.",
    "payment": "We accept all major credit/debit cards, UPI, net banking, and cash on delivery.",
    "installation": "We provide free installation for all smart home systems. Our technician will contact you within 24 hours of delivery.",
    "price": "Our products range from ₹1,999 for smart bulbs to ₹15,999 for advanced security systems. Can I help you with a specific product?",
    "discount": "Use code SMARTHOME10 for 10% off your first purchase. We also have seasonal sales throughout the year.",
    "app": "Our Smart Home app is available for both iOS and Android. It lets you control all your devices, set schedules, and monitor your home remotely."
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
    console.log("SmartAssistant - Generating response for:", query);
    setIsTyping(true);
    
    // Simulate API delay
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      console.log("SmartAssistant - Lowercase query:", lowercaseQuery);
      
      // Default response
      let response = "I'm not sure I understand. Could you please rephrase your question?";
      
      // Check each key in the responseMap
      for (const [key, value] of Object.entries(responseMap)) {
        console.log("SmartAssistant - Checking key:", key);
        if (lowercaseQuery.includes(key)) {
          console.log("SmartAssistant - Match found for key:", key);
          response = value;
          break;
        }
      }
      
      console.log("SmartAssistant - Final response:", response);
      
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1000);
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

  return (
    <>
      {/* Chat Button */}
      <Zoom in={true}>
        <Tooltip title={isOpen ? "Close Assistant" : "Smart Home Assistant"} placement="left">
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
              zIndex: 1000
            }}
            onClick={toggleChat}
          >
            {isOpen ? <CloseIcon /> : <AIIcon />}
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
            overflow: 'hidden'
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
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6">Smart Home Assistant</Typography>
            <IconButton size="small" onClick={toggleChat} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              p: 2,
              flexGrow: 1,
              overflow: 'auto',
              bgcolor: '#f8f9fa'
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
                      mt: 0.5
                    }}
                  >
                    <BotIcon fontSize="small" />
                  </Avatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    borderRadius: 2,
                    bgcolor: message.sender === 'user' ? '#E8F5E9' : 'white'
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
                  Assistant is thinking...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Chat Input */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'white',
              borderTop: '1px solid',
              borderColor: 'divider'
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
                    borderRadius: '20px'
                  }
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={input.trim() === '' || isTyping}
                sx={{
                  ml: 1,
                  color: '#2E7D32'
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

export default SmartAssistant; 