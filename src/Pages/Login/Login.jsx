import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Business,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    company: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await postData("/login/token", formData);
      console.log(response.data.access_token);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/");
      showSnackbar("User logged in successfully!", "success");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Grid
      container
      component={Paper}
      elevation={6}
      sx={{
        maxWidth: "1000px",
        minHeight: "520px",
        margin: "40px auto",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* ------------------ Left: Form ------------------ */}
      <Grid
        size={{xs:12,md:6}}
        sx={{
          p: { xs: 3, md: 4 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: 420 }}
        >
          {/* Logo */}
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="https://virtualoffice.dev.adhkistaging.com/static/img/adp-logo-white.png"
              alt="alldayPA"
              style={{ height: 28, width: "auto", filter: "brightness(0.8)" }}
            />
          </Box>

          <Typography variant="h5" fontWeight={700} mb={0.5}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2.5}>
            Please enter your login details below
          </Typography>

          {/* Company */}
          <TextField
            fullWidth
            margin="dense"
            placeholder="Virtual Office Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Username */}
          <TextField
            fullWidth
            margin="dense"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            margin="dense"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember + Forgot Password */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 1.5,
            }}
          >
            <FormControlLabel
              control={<Checkbox size="small" color="primary" />}
              label={<Typography fontSize="0.85rem">Remember me</Typography>}
            />
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: "none", fontSize: "0.85rem" }}
            >
              Forgot password?
            </Button>
          </Box>

          {/* Error message */}
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mb: 1, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          {/* Sign In */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: 1,
              borderRadius: 2,
              bgcolor: "#000",
              color: "#fff",
              fontWeight: 600,
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>or continue</Divider>

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                width={18}
              />
            }
            sx={{
              py: 1,
              borderRadius: 2,
              color: "text.primary",
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#f9f9f9" },
            }}
          >
            Log in with Google
          </Button>

          {/* Sign Up */}
          <Typography
            textAlign="center"
            mt={3}
            color="text.secondary"
            fontSize="0.9rem"
          >
            Don’t have an account?{" "}
            <Button
              variant="text"
              sx={{ textTransform: "none", fontSize: "0.9rem" }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Grid>

      {/* ------------------ Right: Illustration ------------------ */}
      <Grid
        size={{xs:0,md:6}}
        sx={{
          background: "linear-gradient(135deg, #1e1e1e, #3b3b3b)",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          position: "relative",
          p: 4,
        }}
      >
        {/* Floating shapes */}
        <Box
          sx={{
            position: "absolute",
            top: 40,
            right: 60,
            width: 12,
            height: 12,
            bgcolor: "yellow",
            transform: "rotate(45deg)",
            opacity: 0.8,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            left: 60,
            width: 18,
            height: 18,
            borderRadius: "50%",
            bgcolor: "green",
            opacity: 0.6,
          }}
        />

        {/* Center Content */}
        <Box sx={{ textAlign: "center", zIndex: 2, maxWidth: 360 }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              fontSize: 40,
              mb: 2,
              background:
                "linear-gradient(to right, #6366f1, #9333ea)",
              boxShadow: 4,
            }}
          >
            👨‍💻
          </Avatar>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Manage your virtual office with alldayPA
          </Typography>
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.85)"
            mb={3}
          >
            You can manage your virtual office on the go with the web
          </Typography>

          {/* Dots */}
          <Box display="flex" justifyContent="center" gap={1}>
            <Box
              sx={{
                width: 6,
                height: 6,
                bgcolor: "white",
                opacity: 0.3,
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                width: 24,
                height: 6,
                bgcolor: "white",
                borderRadius: "10px",
              }}
            />
            <Box
              sx={{
                width: 6,
                height: 6,
                bgcolor: "white",
                opacity: 0.3,
                borderRadius: "50%",
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
