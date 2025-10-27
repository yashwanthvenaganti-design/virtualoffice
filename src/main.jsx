import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ import router
import App from "./App.jsx";
import { SnackbarProvider } from "./Helpers/SnackBar/Snackbar.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
 
  </StrictMode>
);
