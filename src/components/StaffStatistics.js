// src/components/StaffStatistics.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/staff.css";

const StaffStatistics = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/statistics")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Lỗi lấy dữ liệu thống kê:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>📊 Thống kê truyền máu</h3>
      {stats.length === 0 ? (
        <p>Không có dữ liệu.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Số đơn vị đã truyền</th>
              <th>Ngày truyền gần nhất</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s, i) => (
              <tr key={i}>
                <td>{s.blood_type}</td>
                <td>{s.component_name}</td>
                <td>{s.total_units}</td>
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
