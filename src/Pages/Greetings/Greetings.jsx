import React, { use, useEffect, useState } from "react";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { IconButton, Stack } from "@mui/material";
import { Delete, EmojiEmotions } from "@mui/icons-material";
import { getData, postData } from "../../Axios/Axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

const columns = [
  { id: "name", label: "Profile Name" },
  { id: "greeting", label: "Greeting" },
  { id: "salutation", label: "Salutation" },
  { id: "actions", label: "Action" },
];

export default function GreetingProfiles() {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const {showSnackbar} = useSnackbar();



  const getGreetings = async () => {
    try {
      const response = await getData("/greetings/viewGreetings");
      const fetchedData = response?.data || [];

      // Transform backend data to match table columns
      const formatted = fetchedData.map((item) => ({
        name: item.name || "—",
        greeting: item.greeting || "—",
        salutation: item.salutation ? "Yes" : "No",
        id: item.greetingsId, // keep unique id for deletion
      }));

      setTableData(formatted);
      console.log("Greetings fetched:", formatted);
    } catch (error) {
      console.error("Error fetching greetings:", error);
    }
  };

  useEffect(() => {
    getGreetings();
  }, []);

  const handleDelete = async(row) => {
    try{
      const response = await postData(`/greetings/deleteGreetings`,[row]);
      getGreetings();
      console.log("Delete response:", response);
      showSnackbar("Greeting deleted successfully!", "success");
    }
    catch(error){
      console.error("Error deleting greeting:", error);
      showSnackbar("Failed to delete greeting. Please try again.", "error");
    }
  };

  const handleAddGreeting = () => {
    navigate("/add-greeting")
  };





  const enhancedData = tableData.map((row) => ({
    ...row,
    actions: (
      <Stack direction="row" spacing={1}>
        <IconButton color="error" onClick={() => handleDelete(row.id)}>
          <Delete />
        </IconButton>
      </Stack>
    ),
  }));

  return (
    <ReusableTable
      title="Greeting Profiles"
      icon={<EmojiEmotions />}
      columns={columns}
      data={enhancedData}
      onAddClick={handleAddGreeting}
      searchPlaceholder="Search by profile name or greeting..."
      addButtonLabel="Add Greetings"
    />
  );
}
