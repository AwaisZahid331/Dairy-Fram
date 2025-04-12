import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword";
import Otp from "./Pages/Otp";
import ResetPassword from "./Pages/ResetPassword";
import './styles/global.css';

// Components
import Dashboard from "./Components/Dashboard";
import Members from "./Components/Members";
import GroupMembers from "./Components/GroupMembers";
import FramMembers from "./Components/FramMembers";
import Projects from "./Components/Projects";
import ClientDashboard from "./Components/ClientDashboard"
import ChatMessage from "./Components/ChatMessage";

// Setting
import Settings from "./Settings/Settings";
import MemberRoles from "./Settings/MemberRoles";

function App() {
  return (
    <Router>
      <Routes>
        {/* pages */}
        <Route path="/" element={<SignUpPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Components */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/groupMembers" element={<GroupMembers />} />
        <Route path="/framMembers" element={<FramMembers />} />
        <Route path="/projects" element= {<Projects/>}/>
        <Route path="/clientdashboard" element= {<ClientDashboard/>}/>
        <Route path="/chatmessage" element= {<ChatMessage/>}/>

        
        <Route path="/settings" element= {<Settings/>}/>
        <Route path="/settings/memberroles" element={<MemberRoles/>}/>


        
        
      </Routes>
    </Router>
  );
}

export default App;