import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/user.css";
import { toast } from "react-toastify";

const TransfusionHistory = () => {
  const [transfusions, setTransfusions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);

    if (!currentUser) return;

    axios
      .get(`http://localhost:3000/api/transfusions/user/${currentUser.id}`)
      .then((res) => {
        setTransfusions(res.data);
        if (res.data.length === 0) {
          setTimeout(() => {
            toast.info("📭 Bạn chưa có lịch sử truyền máu nào.");
          }, 200);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải lịch sử truyền máu:", err);
        setTimeout(() => {
          toast.error("❌ Không thể tải dữ liệu. Vui lòng thử lại sau.");
        }, 200);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-danger mb-4">💉 Lịch sử truyền máu</h3>

      {!user ? (
        <div className="alert alert-danger">Người dùng chưa đăng nhập.</div>
      ) : transfusions.length === 0 ? (
        <p>Chưa có lần truyền máu nào.</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Thành phần</th>
              <th>Nhóm máu</th>
              <th>Số lượng (ml)</th>
              <th>Ngày truyền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {transfusions.map((item) => (
              <tr key={item.id}>
                <td>{item.component_name}</td>
                <td>{item.blood_type}</td>
                <td>{item.quantity_ml}</td>
                <td>{new Date(item.transfusion_date).toLocaleDateString()}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransfusionHistory;
