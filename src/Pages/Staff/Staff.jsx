import React from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const columns = [
  { id: "name", label: "Name" },
  { id: "sex", label: "Sex" },
  { id: "availability", label: "Availability" },
  { id: "jobTitle", label: "Job Title" },
  { id: "department", label: "Department" },
  { id: "users", label: "Users" },
  {
    id: "status",
    label: "Status",
    render: (row) => (
      <IconButton
        color="error"
        size="small"
        onClick={() => handleDelete(row.name)}
      >
        <Delete />
      </IconButton>
    ),
  },
];

// sample data
const data = [
  {
    name: "John Carter",
    sex: "Male",
    availability: "Available",
    jobTitle: "Project Manager",
    department: "Operations",
    users: "5",
  },
  {
    name: "Emma Wilson",
    sex: "Female",
    availability: "On Leave",
    jobTitle: "Software Engineer",
    department: "Development",
    users: "3",
  },
  {
    name: "Michael Brown",
    sex: "Male",
    availability: "Available",
    jobTitle: "HR Specialist",
    department: "Human Resources",
    users: "2",
  },
  {
    name: "Sophia Taylor",
    sex: "Female",
    availability: "Busy",
    jobTitle: "Marketing Lead",
    department: "Marketing",
    users: "4",
  },
  {
    name: "Liam Davis",
    sex: "Male",
    availability: "Available",
    jobTitle: "Support Engineer",
    department: "Customer Support",
    users: "6",
  },
];

const handleDelete = (name) => {
  alert(`Delete ${name} clicked!`);
};

export default function Staff() {
  const handleAddContact = () => {
    alert("Add new staff member clicked!");
  };

  return (
    <ReusableTable
      title="Staff List"
      columns={columns}
      data={data}
      onAddClick={handleAddContact}
      searchPlaceholder="Search by name, department, or job title..."
      addButtonLabel="Add Staff"
    />
  );
}
