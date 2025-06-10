// src/components/InventoryChart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const InventoryChart = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/inventory")
      .then((res) => setInventory(res.data))
      .catch((err) => console.error("Lỗi khi tải kho máu:", err));
  }, []);

  const groupLabel = (item) => `${item.blood_type} - ${item.component_name}`;

  const chartData = {
    labels: inventory.map(groupLabel),
    datasets: [
      {
        label: "Số lượng (ml)",
        data: inventory.map((i) => i.total_quantity_ml),
        backgroundColor: "#f87171",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mt-4">
      <h3>📦 Thống kê kho máu</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default InventoryChart;
