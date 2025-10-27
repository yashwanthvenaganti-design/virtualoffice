import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
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
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

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

export default function ResponsiveSidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 🔹 Controls sidebar open/close for both desktop & mobile
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Handle menu click (toggles for both)
  const handleDrawerToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Header with Menu icon */}
      <Header onMenuClick={handleDrawerToggle} />

      {/* Sidebar for all devices */}
      <Sidebar
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        menuItems={menuItems}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: 8, // offset for fixed header
          transition: "margin 0.3s ease",
          ml: sidebarOpen && !isMobile ? "240px" : 0, // shifts only on desktop
          width: "100%",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
