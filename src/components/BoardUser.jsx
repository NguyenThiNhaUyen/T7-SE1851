import React, { useEffect, useState } from "react";
import axios from "axios";

const BoardUser = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/test/user")
      .then((res) => setUserDetail(res.data))
      .catch(() => setError("Không thể tải thông tin người dùng."));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Xin chào Người hiến/nhận máu</h2>
      {error && <p className="text-danger">{error}</p>}
      {userDetail ? (
        <div>
          <p><strong>Họ tên:</strong> {userDetail.first_name} {userDetail.last_name}</p>
          <p><strong>Email:</strong> {userDetail.email}</p>
          <p><strong>Nhóm máu:</strong> {userDetail.blood_type}</p>
          <p><strong>Địa chỉ:</strong> {userDetail.address}</p>
          <p><strong>SĐT:</strong> {userDetail.phone}</p>
        </div>
      ) : (
        !error && <p>Đang tải thông tin người dùng...</p>
      )}
    </div>
  );
};

export default BoardUser;
