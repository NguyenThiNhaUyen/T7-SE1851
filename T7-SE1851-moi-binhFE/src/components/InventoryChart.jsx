import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { getAuthHeader } from "../services/user.service";

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

const InventoryChart = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [orientation, setOrientation] = useState("y");
  const [summary, setSummary] = useState({ totalBlood: 0, lowStockTypes: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  // Load tồn kho từ API
  useEffect(() => {
    axios.get("http://localhost:8080/api/blood-inventory", {
      headers: getAuthHeader(),
    })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setInventoryData(data);
        setFilteredData(data);
        updateSummary(data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu tồn kho:", err);
        setInventoryData([]);
      });

    // Load lịch sử tồn kho
    axios.get("http://localhost:8080/api/blood-inventory", {
      headers: getAuthHeader(),
    })
      .then((res) => {
        setHistoryData(res.data || []);
      })
      .catch((err) => {
        console.error("Lỗi khi tải lịch sử tồn kho:", err);
      });
  }, []);

  // Lọc khi chọn nhóm máu hoặc thành phần
  useEffect(() => {
    const filtered = inventoryData.filter(
      (item) =>
        (!bloodType || item.bloodTypeName === bloodType) &&
        (!component || item.componentName === component)
    );
    setFilteredData(filtered);
    updateSummary(filtered);
  }, [bloodType, component, inventoryData]);

  const updateSummary = (data) => {
    let total = 0;
    const lowStock = [];

    data.forEach((item) => {
      if (item.totalQuantityML != null) {
        total += item.totalQuantityML;
        if (item.totalQuantityML < 500) lowStock.push(item);
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
    console.log("Chi tiết nhóm máu:", data);

    setModalContent(data || []);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="inventory-container">
      <h2>📋 Quản lý tồn kho máu</h2>

      {/* Bộ lọc */}
      <div className="filter-panel">
        <div className="filter-group">
          <label>Nhóm máu:</label>
          <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            <option value="">-- Tất cả --</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Thành phần:</label>
          <select value={component} onChange={(e) => setComponent(e.target.value)}>
            <option value="">-- Tất cả --</option>
            {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Biểu đồ:</label>
          <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="y">🔄 Ngang</option>
            <option value="x">⬆️ Dọc</option>
          </select>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="summary-section">
        <div className="card">
          🩸 <strong>Tổng lượng máu:</strong> {summary.totalBlood} ml
          <button onClick={() => openDetails(inventoryData)}>Xem chi tiết</button>
        </div>
        <div className="card warning">
          ⚠️ <strong>Thiếu hụt:</strong> {summary.lowStockTypes.length} nhóm
          <button onClick={() => openDetails(summary.lowStockTypes)}>Xem nhóm thiếu</button>
        </div>
        <button onClick={exportToExcel} className="export-btn">📥 Xuất Excel</button>
      </div>

      {/* Biểu đồ */}
      {filteredData.length > 0 ? (
        <div className="chart-section">
          <Bar
            data={{
              labels: filteredData.map((item) => `${item.bloodTypeName} - ${item.componentName}`),
              datasets: [{
                label: "Tồn kho (ml)",
                data: filteredData.map((item) => item.totalQuantityML),
                backgroundColor: filteredData.map((item) =>
                  item.totalQuantityML < 500 ? "#ef4444" :
                  item.totalQuantityML < 2000 ? "#f59e0b" : "#10b981"
                )
              }]
            }}
            options={{
              indexAxis: orientation,
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (ctx) => `Tồn kho: ${ctx.raw} ml`,
                  }
                }
              }
            }}
          />
        </div>
      ) : (
        <p>❗ Không có dữ liệu phù hợp để hiển thị biểu đồ.</p>
      )}

      {/* Biểu đồ lịch sử */}
      {historyData.length > 0 && (
        <div className="history-section">
          <h4>📈 Biến động tồn kho</h4>
          <Line
            data={{
              labels: historyData.map(h => h.date),
              datasets: [
                {
                  label: "Hồng cầu",
                  data: historyData.map(h => h.red_cells || 0),
                  borderColor: "#ef4444",
                  fill: false
                },
                {
                  label: "Tiểu cầu",
                  data: historyData.map(h => h.platelets || 0),
                  borderColor: "#3b82f6",
                  fill: false
                },
                {
                  label: "Huyết tương",
                  data: historyData.map(h => h.plasma || 0),
                  borderColor: "#10b981",
                  fill: false
                }
              ]
            }}
          />
        </div>
      )}

      {/* Modal chi tiết */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Chi tiết tồn kho"
        className="modal-content"
        overlayClassName="modal-backdrop"
      >
        <h3>📊 Chi tiết nhóm máu</h3>
        <table className="details-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Lượng (ml)</th>
            </tr>
          </thead>
          <tbody>
            {modalContent
              .sort((a, b) => a.totalQuantityML - b.totalQuantityML)
              .map((item, idx) => (
                <tr key={idx} className={item.totalQuantityML < 500 ? "status-critical" : ""}>
                  <td>{item.bloodInventoryId}</td>
                  <td>{item.bloodTypeName}</td>
                  <td>{item.componentName}</td>
                  <td>{item.totalQuantityMl}</td>

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
