// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getAllTransfusions } from "../services/transfusion.service";
Chart.register(BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");
  const [transfusions, setTransfusions] = useState([]);

  useEffect(() => {
    getAllTransfusions()
      .then(res => {
        console.log("✅ Dữ liệu từ API:", res.data);
        if (Array.isArray(res.data)) {
          setTransfusions(res.data);
        } else {
          console.error("❌ API không trả về mảng:", res.data);
          setTransfusions([]);
        }
      })
      .catch(error => {
        console.error("❌ Lỗi khi gọi API:", error);
        setTransfusions([]);
      });
  }, []);

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
        {["dashboard", "users", "staff", "blood", "compatibility", "notification", "urgent", "history", "report", "blog" ].map((key) => (
          <button key={key} onClick={() => setTab(key)} className={tab === key ? "active" : ""}>
            {key === "dashboard" ? "Tổng quan" :
              key === "users" ? "Người dùng & Vai trò" :
                key === "staff" ? "Nhân viên y tế" :
                  key === "blood" ? "Nhóm máu & Thành phần" :
                    key === "compatibility" ? "Quy tắc tương thích" :
                      key === "notification" ? "Thông báo" :
                        key === "urgent" ? "Yêu cầu khẩn cấp" :
                          key === "history" ? "Lịch sử hiến máu" :
                            key === "report" ? "Báo cáo & Thống kê" :
                              "Tin tức & Blog"
            }
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
                <img src="/khancap.png" alt="Urgent Requests" />
                Yêu cầu khẩn cấp: {stats.urgentRequests}
              </div>
            </div>
            <div className="chart-container">
              <h3>Phân bố nhóm máu</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="chart-container">
              <h3>Lịch sử truyền máu gần đây</h3>
              <table>
                <thead>
                  <tr>
                    <th>Người nhận</th>
                    <th>Nhóm máu</th>
                    <th>Đơn vị</th>
                    <th>Ngày</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(transfusions) && transfusions.length > 0 ? (
                    transfusions.map((t, i) => (
                      <tr key={i}>
                        <td>{t.recipientName}</td>
                        <td>{t.bloodType}</td>
                        <td>{t.units}</td>
                        <td>{t.confirmedAt ? new Date(t.confirmedAt).toLocaleDateString() : '—'}</td>
                        <td>{t.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Không có dữ liệu truyền máu.</td>
                    </tr>
                  )}
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

{tab === "staff" && <div>📋 Danh sách nhân viên y tế</div>}
{tab === "notification" && <div>🔔 Quản lý thông báo</div>}
{tab === "report" && <div>📊 Thống kê báo cáo</div>}


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
                <tr>
                  <td>—</td>
                  <td>Chưa có dữ liệu từ API</td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
