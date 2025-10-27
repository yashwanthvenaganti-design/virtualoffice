import React from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ReusableTable from "../../Components/CustomTable/Customtable";

const columns = [
  { id: "comment", label: "Comment" },
  { id: "kind", label: "Kind" },
  { id: "validNow", label: "Valid now?" },
  { id: "addedDate", label: "Added (Date)" },
  { id: "status", label: "Status" },
  {
    id: "actions",
    label: "Actions",
    align: "center",
    render: (row) => (
      <IconButton
        color="error"
        onClick={() => handleDelete(row)}
        title="Delete"
      >
        <Delete />
      </IconButton>
    ),
  },
];

// Dummy data
const data = [
  {
    comment: "System outage during call handling.",
    kind: "Bug Report",
    validNow: "Yes",
    addedDate: "2025-10-20",
    status: "Open",
  },
  {
    comment: "Need clarification on billing details.",
    kind: "Billing",
    validNow: "No",
    addedDate: "2025-09-28",
    status: "Resolved",
  },
  {
    comment: "Customer appreciated quick response.",
    kind: "Customer Service",
    validNow: "Yes",
    addedDate: "2025-10-05",
    status: "Closed",
  },
  {
    comment: "Feature request for dark mode in dashboard.",
    kind: "Sales",
    validNow: "Yes",
    addedDate: "2025-10-12",
    status: "Pending",
  },
  {
    comment: "Unable to access reports page intermittently.",
    kind: "IT",
    validNow: "No",
    addedDate: "2025-08-15",
    status: "Open",
  },
];

export default function Notes() {
  // Delete handler
  const handleDelete = (row) => {
    alert(`Deleted note: "${row.comment}"`);
  };

  const handleAddNotify = () => {
    alert("Add new feedback clicked!");
  };

  return (
    <ReusableTable
      title="Your Notes"
      columns={columns.map((col) =>
        col.id === "actions"
          ? {
              ...col,
              render: (row) => (
                <IconButton
                  color="error"
                  onClick={() => handleDelete(row)}
                  title="Delete"
                >
                  <Delete />
                </IconButton>
              ),
            }
          : col
      )}
      data={data}
      onAddClick={handleAddNotify}
      searchPlaceholder="Search by comment, kind, or status..."
      addButtonLabel="Add Note"
    />
  );
}
