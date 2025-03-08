import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
} from '@mui/icons-material';

const categories = [
  { name: 'Smart Lighting', path: '/products/smart-lighting' },
  { name: 'Security Systems', path: '/products/security' },
  { name: 'Climate Control', path: '/products/climate' },
];

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { sm: 'none' } }}
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Smart Home Hub
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {categories.map((category) => (
            <Button
              key={category.path}
              color="inherit"
              component={RouterLink}
              to={category.path}
            >
              {category.name}
            </Button>
          ))}
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Contact
          </Button>
        </Box>

        <IconButton
          color="inherit"
          component={RouterLink}
          to="/cart"
          sx={{ ml: 2 }}
        >
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.path}
              component={RouterLink}
              to={category.path}
              onClick={handleClose}
            >
              {category.name}
            </MenuItem>
          ))}
          <MenuItem component={RouterLink} to="/about" onClick={handleClose}>
            About
          </MenuItem>
          <MenuItem component={RouterLink} to="/contact" onClick={handleClose}>
            Contact
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 