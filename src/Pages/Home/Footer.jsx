import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FrequentCallers from "./Footer2";

const data = [
  { name: "Enquiries", value: 45, color: "#4dd0e1" },
  { name: "Support", value: 35, color: "#ff9800" },
  { name: "Other", value: 20, color: "#f48fb1" },
];

export default function Footer() {
  const [instruction, setInstruction] = useState("Divert all sales calls to mobile");
  const [available, setAvailable] = useState(true);

  return (
    <Grid container spacing={2} sx={{ mt: 2, mb: 7 }}>
      {/* ===== Call Types ===== */}
      <Grid size={{xs:12,md:3,sm:6}}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 1,
            height: "100%",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ mb: 1.5, color: "#1e1e1e" }}
          >
            Call Types
          </Typography>

          <Box sx={{ width: "100%", height: 160 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={4}
                  startAngle={90}
                  endAngle={450}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  layout="horizontal"
                  wrapperStyle={{ fontSize: "0.75rem" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* ===== PA Instructions ===== */}
      <Grid size={{xs:12,md:3,sm:6}}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 1,
            height: "100%",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ mb: 1.5, color: "#1e1e1e" }}
          >
            PA Instructions
          </Typography>

          <TextField
            multiline
            minRows={3}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
              "& textarea": {
                fontSize: "0.85rem",
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              textTransform: "none",
              background: "linear-gradient(90deg, #ff80ab, #e91e63)",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                background: "linear-gradient(90deg, #f06292, #d81b60)",
              },
            }}
          >
            Update
          </Button>
        </Paper>
      </Grid>

      {/* ===== Availability ===== */}
      <Grid size={{xs:12,md:3,sm:6}}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 1,
            height: "100%",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ mb: 1.5, color: "#1e1e1e" }}
          >
            Availability
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <CheckCircleIcon sx={{ color: "#00bfa5", fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "#00bfa5",
                  fontWeight: 600,
                }}
              >
                {available ? "Available" : "Unavailable"}
              </Typography>
            </Box>
            <Switch
              checked={available}
              onChange={() => setAvailable(!available)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#e91e63",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#f48fb1",
                },
              }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid size={{xs:12,md:3,sm:6}}>

        <FrequentCallers />
      </Grid>



    </Grid>
  );
}
