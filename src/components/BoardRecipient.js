// src/components/BoardRecipient.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BoardRecipient = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Bảng điều khiển người truyền máu</h3>
      </header>

      <div className="btn-group-vertical mt-3 w-100">
        <button className="btn btn-primary mb-2" onClick={() => navigate("/requests/new")}>
          Gửi yêu cầu nhận máu
        </button>
        <button className="btn btn-secondary mb-2" onClick={() => navigate("/requests/history")}>
          Lịch sử yêu cầu máu
        </button>
        <button className="btn btn-info mb-2" onClick={() => navigate("/transfusions/history")}>
          Lịch sử truyền máu
        </button>
      </div>
    </div>
  );
};

export default BoardRecipient;
