import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../styles/staff.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const StaffStatistics = () => {
  const [stats, setStats] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchStatistics = () => {
    axios
      .get("http://localhost:3000/api/statistics", {
        params: { bloodType, component, fromDate, toDate },
      })
      .then((res) => {
        console.log("📊 Dữ liệu trả về từ API:", res.data); // Debug
        setStats(res.data);
      })
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

  return (
    <div className="staff-statistics-container">
      <h2>📊 Báo cáo Thống kê Truyền máu</h2>

      <div className="filter-panel">
        <div className="form-group">
          <label>Nhóm máu:</label>
          <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            <option value="">-- Chọn nhóm máu --</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Thành phần:</label>
          <select value={component} onChange={(e) => setComponent(e.target.value)}>
            <option value="">-- Chọn thành phần --</option>
            {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Từ ngày:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Đến ngày:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>

        <div className="form-actions">
          <button onClick={fetchStatistics}>🔍 Lọc</button>
          <button onClick={exportToExcel}>📥 Xuất Excel</button>
          <button onClick={() => {
            setBloodType("");
            setComponent("");
            setFromDate("");
            setToDate("");
            fetchStatistics(); // Reload toàn bộ
          }}>♻️ Xoá bộ lọc</button>
        </div>
      </div>



      {stats.length === 0 ? (
        <p>❗ Không có dữ liệu phù hợp.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Nhóm máu</th>
                <th>Thành phần</th>
                <th>Số lượt truyền</th>
                <th>Tổng thể tích (ml)</th>
                <th>Số người nhận</th>
                <th>Ngày truyền gần nhất</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, i) => (
                <tr key={i}>
                  <td>{s.blood_type}</td>
                  <td>{s.component_name}</td>
                  <td>{s.total_transfusions}</td>
                  <td>{s.total_volume}</td>
                  <td>{s.total_patients}</td>
                  <td>{s.last_date ? new Date(s.last_date).toLocaleDateString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ maxWidth: "500px", marginTop: "2rem" }}>
            <h4>🧬 Tỷ lệ sử dụng thành phần</h4>
            <Pie
              data={{
                labels: [...new Set(stats.map(s => s.component_name))],
                datasets: [{
                  label: "Tỷ lệ",
                  data: [...new Set(stats.map(s => s.component_name))].map(
                    name =>
                      stats.filter(s => s.component_name === name)
                        .reduce((acc, s) => acc + s.total_transfusions, 0)
                  ),
                  backgroundColor: ["#f87171", "#60a5fa", "#34d399"]
                }]
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StaffStatistics;
