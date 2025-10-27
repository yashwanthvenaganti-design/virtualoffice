import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#4a4a4a",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Menu icon and logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* ✅ Show Menu icon on all devices */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo text */}
          {!isMobile && (
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                fontSize: 26,
                display: "flex",
                alignItems: "center",
                letterSpacing: 0.5,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Box component="span" sx={{ color: "#ffffff" }}>
                all
              </Box>
              <Box component="span" sx={{ color: "#ffffff" }}>
                day
              </Box>
              <Box component="span" sx={{ color: "#e91e63", ml: 0.3 }}>
                PA
              </Box>
            </Typography>
          )}
        </Box>

        {/* Center: Search bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "10px",
            px: 1,
            py: 0.5,
            width: { xs: "60%", sm: "50%", md: "40%" },
            mx: "auto",
          }}
        >
          <SearchIcon sx={{ color: "#555", mr: 1 }} />
          <InputBase
            placeholder="Search..."
            sx={{ color: "#000", width: "100%" }}
          />
        </Box>

        {/* Right: Profile icon */}
        <Avatar
          sx={{
            bgcolor: "#e91e63",
            cursor: "pointer",
            width: 36,
            height: 36,
          }}
          onClick={() => navigate("/profile")}
        >
          P
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
