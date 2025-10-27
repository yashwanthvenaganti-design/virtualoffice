import React from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Tooltip } from "@mui/material";
import { NotificationsActive, Delete } from "@mui/icons-material";

const columns = [
  { id: "type", label: "Type" },
  { id: "method", label: "Method" },
  { id: "destination", label: "Destination" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions" },
];

const data = [
  {
    type: "Alert",
    method: "Email",
    destination: "john.doe@techcorp.com",
    status: "Active",
  },
  {
    type: "Notification",
    method: "SMS",
    destination: "+1-555-908-1234",
    status: "Inactive",
  },
  {
    type: "Reminder",
    method: "Push",
    destination: "Mobile App",
    status: "Active",
  },
  {
    type: "Update",
    method: "Email",
    destination: "sarah@nextgen.com",
    status: "Pending",
  },
  {
    type: "Warning",
    method: "SMS",
    destination: "+1-555-432-9988",
    status: "Active",
  },
  {
    type: "Report",
    method: "Email",
    destination: "mike@reports.com",
    status: "Inactive",
  },
  {
    type: "Notification",
    method: "Push",
    destination: "Tablet App",
    status: "Pending",
  },
  {
    type: "Alert",
    method: "Email",
    destination: "alerts@system.com",
    status: "Active",
  },
  {
    type: "Update",
    method: "SMS",
    destination: "+1-555-888-2222",
    status: "Active",
  },
  {
    type: "Reminder",
    method: "Email",
    destination: "reminders@company.com",
    status: "Inactive",
  },
];

// Add icons for actions
const dataWithActions = data.map((row) => ({
  ...row,
  actions: (
    <>
      <Tooltip title="Subscribe">
        <IconButton
          color="primary"
          size="small"
          onClick={() => alert(`Subscribed to ${row.type}`)}
        >
          <NotificationsActive />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          color="error"
          size="small"
          onClick={() => alert(`Deleted ${row.type}`)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  ),
}));

export default function Fax() {
  const handleAddMessage = () => {
    alert("Add new alert clicked!");
  };

  return (
    <ReusableTable
      title="Alert & Notification Settings"
      columns={columns}
      data={dataWithActions}
      onAddClick={handleAddMessage}
      searchPlaceholder="Search by type, method, or destination..."
      addButtonLabel="Add Alert"
    />
  );
}
