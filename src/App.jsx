import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/reset.css'; // Ant Design v5
import "./App.css";

import eventBus from "./common/EventBus";

// Giao diện chung
import Navbar from "./components/Navbar";

// Các trang chính
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterInformation from "./components/RegisterInformation";
import RegisterContact from "./components/RegisterContact";
import RegisterAccount from "./components/RegisterAccount";
import RegisterConfirm from "./components/RegisterConfirm";
import Profile from "./components/Profile";
import Forgot from "./components/Forgot";
import ChangePassword from "./components/ChangePassword";
import OtpVerify from "./components/OtpVerify";

// Quản trị viên
import BoardAdmin from "./components/BoardAdmin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
// import UserManagement from "./components/UserManagement";
// import BloodManagement from "./components/BloodManagement";
// import CompatibilityRules from "./components/CompatibilityRules";
// import ReportPage from "./components/ReportPage";

// Nhân viên
import BoardStaff from "./components/BoardStaff";
import StaffLayout from "./layouts/StaffLayout";
import BloodRequestForm from "./components/BloodRequestForm";
import DonationConfirm from "./components/DonationConfirm";
import InventoryChart from "./components/InventoryChart";
import StaffStatistics from "./components/StaffStatistics";
import UrgentRequests from "./components/UrgentRequests";

// Người dùng
import BoardUser from "./components/BoardUser";
import UserLayout from "./layouts/UserLayout";
import DonationRegister from "./components/DonationRegister";
import DonationHistory from "./components/DonationHistory";
import RequestHistory from "./components/RequestHistory";
import TransfusionHistory from "./components/TransfusionHistory";
import BloodTypes from "./components/BloodTypes";
import BloodReceive from "./components/BloodReceive";
import BloodRoles from "./components/BloodRoles";
import UrgentDonationRegister from "./components/UrgentDonationRegister";
import UrgentDonationWrapper from "./components/UrgentDonationWrapper";



// Khác
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import BlogAccordion from './components/BlogAccordion';
import VnPayForm from "./components/VnPayForm";
import Activities from "./components/Activities";
import AuthService from "./services/auth.service";
import DonationIntentSelection from "./components/DonationIntentSelection";
import DonationTermsPage from "./components/DonationTermsPage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showStaffBoard, setShowStaffBoard] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.role === "ADMIN");
      setShowStaffBoard(user.role === "STAFF");

      if (user.role === "STAFF" && ["/", "/home", "/login"].includes(location.pathname)) {
        navigate("/staff");
      }

      if (user.role === "ADMIN" && ["/", "/home", "/login"].includes(location.pathname)) {
        navigate("/admin");
      }

      if (user.role === "USER" && ["/", "/home", "/login"].includes(location.pathname)) {
        navigate(`/user/${user.id}`);
      }
    }

    eventBus.on("logout", logOut);
    return () => eventBus.remove("logout", logOut);
  }, [location]);

  const logOut = () => {
    AuthService.logout?.();
    setCurrentUser(undefined);
    setShowAdminBoard(false);
    setShowStaffBoard(false);
    navigate("/login");
  };
  
  const showUserBoard =
    currentUser &&
    currentUser.role !== "ADMIN" &&
    currentUser.role !== "STAFF";

  return (
    <div>
      <Navbar
        currentUser={currentUser}
        showAdminBoard={showAdminBoard}
        showStaffBoard={showStaffBoard}
        showUserBoard={showUserBoard}
        logOut={logOut}
      />

      <div className="page-content width-full">
        <Routes>
          {/* Chung */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donation-intent" element={<DonationIntentSelection />} />
          <Route path="/agree-terms" element={<DonationTermsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />

          {/* Đăng ký */}
          <Route path="/register/information" element={<RegisterInformation />} />
          <Route path="/register/contact" element={<RegisterContact />} />
          <Route path="/register/account" element={<RegisterAccount />} />
          <Route path="/register/confirm" element={<RegisterConfirm />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<BoardAdmin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            {/* <Route path="users" element={<UserManagement />} />
            <Route path="blood" element={<BloodManagement />} />
            <Route path="compatibility" element={<CompatibilityRules />} />
            <Route path="urgent" element={<UrgentRequests />} />
            <Route path="report" element={<ReportPage />} /> */}
            {/* <Route path="/admin/blog" element={<BlogList />} /> */}
          </Route>

          {/* Staff */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<BoardStaff />} />
            <Route path="requests" element={<BloodRequestForm />} />
            <Route path="donation" element={<DonationConfirm />} />
            <Route path="inventory" element={<InventoryChart />} />
            <Route path="statistics" element={<StaffStatistics />} />
            <Route path="urgent-requests" element={<UrgentRequests />} />
            
          </Route>

          {/* User */}
          <Route path="/user/:id" element={<UserLayout />}>
            <Route index element={<BoardUser />} />
            <Route path="register" element={<DonationRegister />} />
            <Route path="donation-history" element={<DonationHistory />} />
            <Route path="request-history" element={<RequestHistory />} />
            <Route path="transfusion-history" element={<TransfusionHistory />} />
            <Route path="types" element={<BloodTypes />} />
            <Route path="receive" element={<BloodReceive />} />
            <Route path="roles" element={<BloodRoles />} />
            <Route path="urgent-register" element={<UrgentDonationRegister />} />
          
          </Route>

          {/* Blog - Notification - Thanh toán */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/faq" element={<BlogAccordion />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/vnpay" element={<VnPayForm />} />
         <Route path="/donate/urgent" element={<UrgentDonationWrapper />} />

          {/* Nếu không khớp */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
