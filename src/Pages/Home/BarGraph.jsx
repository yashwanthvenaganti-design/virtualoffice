import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

// 📊 Example data
const data = [
  { name: "Mon", totalCalls: 210, answered: 180 },
  { name: "Tue", totalCalls: 270, answered: 210 },
  { name: "Wed", totalCalls: 330, answered: 250 },
  { name: "Thu", totalCalls: 270, answered: 200 },
  { name: "Fri", totalCalls: 230, answered: 170 },
  { name: "Sat", totalCalls: 260, answered: 190 },
  { name: "Sun", totalCalls: 340, answered: 260 },
];

// ✅ Custom Legend
const CustomLegend = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 4,
      mt: 1,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 14, height: 14, backgroundColor: "#e62897" }} />
      <Typography sx={{ fontSize: 13, color: "#333" }}>Total Calls</Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 14, height: 14, backgroundColor: "#4bb97e" }} />
      <Typography sx={{ fontSize: 13, color: "#333" }}>Answered</Typography>
    </Box>
  </Box>
);

export default function CallVolumeChart() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "#f9fcfd",
        border: "1px solid #e0f2f1",
        height: 500,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, color: "#1a1a1a", mb: 2, ml: 1 }}
      >
        Call Volume & Answered
      </Typography>

      {/* ✅ Responsive Scroll Wrapper */}
      <Box
        sx={{
          width: "100%",
          height: 400,
          overflowX: { xs: "auto", md: "hidden" }, // horizontal scroll on mobile
          overflowY: "hidden",
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-thumb": {
            background: "#ccc",
            borderRadius: 10,
          },
        }}
      >
        {/* ✅ Inner Container wider for scroll */}
        <Box
          sx={{
            width: { xs: 800, sm: 900, md: "100%" }, // chart width increases for scroll
            height: "100%",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              barGap={8}
              barCategoryGap="18%"
            >
              <CartesianGrid stroke="#f0f0f0" vertical={false} />

              <XAxis
                dataKey="name"
                tick={{ fill: "#555", fontSize: 12 }}
                axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
                tickLine={{ stroke: "#ccc" }}
              />
              <YAxis
                tick={{ fill: "#555", fontSize: 12 }}
                axisLine={{ stroke: "#ccc", strokeWidth: 1 }}
                tickLine={{ stroke: "#ccc" }}
              />

              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              />

              <Legend content={<CustomLegend />} verticalAlign="bottom" />

              <Bar
                dataKey="totalCalls"
                name="Total Calls"
                fill="#e62897"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
              <Bar
                dataKey="answered"
                name="Answered"
                fill="#4bb97e"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Paper>
  );
}
