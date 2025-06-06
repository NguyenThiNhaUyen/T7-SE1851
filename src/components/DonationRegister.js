import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const DonationRegister = () => {
  const [readyDate, setReadyDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState({});
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00"];

  // Gọi API để lấy số slot còn lại cho mỗi khung giờ
  useEffect(() => {
    if (readyDate) {
      axios.get(`/api/donation/slots?date=${readyDate}`).then((res) => {
        setAvailableSlots(res.data); // ví dụ: { "08:00": 5, "09:00": 10, ... }
      });
    }
  }, [readyDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readyDate || !timeSlot) {
      setMessage("Vui lòng chọn ngày và khung giờ.");
      return;
    }

    if (availableSlots[timeSlot] === 0) {
      setMessage("Khung giờ này đã hết chỗ. Vui lòng chọn giờ khác.");
      return;
    }

    const data = {
      user_id: currentUser.id,
      ready_date: readyDate,
      time_slot: timeSlot,
      status: "Chờ xác nhận",
    };

    axios.post("/api/donation/register", data).then(
      () => {
        setMessage("Đăng ký thành công!");
        setReadyDate("");
        setTimeSlot("");
      },
      () => {
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

        {readyDate && (
          <div className="form-group mb-3">
            <label>Chọn khung giờ</label>
            <select
              className="form-control"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="">-- Chọn khung giờ --</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} disabled={availableSlots[slot] === 0}>
                  {slot} ({availableSlots[slot] || 0} slot còn lại)
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Gửi đăng ký</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default DonationRegister;
