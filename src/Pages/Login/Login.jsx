import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    office: "",
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundColor: "#fff",
        backgroundImage: "url('/bg-pattern.png')", // optional background pattern
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 380,
          textAlign: "center",
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#000",
            mb: 1,
            "& span": { color: "#e91e63" }, // pink "PA"
          }}
        >
          all<span>day</span>PA
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#e91e63",
            mb: 3,
          }}
        >
          LOG IN TO YOUR VIRTUAL OFFICE
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Virtual Office Name */}
          <Box sx={{ textAlign: "left", mb: 2 }}>
            <Typography
              sx={{ fontWeight: 600, color: "#e91e63", fontSize: 14, mb: 0.5 }}
            >
              VIRTUAL OFFICE NAME: *
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="office"
              placeholder="Virtual Office Name"
              value={form.office}
              onChange={handleChange}
            />
          </Box>

          {/* Username */}
          <Box sx={{ textAlign: "left", mb: 2 }}>
            <Typography
              sx={{ fontWeight: 600, color: "#e91e63", fontSize: 14, mb: 0.5 }}
            >
              USERNAME: *
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </Box>

          {/* Password */}
          <Box sx={{ textAlign: "left", mb: 2 }}>
            <Typography
              sx={{ fontWeight: 600, color: "#e91e63", fontSize: 14, mb: 0.5 }}
            >
              PASSWORD: *
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Box>

          {/* Remember me */}
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
            }
            label="Remember me!"
            sx={{ color: "#000", mb: 2 }}
          />

          {/* Login button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#007b42",
              fontWeight: "bold",
              py: 1,
              "&:hover": { backgroundColor: "#006837" },
            }}
          >
            LOGIN
          </Button>

          {/* Forgot link */}
          <Typography
            sx={{
              mt: 2,
              color: "#e91e63",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/forgot-password")}
          >
            CAN’T ACCESS YOUR ACCOUNT?
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
