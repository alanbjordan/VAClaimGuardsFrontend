// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define the extended MUI theme here
const theme = createTheme({
  palette: {
    primary: {
      main: '#051246', // Matches sidebar background color
    },
    secondary: {
      main: '#688E26', // Secondary brand color
    },
    accent: {
      main: '#FFD700', // Accent color (e.g., highlights, buttons)
    },
    text: {
      primary: '#383838',  // Matches app general text
      secondary: '#A9A9A9', // Subtle/neutral text
    },
    background: {
      default: '#FFFFF', // App background
      paper: '#FFFFFF',   // Surfaces (cards, containers)
    },
    surface: {
      50: '#F8F8F2', // Additional light surface tones
      100: '#F5F5F5',
      200: '#E9E9E9',
    },
    action: {
      hover: 'rgba(80, 61, 110, 0.03)', // Sidebar hover state
      selected: '#C91217', // Active menu item (matches Figma)
    },
  },
  typography: {
    fontFamily: 'Apercu Pro, "Helvetica Neue", Helvetica, Tahoma, Geneva, Arial, sans-serif',
    h1: {
      fontSize: '2rem', // Customize header sizes if needed
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem', // Base text size
    },
    button: {
      textTransform: 'none', // Prevent uppercase transformation
    },
  },
  shadows: [
    'none',                          // elevation 0
    '0 2px 8px rgba(0, 0, 0, 0.05)', // elevation 1 (soft)
    '0 4px 12px rgba(0, 0, 0, 0.05)',// elevation 2 (card)
    ...Array(22).fill('none')        // Fill out the rest (3–24)
  ],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
