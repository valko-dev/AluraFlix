import { Box, Typography } from "@mui/material";
import React from "react";
export default function Footer() {
  return (
    <Box sx={{  backgroundColor: "red",
        padding: "16px",
        color: "white",
        position: "relative",
        bottom: 0,
        width: "100%", }}>
      <Typography variant="body2">Developed by Valeria Kocar</Typography>
    </Box>
  );
}
