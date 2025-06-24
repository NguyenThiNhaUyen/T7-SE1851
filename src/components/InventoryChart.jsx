// src/components/InventoryChart.jsx
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../styles/staff.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

Modal.setAppElement("#root");

const MOCK_INVENTORY = [
  { blood_type: "A+", component: "Hồng cầu", total_quantity_ml: 1200 },
  { blood_type: "A+", component: "Tiểu cầu", total_quantity_ml: 400 },
  { blood_type: "O-", component: "Huyết tương", total_quantity_ml: 300 },
];

const MOCK_HISTORY = [
  { date: "2025-06-10", red_cells: 1200, platelets: 600, plasma: 500 },
  { date: "2025-06-11", red_cells: 1100, platelets: 580, plasma: 480 },
  { date: "2025-06-12", red_cells: 950, platelets: 500, plasma: 460 },
];

const InventoryChart = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [orientation, setOrientation] = useState("y");
  const [summary, setSummary] = useState({ totalBlood: 0, lowStockTypes: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  useEffect(() => {
    const inventory = MOCK_INVENTORY;
    const history = MOCK_HISTORY;

    setRawData(inventory);
    setFilteredData(inventory);
    setHistoryData(history);
    updateSummary(inventory);
  }, []);

  useEffect(() => {
    if (!Array.isArray(rawData)) return;
    const filtered = rawData.filter(
      (item) =>
        (!bloodType || item.blood_type === bloodType) &&
        (!component || item.component === component)
    );
    setFilteredData(filtered);
    updateSummary(filtered);
  }, [bloodType, component, rawData]);

  const updateSummary = (data) => {
    let total = 0;
    const lowStock = [];
    data.forEach((item) => {
      if (item?.total_quantity_ml != null) {
        total += item.total_quantity_ml;
        if (item.total_quantity_ml < 500) lowStock.push(item);
      }
    });
    setSummary({ totalBlood: total, lowStockTypes: lowStock });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Kho máu");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "bao_cao_kho_mau.xlsx");
  };

  const openDetails = (data) => {
    setModalContent(data || []);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="inventory-container">
      <h2>🧪 Quản lý tồn kho máu</h2>
      <p><small>⚠️ Nhóm máu được xem là <strong>thiếu hụt</strong> nếu lượng &lt; 500ml</small></p>

      <div className="summary-section">
        <div className="card">
          🩸 <strong>Tổng lượng máu:</strong> {summary.totalBlood} ml
          <button onClick={() => openDetails(rawData)} title="Xem tất cả nhóm máu">Xem chi tiết</button>
        </div>
        <div className="card warning">
          ⚠️ <strong>Thiếu hụt:</strong> {summary.lowStockTypes.length} nhóm
          <button onClick={() => openDetails(summary.lowStockTypes)} title="Xem nhóm máu thiếu">Xem chi tiết</button>
        </div>
        <button onClick={exportToExcel} className="export-btn">📥 Xuất Excel</button>
      </div>

      <div className="filter-panel">
        <div className="filter-group">
          <label htmlFor="bloodTypeSelect">Lọc theo nhóm máu:</label>
          <select id="bloodTypeSelect" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            <option value="">-- Tất cả nhóm máu --</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bt => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="componentSelect">Lọc theo thành phần máu:</label>
          <select id="componentSelect" value={component} onChange={(e) => setComponent(e.target.value)}>
            <option value="">-- Tất cả thành phần --</option>
            {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="orientationSelect">Loại biểu đồ hiển thị:</label>
          <select id="orientationSelect" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="y">🔄 Biểu đồ ngang</option>
            <option value="x">⬆️ Biểu đồ dọc</option>
          </select>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="chart-section">
          <Bar
            data={{
              labels: filteredData.map(item => `${item.blood_type} - ${item.component}`),
              datasets: [{
                label: "Tồn kho (ml)",
                data: filteredData.map(item => item.total_quantity_ml),
                backgroundColor: filteredData.map(item =>
                  item.total_quantity_ml < 500 ? "#ef4444" :
                  item.total_quantity_ml < 2000 ? "#f59e0b" : "#10b981"
                ),
              }],
            }}
            options={{
              indexAxis: orientation,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: ctx => `Tồn kho: ${ctx.raw} ml`,
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p>❗ Không có dữ liệu phù hợp để hiển thị biểu đồ.</p>
      )}

      {historyData.length > 0 && (
        <div className="history-section">
          <h4>📈 Biến động tồn kho theo thời gian</h4>
          <Line
            data={{
              labels: historyData.map(h => h.date),
              datasets: [
                {
                  label: "Hồng cầu",
                  data: historyData.map(h => h.red_cells || 0),
                  borderColor: "#ef4444",
                  fill: false,
                },
                {
                  label: "Tiểu cầu",
                  data: historyData.map(h => h.platelets || 0),
                  borderColor: "#3b82f6",
                  fill: false,
                },
                {
                  label: "Huyết tương",
                  data: historyData.map(h => h.plasma || 0),
                  borderColor: "#10b981",
                  fill: false,
                },
              ],
            }}
          />
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Chi tiết tồn kho"
        className="modal-content"
        overlayClassName="modal-backdrop"
      >
        <h3>📊 Chi tiết các nhóm máu</h3>
        <table className="details-table">
          <thead>
            <tr>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Lượng máu (ml)</th>
            </tr>
          </thead>
          <tbody>
            {modalContent
              .sort((a, b) => a.total_quantity_ml - b.total_quantity_ml)
              .map((item, idx) => (
                <tr key={idx}>
                  <td>{item.blood_type}</td>
                  <td>{item.component}</td>
                  <td style={{ color: item.total_quantity_ml < 500 ? "red" : undefined }}>
                    {item.total_quantity_ml}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button onClick={closeModal}>Đóng</button>
      </Modal>
    </div>
  );
};

export default InventoryChart;
