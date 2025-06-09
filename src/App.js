import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

// Giao diện
import Navbar from "./components/Navbar";

// Các trang và component
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Forgot from "./components/Forgot";
import ChangePassword from "./components/ChangePassword";
import OtpVerify from "./components/OtpVerify";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import BoardStaff from "./components/BoardStaff";

// Người hiến máu và nhận máu
import DonationRegister from "./components/DonationRegister";
import DonationHistory from "./components/DonationHistory";
import DonationAftercare from "./components/DonationAftercare";
import BloodRequestForm from "./components/BloodRequestForm";
import RequestHistory from "./components/RequestHistory";

// Staff
import StaffRequests from "./components/StaffRequests";
import TransfusionConfirm from "./components/TransfusionConfirm";
import InventoryChart from "./components/InventoryChart";
import StaffStatistics from "./components/StaffStatistics";
import UrgentRequests from "./components/UrgentRequests";

// Blog, Thông báo, Thanh toán
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import BlogAccordion from './components/BlogAccordion';
import NotificationList from "./components/NotificationList";
import NotificationForm from "./components/NotificationForm";
import VnPayForm from "./components/VnPayForm";
import Activities from "./components/Activities";


const App = () => {
  const [showStaffBoard, setShowStaffBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowStaffBoard(user.roles.includes("ROLE_STAFF"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowStaffBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      {/* Sử dụng Navbar component */}
      <Navbar
        currentUser={currentUser}
        showAdminBoard={showAdminBoard}
        showStaffBoard={showStaffBoard}
        logOut={logOut}
      />

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={showAdminBoard || showStaffBoard ? <Navigate to="/home" /> : <BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />

          <Route path="/staff" element={<BoardStaff />} />
          <Route path="/staff/requests" element={<StaffRequests />} />
          <Route path="/staff/transfusions" element={<TransfusionConfirm />} />
          <Route path="/staff/urgent-requests" element={<UrgentRequests />} />
          <Route path="/requests/new" element={<BloodRequestForm />} />
          <Route path="/requests/history" element={<RequestHistory />} />
          <Route path="/donation/register" element={<DonationRegister />} />
          <Route path="/donation/history" element={<DonationHistory />} />
          <Route path="/donation/aftercare" element={<DonationAftercare />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/staff/inventory" element={<InventoryChart />} />
          <Route path="/staff/statistics" element={<StaffStatistics />} />

          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/faq" element={<BlogAccordion />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/notifications/send" element={<NotificationForm />} />
          <Route path="/vnpay" element={<VnPayForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
