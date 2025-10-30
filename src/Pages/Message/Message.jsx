import React, { useEffect, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import {
  ForwardToInbox,
  Visibility,
  VisibilityOff,
  Delete,
  MailOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../Components/CustomTable/Customtable";
import { getData, postData } from "../../Axios/Axios";
import { useSnackbar } from "../../Helpers/SnackBar/Snackbar";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await postData(`/messages/deleteMessages`, [id]);
      showSnackbar("Message deleted successfully!", "success");
      getMessages();
    } catch (error) {
      showSnackbar("Failed to delete message.", "error");
    }
  };

  const handleForward = async (messageId) => {
    try {
      await postData(`/messages/forward`, [messageId]);
      showSnackbar("Message forwarded successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to forward message.", "error");
    }
  };

  const renderStatusActions = (row) => (
    <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
      <IconButton color="primary" size="small" onClick={() => handleForward(row.messageContentsId)}>
        <ForwardToInbox fontSize="small" />
      </IconButton>
      <IconButton
        color={row.status === "R" ? "info" : "warning"}
        size="small"
        onClick={() => navigate(`/message-box/${row.messageContentsId}`)}
      >
        {row.status === "R" ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
      </IconButton>
      <IconButton color="error" size="small" onClick={() => handleDelete(row.messageContentsId)}>
        <Delete fontSize="small" />
      </IconButton>
    </Stack>
  );

  const getMessages = async () => {
    try {
      const response = await getData("/messages/viewMessages");
      const fetchedData = response?.data || [];
      const formatted = (Array.isArray(fetchedData) ? fetchedData : [fetchedData]).map((msg) => ({
        messageContentsId: msg.messageContentsId,
        from: msg.from || "—",
        subject: msg.subject || "—",
        company: msg.companyName || "—",
        date: new Date(msg.added).toLocaleDateString("en-GB"),
        status: msg.status || "U",
        actions: renderStatusActions(msg),
      }));
      setMessages(formatted);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const columns = [
    { id: "from", label: "From" },
    { id: "subject", label: "Subject" },
    { id: "company", label: "Company" },
    { id: "date", label: "Date" },
    { id: "actions", label: "Actions" },
  ];

  return (
    <ReusableTable
      title="Your Messages"
      subtitle="Manage your messages across everything from company name to subject."
      icon={<MailOutline sx={{ fontSize: 28 }} />}
      columns={columns}
      data={messages}
      searchPlaceholder="Search by sender, subject, or company..."
      onRowClick={(row) => navigate("/message-box", { state: { messageId: row.messageContentsId } })} // ✅ navigate on click
    />
  );
}
