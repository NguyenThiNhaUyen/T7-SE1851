// src/components/InventoryChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from "react-modal";
Modal.setAppElement("#root");
import "../styles/staff.css";

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

const InventoryChart = () => {
  const [rawData, setRawData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [orientation, setOrientation] = useState("y");
  const [summary, setSummary] = useState({ totalBlood: 0, lowStockTypes: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  useEffect(() => {
    axios.get("/api/inventory").then((res) => {
      const result = Array.isArray(res.data) ? res.data : [];
      setRawData(result);
      setFilteredData(result);
      updateSummary(result);
    });

    axios.get("/api/inventory/history").then((res) => {
      setHistoryData(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  useEffect(() => {
    if (!Array.isArray(rawData)) return;

    const filtered = rawData.filter((item) => {
      return (!bloodType || item.blood_type === bloodType) &&
             (!component || item.component === component);
    });

    setFilteredData(filtered);
    updateSummary(filtered);
  }, [bloodType, component, rawData]);

  const updateSummary = (data) => {
    let total = 0;
    let lowStock = [];
    data.forEach((item) => {
      total += item.total_quantity_ml;
      if (item.total_quantity_ml < 500) {
        lowStock.push(item);
      }
    });
    setSummary({ totalBlood: total, lowStockTypes: lowStock });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kho máu");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "bao_cao_kho_mau.xlsx");
  };

  const openDetails = (data) => {
    setModalContent(data);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="inventory-container">
      <h2>🧪 Quản lý tồn kho máu</h2>

      <div className="stat-summary">
        <div className="card">
          🩸 <strong>Tổng máu:</strong> {summary.totalBlood} ml
          <button onClick={() => openDetails(rawData)} className="view-detail">Xem chi tiết</button>
        </div>
        <div className="card warning">
          ⚠️ <strong>Thiếu:</strong> {summary.lowStockTypes.length}
          <button onClick={() => openDetails(summary.lowStockTypes)} className="view-detail">Xem chi tiết</button>
        </div>
      </div>

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

        <button onClick={exportToExcel}>📥 Xuất Excel</button>
      </div>

      {filteredData.length > 0 && (
        <Bar
          data={{
            labels: filteredData.map(item => `${item.blood_type} - ${item.component}`),
            datasets: [{
              label: "Tồn kho (ml)",
              data: filteredData.map(item => item.total_quantity_ml),
              backgroundColor: filteredData.map(item => item.total_quantity_ml < 500 ? "#ef4444" : item.total_quantity_ml < 2000 ? "#f59e0b" : "#10b981"),
            }]
          }}
          options={{
            indexAxis: orientation,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (ctx) => `Tồn kho: ${ctx.raw} ml`
                }
              }
            }
          }}
        />
      )}

      {historyData.length > 0 && (
        <>
          <h4 style={{ marginTop: "2rem" }}>📈 Biểu đồ biến động tồn kho</h4>
          <Line
            data={{
              labels: historyData.map(h => h.date),
              datasets: [
                {
                  label: "A+ - Hồng cầu",
                  data: historyData.map(h => h.a_positive_red_cell || 0),
                  borderColor: "#ef4444",
                  fill: false,
                },
                {
                  label: "A+ - Tiểu cầu",
                  data: historyData.map(h => h.a_positive_platelet || 0),
                  borderColor: "#60a5fa",
                  fill: false,
                },
                {
                  label: "A+ - Huyết tương",
                  data: historyData.map(h => h.a_positive_plasma || 0),
                  borderColor: "#34d399",
                  fill: false,
                }
              ]
            }}
          />
        </>
      )}

      <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel="Chi tiết tồn kho" className="modal-content" overlayClassName="modal-backdrop">
        <h3>Chi tiết tồn kho</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Tổng (ml)</th>
            </tr>
          </thead>
          <tbody>
            {modalContent.map((item, idx) => (
              <tr key={idx}>
                <td>{item.blood_type}</td>
                <td>{item.component}</td>
                <td>{item.total_quantity_ml}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="close-btn" onClick={closeModal}>Đóng</button>
      </Modal>
    </div>
  );
};

export default InventoryChart;