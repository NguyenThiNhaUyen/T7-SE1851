import React, { useState } from "react";
import "../styles/staff.css";

const DonationConfirm = () => {
  const mockData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    user_id: `USER${i + 100}`,
    request_id: `REQ${i + 200}`,
    blood_unit_id: `UNIT${i + 300}`,
    transfusion_date: new Date().toISOString(),
    status: i % 2 === 0 ? "Hoàn tất" : "Đang xử lý",
  }));

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("edit");
  const [selectedTransfusion, setSelectedTransfusion] = useState(null);
  const [volume, setVolume] = useState({
    total: "",
    redCells: "",
    platelets: "",
    plasma: "",
    bloodType: ""
  });

  const handleOpenModal = (item, mode = "edit") => {
    setSelectedTransfusion(item);
    setModalMode(mode);
    setVolume(savedVolumes[item.id] || {
      total: "",
      redCells: "",
      platelets: "",
      plasma: "",
      bloodType: ""
    });
    setShowModal(true);
  };

  const [savedVolumes, setSavedVolumes] = useState(() => {
    const saved = localStorage.getItem("savedVolumes");
    return saved ? JSON.parse(saved) : {};
  });

  const handleSaveVolume = () => {
    const updated = { ...savedVolumes, [selectedTransfusion.id]: volume };
    setSavedVolumes(updated);
    localStorage.setItem("savedVolumes", JSON.stringify(updated));
    setShowModal(false);
  };

  const [statusMap, setStatusMap] = useState(() => {
    const saved = localStorage.getItem("statusMap");
    return saved ? JSON.parse(saved) : {};
  });

  const handleStatusChange = (id, newStatus) => {
    const updated = { ...statusMap, [id]: newStatus };
    setStatusMap(updated);
    localStorage.setItem("statusMap", JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h3 className="text-danger mb-4">📋 Bảng Hien Máu</h3>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>user_id</th>
            <th>request_id</th>
            <th>blood_unit_id</th>
            <th>transfusion_date</th>
            <th>status</th>
            <th>Lượng máu</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => {
            const currentStatus = statusMap[item.id] || "Đang xử lý";
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user_id}</td>
                <td>{item.request_id}</td>
                <td>{item.blood_unit_id}</td>
                <td>{new Date(item.transfusion_date).toLocaleDateString()}</td>
                <td>
                  {currentStatus === "Đang xử lý" ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(item.id, "Hoàn tất")}>Chấp nhận</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(item.id, "Đã hủy")}>Hủy bỏ</button>
                    </div>
                  ) : (
                    currentStatus
                  )}
                </td>
                <td>
                  {currentStatus !== "Hoàn tất" ? (
                    currentStatus
                  ) : savedVolumes[item.id] ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn btn-info btn-sm" onClick={() => handleOpenModal(item, "view")}>Xem</button>
                      <button className="btn btn-outline-warning btn-sm" onClick={() => handleOpenModal(item, "edit")}>Sửa</button>
                    </div>
                  ) : (
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModal(item, "edit")}>Nhập lượng máu</button>
                  )}
                </td>
                <td>
                  {(currentStatus === "Hoàn tất" || currentStatus === "Đã hủy"
                  )&& (
                    <button className="btn btn-secondary btn-sm" onClick={() => handleStatusChange(item.id, "Đang xử lý")}>Trở lại</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h5>{modalMode === "view" ? "Xem lượng máu truyền" : "Nhập lượng máu truyền"}</h5>
            <input type="number" min="0" max="650" placeholder="Tổng (ml)" className="form-control mb-2" value={volume.total} onChange={(e) => {
              const value = Number(e.target.value);
              if (e.target.value === "" || (value >= 0 && value <= 650)) {
                setVolume({ ...volume, total: e.target.value });
              }
            }} readOnly={modalMode === "view"} />
            <input type="number" min="0" max="650" placeholder="Hồng cầu (ml)" className="form-control mb-2" value={volume.redCells} onChange={(e) => {
              const value = Number(e.target.value);
              if (e.target.value === "" || (value >= 0 && value <= 650)) {
                setVolume({ ...volume, redCells: e.target.value });
              }
            }} readOnly={modalMode === "view"} />
            <input type="number" min="0" max="650" placeholder="Tiểu cầu (ml)" className="form-control mb-2" value={volume.platelets} onChange={(e) => {
              const value = Number(e.target.value);
              if (e.target.value === "" || (value >= 0 && value <= 650)) {
                setVolume({ ...volume, platelets: e.target.value });
              }
            }} readOnly={modalMode === "view"} />
            <input type="number" min="0" max="650" placeholder="Huyết tương (ml)" className="form-control mb-2" value={volume.plasma} onChange={(e) => {
              const value = Number(e.target.value);
              if (e.target.value === "" || (value >= 0 && value <= 650)) {
                setVolume({ ...volume, plasma: e.target.value });
              }
            }} readOnly={modalMode === "view"} />
            <input list="bloodTypes" placeholder="Nhóm máu" className="form-control mb-3" value={volume.bloodType} onChange={(e) => 
              setVolume({ ...volume, bloodType: e.target.value })} readOnly={modalMode === "view"} />
            <datalist id="bloodTypes">
              <option value="A+" />
              <option value="A-" />
              <option value="B+" />
              <option value="B-" />
              <option value="AB+" />
              <option value="AB-" />
              <option value="O+" />
              <option value="O-" />
            </datalist>
            {modalMode === "edit" && (
              <button className="btn btn-block btn-gradient-red mb-2" onClick={handleSaveVolume}>Lưu</button>
            )}
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationConfirm;
