// src/components/InventoryChart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

const InventoryChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/inventory")
      .then((res) => {
        const response = res.data;
        const labels = response.map(item => `${item.blood_type} - ${item.component}`);
        const quantities = response.map(item => item.total_quantity_ml);

        setData({
          labels,
          datasets: [
            {
              label: "Số lượng (ml)",
              data: quantities,
              backgroundColor: "#dc2626"
            }
          ]
        });
      })
      .catch((err) => console.error("Lỗi lấy dữ liệu kho máu:", err));
  }, []);

  return (
    <div className="container">
      <h3>📊 Thống kê tồn kho máu</h3>
      <Bar data={data} options={{ responsive: true, indexAxis: "y" }} />
    </div>
  );
};

export default InventoryChart;
