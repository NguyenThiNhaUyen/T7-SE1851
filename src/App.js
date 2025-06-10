import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

import BoardStaff from "./components/BoardStaff";

// Người hiến máu và nhận máu
import UserLayout from "./layouts/UserLayout";
import DonationRegister from "./components/DonationRegister";
import DonationHistory from "./components/DonationHistory";
import DonationAftercare from "./components/DonationAftercare";
import BloodRequestForm from "./components/BloodRequestForm";
import RequestHistory from "./components/RequestHistory";
import TransfusionHistory from "./components/TransfusionHistory";
import BloodTypes from "./components/BloodTypes";
import BloodReceive from "./components/BloodReceive";
import BloodRoles from "./components/BloodRoles";

// Staff
import StaffRequests from "./components/StaffRequests";
import TransfusionConfirm from "./components/TransfusionConfirm";
import InventoryChart from "./components/InventoryChart";
import StaffStatistics from "./components/StaffStatistics";
import UrgentRequests from "./components/UrgentRequests";
import StaffLayout from "./layouts/StaffLayout";

// Blog, Thông báo, Thanh toán
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import NotificationList from "./components/NotificationList";
import NotificationForm from "./components/NotificationForm";
import VnPayForm from "./components/VnPayForm";

// Bảng quy tắc tương thích
import CompatibilityTable from "./components/CompatibilityTable";
import AdminDashboard from "./pages/AdminDashboard";

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
      <Navbar
        currentUser={currentUser}
        showAdminBoard={showAdminBoard}
        showStaffBoard={showStaffBoard}
        logOut={logOut}
      />

      <div className="full-width">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={showAdminBoard || showStaffBoard ? <Navigate to="/home" /> : <BoardUser />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/compatibility" element={<CompatibilityTable />} />

          <Route path="/user" element={<UserLayout />}>
            <Route index element={<BoardUser />} />
            <Route path="register" element={<DonationRegister />} />
            <Route path="donation-history" element={<DonationHistory />} />
            <Route path="aftercare" element={<DonationAftercare />} />
            <Route path="new" element={<BloodRequestForm />} />
            <Route path="request-history" element={<RequestHistory />} />
            <Route path="transfusion-history" element={<TransfusionHistory />} />
            <Route path="types" element={<BloodTypes />} />
            <Route path="receive" element={<BloodReceive />} />
            <Route path="roles" element={<BloodRoles />} />
          </Route>

          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />

          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/notifications/send" element={<NotificationForm />} />
          <Route path="/vnpay" element={<VnPayForm />} />

          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<BoardStaff />} />
            <Route path="requests" element={<StaffRequests />} />
            <Route path="transfusions" element={<TransfusionConfirm />} />
            <Route path="inventory" element={<InventoryChart />} />
            <Route path="statistics" element={<StaffStatistics />} />
            <Route path="urgent-requests" element={<UrgentRequests />} />
          </Route>
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;