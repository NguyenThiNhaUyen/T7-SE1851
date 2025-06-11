import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/staff.css";
const UrgentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
  axios
    .get("/api/urgent-requests") // ✅ đúng endpoint được proxy sang localhost:8080
    .then((res) => setRequests(res.data))
    .catch((err) => console.error("Lỗi khi tải danh sách yêu cầu khẩn cấp:", err));
}, []);


  return (
    <div className="container mt-4">
      <h3>📢 Danh sách yêu cầu khẩn cấp</h3>
      {requests.length === 0 ? (
        <p>Không có yêu cầu khẩn cấp nào.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Người yêu cầu</th>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Số lượng (ml)</th>
              <th>Trạng thái</th>
              <th>Thời gian yêu cầu</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.requester_name || "Ẩn danh"}</td>
                <td>{r.blood_type}</td>
                <td>{r.component_name}</td>
                <td>{r.quantity_ml}</td>
                <td>{r.status}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UrgentRequests;
