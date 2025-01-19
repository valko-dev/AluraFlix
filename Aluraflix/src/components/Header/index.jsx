import { Box, Typography } from "@mui/material";
import React from "react";

export default function Header() {
    return (
        <Box
          component="header"
          sx={{
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            padding: "16px",
            color: "white"
          }}
        >
          {/* Imagen opcional */}
          {/* <img src="img/logo.png" alt="Logo de Space App" style={{ marginRight: "16px" }} /> */}
          
          <Typography variant="h4" component="h1">
            AluraFlix
          </Typography>
        </Box>
      );
    
}
