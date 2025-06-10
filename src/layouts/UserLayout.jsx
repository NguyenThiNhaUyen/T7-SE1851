import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/user.css";

const UserLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`/api/test/user/${id}`)
      .then((res) => {
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải thông tin người dùng.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="main-content-user">Đang tải dữ liệu...</div>;
  if (error) return <div className="main-content-user text-danger">{error}</div>;

  return (
    <div className="user-layout">
      <div className="sidebar-user">
        <h2 className="sidebar-title">
          👤 {userInfo?.first_name} {userInfo?.last_name}
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#888", padding: "0 1rem" }}>
          Nhóm máu: <strong>{userInfo?.blood_type}</strong><br />
          Email: {userInfo?.email}<br />
          SĐT: {userInfo?.phone}
        </p>

        <h3 className="sidebar-title">Người hiến máu</h3>
        <button className="sidebar-btn" onClick={() => navigate("register")}>Đăng ký hiến máu</button>
        <button className="sidebar-btn" onClick={() => navigate("donation-history")}>Lịch sử hiến máu</button>
        <button className="sidebar-btn" onClick={() => navigate("aftercare")}>Sau hiến máu</button>

        <h3 className="sidebar-title" style={{ marginTop: "1.5rem" }}>Người nhận máu</h3>
        <button className="sidebar-btn" onClick={() => navigate("new")}>Yêu cầu máu</button>
        <button className="sidebar-btn" onClick={() => navigate("request-history")}>Lịch sử yêu cầu</button>
        <button className="sidebar-btn" onClick={() => navigate("transfusion-history")}>Lịch sử truyền máu</button>

        <h3 className="sidebar-title" style={{ marginTop: "1.5rem" }}>Tìm hiểu thêm</h3>
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
