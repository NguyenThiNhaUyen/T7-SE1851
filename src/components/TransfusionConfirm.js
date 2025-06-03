// src/components/TransfusionConfirm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TransfusionConfirm = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/requests/pending");
      setRequests(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách yêu cầu máu:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmTransfusion = async (requestId) => {
    try {
      await axios.post(`http://localhost:3000/api/transfusions/confirm`, {
        request_id: requestId,
        staff_id: JSON.parse(localStorage.getItem("user")).id,
      });
      alert("Đã xác nhận truyền máu!");
      fetchRequests(); // reload danh sách
    } catch (error) {
      console.error("Lỗi khi xác nhận truyền máu:", error);
      alert("Xác nhận thất bại!");
    }
  };

  if (loading) return <div className="container">Đang tải dữ liệu...</div>;

  return (
    <div className="container">
      <h3>Danh sách yêu cầu chờ xử lý</h3>
      {requests.length === 0 ? (
        <p>Không có yêu cầu chờ xử lý.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Người yêu cầu</th>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Số lượng (ml)</th>
              <th>Mức độ khẩn cấp</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.requester_name || req.requester_id}</td>
                <td>{req.blood_type}</td>
                <td>{req.component_name || req.component_id}</td>
                <td>{req.quantity_ml}</td>
                <td>{req.urgency_level}</td>
                <td>
                  <button className="btn btn-success" onClick={() => confirmTransfusion(req.id)}>
                    Xác nhận truyền
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransfusionConfirm;
