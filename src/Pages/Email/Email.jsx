import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { getData } from "../../Axios/Axios";

export default function MessageBodyBox() {
    const location = useLocation();
    const messageId = location.state?.messageId; // ✅ Get messageId from navigation state

    useEffect(() => {
        if (messageId) {
            console.log("📨 Message ID:", messageId);
        } else {
            console.warn("⚠️ No messageId found in navigation state.");
        }
    }, [messageId]);

    const messageBody = `!! AWAITING REVISED COPY !!

Dear John,

Welcome to alldayPA, and congratulations on registering your new account.

You can download the welcome pack at https://www.alldaypa.co.uk/alldayPA-Welcome.pdf

We are proud to inform you that you have joined the call answering market leader since 1999, and we pride ourselves on offering the best front line support for businesses - regardless of your business size.

In order for you to get started we have included our Welcome Pack which will explain how to get the most out of our service. Please see attached document.

For your reference, here is your alldayPA account information:

Virtual office name: adpcx_dev
Virtual office url: https://virtualoffice.alldaypa.com/login?company=adpcx_dev

The attached document will explain in full what to do with your account information.

Kind regards,

Gareth Jeffery 
Head of Customer Service`;


    const fetchMessageBody = async (messageId) => {
        try {
           const response = await getData(`/messages/viewMessageBody?messageId=${messageId}`);
            console.log("Fetched Message Body:", response);
        }
        catch (error) {
            console.error("Error fetching message body:", error);
        }
    }

    useEffect(() => {
        if (messageId) {
            fetchMessageBody(messageId);
        }   
    }, [messageId]);



    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "#fafafa",
                whiteSpace: "pre-wrap", // ✅ preserves line breaks
                overflowY: "auto",
                maxHeight: 400, // ✅ scrollable if content is long
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    fontFamily: "monospace",
                    fontSize: "0.95rem",
                    color: "#333",
                    lineHeight: 1.6,
                }}
            >
                {messageBody}
            </Typography>
        </Paper>
    );
}
