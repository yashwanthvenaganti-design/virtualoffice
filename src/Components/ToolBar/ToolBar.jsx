import React, { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

import {
  Home,
  CalendarMonth,
  Message,
  Notifications,
  Public,
  Chat,
  Description,
  Edit,
  Note,
  Group,
  BarChart,
  Support,
  Star,
} from "@mui/icons-material";

// 📋 Sidebar Menu Items
const menuItems = [
  { label: "Home", icon: <Home />, path: "/" },
  {
    label: "Your Availability",
    icon: <CalendarMonth />,
    children: [
      { label: "Your Statuses", path: "/availabilities" },
      { label: "Add New Status", path: "/availabilities/add-status" },
    ],
  },
  { label: "Messages", icon: <Message />, path: "/messages" },
  { label: "APP Devices", icon: <Notifications />, path: "/app-devices" },
  { label: "Addresses", icon: <Public />, path: "/addresses" },
  { label: "Greetings", icon: <Chat />, path: "/greetings" },
  {
    label: "Invoices",
    icon: <Description />,
    children: [
      { label: "Your Invoices", path: "/invoices" },
      { label: "Invoice Settings", path: "/invoice-settings" },
    ],
  },
  {
    label: "Modify",
    icon: <Edit />,
    children: [
      { label: "Company Details", path: "/company-details" },
      { label: "Fax to Email", path: "/fax-to-email" },
      { label: "Communication Settings", path: "/modify/communication-settings" },
      { label: "Operating Hours", path: "/modify/operating-hours" },
    ],
  },
  {
    label: "Notify Your PA",
    icon: <Note />,
    children: [{ label: "Your Notes", path: "/notes" }],
  },
  { label: "Staff", icon: <Group />, path: "/staff" },
  { label: "Statistics", icon: <BarChart />, path: "/statistics" },
  {
    label: "Support",
    icon: <Support />,
    children: [
      { label: "Useful Number", path: "/useful-numbers" },
      { label: "Feedback", path: "/feedback-form" },
    ],
  },
  { label: "VIPs", icon: <Star />, path: "/vips" },
];

export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // 🎨 Theme with Custom Dark Palette
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode
        ? {
            // 🌙 Custom Dark Palette
            background: {
              default: "rgba(17, 24, 39, 0.8)", // main app background
              paper: "rgba(31, 41, 55, 0.9)", // cards, tables, etc.
            },
            text: {
              primary: "#ffffff",
              secondary: "#cbd5e1", // soft gray
            },
            divider: "rgba(255, 255, 255, 0.1)",
            primary: {
              main: "#3b82f6", // blue accent
            },
          }
        : {
            // ☀️ Light Mode Palette
            background: {
              default: "#f4f4f4",
              paper: "#ffffff",
            },
            text: {
              primary: "#111111",
              secondary: "#555555",
            },
            divider: "rgba(0,0,0,0.1)",
            primary: {
              main: "#1976d2", // MUI blue
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
  });

  const drawerWidth = sidebarOpen && !isMobile ? 240 : 70;
  const handleDrawerToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* 🔹 Header */}
        <Header
          onMenuClick={handleDrawerToggle}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* 🔹 Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={handleDrawerToggle}
          menuItems={menuItems}
        />

        {/* 🔹 Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8,
            px: 3,
            pb: 3,
            mt: 8,
            ml: { xs: 0, md: `${drawerWidth}px` },
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            transition: "all 0.3s ease",
            overflowY: "auto",
            borderRadius: "12px 0 0 0",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
