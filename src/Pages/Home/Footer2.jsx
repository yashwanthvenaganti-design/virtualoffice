import React from "react";
import { Paper, Typography, Box, Stack } from "@mui/material";

const callers = [
  { name: "Christine Taylor", calls: "4 calls" },
  { name: "Michael Brown", calls: "3 calls" },
  { name: "Olivia Green", calls: "1 call" },
  { name: "James White", calls: "1 call" },
];

export default function FrequentCallers() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        height: {xs:"100%",md:"113%"},
        mt:{xs:0,md:"-100px"},
        mb:10
      }}
    >
      {/* Header */}
      <Typography
        variant="subtitle1"
        fontWeight={700}
        sx={{ mb: 2, color: "#1e1e1e" }}
      >
        Frequent Callers
      </Typography>

      {/* Caller List */}
      <Stack spacing={1.2}>
        {callers.map((caller, i) => (
          <Box
            key={i}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 0.8,
              borderRadius: 1.5,
              transition: "background 0.2s ease",
              "&:hover": {
                backgroundColor: "#fafafa",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#1e1e1e",
                fontWeight: i === 1 ? 700 : 500, // matches bold name (Michael Brown)
              }}
            >
              {caller.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#777",
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
            >
              {caller.calls}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
