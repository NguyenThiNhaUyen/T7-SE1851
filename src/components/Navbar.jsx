import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ currentUser, showAdminBoard, showStaffBoard, showUserBoard, logOut }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      {/* Bên trái - logo */}
      <div className="navbar-left">
        <img
          src="/Logo-Blood-Donation.jpg"
          alt="Logo"
          className="navbar-logo"
        />
      </div>

      {/* Giữa - điều hướng chính */}
      <div className="navbar-center">
        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Trang chủ</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Tin tức</NavLink>
        <NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hỏi - Đáp</NavLink>
        <NavLink to="/activities" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hoạt động</NavLink>

        {/* Admin */}
        {showAdminBoard && (
          <>
            <NavLink to="/notifications/send" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Gửi thông báo</NavLink>
          </>
        )}

        {/* Nhân viên */}
        {showStaffBoard && (
          <>
            <NavLink to="/staff" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Trang nhân viên</NavLink>
            <NavLink to="/staff/requests" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Yêu cầu máu</NavLink>
            <NavLink to="/staff/transfusions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Truyền máu</NavLink>
            <NavLink to="/staff/inventory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Kho máu</NavLink>
            <NavLink to="/staff/statistics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Thống kê</NavLink>
          </>
        )}

      </div>

      {/* Phải - tài khoản */}
      <div className="navbar-right">
        {/* Chỉ user thường mới thấy link profile */}
        {showUserBoard && !showAdminBoard && !showStaffBoard && currentUser && (
          <NavLink
            to="/profile"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            {currentUser.username}
          </NavLink>
        )}

        {/* Hiển thị username cho admin hoặc staff, không phải link */}
        {!showUserBoard && currentUser && (
          <span
            className="text"
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: "1rem",
              transition: "0.2s ease",
              padding: "8px",
            }}
          >
        {currentUser.username}
      </span>
        )}


      {/* Nếu đã đăng nhập, ai cũng thấy nút Đăng xuất */}
      {currentUser ? (
        <span onClick={handleLogout} className="nav-link" style={{ cursor: "pointer" }}>
          Đăng xuất
        </span>
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Đăng nhập
          </NavLink>
          <NavLink
            to="/register/information"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Đăng ký
          </NavLink>
        </>
      )}
    </div>
    </nav >
  );
};

export default Navbar;
