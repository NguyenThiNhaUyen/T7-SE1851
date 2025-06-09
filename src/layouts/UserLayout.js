import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/user.css";

const UserLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="user-layout">
      <div className="sidebar-user">
        <h2 className="sidebar-title">Người hiến máu</h2>
        <button className="sidebar-btn" onClick={() => navigate("register")}>Đăng ký hiến máu</button>
        <button className="sidebar-btn" onClick={() => navigate("donation-history")}>Lịch sử hiến máu</button>
        <button className="sidebar-btn" onClick={() => navigate("aftercare")}>Thông báo sau hiến máu</button>

        <h2 className="sidebar-title" style={{ marginTop: "2rem" }}>Người nhận máu</h2>
        <button className="sidebar-btn" onClick={() => navigate("new")}>Gửi yêu cầu nhận máu</button>
        <button className="sidebar-btn" onClick={() => navigate("request-history")}>Lịch sử yêu cầu máu</button>
        <button className="sidebar-btn" onClick={() => navigate("transfusion-history")}>Lịch sử truyền máu</button>

        <h2 className="sidebar-title" style={{ marginTop: "2rem" }}>Tìm hiểu thêm</h2>
        <button className="sidebar-btn" onClick={() => navigate("types")}>Các loại máu</button>
        <button className="sidebar-btn" onClick={() => navigate("receive")}>Cách nhận máu</button>
        <button className="sidebar-btn" onClick={() => navigate("roles")}>Chủ & phụ</button>
      </div>

      <div className="main-content-user">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;