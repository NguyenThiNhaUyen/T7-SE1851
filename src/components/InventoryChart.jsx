import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import "../styles/staff.css";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const InventoryChart = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [orientation, setOrientation] = useState("y");

  useEffect(() => {
    axios.get("http://localhost:3000/api/inventory")
      .then((res) => {
        setRawData(res.data);
        setFilteredData(res.data); // Default
      })
      .catch((err) => console.error("Lỗi lấy dữ liệu kho máu:", err));
  }, []);

  // Lọc dữ liệu theo điều kiện
  useEffect(() => {
    const filtered = rawData.filter((item) => {
      return (
        (!bloodType || item.blood_type === bloodType) &&
        (!component || item.component === component)
      );
    });
    setFilteredData(filtered);
  }, [bloodType, component, rawData]);

  // Tạo dữ liệu biểu đồ
  const chartData = {
    labels: filteredData.map(item => `${item.blood_type} - ${item.component}`),
    datasets: [
      {
        label: "Số lượng tồn kho (ml)",
        data: filteredData.map(item => item.total_quantity_ml),
        backgroundColor: filteredData.map(item => {
          const q = item.total_quantity_ml;
          if (q < 500) return "#ef4444"; // ít
          if (q < 2000) return "#f59e0b"; // trung bình
          return "#10b981"; // nhiều
        }),
      },
    ],
  };

  return (
    <div className="inventory-container">
      <h2>🧪 Quản lý tồn kho máu</h2>

      {/* Bộ lọc */}
      <div className="filter-panel">
        <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
          <option value="">-- Nhóm máu --</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => (
            <option key={bt} value={bt}>{bt}</option>
          ))}
        </select>

        <select value={component} onChange={(e) => setComponent(e.target.value)}>
          <option value="">-- Thành phần --</option>
          {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
          <option value="y">🔄 Biểu đồ ngang</option>
          <option value="x">⬆️ Biểu đồ dọc</option>
        </select>
      </div>

      {/* Biểu đồ */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          indexAxis: orientation,
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Tồn kho: ${context.raw} ml`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default InventoryChart;
