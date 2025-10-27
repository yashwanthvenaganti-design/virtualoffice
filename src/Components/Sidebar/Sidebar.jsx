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
  Button,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore, Add, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Sidebar({ open, onClose, menuItems }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
      }}
    >
      <Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="#e91e63">
            Virtual Office
          </Typography>
        </Box>

        <List>
          {menuItems.map((item) => (
            <Box key={item.label}>
              <ListItemButton
                onClick={() => {
                  if (item.children) handleToggle(item.label);
                  else {
                    navigate(item.path);
                    if (isMobile) onClose();
                  }
                }}
                sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
              >
                <ListItemIcon sx={{ color: "#007b42" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontWeight={600} fontSize={14}>
                      {item.label}
                    </Typography>
                  }
                />
                {item.children &&
                  (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {item.children && (
                <Collapse
                  in={openMenus[item.label]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((sub) => (
                      <ListItemButton
                        key={sub.label}
                        sx={{ pl: 6 }}
                        onClick={() => {
                          navigate(sub.path);
                          if (isMobile) onClose();
                        }}
                      >
                        <ListItemIcon>
                          <Add fontSize="small" sx={{ color: "#777" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography fontSize={13} color="text.secondary">
                              {sub.label}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 1 }}>
        <Divider sx={{ mb: 2 }} />
        <Button
          variant="contained"
          fullWidth
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#e91e63",
            "&:hover": { bgcolor: "#c2185b" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="persistent" // ✅ stays open until toggled
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          height: "100vh",
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
