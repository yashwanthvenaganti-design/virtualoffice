import React from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Stack } from "@mui/material";
import { ForwardToInbox, Visibility, Delete } from "@mui/icons-material";

const columns = [
  { id: "from", label: "From" },
  { id: "subject", label: "Subject" },
  { id: "company", label: "Company" },
  { id: "date", label: "Date" },
  { id: "status", label: "Status" }, // new column
];

const data = [
  {
    from: "Alice Johnson",
    subject: "Project Update",
    company: "TechNova Ltd",
    date: "2025-10-20",
  },
  {
    from: "Robert Miller",
    subject: "Meeting Schedule",
    company: "BrightWorks Inc",
    date: "2025-10-18",
  },
  {
    from: "Sophia Chen",
    subject: "Invoice for September",
    company: "FinEdge Solutions",
    date: "2025-10-15",
  },
  {
    from: "David Brown",
    subject: "New Partnership Opportunity",
    company: "GrowthSphere Co.",
    date: "2025-10-12",
  },
  {
    from: "Emily Davis",
    subject: "Follow-up on Proposal",
    company: "NextGen Systems",
    date: "2025-10-10",
  },
  {
    from: "Liam Wilson",
    subject: "Client Feedback Summary",
    company: "InsightX Analytics",
    date: "2025-10-08",
  },
  {
    from: "Olivia Martinez",
    subject: "Invitation: Annual Tech Conference",
    company: "Innovatech Group",
    date: "2025-10-05",
  },
  {
    from: "Ethan Taylor",
    subject: "Reminder: Project Deadline",
    company: "SmartCore Technologies",
    date: "2025-10-03",
  },
  {
    from: "Isabella Anderson",
    subject: "Thank You for Your Support",
    company: "PeakPoint Enterprises",
    date: "2025-10-01",
  },
  {
    from: "Noah Thompson",
    subject: "Re: Upcoming Maintenance",
    company: "CoreLink Systems",
    date: "2025-09-28",
  },
];

// This component renders icons inside each "Status" cell
const renderStatusActions = (row) => (
  <Stack direction="row" spacing={1}>
    <IconButton
      color="primary"
      size="small"
      onClick={() => alert(`Forward message from ${row.from}`)}
    >
      <ForwardToInbox fontSize="small" />
    </IconButton>

    <IconButton
      color="info"
      size="small"
      onClick={() => alert(`View message: ${row.subject}`)}
    >
      <Visibility fontSize="small" />
    </IconButton>

    <IconButton
      color="error"
      size="small"
      onClick={() => alert(`Delete message from ${row.from}`)}
    >
      <Delete fontSize="small" />
    </IconButton>
  </Stack>
);

export default function Messages() {
  const handleAddMessage = () => {
    alert("Add new message clicked!");
  };

  // Attach the status icons to each row dynamically
  const tableData = data.map((row) => ({
    ...row,
    status: renderStatusActions(row),
  }));

  return (
    <ReusableTable
      title="Your Messages"
      columns={columns}
      data={tableData}
     
      searchPlaceholder="Search by sender, subject, or company..."
     
    />
  );
}
