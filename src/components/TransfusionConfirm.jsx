import React, { useState } from "react";
import "../styles/user.css";

const TransfusionConfirm = () => {
  const mockData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    recipient_id: `USER${i + 100}`,
    request_id: `REQ${i + 200}`,
    blood_unit_id: `UNIT${i + 300}`,
    transfusion_date: new Date().toISOString(),
    status: i % 2 === 0 ? "Hoàn tất" : "Đang xử lý",
  }));

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("edit"); // 'edit' | 'view'
  const [selectedTransfusion, setSelectedTransfusion] = useState(null);
  const [savedVolumes, setSavedVolumes] = useState({});
  const [volume, setVolume] = useState({
    total: "",
    redCells: "",
    platelets: "",
    plasma: ""
  });

  const handleOpenModal = (item, mode = "edit") => {
    setSelectedTransfusion(item);
    setModalMode(mode);
    setVolume(savedVolumes[item.id] || {
      total: "",
      redCells: "",
      platelets: "",
      plasma: ""
    });
    setShowModal(true);
  };

  const handleSaveVolume = () => {
    setSavedVolumes(prev => ({ ...prev, [selectedTransfusion.id]: volume }));
    setShowModal(false);
    setVolume({ total: "", redCells: "", platelets: "", plasma: "" });
  };

  return (
    <div className="container">
      <h3 className="text-danger mb-4">📋 Bảng Truyền Máu (Giả lập)</h3>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>recipient_id</th>
            <th>request_id</th>
            <th>blood_unit_id</th>
            <th>transfusion_date</th>
            <th>status</th>
            <th>Lượng máu</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.recipient_id}</td>
              <td>{item.request_id}</td>
              <td>{item.blood_unit_id}</td>
              <td>{new Date(item.transfusion_date).toLocaleDateString()}</td>
              <td>{item.status}</td>
              <td>
                {item.status !== "Hoàn tất" ? (
                  item.status
                ) : savedVolumes[item.id] ? (
                  <>
                    <button
                      className="btn btn-sm btn-outline-info me-1"
                      onClick={() => handleOpenModal(item, "view")}
                    >
                      Xem
                    </button>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleOpenModal(item, "edit")}
                    >
                      Sửa
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleOpenModal(item, "edit")}
                  >
                    Nhập lượng máu
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h5>{modalMode === "view" ? "Xem lượng máu truyền" : "Nhập lượng máu truyền"}</h5>
            <input
              type="number"
              placeholder="Tổng (ml)"
              className="form-control mb-2"
              value={volume.total}
              onChange={(e) => setVolume({ ...volume, total: e.target.value })}
              readOnly={modalMode === "view"}
            />
            <input
              type="number"
              placeholder="Hồng cầu (ml)"
              className="form-control mb-2"
              value={volume.redCells}
              onChange={(e) => setVolume({ ...volume, redCells: e.target.value })}
              readOnly={modalMode === "view"}
            />
            <input
              type="number"
              placeholder="Tiểu cầu (ml)"
              className="form-control mb-2"
              value={volume.platelets}
              onChange={(e) => setVolume({ ...volume, platelets: e.target.value })}
              readOnly={modalMode === "view"}
            />
            <input
              type="number"
              placeholder="Huyết tương (ml)"
              className="form-control mb-3"
              value={volume.plasma}
              onChange={(e) => setVolume({ ...volume, plasma: e.target.value })}
              readOnly={modalMode === "view"}
            />

            {modalMode === "edit" && (
              <button className="btn btn-primary me-2" onClick={handleSaveVolume}>Lưu</button>
            )}
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransfusionConfirm;
