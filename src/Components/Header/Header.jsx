import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  useTheme,
  Menu,
  MenuItem,
  Typography,
  Chip,
  List,
  ListItemButton,
  Paper,
} from "@mui/material";
import {
  Search,
  NotificationsNone,
  LightMode,
  DarkMode,
  KeyboardArrowDown,
  FilterList,
  Menu as MenuIcon,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { routeMap } from "../../Router/RouteMap";

export default function Header({ onMenuClick, darkMode, setDarkMode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // 🔍 Filter route list dynamically
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredRoutes([]);
      return;
    }

    const matches = Object.keys(routeMap).filter((key) =>
      key.toLowerCase().includes(value)
    );

    setFilteredRoutes(matches);
  };

  // 🔎 Navigate when Enter pressed
  const handleSearchKey = (e) => {
    if (e.key === "Enter" && filteredRoutes.length > 0) {
      navigate(routeMap[filteredRoutes[0]]);
      setSearchTerm("");
      setFilteredRoutes([]);
    }
  };

  // ✅ Click suggestion
  const handleSelect = (key) => {
    navigate(routeMap[key]);
    setSearchTerm("");
    setFilteredRoutes([]);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 2, md: 4 } }}>
        {isMobile ? (
          // 📱 MOBILE HEADER
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <IconButton
              onClick={onMenuClick}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Search */}
            <Box sx={{ position: "relative", flex: 1, mx: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  px: 1.5,
                  py: 0.3,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Search sx={{ mr: 1, color: theme.palette.text.secondary }} />
                <InputBase
                  placeholder="Search..."
                  fullWidth
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKey}
                  sx={{ fontSize: 14 }}
                />
              </Box>

              {/* Suggestions */}
              {filteredRoutes.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "110%",
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 3,
                  }}
                >
                  <List dense>
                    {filteredRoutes.map((key) => (
                      <ListItemButton key={key} onClick={() => handleSelect(key)}>
                        {key}
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>

            <IconButton onClick={handleMenuOpen}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                A
              </Avatar>
            </IconButton>
          </Box>
        ) : (
          // 💻 DESKTOP HEADER
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* LEFT SECTION */}
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <IconButton
                onClick={onMenuClick}
                sx={{ mr: 2, color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>

              <Box
                component="img"
                src="https://virtualoffice.dev.adhkistaging.com/static/img/adp-logo-white.png"
                alt="Logo"
                sx={{
                  height: 32,
                  filter: isDark ? "brightness(1)" : "brightness(0.6)",
                  mr: 2,
                }}
              />

              {/* Desktop Search Bar */}
              <Box sx={{ position: "relative", flex: 1, maxWidth: 600 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 1,
                    border: "1.5px solid",
                    borderColor: theme.palette.divider,
                    px: 2,
                    py: 0.5,
                    backgroundColor: theme.palette.background.paper,
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Search sx={{ mr: 1, color: theme.palette.text.secondary }} />
                  <InputBase
                    placeholder="Search pages..."
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKey}
                    sx={{ fontSize: 14 }}
                  />
                  <IconButton
                    size="small"
                    sx={{ ml: 1, color: theme.palette.text.secondary }}
                  >
                    <FilterList />
                  </IconButton>
                </Box>

                {/* Suggestions Dropdown */}
                {filteredRoutes.length > 0 && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "110%",
                      left: 0,
                      right: 0,
                      zIndex: 20,
                      borderRadius: 1,
                      overflow: "hidden",
                      boxShadow: 4,
                    }}
                  >
                    <List dense>
                      {filteredRoutes.map((key) => (
                        <ListItemButton key={key} onClick={() => handleSelect(key)}>
                          {key}
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                )}
              </Box>
            </Box>

            {/* RIGHT SECTION */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
              {/* Theme Toggle */}
              <IconButton
                onClick={() => setDarkMode((prev) => !prev)} // ✅ fixed toggle logic
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "16px",
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* ✅ Light <-> Dark switch */}
                {darkMode ? (
                  <LightMode sx={{ color: "#f57c00" }} />
                ) : (
                  <DarkMode sx={{ color: "#ffca28" }} />
                )}
              </IconButton>

              {/* Notifications */}
              <IconButton>
                <Badge color="error" variant="dot">
                  <NotificationsNone />
                </Badge>
              </IconButton>

              {/* Profile */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "20px",
                  backgroundColor: theme.palette.background.paper,
                  px: 1.5,
                  py: 0.5,
                  cursor: "pointer",
                }}
                onClick={handleMenuOpen}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: theme.palette.primary.main,
                    mr: 1,
                  }}
                >
                  A
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    admin
                  </Typography>
                  <Chip
                    label="ADMIN"
                    size="small"
                    sx={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.15)"
                        : "#ffe0e0",
                      color: isDark ? "#fff" : "#d32f2f",
                      fontSize: "0.65rem",
                      height: 18,
                      borderRadius: "6px",
                      mt: 0.3,
                    }}
                  />
                </Box>
                <KeyboardArrowDown sx={{ ml: 0.5 }} />
              </Box>
            </Box>
          </Box>
        )}

        {/* USER MENU */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            },
          }}
        >
          <MenuItem disabled>
            <Box>
              <Typography variant="subtitle1">Admin</Typography>
              <Typography variant="caption" color="text.secondary">
                admin@example.com
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
