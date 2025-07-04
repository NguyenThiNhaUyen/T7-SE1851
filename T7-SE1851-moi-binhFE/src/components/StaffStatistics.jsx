// 📊 Enhanced Staff Statistics Page
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../styles/staff.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const StaffStatistics = () => {
  const [stats, setStats] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [chartType, setChartType] = useState("bar");

  const today = new Date().toISOString().split("T")[0];

  const handlePresetChange = (value) => {
    setDateRange(value);
    const now = new Date();
    let from = "", to = today;

    switch (value) {
      case "today":
        from = to;
        break;
      case "yesterday":
        now.setDate(now.getDate() - 1);
        from = to = now.toISOString().split("T")[0];
        break;
      case "last7":
        now.setDate(now.getDate() - 6);
        from = now.toISOString().split("T")[0];
        break;
      case "last30":
        now.setDate(now.getDate() - 29);
        from = now.toISOString().split("T")[0];
        break;
      default:
        from = ""; to = "";
    }

    setFromDate(from);
    setToDate(to);
  };

  const fetchStatistics = () => {
    axios
      .get("http://localhost:3000/api/statistics", {
        params: { bloodType, component, fromDate, toDate },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("❌ Lỗi lấy dữ liệu thống kê:", err));
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(stats);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ThongKeTruyenMau");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "bao_cao_truyen_mau.xlsx");
  };

  const getTopComponent = () => {
    return stats.reduce((prev, curr) => prev.total_transfusions > curr.total_transfusions ? prev : curr, stats[0])?.component_name || "N/A";
  };

  const getTopBloodType = () => {
    return stats.reduce((prev, curr) => prev.total_transfusions > curr.total_transfusions ? prev : curr, stats[0])?.blood_type || "N/A";
  };

  const getLastTransfusionDate = () => {
    const latest = stats.reduce((latest, s) => new Date(s.last_date) > new Date(latest) ? s.last_date : latest, stats[0]?.last_date || "");
    return latest ? new Date(latest).toLocaleDateString() : "N/A";
  };

  return (
    <div className="inventory-container">
      <h2>📊 Thống kê truyền máu</h2>

      <div className="stats-wrapper">
        <h4>🎛️ Bộ lọc thống kê truyền máu</h4>
        <div className="filter-panel">
          <div className="filter-group">
            <label>Nhóm máu:</label>
            <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
              <option value="">-- Chọn nhóm máu --</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Thành phần:</label>
            <select value={component} onChange={(e) => setComponent(e.target.value)}>
              <option value="">-- Chọn thành phần --</option>
              {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Thời gian nhanh:</label>
            <select value={dateRange} onChange={(e) => handlePresetChange(e.target.value)}>
              <option value="">-- Tuỳ chọn --</option>
              <option value="today">Hôm nay</option>
              <option value="yesterday">Hôm qua</option>
              <option value="last7">7 ngày qua</option>
              <option value="last30">30 ngày qua</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Từ ngày:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div className="filter-group">
            <label>Đến ngày:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>

          <div className="filter-group">
            <label>Biểu đồ:</label>
            <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">📊 Biểu đồ cột</option>
              <option value="pie">🧬 Biểu đồ tròn</option>
            </select>
          </div>

          <div className="filter-group">
            <button onClick={fetchStatistics}>🔍 Lọc</button>
            <button className="export-btn" onClick={exportToExcel}>📥 Xuất Excel</button>
            <button onClick={() => {
              setBloodType(""); setComponent(""); setFromDate(""); setToDate(""); setDateRange("");
              fetchStatistics();
            }}>♻️ Xoá bộ lọc</button>
          </div>
        </div>

        {stats.length === 0 ? (
          <p style={{ color: "#dc2626", marginTop: "1rem" }}>⚠️ Không tìm thấy dữ liệu phù hợp với bộ lọc hiện tại.</p>
        ) : (
          <>
            <div className="summary-section">
              <div className="card">🔢 <strong>Tổng lượt truyền:</strong> {stats.reduce((sum, s) => sum + s.total_transfusions, 0)}</div>
              <div className="card">👥 <strong>Tổng bệnh nhân:</strong> {stats.reduce((sum, s) => sum + s.total_patients, 0)}</div>
              <div className="card">🧬 <strong>Thành phần phổ biến:</strong> {getTopComponent()}</div>
              <div className="card">🩸 <strong>Nhóm máu phổ biến:</strong> {getTopBloodType()}</div>
              <div className="card">📅 <strong>Ngày gần nhất:</strong> {getLastTransfusionDate()}</div>
            </div>

            <div className="chart-wrapper">
              {chartType === "bar" ? (
                <Bar
                  data={{
                    labels: stats.map(s => `${s.blood_type} - ${s.component_name}`),
                    datasets: [{
                      label: "Số lượt truyền",
                      data: stats.map(s => s.total_transfusions),
                      backgroundColor: "#3b82f6"
                    }]
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              ) : (
                <Pie
                  data={{
                    labels: [...new Set(stats.map(s => s.component_name))],
                    datasets: [{
                      label: "Tỷ lệ",
                      data: [...new Set(stats.map(s => s.component_name))].map(
                        name => stats.filter(s => s.component_name === name)
                          .reduce((acc, s) => acc + s.total_transfusions, 0)
                      ),
                      backgroundColor: ["#f87171", "#60a5fa", "#34d399"]
                    }]
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffStatistics;