import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getAllTransfusions } from "../services/transfusion.service";
import AdminService from "../services/admin.service";

Chart.register(BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");
  const [transfusions, setTransfusions] = useState([]);
  const [rules, setRules] = useState([]);
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [bloodTypes, setBloodTypes] = useState([]);

  useEffect(() => {
    getAllTransfusions().then(res => setTransfusions(res.data));
    AdminService.getCompatibilityRules().then(res => setRules(res.data));
    AdminService.getUrgentRequests().then(res => setUrgentRequests(res.data));
    AdminService.getAllUsers().then(res => setUsers(res.data));
    AdminService.getBloodTypes().then(res => setBloodTypes(res.data));
  }, []);

  const stats = {
    donorsToday: 25,
    bloodUnits: 450,
    urgentRequests: urgentRequests.length,
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
      y: { beginAtZero: true, max: 50 }
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>QUẢN TRỊ</h2>
        {["dashboard", "users", "blood", "compatibility", "urgent"].map((key) => (
          <button key={key} onClick={() => setTab(key)} className={tab === key ? "active" : ""}>
            {key === "dashboard" ? "Tổng quan" :
              key === "users" ? "Người dùng & Vai trò" :
              key === "blood" ? "Nhóm máu & Thành phần" :
              key === "compatibility" ? "Tương thích" : "Yêu cầu khẩn cấp"}
          </button>
        ))}
      </aside>

      <main className="admin-main">
        {tab === "dashboard" && (
          <>
            <h2>Tổng quan</h2>
            <div className="dashboard-stats">
              <div className="stat-card"><img src="/donor.png" alt="Donors" /> Người hiến hôm nay: {stats.donorsToday}</div>
              <div className="stat-card"><img src="/donvihienmau.png" alt="Blood Units" /> Đơn vị máu còn: {stats.bloodUnits}</div>
              <div className="stat-card"><img src="/khancap.png" alt="Urgent Requests" /> Yêu cầu khẩn cấp: {stats.urgentRequests}</div>
            </div>
            <div className="chart-container">
              <h3>Phân bố nhóm máu</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <h3>Lịch sử truyền máu gần đây</h3>
              <table>
                <thead><tr><th>Người nhận</th><th>Nhóm máu</th><th>Đơn vị</th><th>Ngày</th><th>Trạng thái</th></tr></thead>
                <tbody>
                  {transfusions.map((t, i) => (
                    <tr key={i}>
                      <td>{t.recipientName}</td>
                      <td>{t.bloodType}</td>
                      <td>{t.units}</td>
                      <td>{t.confirmedAt ? new Date(t.confirmedAt).toLocaleDateString() : '—'}</td>
                      <td>{t.status}</td>
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
              <thead><tr><th>Tên đăng nhập</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th></tr></thead>
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
              <thead><tr><th>Mã nhóm</th><th>Mô tả</th></tr></thead>
              <tbody>
                {bloodTypes.map((b, i) => (
                  <tr key={i}><td>{b.code}</td><td>{b.description}</td></tr>
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
            <td>{r.donorType}</td>
            <td>{r.recipientType}</td>
            <td>{r.compatible ? "✔️" : "❌"}</td>
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
              <thead><tr><th>Ngày</th><th>Bệnh viện</th><th>Nhóm máu</th><th>Số đơn vị</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {urgentRequests.map((req, i) => (
                  <tr key={i}>
                   <td>
  {req.requestDate
    ? new Date(req.requestDate).toLocaleDateString("vi-VN")
    : "Không rõ"}
</td>

                    <td>{req.hospitalName || "—"}</td>
                    <td>{req.bloodType}</td>
                    <td>{req.units}</td>
                    <td>{req.status}</td>
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
