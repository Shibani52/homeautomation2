import { useState } from 'react';
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`policy-tabpanel-${index}`}
      aria-labelledby={`policy-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Policies() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Policies
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Our commitment to transparency and customer satisfaction
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ width: '100%' }}
        >
          <Tab label="Shipping Policy" />
          <Tab label="Returns Policy" />
          <Tab label="Privacy Policy" />
        </Tabs>

        {/* Shipping Policy */}
        <TabPanel value={value} index={0}>
          <Typography variant="h5" gutterBottom>
            Shipping Policy
          </Typography>
          <List sx={{ width: '100%' }}>
            <ListItem>
              <ListItemText
                primary="Processing Time"
                secondary="Orders are typically processed within 1-2 business days."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Shipping Methods"
                secondary="We offer Standard Shipping (5-7 business days) and Express Shipping (2-3 business days)."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Shipping Charges"
                secondary="Standard Shipping is free for orders over ₹10,000. Express Shipping has additional charges based on location."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Tracking"
                secondary="A tracking number will be provided via email once your order ships."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="International Shipping"
                secondary="We currently ship to the United States and Canada only."
              />
            </ListItem>
          </List>
        </TabPanel>

        {/* Returns Policy */}
        <TabPanel value={value} index={1}>
          <Typography variant="h5" gutterBottom>
            Returns Policy
          </Typography>
          <List sx={{ width: '100%' }}>
            <ListItem>
              <ListItemText
                primary="Return Window"
                secondary="Products can be returned within 30 days of delivery for a full refund."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Return Condition"
                secondary="Items must be unused, in original packaging, and include all accessories."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Return Process"
                secondary="Contact our customer service team to initiate a return and receive a return shipping label."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Refund Timeline"
                secondary="Refunds are processed within 5-7 business days after receiving the returned item."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Exceptions"
                secondary="Custom-configured items and opened software are not eligible for return unless defective."
              />
            </ListItem>
          </List>
        </TabPanel>

        {/* Privacy Policy */}
        <TabPanel value={value} index={2}>
          <Typography variant="h5" gutterBottom>
            Privacy Policy
          </Typography>
          <List sx={{ width: '100%' }}>
            <ListItem>
              <ListItemText
                primary="Information Collection"
                secondary="We collect personal information necessary for order processing, delivery, and customer support."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Data Usage"
                secondary="Your information is used to process orders, provide customer support, and improve our services."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Data Protection"
                secondary="We implement security measures to protect your personal information from unauthorized access."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Third-Party Sharing"
                secondary="We do not sell your personal information to third parties. Information is only shared with service providers necessary for order fulfillment."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Cookie Policy"
                secondary="We use cookies to enhance your shopping experience and provide personalized recommendations."
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Your Rights"
                secondary="You have the right to access, correct, or delete your personal information at any time."
              />
            </ListItem>
          </List>
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default Policies; 