import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Delete, NoteAlt } from "@mui/icons-material";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { getData, postData } from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

export default function Notes() {
  const [notesData, setNotesData] = useState([]);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();


  const handleDelete = async(row) => {
    try{
      const response = await postData("/notes/deleteNotes", [ row.notesId ]);
      console.log("Delete Note Response:", response);
      showSnackbar("Note deleted successfully!", "success");
      getNotes();
    }
    catch(error){ 
      console.error("Error deleting note:", error);
      showSnackbar("Failed to delete note. Please try again.", "error"); 
    }
  };

  const handleAddNotify = () => {
    navigate("/add-note");
  };

  // 📦 Fetch Notes
  const getNotes = async () => {
    try {
      const response = await getData("/notes/viewNotes");
      console.log("Fetched notes:", response);

      // Adjust for your actual data structure
      const apiData = response?.data|| response?.data || [];

      if (apiData.length > 0) {
        const formatted = apiData.map((note) => ({
          comment: note.comment || "-",
          kind: note.kind || "-",
          validNow: note.valid || "No",
          addedDate: note.added
            ? new Date(note.added).toLocaleDateString()
            : "-",
          status: note.status || "-",
          notesId: note.notesId || "", // ✅ correct property name
        }));
        setNotesData(formatted);
      } else {
        setNotesData([]);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

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

  return (
    <ReusableTable
      title="Your Notes"
      icon={<NoteAlt />}
      columns={columns}
      data={notesData}
      onAddClick={handleAddNotify}
      searchPlaceholder="Search by comment, kind, or status..."
      addButtonLabel="Add Note"
    />
  );
}
