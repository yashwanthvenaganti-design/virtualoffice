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
    borderColor: "#e91e63",
    bgColor: "linear-gradient(135deg, hsl(325 79% 53%) 0%, hsl(331 70% 73%) 100%)",
    numberColor: "#e62897d4",
    iconBgColor: "rgba(233, 30, 99, 0.1)", // 🌸 very light pink
  },
  {
    title: "ANSWERED",
    value: "890",
    subtitle: "72% Rate",
    icon: <Group fontSize="medium" sx={{ color: "#26a69a" }} />,
    borderColor: "#26a69a",
    bgColor: "#e8f5f3",
    numberColor: "#009688",
    iconBgColor: "rgba(38, 166, 154, 0.15)", // 💚 soft teal
  },
  {
    title: "MESSAGES",
    value: "350",
    subtitle: "",
    icon: <ChatBubbleOutline fontSize="medium" sx={{ color: "#7c4dff" }} />,
    borderColor: "#7c4dff",
    bgColor: "#f3f0ff",
    numberColor: "#7c4dff",
    iconBgColor: "rgba(124, 77, 255, 0.12)", // 💜 light purple
  },
  {
    title: "AVG. TIME",
    value: "62s",
    subtitle: "Goal: < 60s",
    icon: <AccessTime fontSize="medium" sx={{ color: "#ff9800" }} />,
    borderColor: "#ff9800",
    bgColor: "#fff7e6",
    numberColor: "#f57c00",
    iconBgColor: "rgba(255, 152, 0, 0.15)", // 🧡 light orange
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
        alignItems: "flex-start",
      }}
    >
      {stats.map((item, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 1,
              minHeight: 110,
              border: `1px solid ${item.borderColor}`,
              backgroundColor: item.bgColor,
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
              {/* 🌈 Icon with soft background */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 1,
                  backgroundColor: item.iconBgColor,
                }}
              >
                {item.icon}
              </Box>

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
                color: item.numberColor || "#111",
                fontSize: "1.5rem",
              }}
            >
              {item.value}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#777",
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
              dangerouslySetInnerHTML={{ __html: item.subtitle }}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
