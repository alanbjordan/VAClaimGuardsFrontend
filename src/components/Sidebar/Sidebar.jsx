import React, { useState, useContext } from 'react';
import { Box, Menu, MenuItem as MuiMenuItem } from '@mui/material';
import {
  Home, Search, FileText, Settings, HelpCircle,
  Pin, BookText, BriefcaseMedical, List,
  FileTerminal, Hammer, FolderKanban,
  // NEW: import Bot (or any other icon you'd like for AI Agent)
  Bot,
  MessageSquare,
  Video
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useSidebar } from './SidebarContext';
import Logo from './Logo';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';
import { AuthContext } from '../../AuthContext';
import Profile from './Profile';
import SupportModal from './SupportModal';

// Import our collapsible menu component
import CollapsibleMenuItem from './CollapsibleMenuItem';

function Sidebar() {
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const handleSettingsClick = (event) => setAnchorEl(event.currentTarget);
  const handleSettingsClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleSettingsClose();
    navigate('/', { replace: true });
  };

  // We consider any of these paths to be "within Claim Builder"
  const claimBuilderPaths = [
    '/claimbuilder',
    '/statements',
    '/conditions',
    '/documents',
    '/saved-decisions'
  ];
  const isClaimBuilderActive = claimBuilderPaths.includes(window.location.pathname);

  // Paths under AI Agent
  const aiAgentPaths = ['/chat', '/allchats'];
  const isAiAgentActive = aiAgentPaths.includes(window.location.pathname);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isCollapsed ? '80px' : '280px',
        height: '100vh',
        backgroundColor: '#051246',
        zIndex: (theme) => theme.zIndex.drawer,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Logo />

      <Box sx={{ mt: 2, flex: 1, overflowY: 'auto' }}>
        <MenuSection title="General">
          {/* 1) Dashboard */}
          <MenuItem
            icon={Home}
            label="Dashboard"
            isActive={window.location.pathname === '/dashboard'}
            onClick={() => navigate('/dashboard')}
          />
            <MenuItem
              icon={BriefcaseMedical}
              label="My Conditions"
              isActive={window.location.pathname === '/conditions'}
              onClick={() => navigate('/conditions')}

            />
            <MenuItem
              icon={FileTerminal}
              label="Documents"
              isActive={window.location.pathname === '/documents'}
              onClick={() => navigate('/documents')}

            />
          <MenuItem
            icon={Search}
            label="BVA Search"
            isActive={window.location.pathname === '/bvasearch'}
            onClick={() => navigate('/bvasearch')}
          />
          </MenuSection>

          <MenuSection title="Claims">

            <MenuItem
              icon={FolderKanban}
              label="Claim Overview"
              isActive={window.location.pathname === '/claims'}
              onClick={() => navigate('/claims')}
            />
            <MenuItem
              icon={FileText}
              label="Statement Generator"
              isActive={window.location.pathname === '/statements'}
              onClick={() => navigate('/statements')}

            />
            <MenuItem
              icon={MessageSquare}
              label="New Chat"
              isActive={window.location.pathname === '/chat'}
              onClick={() => navigate('/chat')}
            />
            <MenuItem
              icon={List}
              label="All Chats"
              isActive={window.location.pathname === '/all-chats'}
              onClick={() => navigate('/all-chats')}
            />
          </MenuSection>
          <MenuSection title="Resources">
          <MenuItem
            icon={Settings}
            label="Settings"
            isActive={window.location.pathname === '/account'}
            onClick={() => navigate('/account')}
          />
          <MenuItem
            icon={Video}
            label="Tutorials"
            onClick={() => window.open('https://www.youtube.com/@vetraeus', '_blank')}
          />
          <MenuItem
            icon={HelpCircle}
            label="Support"
            onClick={() => setIsSupportOpen(true)}
          />
        </MenuSection>
      </Box>

      <Box sx={{ p: 2 }}>
        <Profile onLogout={handleLogout} />
      </Box>

      {/* Dropdown menu (for collapsed settings, if still wanted) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isCollapsed ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isCollapsed ? 'right' : 'left',
        }}
      >
        <MuiMenuItem onClick={handleLogout}>Logout</MuiMenuItem>
      </Menu>

      {/* Support Modal */}
      <SupportModal
        open={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </Box>
  );
}

export default Sidebar;
