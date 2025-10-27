import React from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import ResponsiveSidebar from "../../Components/ToolBar/ToolBar";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";

const columns = [
  { id: "name", label: "Name" },
  { id: "sex", label: "Sex" },
  { id: "company", label: "Company Name" },
  { id: "tel", label: "Tel No" },
  { id: "email", label: "E-mail Addr" },
  {
    id: "status",
    label: "Status",
    align: "center",
    render: (row) => (
      <Tooltip title="Delete Contact">
        <IconButton
          color="error"
          onClick={() => handleDelete(row)}
          size="small"
        >
          <Delete />
        </IconButton>
      </Tooltip>
    ),
  },
];

const data = [
  {
    name: "Alice Smith",
    sex: "Female",
    company: "TechCorp",
    tel: "555-123-4567",
    email: "alice@techcorp.com",
  },
  {
    name: "Bob Johnson",
    sex: "Male",
    company: "InnoSoft",
    tel: "555-987-6543",
    email: "bob@innosoft.com",
  },
  {
    name: "Clara Lee",
    sex: "Female",
    company: "WebWorks",
    tel: "555-246-8101",
    email: "clara@webworks.com",
  },
];

export default function Vip() {
  const handleAddContact = () => {
    alert("Add new VIP clicked!");
  };

  const handleDelete = (row) => {
    alert(`Deleted: ${row.name}`);
  };

  // Inject delete handler into columns dynamically
  const updatedColumns = columns.map((col) => {
    if (col.id === "status") {
      return {
        ...col,
        render: (row) => (
          <Tooltip title="Delete Contact">
            <IconButton
              color="error"
              onClick={() => handleDelete(row)}
              size="small"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        ),
      };
    }
    return col;
  });

  return (
    <ReusableTable
      title="VIP List"
      columns={updatedColumns}
      data={data}
      onAddClick={handleAddContact}
      addButtonLabel="Add VIP" // 👈 custom button text
      searchPlaceholder="Search by name, company, or email..."
    />
  );
}
