// Dashboard/Header/CustomBox.jsx

import React from "react";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const CustomBox = () => {
  return (
    <Box
      sx={{
        width: 388,
        height: 38,
        display: "flex",
        alignItems: "center",
        padding: "0 16px", // Padding inside the box
        backgroundColor: "#FFFFFF",
        borderRadius: "19px",
        border: "0.6px solid",
        borderColor: "#d5d5d5",
      }}
    >
      {/* Search Icon */}
      <SearchIcon sx={{ color: "#B0B0B0", marginRight: "8px" }} />
      {/* Input Text */}
      <InputBase
        placeholder="Search"
        sx={{
          flex: 1,
          fontSize: "0.875rem",
          color: "#6B7280",
        }}
      />
    </Box>
  );
};

export default CustomBox;
