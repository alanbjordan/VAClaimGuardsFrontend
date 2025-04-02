// src/components/Layout.jsx
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom'; // <-- IMPORTANT for nested routes
import { SidebarProvider } from './Sidebar/SidebarContext';
import Sidebar from './Sidebar/Sidebar';
import { useSidebar } from './Sidebar/SidebarContext';
import Header from './Dashboard/Header'; // Import your Header

function MainContent() {
  const { isCollapsed } = useSidebar();

  return (
    <Box
      sx={{
        // Since Header is *fixed*, give top padding so content isn't hidden behind the header
        pt: '80px',
        pl: isCollapsed ? '80px' : '280px',
        minHeight: '100vh',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: '1280px',
          mx: 'auto',   // Center horizontally
          px: 4,        // ~32px horizontal padding
          py: 4,        // ~32px vertical padding
        }}
      >
        {/* This is where the child route’s component will render */}
        <Outlet />
      </Box>
    </Box>
  );
}

function Layout() {
  return (
    <SidebarProvider>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {/* Sidebar on the left */}
        <Sidebar />
        
        {/* Main area with the pinned Header and our outlet */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* The pinned header (position="fixed" internally) */}
          <Header />
          
          {/* Our main content space, below the fixed header */}
          <MainContent />
        </Box>
      </Box>
    </SidebarProvider>
  );
}

export default Layout;
