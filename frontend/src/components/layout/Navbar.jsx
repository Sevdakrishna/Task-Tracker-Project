import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Tracker
          </Typography>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;