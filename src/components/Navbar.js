import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ currentUser, showAdminBoard, showStaffBoard, logOut }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-custom">
      <Link to="/" className="navbar-brand">Group 7</Link>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/home" className="nav-link">Home</Link>
        </li>

        {/* Admin */}
        {showAdminBoard && (
          <>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin</Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications" className="nav-link">Thông báo</Link>
            </li>
            <li className="nav-item">
              <Link to="/notifications/send" className="nav-link">Gửi thông báo</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">Bài viết</Link>
            </li>
          </>
        )}

        {/* Staff */}
        {showStaffBoard && (
          <>
            <li className="nav-item">
              <Link to="/staff" className="nav-link">Trang nhân viên</Link>
            </li>
            <li className="nav-item">
              <Link to="/staff/requests" className="nav-link">Yêu cầu máu</Link>
            </li>
            <li className="nav-item">
              <Link to="/staff/transfusions" className="nav-link">Truyền máu</Link>
            </li>
            <li className="nav-item">
              <Link to="/staff/inventory" className="nav-link">Kho máu</Link>
            </li>
            <li className="nav-item">
              <Link to="/staff/statistics" className="nav-link">Thống kê</Link>
            </li>
          </>
        )}

        {/* Người dùng */}
        {currentUser && !showAdminBoard && !showStaffBoard && (
          <li className="nav-item">
            <Link to={`/user/${currentUser.id}`} className="nav-link">Trang người dùng</Link>
          </li>
        )}
      </ul>

      <ul className="navbar-nav ml-auto">
        {currentUser ? (
          <>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">{currentUser.username}</Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={handleLogout}>LogOut</a>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
