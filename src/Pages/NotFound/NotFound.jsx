// src/pages/NotFound.jsx

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight={600} color="text.primary">
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        Sorry, we couldn’t find the page or component you’re looking for.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3, textTransform: "none" }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
