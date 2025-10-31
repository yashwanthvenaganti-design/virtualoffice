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
  Forum,
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
  { label: "Greetings", icon: <Forum />, path: "/greetings" },
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

  // 🎨 AllDayPA Color Tokens
  const colors = {
    pink: "#e91e63", // hsl(325, 79%, 53%)
    pinkLight: "#f48fb1", // hsl(331, 70%, 73%)
    green: "#43a047", // hsl(148, 44%, 51%)
    cyan: "#4dd0e1", // hsl(180, 65%, 60%)
    orange: "#ff9800", // hsl(24, 95%, 53%)
    navy: "#2a2a45", // hsl(242, 28%, 19%)
  };

  // 🌈 MUI Theme Integration
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode
        ? {
            background: {
              // 🟣 Exact dark AllDayPA background gradient
              default:
                "linear-gradient(135deg, hsl(240 30% 10%) 0%, hsl(274 45% 18%) 50%, hsl(323 70% 22%) 100%)",
              paper: "rgba(30, 30, 50, 0.8)", // glass-like panels
            },
            text: {
              primary: "#ffffff",
              secondary: "#bdbdbd",
            },
            primary: { main: colors.pink },
            secondary: { main: colors.cyan },
            info: { main: colors.orange },
          }
        : {
            background: {
              // 🌤 Light gradient (unchanged)
              default:
                "linear-gradient(135deg, hsl(330 77% 95%) 0%, hsl(180 65% 92%) 50%, hsl(0 0% 98%) 100%)",
              paper: "#ffffff",
            },
            text: {
              primary: colors.navy,
              secondary: "#555555",
            },
            primary: { main: colors.pink },
            secondary: { main: colors.green },
            info: { main: colors.cyan },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: { borderRadius: 12 },
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
            background: theme.palette.background.default,
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
