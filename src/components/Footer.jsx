import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Smart Home Hub
            </Typography>
            <Typography variant="body2">
              Making your home smarter, safer, and more efficient with cutting-edge automation solutions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              About Us
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Contact Us
            </Link>
            <Link
              component={RouterLink}
              to="/policies"
              color="inherit"
              display="block"
            >
              Policies
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <LinkedIn />
            </IconButton>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} Smart Home Hub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; 