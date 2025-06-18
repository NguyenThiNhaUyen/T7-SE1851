import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/staff.css";

const StaffStatistics = () => {
  const [stats, setStats] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchStatistics = () => {
    axios
      .get("http://localhost:3000/api/statistics", {
        params: {
          bloodType,
          component,
          fromDate,
          toDate,
        },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Lỗi lấy dữ liệu thống kê:", err));
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="staff-statistics-container">
      <h2>📊 Báo cáo Thống kê Truyền máu</h2>

      {/* Bộ lọc thống kê */}
      <div className="filter-panel">
        <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
          <option value="">-- Chọn nhóm máu --</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <select value={component} onChange={(e) => setComponent(e.target.value)}>
          <option value="">-- Chọn thành phần --</option>
          <option value="Hồng cầu">Hồng cầu</option>
          <option value="Tiểu cầu">Tiểu cầu</option>
          <option value="Huyết tương">Huyết tương</option>
        </select>

        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button onClick={fetchStatistics}>🔍 Lọc</button>
      </div>

      {/* Bảng dữ liệu */}
      {stats.length === 0 ? (
        <p>Không có dữ liệu phù hợp.</p>
      ) : (
        <table className="table table-bordered mt-4">
          <thead className="thead-dark">
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
                <td>{new Date(s.last_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffStatistics;
