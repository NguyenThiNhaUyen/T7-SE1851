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

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryRes = await fetch("/api/inventory");
        const inventory = await inventoryRes.json();
        setRawData(inventory);
        setFilteredData(inventory);
        updateSummary(inventory);
      } catch (error) {
        console.error("Lỗi khi tải kho máu:", error);
      }

      try {
        const historyRes = await fetch("/api/inventory-history");
        const history = await historyRes.json();
        setHistoryData(history);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử:", error);
      }
    };

    fetchData();
  }, []);

  // Filter on change
  useEffect(() => {
    const filtered = rawData.filter(
      (item) =>
        (!bloodType || item.blood_type === bloodType) &&
        (!component || item.component === component)
    );
    setFilteredData(filtered);
    updateSummary(filtered);
  }, [bloodType, component, rawData]);

  // Tổng hợp dữ liệu
  const updateSummary = (data) => {
    let total = 0;
    const lowStock = [];

    data.forEach((item) => {
      if (item.total_quantity_ml != null) {
        total += item.total_quantity_ml;
        if (item.total_quantity_ml < 500) lowStock.push(item);
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
    setModalContent(data || []);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="inventory-container">
      <h2>🧪 Quản lý tồn kho máu</h2>

      {/* Thông tin thành phần máu */}
      <div className="blood-info-section">
        <h3>🩺 Thông tin thành phần máu</h3>

        <div className="blood-card">
          <h4>1. Hồng cầu (Red Blood Cells – RBCs)</h4>
          <ul>
            <li><strong>Loại:</strong> Hồng cầu khối (PRC)</li>
            <li><strong>Chức năng:</strong> Thiếu máu, xuất huyết, chấn thương</li>
            <li><strong>Lưu trữ:</strong> 35–42 ngày ở 2–6°C</li>
            <li><strong>Hệ thống:</strong> component = "Hồng cầu"</li>
          </ul>
        </div>

        <div className="blood-card">
          <h4>2. Huyết tương (Plasma)</h4>
          <ul>
            <li><strong>Loại:</strong> FFP hoặc Plasma</li>
            <li><strong>Chức năng:</strong> Rối loạn đông máu, xơ gan</li>
            <li><strong>Chiết tách:</strong> Albumin, globulin, yếu tố VIII</li>
            <li><strong>Hệ thống:</strong> component = "Huyết tương"</li>
          </ul>
        </div>

        <div className="blood-card">
          <h4>3. Tiểu cầu (Platelets)</h4>
          <ul>
            <li><strong>Loại:</strong> Đậm đặc hoặc gạn tách</li>
            <li><strong>Chức năng:</strong> Bệnh nhân ung thư, hóa trị, xuất huyết</li>
            <li><strong>Lưu trữ:</strong> 3–5 ngày ở 20–24°C</li>
            <li><strong>Hệ thống:</strong> component = "Tiểu cầu"</li>
          </ul>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="filter-panel">
        <div className="filter-group">
          <label htmlFor="bloodTypeSelect">Nhóm máu:</label>
          <select id="bloodTypeSelect" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            <option value="">-- Tất cả --</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="componentSelect">Thành phần:</label>
          <select id="componentSelect" value={component} onChange={(e) => setComponent(e.target.value)}>
            <option value="">-- Tất cả --</option>
            {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="orientationSelect">Biểu đồ:</label>
          <select id="orientationSelect" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
            <option value="y">🔄 Ngang</option>
            <option value="x">⬆️ Dọc</option>
          </select>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <div className="summary-section">
        <div className="card">
          🩸 <strong>Tổng lượng máu:</strong> {summary.totalBlood} ml
          <button onClick={() => openDetails(rawData)}>Xem chi tiết</button>
        </div>
        <div className="card warning">
          ⚠️ <strong>Thiếu hụt:</strong> {summary.lowStockTypes.length} nhóm
          <button onClick={() => openDetails(summary.lowStockTypes)}>Xem nhóm thiếu</button>
        </div>
        <button onClick={exportToExcel} className="export-btn">📥 Xuất Excel</button>
      </div>

      {/* Biểu đồ tồn kho */}
      {filteredData.length > 0 ? (
        <div className="chart-section">
          <Bar
            data={{
              labels: filteredData.map((item) => `${item.blood_type} - ${item.component}`),
              datasets: [{
                label: "Tồn kho (ml)",
                data: filteredData.map((item) => item.total_quantity_ml),
                backgroundColor: filteredData.map((item) =>
                  item.total_quantity_ml < 500 ? "#ef4444" :
                  item.total_quantity_ml < 2000 ? "#f59e0b" : "#10b981"
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
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Lượng (ml)</th>
            </tr>
          </thead>
          <tbody>
            {modalContent
              .sort((a, b) => a.total_quantity_ml - b.total_quantity_ml)
              .map((item, idx) => (
                <tr key={idx} className={item.total_quantity_ml < 500 ? "status-critical" : ""}>
                  <td>{item.blood_type}</td>
                  <td>{item.component}</td>
                  <td>{item.total_quantity_ml}</td>
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
