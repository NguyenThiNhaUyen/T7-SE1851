import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar-custom">
      <div className="navbar-left">
        <img
          src="/Logo-Blood-Donation.jpg"
          alt="Logo"
          className="navbar-logo"
        />
      </div>
      <div className="navbar-center">
        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Trang chủ</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Tin tức</NavLink>
        <NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hỏi - Đáp</NavLink>
        <NavLink to="/activities" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hoạt động</NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Đăng nhập</NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Đăng ký</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
