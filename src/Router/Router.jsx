// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Login from "../Pages/Login/Login";
// import ForgotPassword from "../Pages/Account/Forgot";
// import ResponsiveSidebar from "../Components/ToolBar/ToolBar";

// import Vip from "../Pages/Vip/Vip";
// import AddVip from "../Pages/AddVip/Addvip";
// import UsefulNumbers from "../Pages/UsefulNumber/Number";
// import FeedbackForm from "../Pages/Feedback/Feedback";
// import Staff from "../Pages/Staff/Staff";
// import AddStaff from "../Pages/AddStaff/AddStaff";
// import Notes from "../Pages/Notify/Notify";
// import AddNote from "../Pages/AddNote/AddNote";
// import Company from "../Pages/Company/Company";
// import Invoices from "../Pages/Invoice/Invoice";
// import InvoiceSettings from "../Pages/InvoiceSetting/invoiceSetting";
// import GreetingProfiles from "../Pages/Greetings/Greetings";
// import AddGreetingProfile from "../Pages/AddGreeting/AddGreeting";
// import AvailableStatus from "../Pages/Availabilities/Availability";
// import AddStatus from "../Pages/AddStatus/AddStatus";
// import Messages from "../Pages/Message/Message";
// import Fax from "../Pages/Fax/Fax";
// import AddFax from "../Pages/AddFax/AddFax";
// import AppDevices from "../Pages/AppDevices/AppDevices";
// import Addresses from "../Pages/Address/Address";
// import Profile from "../Pages/Profile/Profile";
// import AddAddress from "../Pages/AddAddress/AddAddress";
// import Statistics from "../Pages/Statistics/Statistics";
// import NotFound from "../Pages/NotFound/NotFound";
// import MessageBodyBox from "../Pages/Email/Email";
// import Home from "../Pages/Home/Home";

// export default function AppRouter() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   // 👇 Optional: Recheck token if it changes in other tabs or after login/logout
//   useEffect(() => {
//     const handleStorageChange = () => setToken(localStorage.getItem("token"));
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <Routes>
 
//       {!token && (
//         <>
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
        
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </>
//       )}

//       {token && (
//         <>
//           <Route element={<ResponsiveSidebar />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/vips" element={<Vip />} />
//             <Route path="/add-vip" element={<AddVip />} />
//             <Route path="/useful-numbers" element={<UsefulNumbers />} />
//             <Route path="/feedback-form" element={<FeedbackForm />} />
//             <Route path="/staff" element={<Staff />} />
//             <Route path="/add-staff" element={<AddStaff />} />
//             <Route path="/notes" element={<Notes />} />
//             <Route path="/add-note" element={<AddNote />} />
//             <Route path="/company-details" element={<Company />} />
//             <Route path="/invoices" element={<Invoices />} />
//             <Route path="/invoice-settings" element={<InvoiceSettings />} />
//             <Route path="/greetings" element={<GreetingProfiles />} />
//             <Route path="/add-greeting" element={<AddGreetingProfile />} />
//             <Route path="/availabilities" element={<AvailableStatus />} />
//             <Route
//               path="/availabilities/add-status"
//               element={<AddStatus />}
//             />
//             <Route path="/messages" element={<Messages />} />
//             <Route path="/fax-to-email" element={<Fax />} />
//             <Route path="/add-fax" element={<AddFax />} />
//             <Route path="/app-devices" element={<AppDevices />} />
//             <Route path="/addresses" element={<Addresses />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/add-address" element={<AddAddress />} />
//             <Route path="/statistics" element={<Statistics />} />
//             <Route path="/not-found" element={<NotFound />} />
//             <Route path="message-box" element={<MessageBodyBox/>} />
//           </Route>

//           <Route path="/login" element={<Navigate to="/" replace />} />
//           <Route path="/forgot-password" element={<Navigate to="/" replace />} />
//         </>
//       )}
//     </Routes>
//   );
// }
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Pages/Login/Login";
import ForgotPassword from "../Pages/Account/Forgot";
import ResponsiveSidebar from "../Components/ToolBar/ToolBar";

import Vip from "../Pages/Vip/Vip";
import AddVip from "../Pages/AddVip/Addvip";
import UsefulNumbers from "../Pages/UsefulNumber/Number";
import FeedbackForm from "../Pages/Feedback/Feedback";
import Staff from "../Pages/Staff/Staff";
import AddStaff from "../Pages/AddStaff/AddStaff";
import Notes from "../Pages/Notify/Notify";
import AddNote from "../Pages/AddNote/AddNote";
import Company from "../Pages/Company/Company";
import Invoices from "../Pages/Invoice/Invoice";
import InvoiceSettings from "../Pages/InvoiceSetting/invoiceSetting";
import GreetingProfiles from "../Pages/Greetings/Greetings";
import AddGreetingProfile from "../Pages/AddGreeting/AddGreeting";
import AvailableStatus from "../Pages/Availabilities/Availability";
import AddStatus from "../Pages/AddStatus/AddStatus";
import Messages from "../Pages/Message/Message";
import Fax from "../Pages/Fax/Fax";
import AddFax from "../Pages/AddFax/AddFax";
import AppDevices from "../Pages/AppDevices/AppDevices";
import Addresses from "../Pages/Address/Address";
import Profile from "../Pages/Profile/Profile";
import AddAddress from "../Pages/AddAddress/AddAddress";
import Statistics from "../Pages/Statistics/Statistics";
import NotFound from "../Pages/NotFound/NotFound";
import MessageBodyBox from "../Pages/Email/Email";
import Home from "../Pages/Home/Home";

export default function AppRouter() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 👇 Optional: Keep token state updated if login/logout happens in another tab
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      {/* ✅ Public routes — accessible without login */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ✅ Main app with sidebar */}
      <Route element={<ResponsiveSidebar />}>
        <Route path="/" element={<Home />} />
        <Route path="/vips" element={<Vip />} />
        <Route path="/add-vip" element={<AddVip />} />
        <Route path="/useful-numbers" element={<UsefulNumbers />} />
        <Route path="/feedback-form" element={<FeedbackForm />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/add-staff" element={<AddStaff />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/add-note" element={<AddNote />} />
        <Route path="/company-details" element={<Company />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoice-settings" element={<InvoiceSettings />} />
        <Route path="/greetings" element={<GreetingProfiles />} />
        <Route path="/add-greeting" element={<AddGreetingProfile />} />
        <Route path="/availabilities" element={<AvailableStatus />} />
        <Route path="/availabilities/add-status" element={<AddStatus />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/fax-to-email" element={<Fax />} />
        <Route path="/add-fax" element={<AddFax />} />
        <Route path="/app-devices" element={<AppDevices />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/message-box" element={<MessageBodyBox />} />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
