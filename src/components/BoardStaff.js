// src/components/BoardStaff.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/staff.css";

const BoardStaff = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("requests");

  const handleNavigate = (path, key) => {
    navigate(path);
    setActive(key);
  };

  return (
    <div className="staff-layout">
      <aside className="staff-sidebar">
        <h2>NHÂN VIÊN</h2>
        <button
          onClick={() => handleNavigate("/staff/requests", "requests")}
          className={active === "requests" ? "active" : ""}
        >
          📥 Yêu cầu nhận máu
        </button>
        <button
          onClick={() => handleNavigate("/staff/transfusions", "transfusions")}
          className={active === "transfusions" ? "active" : ""}
        >
          💉 Xác nhận truyền máu
        </button>
        <button
          onClick={() => handleNavigate("/staff/inventory", "inventory")}
          className={active === "inventory" ? "active" : ""}
        >
          📦 Kho máu
        </button>
        <button
          onClick={() => handleNavigate("/staff/statistics", "statistics")}
          className={active === "statistics" ? "active" : ""}
        >
          📊 Thống kê
        </button>
        <button
          onClick={() => handleNavigate("/staff/urgent-requests", "urgent")}
          className={active === "urgent" ? "active" : ""}
        >
          🚨 Yêu cầu khẩn cấp
        </button>
      </aside>

      <main className="staff-main">
        <h3>Chọn một chức năng từ menu bên trái</h3>
      </main>
    </div>
  );
};

export default BoardStaff;
