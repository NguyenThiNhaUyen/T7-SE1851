import React, { useState } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const DonationRegister = () => {
  const [readyDate, setReadyDate] = useState("");
  const [status, setStatus] = useState("Chờ xác nhận");
  const [message, setMessage] = useState("");

  const currentUser = AuthService.getCurrentUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!readyDate) {
      setMessage("Vui lòng chọn ngày sẵn sàng.");
      return;
    }

    const data = {
      user_id: currentUser.id,
      ready_date: readyDate,
      status: status,
    };

    axios.post("/api/donation/register", data).then(
      (res) => {
        setMessage("Đăng ký thành công!");
        setReadyDate("");
      },
      (err) => {
        setMessage("Đăng ký thất bại. Vui lòng thử lại.");
      }
    );
  };

  return (
    <div className="container">
      <h3>Đăng ký hiến máu</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Ngày sẵn sàng hiến máu</label>
          <input
            type="date"
            className="form-control"
            value={readyDate}
            onChange={(e) => setReadyDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Gửi đăng ký</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default DonationRegister;
