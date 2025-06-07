import React from "react";
import { Link } from "react-router-dom";
import  "../styles/Navbar.css"

const Navbar = ({ currentUser, showAdminBoard, showStaffBoard, logOut }) => {
  return (
    <nav className="navbar navbar-expand navbar-custom">
      <Link to={"/"} className="navbar-brand">Group 7</Link>

      <div className="navbar-nav mr-auto">
        <li className="nav-item"><Link to="/home" className="nav-link">Home</Link></li>

        {showAdminBoard && (
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Admin Board</Link>
          </li>
        )}

        {showStaffBoard && (
          <li className="nav-item">
            <Link to="/staff" className="nav-link">Staff Board</Link>
          </li>
        )}

        {currentUser && !showAdminBoard && !showStaffBoard && (
          <li className="nav-item">
            <Link to="/user" className="nav-link">User</Link>
          </li>
        )}
      </div>

      <div className="navbar-nav ml-auto">
        {currentUser ? (
          <>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">{currentUser.username}</Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
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
      </div>
    </nav>
  );
};

export default Navbar;
