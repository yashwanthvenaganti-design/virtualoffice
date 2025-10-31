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

export default function CallVolumeChart() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 1,
        backgroundColor: "#f9fcfd",
        border: "1px solid #e0f2f1",
        height: 350,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, color: "#333", mb: 2, ml: 1 }}
      >
        Call Volume & Answered
      </Typography>

      <Box sx={{ width: "100%", height: 270 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            {/* ✅ Grid */}
            <CartesianGrid stroke="#f0f0f0" />

            {/* ✅ Visible axis lines and ticks */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#555", fontSize: 12 }}
              axisLine={{ stroke: "black", strokeWidth: 1 }}
              tickLine={{ stroke: "#ccc" }}
            />
            <YAxis
              tick={{ fill: "#555", fontSize: 12 }}
              axisLine={{ stroke: "black", strokeWidth: 1 }}
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

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              wrapperStyle={{ paddingTop: 10 }}
            />

            <Bar
              dataKey="totalCalls"
              name="Total Calls"
              fill="#e62897"
              radius={[6, 6, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="answered"
              name="Answered"
              fill="#4bb97e"
              radius={[6, 6, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
