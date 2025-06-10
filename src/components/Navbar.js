import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ currentUser, showAdminBoard, showStaffBoard, logOut }) => {
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
            <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin</NavLink>
            <NavLink to="/notifications" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Thông báo</NavLink>
            <NavLink to="/notifications/send" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Gửi thông báo</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Bài viết</NavLink>
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

        {/* Người dùng */}
        {currentUser && !showAdminBoard && !showStaffBoard && (
          <NavLink to={`/user/${currentUser.id}`} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Trang người dùng</NavLink>
        )}
      </div>

      {/* Phải - tài khoản */}
      <div className="navbar-right">
        {currentUser ? (
          <>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {currentUser.username}
            </NavLink>
            <a href="/" onClick={handleLogout} className="nav-link">Đăng xuất</a>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Đăng nhập</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Đăng ký</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
