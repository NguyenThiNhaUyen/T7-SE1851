import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:3000/api/requests/user/${user.id}`)
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Lỗi khi tải lịch sử yêu cầu:", err));
  }, []);

  return (
    <div className="container">
      <h3>Lịch sử yêu cầu nhận máu</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nhóm máu</th>
            <th>Thành phần</th>
            <th>Số lượng</th>
            <th>Khẩn cấp</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.blood_type}</td>
              <td>{req.component_name || req.component_id}</td>
              <td>{req.quantity_ml}</td>
              <td>{req.urgency_level}</td>
              <td>{req.status}</td>
              <td>{new Date(req.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestHistory;
