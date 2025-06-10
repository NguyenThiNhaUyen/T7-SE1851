import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const BoardUser = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.id) {
      UserService.getUserById(currentUser.id)
        .then((res) => setUserDetail(res.data))
        .catch((err) => {
          console.error(err);
          setError("Không thể tải thông tin người dùng.");
        });
    } else {
      setError("Không tìm thấy người dùng đăng nhập.");
    }
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
