import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import "../styles/user.css";

const UserLayout = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      setLoading(false);
      return;
    }

    UserService.getUserById(currentUser.id)
      .then((res) => {
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải thông tin người dùng.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="main-content-user">Đang tải dữ liệu...</div>;

  return (
    <div className="user-layout">
      <div className="sidebar-user">
        <h2 className="sidebar-title">
          👤 {userInfo?.first_name || "Ẩn danh"} {userInfo?.last_name || ""}
        </h2>
        <p style={{ fontSize: "1rem", color: "#000", padding: "0 1rem" }}>
          Nhóm máu: <strong>{userInfo?.blood_type || "N/A"}</strong><br />
          Email: {userInfo?.email || "N/A"}<br />
          SĐT: {userInfo?.phone || "N/A"}
        </p>

        <h3 className="sidebar-title">Người hiến máu</h3>
        <button className="sidebar-btn" onClick={() => navigate("register")}>Đăng ký hiến máu</button>
        <button className="sidebar-btn" onClick={() => navigate("donation-history")}>Lịch sử hiến máu</button>
        <button className="sidebar-btn" onClick={() => navigate("aftercare")}>Sau hiến máu</button>
        <h3 className="sidebar-title" style={{ marginTop: "1.5rem" }}>Tìm hiểu thêm</h3>
        <button className="sidebar-btn" onClick={() => navigate("types")}>Các loại máu</button>
        <button className="sidebar-btn" onClick={() => navigate("receive")}>Cách nhận máu</button>
        <button className="sidebar-btn" onClick={() => navigate("roles")}>Chủ & phụ</button>

        
      </div>

      <div className="main-content-user">
        {error && <p className="text-danger">{error}</p>}
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
