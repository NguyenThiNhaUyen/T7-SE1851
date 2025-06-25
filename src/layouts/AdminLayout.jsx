import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import "../styles/admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const path = location.pathname;
    const current = tabs.find((t) => path.includes(`/admin/${t.key}`));
    setActive(current?.key || "");
  }, [location.pathname]);


  const tabs = [
    { key: "dashboard", label: "Tổng quan" },
    { key: "users", label: "Người dùng & Vai trò" },
    { key: "staff", label: "Nhân viên y tế" },
    { key: "blood", label: "Nhóm máu & Thành phần" },
    { key: "compatibility", label: "Quy tắc tương thích" },
    { key: "notification", label: "Thông báo" },
    { key: "urgent", label: "Yêu cầu khẩn cấp" },
    { key: "history", label: "Lịch sử hiến máu" },
    { key: "report", label: "Báo cáo & Thống kê" },
    { key: "blog", label: "Tin tức & Blog" },
  ];

  const handleNavigate = (tab) => navigate(`/admin/${tab}`);

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">BẢNG QUẢN TRỊ</h2>
        <nav className="sidebar-nav">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleNavigate(tab.key)}
              className={active === tab.key ? "nav-btn active" : "nav-btn"}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
