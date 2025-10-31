import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import { SnackbarProvider } from "./Helpers/SnackBar/Snackbar.jsx";
import theme from "./theme.js"; // ✅ MUI theme with Inter font

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* ✅ global reset + Inter font */}
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    
  </StrictMode>
);
