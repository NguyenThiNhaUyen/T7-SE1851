import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const DonationHistory = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      setError("Người dùng chưa đăng nhập.");
      return;
    }

    axios.get(`/api/donations/user/${currentUser.id}`)
      .then((res) => {
        setHistory(res.data);
      })
      .catch(() => {
        setError("Không thể tải lịch sử hiến máu.");
      });
  }, [currentUser]);

  return (
    <div className="container">
      <h3>Lịch sử hiến máu</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {history.length === 0 ? (
        <p>Chưa có lần hiến máu nào.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Thể tích (ml)</th>
              <th>Địa điểm</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.donation_date).toLocaleDateString()}</td>
                <td>{item.blood_type}</td>
                <td>{item.component_name}</td>
                <td>{item.volume_ml}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonationHistory;
