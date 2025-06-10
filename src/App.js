import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

// Giao diện chung
import Navbar from "./components/Navbar";

// Các trang chính
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Forgot from "./components/Forgot";
import ChangePassword from "./components/ChangePassword";
import OtpVerify from "./components/OtpVerify";

// Quản trị viên
import BoardAdmin from "./components/BoardAdmin";

// Nhân viên
import BoardStaff from "./components/BoardStaff";
import StaffLayout from "./layouts/StaffLayout";
import StaffRequests from "./components/StaffRequests";
import TransfusionConfirm from "./components/TransfusionConfirm";
import InventoryChart from "./components/InventoryChart";
import StaffStatistics from "./components/StaffStatistics";
import UrgentRequests from "./components/UrgentRequests";

// Người dùng
import BoardUser from "./components/BoardUser";
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

// Khác
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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      const isAdmin = user.roles.includes("ROLE_ADMIN");
      const isStaff = user.roles.includes("ROLE_STAFF");
      setShowAdminBoard(isAdmin);
      setShowStaffBoard(isStaff);

      if (isStaff && (location.pathname === "/login" || location.pathname === "/home" || location.pathname === "/")) {
        navigate("/staff");
      }
    }

    EventBus.on("logout", logOut);
    return () => EventBus.remove("logout");
  }, [location]);

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

      {/* ✅ Đã thêm class page-content vào đây */}
      <div className="page-content width-full">
        <Routes>
          {/* Chung */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />

          {/* Admin */}
          <Route path="/admin" element={<BoardAdmin />} />

          {/* Staff */}
          <Route path="/staff" element={showStaffBoard ? <StaffLayout /> : <Navigate to="/home" />}>
            <Route index element={<BoardStaff />} />
            <Route path="requests" element={<StaffRequests />} />
            <Route path="transfusions" element={<TransfusionConfirm />} />
            <Route path="inventory" element={<InventoryChart />} />
            <Route path="statistics" element={<StaffStatistics />} />
            <Route path="urgent-requests" element={<UrgentRequests />} />
          </Route>

          {/* User */}
          <Route path="/user" element={showAdminBoard || showStaffBoard ? <Navigate to="/home" /> : <BoardUser />} />
          <Route path="/user/:id" element={<UserLayout />}>
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

          {/* Blog - Notification - Thanh toán */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/faq" element={<BlogAccordion />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/notifications/send" element={<NotificationForm />} />
          <Route path="/vnpay" element={<VnPayForm />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
