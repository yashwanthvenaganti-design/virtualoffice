import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { Settings } from "@mui/icons-material";

export default function AddStatus() {
  const [form, setForm] = useState({
    statusName: "",
    available: true,
    reason: "",
    tel: "",
    emailEnabled: true,
    email: "",
    smsEnabled: true,
    sms: "",
  });

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      p={4}
      sx={{
        background: "linear-gradient(to bottom right, #f5f7fa, #e4ebf1)",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "auto",
          margin: "0 auto",
          backgroundColor: "#fff",
        }}
      >
        <CardHeader
          avatar={<Settings color="primary" />}
          title={
            <Typography variant="h5" fontWeight={600}>
              Add New Status
            </Typography>
          }
          subheader="Define and manage availability and notifications"
          sx={{
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e0e0e0",
            py: 2,
          }}
        />
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {/* LEFT COLUMN */}
            <Grid size={{xs:12,md:6}}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Status
                </Typography>
                <TextField
                  label="Status Name"
                  fullWidth
                  value={form.statusName}
                  onChange={(e) =>
                    handleFormChange("statusName", e.target.value)
                  }
                  required
                />
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Availability
                </Typography>
                <TextField
                  select
                  label="Availability"
                  fullWidth
                  value={form.available ? "Available" : "Unavailable"}
                  onChange={(e) =>
                    handleFormChange("available", e.target.value === "Available")
                  }
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Unavailable">Unavailable</MenuItem>
                </TextField>

                {!form.available && (
                  <TextField
                    label="Reason for being unavailable"
                    fullWidth
                    margin="normal"
                    value={form.reason}
                    onChange={(e) =>
                      handleFormChange("reason", e.target.value)
                    }
                  />
                )}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Contact Detail
                </Typography>
                <TextField
                  label="Telephone Number"
                  fullWidth
                  value={form.tel}
                  onChange={(e) => handleFormChange("tel", e.target.value)}
                />
              </Paper>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid size={{xs:12,md:6}}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Message Notifications
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={form.emailEnabled}
                      onChange={(e) =>
                        handleFormChange("emailEnabled", e.target.checked)
                      }
                    />
                  }
                  label="Send Email Notifications"
                />
                <TextField
                  label="Email Address"
                  fullWidth
                  disabled={!form.emailEnabled}
                  value={form.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  placeholder="Enter email address"
                  margin="normal"
                />

                <Divider sx={{ my: 2 }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={form.smsEnabled}
                      onChange={(e) =>
                        handleFormChange("smsEnabled", e.target.checked)
                      }
                    />
                  }
                  label="Send SMS Notifications"
                />
                <TextField
                  label="SMS Number"
                  fullWidth
                  disabled={!form.smsEnabled}
                  value={form.sms}
                  onChange={(e) => handleFormChange("sms", e.target.value)}
                  placeholder="Enter SMS number"
                  margin="normal"
                />
              </Paper>

              <Box textAlign="right" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: "0 3px 10px rgba(25, 118, 210, 0.3)",
                  }}
                  onClick={() => alert("Saved!")}
                >
                  Save Status
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
