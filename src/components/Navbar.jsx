import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BellOutlined } from "@ant-design/icons";
import "../styles/Navbar.css";

const Navbar = ({ currentUser, showAdminBoard, showStaffBoard, showUserBoard, logOut }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      {/* Bên trái - logo */}
      <div className="navbar-left">
        <img src="/Logo-Blood-Donation.jpg" alt="Logo" className="navbar-logo" />
      </div>

      {/* Giữa - điều hướng chính */}
      <div className="navbar-center">
        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Trang chủ</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Tin tức</NavLink>
        <NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hỏi - Đáp</NavLink>
        <NavLink to="/activities" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hoạt động</NavLink>

        {showAdminBoard && (
          <NavLink to="/notifications/send" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Gửi thông báo</NavLink>
        )}
      </div>

      {/* Phải - tài khoản */}
      <div className="navbar-right" style={{ position: "relative" }}>
        {currentUser && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <BellOutlined
              style={{ fontSize: "20px", color: "#fff", cursor: "pointer" }}
              onClick={() => setShowPopup(!showPopup)}
            />
          </div>
        )}

        {showPopup && (
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              top: "40px",
              right: "10px",
              background: "#fff",
              color: "#000",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              zIndex: 1000,
              width: "250px"
            }}
          >
            <p><strong>Thông báo</strong></p>
            <ul style={{ paddingLeft: "16px" }}>
              <li>Đây là thông báo 1</li>
              <li>Thông báo 2 sẽ ở đây</li>
            </ul>
          </div>
        )}

        {showUserBoard && !showAdminBoard && !showStaffBoard && currentUser && (
          <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {currentUser.username}
          </NavLink>
        )}

        {!showUserBoard && currentUser && (
          <span className="text" style={{ fontWeight: "bold", color: "white", fontSize: "1rem", padding: "8px" }}>
            {currentUser.username}
          </span>
        )}

        {currentUser ? (
          <span onClick={handleLogout} className="nav-link" style={{ cursor: "pointer" }}>
            Đăng xuất
          </span>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Đăng nhập
            </NavLink>
            <NavLink to="/register/information" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Đăng ký
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
