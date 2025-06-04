import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import BoardStaff from "./components/BoardStaff";
import BloodRequestForm from "./components/BloodRequestForm";
import TransfusionConfirm from "./components/TransfusionConfirm";
import RequestHistory from "./components/RequestHistory";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import Forgot from "./components/Forgot";
import ChangePassword from "./components/ChangePassword";
import DonationRegister from "./components/DonationRegister";
import DonationHistory from "./components/DonationHistory";
import DonationAftercare from "./components/DonationAftercare";
import OtpVerify from "./components/OtpVerify";
import BlogDetail from "./components/BlogDetail";
import BlogList from "./components/BlogList";
import NotificationList from "./components/NotificationList";
import NotificationForm from "./components/NotificationForm";
import VnPayForm from "./components/VnPayForm";

import EventBus from "./common/EventBus";

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
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Group 7
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {showStaffBoard && (
            <li className="nav-item">
              <Link to={"/staff"} className="nav-link">
                Staff Board
              </Link>
            </li>
          )}

          {currentUser && !showAdminBoard && !showStaffBoard && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={showAdminBoard || showStaffBoard ? <Navigate to="/home" /> : <BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />

          <Route path="/staff" element={<BoardStaff />} />
          <Route path="/requests/new" element={<BloodRequestForm />} />
          <Route path="/staff/transfusions" element={<TransfusionConfirm />} />
          <Route path="/requests/history" element={<RequestHistory />} />
          <Route path="/donation/register" element={<DonationRegister />} />
          <Route path="/donation/history" element={<DonationHistory />} />
          <Route path="/donation/aftercare" element={<DonationAftercare />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          {/* Blog, Thông báo, VnPay */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/notifications/send" element={<NotificationForm />} />
          <Route path="/vnpay" element={<VnPayForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
