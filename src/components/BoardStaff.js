// src/components/BoardStaff.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BoardStaff = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Bảng điều khiển nhân viên y tế</h3>
      </header>

      <div className="btn-group-vertical mt-3 w-100">
        <button className="btn btn-primary mb-2" onClick={() => navigate("/staff/requests")}>
          Xử lý yêu cầu nhận máu
        </button>
        <button className="btn btn-secondary mb-2" onClick={() => navigate("/staff/transfusions")}>
          Xác nhận truyền máu
        </button>
        <button className="btn btn-success mb-2" onClick={() => navigate("/staff/inventory")}>
          Kiểm tra kho máu
        </button>
        <button className="btn btn-warning mb-2" onClick={() => navigate("/staff/statistics")}>
          Thống kê truyền máu
        </button>
      </div>
    </div>
  );
};

export default BoardStaff;
