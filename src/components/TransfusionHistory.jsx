import React, { useEffect, useState } from "react";
import { getUserTransfusions } from "../services/transfusion.service";
import { toast } from "react-toastify";
import "../styles/user.css";

const TransfusionHistory = () => {
  const [transfusions, setTransfusions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);

    if (!currentUser) return;

    getUserTransfusions(currentUser.id)
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
        toast.error("❌ Không thể tải dữ liệu. Vui lòng thử lại sau.");
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
              <th>Người nhận</th>
              <th>Nhóm máu</th>
              <th>Số lượng (đơn vị)</th>
              <th>Ngày truyền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {transfusions.map((item) => (
              <tr key={item.id}>
                <td>{item.recipientName}</td>
                <td>{item.bloodType}</td>
                <td>{item.units}</td>
                <td>
                  {item.confirmedAt
                    ? new Date(item.confirmedAt).toLocaleDateString()
                    : "—"}
                </td>
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
