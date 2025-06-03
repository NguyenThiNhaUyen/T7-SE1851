// src/components/InventoryChart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryChart = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/inventory")
      .then((res) => setInventory(res.data))
      .catch((err) => console.error("Lỗi lấy dữ liệu kho máu:", err));
  }, []);

  const chartData = {
    labels: inventory.map(item => `${item.blood_type} - ${item.component_name || item.component_id}`),
    datasets: [
      {
        label: "Thể tích (ml)",
        data: inventory.map(item => item.total_quantity_ml),
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  return (
    <div className="container">
      <h3>Thống kê kho máu</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default InventoryChart;
