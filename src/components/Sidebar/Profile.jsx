import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const Profile = ({ onLogout, isCollapsed }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: isCollapsed ? "column" : "row",
        alignItems: "center",
        justifyContent: "flex-start",
        px: 2,
        py: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 2,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        width: "100%",
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer", // Make the entire box clickable
      }}
      onClick={onLogout} // Attach onClick to the whole Paper
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}
      >
        <LogoutIcon
          sx={{
            width: 24,
            height: 24,
            color: "white",
            transform: "rotate(180deg)", // Flip the icon to point left
            transition: "transform 0.3s ease",
            mr: isCollapsed ? 0 : 1, // Add spacing in expanded state
          }}
        />
      </Box>
      {!isCollapsed && (
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Montserrat, Helvetica",
            fontWeight: 400,
            color: "white",
            fontSize: "1rem",
            lineHeight: "1.2rem",
            whiteSpace: "nowrap",
          }}
        >
          Log Out
        </Typography>
      )}
    </Paper>
  );
};

export default Profile;
