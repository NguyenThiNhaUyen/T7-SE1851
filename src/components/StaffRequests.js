// src/components/StaffRequests.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/requests/all")
      .then(res => setRequests(res.data))
      .catch(err => console.error("Lỗi khi tải danh sách yêu cầu:", err));
  }, []);

  return (
    <div className="container">
      <h3>Danh sách tất cả yêu cầu nhận máu</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Người yêu cầu</th>
            <th>Nhóm máu</th>
            <th>Thành phần</th>
            <th>Số lượng</th>
            <th>Khẩn cấp</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.requester_name || r.requester_id}</td>
              <td>{r.blood_type}</td>
              <td>{r.component_name || r.component_id}</td>
              <td>{r.quantity_ml}</td>
              <td>{r.urgency_level}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffRequests;
