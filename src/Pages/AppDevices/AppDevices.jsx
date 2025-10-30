import React, { useEffect } from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Stack, Chip } from "@mui/material";
import { Visibility, Delete, Devices } from "@mui/icons-material"; // 💻 Added Devices icon
import { getData } from "../../Axios/Axios";

const columns = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "added", label: "Added" },
  { id: "lastNotified", label: "Last Notified" },
  { id: "lastSeen", label: "Last Seen" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Action" },
];

const data = [
  {
    name: "Alice Johnson",
    type: "Email",
    added: "2025-10-15",
    lastNotified: "2025-10-20",
    lastSeen: "2025-10-21",
    status: "Read",
  },
  {
    name: "Robert Miller",
    type: "SMS",
    added: "2025-10-12",
    lastNotified: "2025-10-18",
    lastSeen: "2025-10-19",
    status: "Unread",
  },
  {
    name: "Sophia Chen",
    type: "Notification",
    added: "2025-10-10",
    lastNotified: "2025-10-15",
    lastSeen: "2025-10-16",
    status: "Pending",
  },
  {
    name: "David Brown",
    type: "Email",
    added: "2025-10-08",
    lastNotified: "2025-10-12",
    lastSeen: "2025-10-13",
    status: "Read",
  },
  {
    name: "Emily Davis",
    type: "SMS",
    added: "2025-10-06",
    lastNotified: "2025-10-10",
    lastSeen: "2025-10-11",
    status: "Unread",
  },
  {
    name: "Liam Wilson",
    type: "Email",
    added: "2025-10-05",
    lastNotified: "2025-10-08",
    lastSeen: "2025-10-09",
    status: "Read",
  },
  {
    name: "Olivia Martinez",
    type: "Notification",
    added: "2025-10-03",
    lastNotified: "2025-10-05",
    lastSeen: "2025-10-06",
    status: "Pending",
  },
  {
    name: "Ethan Taylor",
    type: "Email",
    added: "2025-10-02",
    lastNotified: "2025-10-03",
    lastSeen: "2025-10-04",
    status: "Read",
  },
  {
    name: "Isabella Anderson",
    type: "SMS",
    added: "2025-09-30",
    lastNotified: "2025-10-01",
    lastSeen: "2025-10-02",
    status: "Read",
  },
  {
    name: "Noah Thompson",
    type: "Email",
    added: "2025-09-25",
    lastNotified: "2025-09-28",
    lastSeen: "2025-09-29",
    status: "Unread",
  },
];

export default function AppDevices() {
  const handleAddMessage = () => {
    alert("Add new message clicked!");
  };

  const handleView = (row) => {
    alert(`👁 Viewing message from ${row.name}`);
  };

  const handleDelete = (row) => {
    alert(`🗑 Deleted message from ${row.name}`);
  };

  const getNotifications =async() =>{
    try{
      const response = await getData("/notifications/viewNotifications");
      const fetchedData = response?.data;
     
      console.log("Notifications fetched:", fetchedData);
    }
    catch(error) {
      console.error("Error fetching notifications:", error);
    } 
  }

  useEffect(() => {
    getNotifications();
  }, []);








  const getStatusChip = (status) => {
    let color = "default";
    if (status === "Read") color = "success";
    else if (status === "Unread") color = "error";
    else if (status === "Pending") color = "warning";

    return <Chip label={status} color={color} size="small" />;
  };

  const enhancedData = data.map((row) => ({
    ...row,
    status: getStatusChip(row.status),
    actions: (
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" onClick={() => handleView(row)}>
          <Visibility />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(row)}>
          <Delete />
        </IconButton>
      </Stack>
    ),
  }));

  return (
    <ReusableTable
      title="Your App Devices"
      icon={<Devices />} // 💻 Added icon for header
      columns={columns}
      data={enhancedData}
      onAddClick={handleAddMessage}
      searchPlaceholder="Search by name or type..."
      addButtonLabel="Add App Devices"
    />
  );
}
