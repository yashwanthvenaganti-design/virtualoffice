import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Tooltip,
  Divider,
  Paper,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function InvoiceSettings() {
  const [formData, setFormData] = useState({
    emailInvoice: "",
    emailInvoiceNotice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Invoice settings saved!");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
            <i
              className="fa fa-file-text-o"
              style={{ marginRight: 8, color: "#1976d2" }}
            ></i>
            Invoice Detail / Settings
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* Left Column: Invoice Settings */}
          <Grid size={{xs:12,sm:6}}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Invoice Settings
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <form onSubmit={handleSave}>
              {/* Invoice Email */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    gap: 0.5,
                  }}
                >
                  <Typography variant="subtitle1">
                    Invoice Email Addresses
                  </Typography>
                  <Tooltip
                    title="E-mail addresses to receive PDF copies of every invoice. Separate multiple emails with commas."
                    placement="right"
                  >
                    <HelpOutlineIcon fontSize="small" color="action" />
                  </Tooltip>
                </Box>
                <TextField
                  fullWidth
                  name="emailInvoice"
                  value={formData.emailInvoice}
                  onChange={handleChange}
                  placeholder="info@acme.com"
                />
              </Box>

              {/* Notification Email */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    gap: 0.5,
                  }}
                >
                  <Typography variant="subtitle1">
                    Notification Email Addresses
                  </Typography>
                  <Tooltip
                    title="E-mail addresses to receive invoice notifications (without value). Separate multiple emails with commas."
                    placement="right"
                  >
                    <HelpOutlineIcon fontSize="small" color="action" />
                  </Tooltip>
                </Box>
                <TextField
                  fullWidth
                  name="emailInvoiceNotice"
                  value={formData.emailInvoiceNotice}
                  onChange={handleChange}
                  placeholder="info@acme.com"
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ width: "40%" }}
              >
                Save
              </Button>
            </form>
          </Grid>

          {/* Right Column: Billing Address */}
          <Grid size={{xs:12,sm:6}}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              <code>Billing Address</code>
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ lineHeight: 1.8 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                adpcx_dev
              </Typography>
              <Typography variant="body1" fontStyle="italic">
                John Doe
              </Typography>
              <Typography variant="body2">123 Main Street</Typography>
              <Typography variant="body2">Suite 400</Typography>
              <Typography variant="body2">District</Typography>
              <Typography variant="body2">AB12CD</Typography>
              <br />
              <Typography variant="body2">
                <strong>P:</strong> 88885888888
              </Typography>
              <Typography variant="body2">
                <strong>E:</strong> info@acme.com
              </Typography>
            </Box>

            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                borderLeft: "4px solid #1976d2",
                p: 2,
                mt: 3,
              }}
            >
              <Typography variant="body2">
                The billing address is only used for invoice generation and is{" "}
                <strong>not</strong> visible by PAs.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
