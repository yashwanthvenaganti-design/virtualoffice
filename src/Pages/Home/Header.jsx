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
    icon: <PhoneInTalk fontSize="medium" sx={{ color: "white" }} />,
    borderColor: "#e91e63",
    bgColor: "linear-gradient(135deg, #fde7f0 0%, #fff 100%)",
    numberColor: "#e62897c2",
    iconBgColor:
      "linear-gradient(135deg, hsl(325 79% 53%) 0%, hsl(331 70% 73%) 100%)",
  },
  {
    title: "ANSWERED",
    value: "890",
    subtitle: "72% Rate",
    icon: <Group fontSize="medium" sx={{ color: "white" }} />,
    borderColor: "#26a69a",
    bgColor: "linear-gradient(135deg, #e8f5f3 0%, #ffffff 100%)",
    numberColor: "#009688a6",
    iconBgColor:
      "linear-gradient(135deg, hsl(158 64% 40%) 0%, hsl(158 60% 55%) 100%)",
  },
  {
    title: "MESSAGES",
    value: "350",
    subtitle: "This Week",
    icon: <ChatBubbleOutline fontSize="medium" sx={{ color: "white" }} />,
    borderColor: "#7c4dff",
    bgColor: "linear-gradient(135deg, #f3f0ff 0%, #ffffff 100%)",
    numberColor: "#7c4dff",
    iconBgColor:
      "linear-gradient(135deg, hsl(180 65% 60%) 0%, hsl(325 79% 53%) 100%)",
  },
  {
    title: "AVG. TIME",
    value: "62s",
    subtitle: "Goal: &lt; 60s",
    icon: <AccessTime fontSize="medium" sx={{ color: "white" }} />,
    borderColor: "#ff9800",
    bgColor: "linear-gradient(135deg, #fff7e6 0%, #ffffff 100%)",
    numberColor: "#f57c00",
    iconBgColor:
      "linear-gradient(135deg, rgb(249, 112, 21) 0%, rgb(251, 149, 81) 100%)",
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
        <Grid key={index} size={{xs:12,md:3,sm:6}}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 1,
              minHeight: 110,
              border: `1px solid ${item.borderColor}`,
              background: item.bgColor,
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
            
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 1,
                  background: item.iconBgColor,
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
                color: item.numberColor,
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
