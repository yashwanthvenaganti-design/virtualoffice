import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore, Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Sidebar({ open, onClose, menuItems }) {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Track current path
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const collapsed = !open && !isMobile;
  const drawerWidth = collapsed ? 70 : 240;

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
        transition: "width 0.3s ease",
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Box>
        {/* Logo */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <Box
            component="img"
            src="https://virtualoffice.dev.adhkistaging.com/static/img/adp-logo-white.png"
            alt="Logo"
            sx={{
              width: collapsed ? 32 : 40,
              height: collapsed ? 32 : 40,
              borderRadius: 2,
              objectFit: "contain",
              filter: theme.palette.mode === "dark" ? "invert(1)" : "invert(0)",
            }}
          />
        </Box>

        <Divider />

        {/* Menu Items */}
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => {
            // ✅ Detect if this item is active or one of its children is active
            const isActive =
              location.pathname === item.path ||
              (item.children &&
                item.children.some((sub) => location.pathname === sub.path));

            return (
              <Box key={item.label}>
                <Tooltip title={collapsed ? item.label : ""} placement="right">
                  <ListItemButton
                    onClick={() => {
                      if (item.children) handleToggle(item.label);
                      else {
                        navigate(item.path);
                        if (isMobile) onClose();
                      }
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.08)"
                            : "#f5f5f5",
                      },
                      px: 2,
                      justifyContent: collapsed ? "center" : "flex-start",
                      minHeight: 48,
                      transition: "all 0.3s ease",
                      // ✅ Highlight selected item in light pink
                      backgroundColor: isActive
                        ? "#ffe6ea" // soft pink highlight
                        : "transparent",
                      borderRight: isActive ? "4px solid #f06292" : "none",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive
                          ? "#d81b60" // deeper pink icon when active
                          : theme.palette.text.primary,
                        minWidth: 0,
                        mr: collapsed ? 0 : 2,
                        display: "flex",
                        justifyContent: "center",
                        width: 36,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {!collapsed && (
                      <ListItemText
                        primary={
                          <Typography
                            fontWeight={isActive ? 700 : 600}
                            fontSize={14}
                            color={
                              isActive ? "#d81b60" : theme.palette.text.primary
                            }
                          >
                            {item.label}
                          </Typography>
                        }
                      />
                    )}

                    {!collapsed &&
                      item.children &&
                      (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </Tooltip>

                {/* Submenu */}
                {!collapsed && item.children && (
                  <Collapse
                    in={openMenus[item.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.children.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <ListItemButton
                            key={sub.label}
                            sx={{
                              pl: 7,
                              py: 0.5,
                              "&:hover": {
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.05)"
                                    : "#f9f9f9",
                              },
                              backgroundColor: isSubActive
                                ? "#ffe6ea"
                                : "transparent",
                              borderRight: isSubActive
                                ? "4px solid #f06292"
                                : "none",
                            }}
                            onClick={() => {
                              navigate(sub.path);
                              if (isMobile) onClose();
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <Add
                                fontSize="small"
                                sx={{
                                  color: isSubActive ? "#d81b60" : "#999",
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  fontSize={13}
                                  color={
                                    isSubActive
                                      ? "#d81b60"
                                      : "text.secondary"
                                  }
                                >
                                  {sub.label}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          height: "100vh",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          boxShadow:
            theme.palette.mode === "dark"
              ? "2px 0 8px rgba(255,255,255,0.05)"
              : "2px 0 8px rgba(0,0,0,0.04)",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
