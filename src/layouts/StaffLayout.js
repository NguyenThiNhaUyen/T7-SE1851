import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import "../styles/staff.css";

const StaffLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/staff/requests") setActive("requests");
    else if (path === "/staff/transfusions") setActive("transfusions");
    else if (path === "/staff/inventory") setActive("inventory");
    else if (path === "/staff/statistics") setActive("statistics");
    else if (path === "/staff/urgent-requests") setActive("urgent");
    else setActive("");
  }, [location.pathname]);

  const handleNavigate = (path) => navigate(path);

  return (
    <div className="staff-layout">
      <aside className="staff-sidebar">
        <h2 className="sidebar-title">BẢNG ĐIỀU KHIỂN NHÂN VIÊN</h2>
        <nav className="sidebar-nav">
          <button
            onClick={() => handleNavigate("/staff/requests")}
            className={active === "requests" ? "nav-btn active" : "nav-btn"}
          >
            Yêu cầu nhận máu
          </button>
          <button
            onClick={() => handleNavigate("/staff/transfusions")}
            className={active === "transfusions" ? "nav-btn active" : "nav-btn"}
          >
            Xác nhận truyền máu
          </button>
          <button
            onClick={() => handleNavigate("/staff/inventory")}
            className={active === "inventory" ? "nav-btn active" : "nav-btn"}
          >
            Quản lý kho máu
          </button>
          <button
            onClick={() => handleNavigate("/staff/statistics")}
            className={active === "statistics" ? "nav-btn active" : "nav-btn"}
          >
            Thống kê
          </button>
          <button
            onClick={() => handleNavigate("/staff/urgent-requests")}
            className={active === "urgent" ? "nav-btn active" : "nav-btn"}
          >
            Yêu cầu khẩn cấp
          </button>
        </nav>
      </aside>

      <main className="staff-main">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;
