import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import {
  PhoneInTalk,
  Group,
  ChatBubbleOutline,
  AccessTime,
} from "@mui/icons-material";

const stats = [
  {
    title: "TOTAL CALLS",
    value: "1,240",
    subtitle: "This Month",
    icon: <PhoneInTalk fontSize="medium" sx={{ color: "#e91e63" }} />,
    borderColor: "linear-gradient(90deg, #ffffff, #ebd0d9)",
  },
  {
    title: "ANSWERED",
    value: "890",
    subtitle: "72% Rate",
    icon: <Group fontSize="medium" sx={{ color: "#26a69a" }} />,
    borderColor: "linear-gradient(90deg, #f4f5f4, #b0d6db)",
  },
  {
    title: "MESSAGES",
    value: "350",
    subtitle: "",
    icon: <ChatBubbleOutline fontSize="medium" sx={{ color: "#7c4dff" }} />,
    borderColor: "linear-gradient(90deg, #fbfbfb, #c5bfd1)",
  },
  {
    title: "AVG. TIME",
    value: "62s",
    subtitle: "Goal: < 60s",
    icon: <AccessTime fontSize="medium" sx={{ color: "#ff9800" }} />,
    borderColor: "linear-gradient(90deg, #fbf9f6, #fbe5c4)",
  },
];

export default function DashboardCards() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        m: 0,
        mt: -5,
        alignItems: "flex-start", // ✅ keeps all cards aligned at top
      }}
    >
      {stats.map((item, index) => (
        <Grid size={{xs:12,sm:6,md:3}} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              minHeight: 110, // ✅ compact height
             
              border: "2px solid transparent",
              backgroundImage: `${item.borderColor}, linear-gradient(145deg, #fff, #f9f9f9)`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {item.icon}
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: "#555",
                }}
              >
                {item.title}
              </Typography>
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#111",
                fontSize: "1.5rem",
              }}
            >
              {item.value}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#777",
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
            >
              {item.subtitle}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
