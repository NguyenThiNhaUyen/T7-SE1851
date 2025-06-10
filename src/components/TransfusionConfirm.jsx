import React, { useEffect, useState } from "react";
import { getUserTransfusions, confirmTransfusion } from "../services/transfusion.service";
import "../styles/user.css";
import { toast } from "react-toastify";

const TransfusionConfirm = () => {
  const [user, setUser] = useState(null);
  const [transfusions, setTransfusions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      toast.error("❌ Người dùng chưa đăng nhập.");
      return;
    }

    setUser(currentUser);

    getUserTransfusions(currentUser.id)
      .then((res) => {
        setTransfusions(res.data);
        if (res.data.length === 0) {
          toast.info("📭 Bạn chưa có lịch sử truyền máu nào.");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải lịch sử truyền máu:", err);
        toast.error("❌ Không thể tải dữ liệu. Vui lòng thử lại sau.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    const data = {
      recipientName: "Nguyễn Văn A",
      bloodType: "A+",
      units: 2,
    };

    try {
      const response = await confirmTransfusion(data);
      toast.success("✅ Xác nhận truyền máu thành công!");
      console.log("Đã xác nhận truyền máu:", response.data);
    } catch (error) {
      console.error("Lỗi xác nhận truyền máu:", error.response?.data || error.message);
      toast.error("❌ Xác nhận truyền máu thất bại.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-danger mb-4">💉 Lịch sử truyền máu</h3>

      <button className="btn btn-primary mb-3" onClick={handleSubmit}>
        ➕ Xác nhận truyền máu (test)
      </button>

      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : !user ? (
        <div className="alert alert-danger">Người dùng chưa đăng nhập.</div>
      ) : transfusions.length === 0 ? (
        <p>Chưa có lần truyền máu nào.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Người yêu cầu</th>
              <th>Nhóm máu</th>
              <th>Thành phần</th>
              <th>Số lượng (ml)</th>
              <th>Ngày xác nhận</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {transfusions.map((item) => (
              <tr key={item.id}>
                <td>{item.recipientName || "Chưa rõ"}</td>
                <td>{item.bloodType}</td>
                <td>{item.component_name}</td>
                <td>{item.units}</td>
                <td>{new Date(item.confirmedAt).toLocaleDateString()}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransfusionConfirm;
