import React from "react";
import { Box, Paper, Typography, Stack, Link } from "@mui/material";

const messages = [
  { time: "19:15", text: "Call Emily from Elm Ltd" },
  { time: "09:50", text: "Arrange meeting with John" },
  { time: "09:20", text: "Delivery confirmed today" },
  { time: "Yesterday", text: "Speak to Katie Parker" },
];

export default function RecentMessages() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        transition: "0.3s",
        height: "100%", // ✅ full height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": { boxShadow: "0 4px 18px rgba(0,0,0,0.05)" },
      }}
    >
      {/* Header */}
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ mb: 2, color: "#1e1e1e" }}
      >
        Recent Messages
      </Typography>

      {/* Message list */}
      <Stack spacing={1.2} flexGrow={1}>
        {messages.map((msg, i) => (
          <Box key={i} display="flex" alignItems="center" gap={2}>
            <Typography
              variant="body2"
              sx={{
                color: "#00bfa5",
                fontWeight: 600,
                minWidth: 60,
                textAlign: "right",
              }}
            >
              {msg.time}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#333",
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* View all link */}
      <Box mt={2.5} textAlign="center">
        <Link
          href="#"
          underline="none"
          sx={{
            color: "#e91e63",
            fontWeight: 600,
            fontSize: "0.85rem",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          View All →
        </Link>
      </Box>
    </Paper>
  );
}
