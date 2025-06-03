// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
// import "../styles/admin.css";
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");

  const stats = {
    donorsToday: 25,
    bloodUnits: 450,
    urgentRequests: 3,
  };

  const chartData = {
    labels: ['O+', 'A−', 'B+', 'AB−', 'O−'],
    datasets: [{
      label: 'Phân bố nhóm máu',
      data: [40, 35, 25, 20, 15],
      backgroundColor: '#ef4444'
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 50
      }
    }
  };

  const recentUrgentRequests = [
    { date: "04/05/2024", hospital: "Bệnh viện TP", bloodType: "O+", units: 6, status: "Đang chờ" },
    { date: "04/05/2024", hospital: "Phòng khám Mercy", bloodType: "O−", units: 2, status: "Đang chờ" },
    { date: "04/05/2024", hospital: "Bệnh viện Trung ương", bloodType: "O+", units: 4, status: "Đang chờ" },
    { date: "04/04/2024", hospital: "Bệnh viện New Town", bloodType: "O+", units: 8, status: "Đang chờ" },
  ];

  const users = [
    { username: "admin", email: "admin@example.com", role: "Quản trị", status: "Hoạt động" },
    { username: "user1", email: "user1@example.com", role: "Nhân viên", status: "Hoạt động" },
  ];

  const bloodTypes = [
    { code: "O+", description: "Phổ biến" },
    { code: "AB-", description: "Hiếm" },
  ];

  const rules = [
    { component: "Hồng cầu", donor: "O-", recipient: "A+", compatible: true },
    { component: "Huyết tương", donor: "AB+", recipient: "O-", compatible: false },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>QUẢN TRỊ</h2>
        {[
          "dashboard", "users", "blood", "compatibility", "urgent"
        ].map((key) => (
          <button key={key} onClick={() => setTab(key)} className={tab === key ? "active" : ""}>
            {key === "dashboard" ? "Tổng quan" :
              key === "users" ? "Người dùng & Vai trò" :
              key === "blood" ? "Nhóm máu & Thành phần" :
              key === "compatibility" ? "Tương thích" :
              "Yêu cầu khẩn cấp"}
          </button>
        ))}
      </aside>

      <main className="admin-main">
        {tab === "dashboard" && (
          <>
            <h2>Tổng quan</h2>
            <div className="dashboard-stats">
              <div className="stat-card">
                <img src="/donor.png" alt="Donors" />
                Người hiến hôm nay: {stats.donorsToday}
              </div>
              <div className="stat-card">
                <img src="/donvihienmau.png" alt="Blood Units" />
                Đơn vị máu còn: {stats.bloodUnits}
              </div>
              <div className="stat-card">
                <img src="khancap.png" alt="Urgent Requests" />
                Yêu cầu khẩn cấp: {stats.urgentRequests}
              </div>
            </div>
            <div className="chart-container">
              <h3>Phân bố nhóm máu</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <h3>Yêu cầu khẩn cấp gần đây</h3>
              <table>
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Bệnh viện</th>
                    <th>Nhóm máu</th>
                    <th>Số đơn vị</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUrgentRequests.map((r, i) => (
                    <tr key={i}>
                      <td>{r.date}</td>
                      <td>{r.hospital}</td>
                      <td>{r.bloodType}</td>
                      <td>{r.units}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "users" && (
          <div>
            <h2>👥 Quản lý người dùng</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Tên đăng nhập</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "blood" && (
          <div>
            <h2>🩸 Quản lý nhóm máu</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Mã nhóm</th>
                  <th>Mô tả</th>
                </tr>
              </thead>
              <tbody>
                {bloodTypes.map((b, i) => (
                  <tr key={i}>
                    <td>{b.code}</td>
                    <td>{b.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "compatibility" && (
          <div>
            <h2>🔗 Quy tắc tương thích máu</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Thành phần</th>
                  <th>Người cho</th>
                  <th>Người nhận</th>
                  <th>Tương thích</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r, i) => (
                  <tr key={i}>
                    <td>{r.component}</td>
                    <td>{r.donor}</td>
                    <td>{r.recipient}</td>
                    <td>{r.compatible ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "urgent" && (
          <div>
            <h2>🚨 Danh sách yêu cầu khẩn cấp</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Bệnh viện</th>
                  <th>Nhóm máu</th>
                  <th>Số đơn vị</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentUrgentRequests.map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td>{r.hospital}</td>
                    <td>{r.bloodType}</td>
                    <td>{r.units}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
