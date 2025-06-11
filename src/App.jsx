import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Tạm thời không kiểm tra quyền truy cập
  }, [location]);

  const logOut = () => {
    // Tạm thời không xử lý logout
  };

  return (
    <div>
      <Navbar
        currentUser={undefined}
        showAdminBoard={false}
        showStaffBoard={false}
        logOut={logOut}
      />

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
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<BoardStaff />} />
            <Route path="requests" element={<StaffRequests />} />
            <Route path="transfusions" element={<TransfusionConfirm />} />
            <Route path="inventory" element={<InventoryChart />} />
            <Route path="statistics" element={<StaffStatistics />} />
            <Route path="urgent-requests" element={<UrgentRequests />} />
          </Route>

          {/* User */}
          <Route path="/user" element={<BoardUser />} />
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
