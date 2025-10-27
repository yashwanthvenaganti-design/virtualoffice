import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Box,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Info as InfoIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`permission-tabpanel-${index}`}
      aria-labelledby={`permission-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `permission-tab-${index}`,
    "aria-controls": `permission-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const user = {
    users_id: () => "83901aa3-bf9f-4e00-9cd2-ad320da4d55f",
    people_id: () => "fb94c64d-aed7-41cb-815d-c64ed600e449",
    username: "",
    administrator: () => false,
  };

  const simplePermissions = [
    { name: "Addresses", enabled: true, warning: false },
    { name: "Communications", enabled: true, warning: false },
    { name: "Companies", enabled: true, warning: false },
    { name: "Greetings", enabled: true, warning: false },
    { name: "Invoices", enabled: true, warning: false },
    { name: "Invoice detail", enabled: true, warning: false },
    { name: "Notes", enabled: true, warning: false },
    { name: "Numbers", enabled: true, warning: false },
    { name: "Operational times", enabled: true, warning: false },
    { name: "People", enabled: true, warning: false },
    { name: "People availabilities", enabled: true, warning: false },
    { name: "People messages", enabled: true, warning: false },
    { name: "People notifications", enabled: true, warning: false },
    { name: "Rotas", enabled: false, warning: false },
    { name: "Statistics", enabled: true, warning: false },
    { name: "Users", enabled: false, warning: false },
    { name: "Vips", enabled: true, warning: false },
  ];

  const advancedPermissions = [
    { name: "Addresses", list: true, create: true, read: true, update: true, delete: true, editor: "68a860ad" },
    { name: "Communications", list: true, create: true, read: true, update: true, delete: true, editor: "0f9af74a" },
    { name: "Companies", list: false, create: false, read: true, update: true, delete: false, editor: "01f69c1f" },
    { name: "Greetings", list: true, create: true, read: true, update: true, delete: true, editor: "f25900a4" },
    { name: "Invoices", list: false, create: false, read: true, update: false, delete: false, editor: "e61aecaa" },
    { name: "Invoice detail", list: true, create: false, read: true, update: true, delete: false, editor: "6352e153" },
    { name: "Notes", list: true, create: true, read: true, update: true, delete: true, editor: "6382dd78" },
    { name: "Numbers", list: true, create: false, read: true, update: false, delete: false, editor: "11c409b8" },
    { name: "Operational times", list: true, create: true, read: true, update: true, delete: true, editor: "15051fed" },
    { name: "People", list: true, create: true, read: true, update: true, delete: true, editor: "6b1a84f2" },
    { name: "People availabilities", list: true, create: true, read: true, update: true, delete: true, editor: "6b808dd5" },
    { name: "People messages", list: true, create: true, read: true, update: true, delete: true, editor: "1405a06e" },
    { name: "People notifications", list: true, create: true, read: true, update: true, delete: true, editor: "8e63b50e" },
    { name: "Rotas", list: true, create: true, read: true, update: true, delete: true, editor: null },
    { name: "Statistics", list: true, create: false, read: true, update: false, delete: false, editor: "b8614695" },
    { name: "Users", list: true, create: true, read: true, update: true, delete: true, editor: null },
    { name: "Vips", list: true, create: true, read: true, update: true, delete: true, editor: "a04121a5" },
  ];

  const getPermissionKey = (name, suffix) => {
    const key = name.toLowerCase().replace(/ /g, "_");
    return suffix ? `${key}${suffix}` : key;
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #f5f7fa, #e8eef3)",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          p: 4,
          maxWidth: 1200,
          margin: "auto",
          backgroundColor: "#fff",
          boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Grid container spacing={5}>
          {/* LEFT PANEL — User */}
          <Grid size={{xs:12,md:5}}>
            <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
              User Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  label="Username*"
                  defaultValue={user.username}
                  InputProps={{
                    endAdornment: !user.users_id() && (
                      <Tooltip title="Suggest username">
                        <IconButton size="small">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  placeholder="If left blank remains the same"
                />
              </Grid>

              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  placeholder="Password must match above"
                />
              </Grid>
            </Grid>

            <Box mt={3}>
              <Button
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 3px 10px rgba(46,125,50,0.3)",
                }}
              >
                Save
              </Button>
            </Box>

            
          </Grid>

          {/* RIGHT PANEL — Permissions */}
          {user.users_id() && (
            <Grid size={{xs:12,md:7}}>
              <Box>
                <Typography variant="h5" fontWeight={700} color="primary" mb={2}>
                  Permissions
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="Permission mode"
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <Tab
                    icon={<ToggleOnIcon />}
                    label="Simple"
                    {...a11yProps(0)}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  />
                  <Tab
                    icon={<InfoIcon />}
                    label="Advanced"
                    {...a11yProps(1)}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  />
                </Tabs>

                {/* SIMPLE PERMISSIONS */}
                <TabPanel value={tabValue} index={0}>
                  <TableContainer
                    component={Paper}
                    sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell><strong>Role</strong></TableCell>
                          <TableCell align="center">
                            <Chip
                              label="Access"
                              size="small"
                              color="info"
                              icon={<InfoIcon />}
                            />
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {simplePermissions.map((perm, index) => (
                          <TableRow
                            key={perm.name}
                            hover
                            sx={{
                              backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                            }}
                          >
                            <TableCell>{perm.name}</TableCell>
                            <TableCell align="center">
                              <IconButton
                                color={perm.enabled ? "success" : "default"}
                                sx={{ cursor: "pointer" }}
                              >
                                {perm.enabled ? (
                                  <ToggleOnIcon fontSize="large" />
                                ) : (
                                  <ToggleOffIcon fontSize="large" />
                                )}
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              {perm.warning && (
                                <Tooltip title="Advanced permissions modified">
                                  <WarningIcon color="warning" />
                                </Tooltip>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>

                {/* ADVANCED PERMISSIONS */}
                <TabPanel value={tabValue} index={1}>
                  <TableContainer
                    component={Paper}
                    sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell><strong>Role</strong></TableCell>
                          {["List", "Create", "Read", "Update", "Delete", "Editor"].map((action) => (
                            <TableCell key={action} align="center">
                              <Typography variant="caption" fontWeight={600}>
                                {action}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {advancedPermissions.map((perm, index) => (
                          <TableRow
                            key={perm.name}
                            hover
                            sx={{
                              backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                            }}
                          >
                            <TableCell>{perm.name}</TableCell>
                            {["list", "create", "read", "update", "delete", "editor"].map((key) => (
                              <TableCell key={key} align="center">
                                <Switch
                                  size="small"
                                  checked={!!perm[key]}
                                  sx={{
                                    "& .MuiSwitch-thumb": { backgroundColor: perm[key] ? "primary.main" : "grey.300" },
                                  }}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
