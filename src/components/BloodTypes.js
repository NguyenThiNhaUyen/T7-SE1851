import React, { useEffect, useState } from "react";
import axios from "axios";

const BloodTypes = () => {
  const [bloods, setBloods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/blood-inventory")
      .then((res) => {
        setBloods(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi tải nhóm máu:", err);
        setError("Không thể tải dữ liệu nhóm máu từ server.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-4">🔄 Đang tải dữ liệu...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">🩸 Quản lý nhóm máu</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead className="table-danger">
          <tr>
            <th>Nhóm máu</th>
            <th>Số lượng</th>
            <th>Ngày cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {bloods.length > 0 ? (
            bloods.map((b) => (
              <tr key={b.bloodInventoryId}>
                <td>{b.bloodType}</td>
                <td>{b.quantity}</td>
                <td>{new Date(b.lastUpdated).toLocaleString("vi-VN")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BloodTypes;
