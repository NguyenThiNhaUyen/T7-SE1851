import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../services/user.service";
import "../styles/staff.css";

const API_BASE = "http://localhost:8080";

const DonationConfirm = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/donation`, {
        headers: getAuthHeader(),
      })
      .then((res) => {
        console.log("📦 Dữ liệu nhận được:", res.data); 
        setDonations(res.data);
        console.log("✅ Tải danh sách hiến máu thành công");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            console.error("❌ Lỗi: Chưa xác thực (401 Unauthorized)");
          } else if (err.response.status === 403) {
            console.error("❌ Lỗi: Không có quyền truy cập (403 Forbidden)");
          } else {
           // console.error(`❌ Lỗi máy chủ: ${err.response.status}`);
            console.error(`❌ Lỗi máy chủ: 9`);

          }
        } else {
          console.error("❌ Lỗi mạng hoặc không kết nối được đến server");
        }
      });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [modalMode, setModalMode] = useState("edit");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [volume, setVolume] = useState({
    total: "",
    redCells: "",
    platelets: "",
    plasma: "",
    bloodType: ""
  });

  const [suggestForm, setSuggestForm] = useState({
    weight: "",
    gender: "",
    total: "",
    method: ""
  });

  const [savedVolumes, setSavedVolumes] = useState(() => {
    const saved = localStorage.getItem("savedVolumes");
    return saved ? JSON.parse(saved) : {};
  });

  const [statusMap, setStatusMap] = useState(() => {
    const saved = localStorage.getItem("statusMap");
    return saved ? JSON.parse(saved) : {};
  });

  const handleStatusChange = (id, newStatus) => {
    const updated = { ...statusMap, [id]: newStatus };
    setStatusMap(updated);
    localStorage.setItem("statusMap", JSON.stringify(updated));
  };

  const handleOpenModal = (item, mode = "edit") => {
    setSelectedDonation(item);
    setModalMode(mode);
    setVolume(savedVolumes[item.registrationId] || {
      total: "",
      redCells: "",
      platelets: "",
      plasma: "",
      bloodType: ""
    });
    setShowModal(true);
  };

  const handleSaveVolume = () => {
    if (!volume.total || !volume.bloodType) {
      alert("Vui lòng nhập tổng lượng máu và nhóm máu.");
      return;
    }
    const updated = { ...savedVolumes, [selectedDonation.registrationId]: volume };
    setSavedVolumes(updated);
    localStorage.setItem("savedVolumes", JSON.stringify(updated));
    handleStatusChange(selectedDonation.registrationId, "Đã nhập dữ liệu");
    setShowModal(false);
  };

  const handleResetAll = () => {
    localStorage.removeItem("savedVolumes");
    localStorage.removeItem("statusMap");
    setSavedVolumes({});
    setStatusMap({});
    setSuggestForm({
      weight: "",
      gender: "",
      total: "",
      method: ""
    });
  };

  const handleApplySuggestion = () => {
    if (showModal && modalMode === "edit") {
      setVolume(prev => ({ ...prev, total: suggestForm.total }));
    }
    setShowSuggest(false);
  };

  return (
    <div className="container staff-main">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-danger">📋 Bảng Hiến Máu</h3>
        <button className="btn btn-outline-secondary btn-sm" onClick={handleResetAll}>Reset thao tác</button>
      </div>

      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Số thứ tự</th>
            <th>ID người hiến</th>
            <th>ID yêu cầu</th>
            <th>ID máu</th>
            <th>Ngày hiến</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
            <th>Hủy</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((item) => {
            const status = statusMap[item.registrationId] || "Đang chờ...";
            const hasVolume = savedVolumes[item.registrationId];
            const isCancelled = status === "Đã hủy";
            const rowClass = isCancelled ? "text-muted bg-light" : "";

            let actionBtn = null;
            if (status === "Đang chờ...") {
              actionBtn = <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(item.registrationId, "Đang xử lý...")}>Xác nhận</button>;
            } else if (status === "Đang xử lý...") {
              actionBtn = <button className="btn btn-warning btn-sm" onClick={() => handleStatusChange(item.registrationId, "Chưa nhập dữ liệu")}>Hoàn thành</button>;
            } else if (status === "Chưa nhập dữ liệu") {
              actionBtn = <button className="btn btn-primary btn-sm" onClick={() => handleOpenModal(item, "edit")}>Nhập lượng máu</button>;
            } else if (status === "Đã nhập dữ liệu") {
              actionBtn = (
                <div className="d-flex gap-2">
                  <button className="btn btn-info btn-sm" onClick={() => handleOpenModal(item, "view")}>Xem</button>
                  <button className="btn btn-outline-warning btn-sm" onClick={() => handleOpenModal(item, "edit")}>Sửa</button>
                </div>
              );
            }

            return (
              <tr key={item.registrationId} className={rowClass}>
                <td>{item.registrationId}</td>
                <td>{item.userId}</td>
                <td>{item.requestId || "-"}</td>
                <td>{item.bloodUnitId || "-"}</td>
                <td>{new Date(item.scheduledDate).toLocaleDateString()}</td>
                <td>{status}</td>
                <td>{actionBtn}</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleStatusChange(item.registrationId, "Đã hủy")}>Hủy</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

     {showModal && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h5 className="mb-3">
        {modalMode === "view" ? "Xem lượng máu truyền" : "Nhập lượng máu truyền"}
      </h5>
      {["Tổng", "Hồng cầu", "Tiểu cầu", "Huyết tương"].map((label, idx) => {
        const keys = ["total", "redCells", "platelets", "plasma"];
        const key = keys[idx];
        return (
          <div className="input-group" key={key}>
            <label>{label} (ml)</label>
            <input
              type="number"
              className="input-clean"
              value={volume[key]}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (e.target.value === "" || (value >= 0 && value <= 650)) {
                  setVolume({ ...volume, [key]: e.target.value });
                }
              }}
              readOnly={modalMode === "view"}
            />
          </div>
        );
      })}

      <div className="input-group">
        <label>Nhóm máu</label>
        <input
          className="input-clean"
          list="bloodTypes"
          value={volume.bloodType}
          onChange={(e) => setVolume({ ...volume, bloodType: e.target.value })}
          readOnly={modalMode === "view"}
        />
        <datalist id="bloodTypes">
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(b => (
            <option key={b} value={b} />
          ))}
        </datalist>
      </div>

      {modalMode === "edit" ? (
        <div className="button-row">
          <button className="btn btn-success flex-fill" onClick={handleSaveVolume}>Lưu</button>
          <button className="btn btn-primary flex-fill" onClick={() => setShowSuggest(true)}>Gợi ý</button>
          <button className="btn btn-secondary flex-fill" onClick={() => setShowModal(false)}>Đóng</button>
        </div>
      ) : (
        <div className="button-row">
          <button className="btn btn-secondary flex-fill" onClick={() => setShowModal(false)}>Đóng</button>
        </div>
      )}
    </div>
  </div>
)}

{showSuggest && (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h5 className="mb-3">Gợi ý lượng máu</h5>
      <div className="input-group-tip">
        <label>Cân nặng (kg)</label>
        <input
          type="number"
          className="input-clean"
          value={suggestForm.weight}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (e.target.value === "" || (v >= 0 && v <= 200)) {
              setSuggestForm({ ...suggestForm, weight: e.target.value });
            }
          }}
        />
      </div>
      <div className="input-group-tip">
        <label>Giới tính</label>
        <select
          className="input-clean"
          value={suggestForm.gender}
          onChange={(e) => setSuggestForm({ ...suggestForm, gender: e.target.value })}
        >
          <option value="">-- Chọn giới tính --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      <div className="input-group-tip">
        <label>Tổng (ml)</label>
        <input
          type="number"
          className="input-clean"
          value={suggestForm.total}
          onChange={(e) => setSuggestForm({ ...suggestForm, total: e.target.value })}
        />
      </div>
      <div className="input-group-tip">
        <label>Phương pháp</label>
        <select
          className="input-clean"
          value={suggestForm.method}
          onChange={(e) => setSuggestForm({ ...suggestForm, method: e.target.value })}
        >
          <option value="">-- Chọn phương pháp --</option>
          <option value="gạn tách">Gạn tách</option>
          <option value="li tâm">Li tâm</option>
        </select>
      </div>
      <button className="btn btn-success btn-block mb-2" onClick={handleApplySuggestion}>Lưu</button>
      <button className="btn btn-secondary btn-block" onClick={() => setShowSuggest(false)}>Đóng</button>
    </div>
  </div>
)}

    </div>
  );
};

export default DonationConfirm;
