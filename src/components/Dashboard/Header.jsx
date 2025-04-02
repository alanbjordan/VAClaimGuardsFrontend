// Dashboard/Header.jsx

import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  Backdrop,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomBox from "./Header/CustomBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSidebar } from "../Sidebar/SidebarContext";
import { AuthContext } from "../../AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Sidebar info
  const { isCollapsed } = useSidebar();

  // AuthContext: fetch logout & creditsRemaining
  const { logout, creditsRemaining } = useContext(AuthContext);

  // Retrieve user’s first name from localStorage (or any other source)
  const userFirstName = localStorage.getItem("first_name") || "Admin";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/signin", { replace: true });
  };

  const handleDocumentation = () => {
    // For example, open a new tab or navigate internally:
    window.open("https://yoursite.com/docs", "_blank");
    handleMenuClose();
  };

  const handleSupport = () => {
    // Possibly open a modal or navigate to a support page
    navigate("/support");
    handleMenuClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        sx={{
          top: 0,
          left: isCollapsed ? "80px" : "280px",
          width: isCollapsed ? "calc(100% - 80px)" : "calc(100% - 280px)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: 60,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#f6f6f6",
          transition: "all 0.3s ease-in-out",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{
            minHeight: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1280px",
            mx: "auto",
          }}
        >
          {/* Left side (logo or search) */}
          <CustomBox />

          {/* Right side items */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Chat Icon */}
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>

            {/* Notifications Icon */}
            <IconButton>
              <NotificationsIcon />
            </IconButton>

            {/* User Avatar / Profile Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              
              <Box sx={{ textAlign: "left" }}>
                <Typography fontWeight="bold" variant="body2">
                  {userFirstName}
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Admin
                </Typography>
              </Box>
              <IconButton onClick={handleMenuOpen}>
                <ArrowDropDownIcon />
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {/* Credits info (disabled item or just text) */}
              <MenuItem disabled>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Credits: {creditsRemaining}
                </Typography>
              </MenuItem>

              {/* Optional divider if you want to group items */}
              <Divider sx={{ my: 1 }} />

              <MenuItem
                onClick={handleDocumentation}
              >
                Documentation
              </MenuItem>

              <MenuItem
                onClick={handleSupport}
              >
                Support
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate("/account");
                  handleMenuClose();
                }}
              >
                Settings
              </MenuItem>

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Backdrop
        open={false}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 2 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Header;
