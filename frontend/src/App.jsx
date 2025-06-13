
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/register" element={<div>Register Page</div>} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;