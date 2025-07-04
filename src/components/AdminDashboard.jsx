// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { getAllTransfusions } from "../services/transfusion.service";

Chart.register(BarElement, CategoryScale, LinearScale);

const AdminDashboard = () => {
  const [transfusions, setTransfusions] = useState([]);

  useEffect(() => {
    getAllTransfusions()
      .then(res => setTransfusions(Array.isArray(res.data) ? res.data : []))
      .catch(() => setTransfusions([]));
  }, []);

  const stats = {
    donorsToday: 25,
    bloodUnits: 450,
    urgentRequests: 3,
  };

  const chartData = {
    labels: ["O+", "A−", "B+", "AB−", "O−"],
    datasets: [
      {
        label: "Phân bố nhóm máu",
        data: [40, 35, 25, 20, 15],
        backgroundColor: "#ef4444",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true, max: 50 },
    },
  };

  return (
    <div>
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
    </div>
  );
};

export default AdminDashboard;
