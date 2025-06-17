import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const DonationRegister = () => {
  const [readyDate, setReadyDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const currentUser = AuthService.getCurrentUser();

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00"];

  useEffect(() => {
    if (readyDate) {
      axios.get(`/users/donation/slots?date=${readyDate}`).then((res) => {
        setAvailableSlots(res.data);
        setTimeSlot("");
      });
    }
  }, [readyDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!readyDate || !timeSlot) {
      setMessage("Vui lòng chọn ngày và khung giờ.");
      setMessageType("warning");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn đăng ký hiến máu?")) {
      const data = {
        user_id: currentUser?.id,
        ready_date: readyDate,
        time_slot: timeSlot,
      };

      try {
        await axios.post("/users/donation/register", data);
        setMessage("Đăng ký thành công!");
        setMessageType("success");
        setReadyDate("");
        setTimeSlot("");
      } catch (error) {
        const status = error.response?.status;
        if (status === 409 || status === 400) {
          setMessage("Bạn đã đăng ký rồi. Vui lòng không đăng ký lại.");
        } else {
          setMessage("Gửi đăng ký thất bại. Vui lòng thử lại.");
        }
        setMessageType("danger");
      }
    }
  };

  return (
    <div className="container">
      <h3>🩸 Đăng ký hiến máu</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Ngày sẵn sàng hiến máu</label>
          <input
            type="date"
            className="form-control"
            value={readyDate}
            onChange={(e) => setReadyDate(e.target.value)}
            required
          />
        </div>

        {readyDate && (
          <div className="form-group mb-3">
            <label>Chọn khung giờ</label>
            <div className="d-flex flex-wrap gap-2">
              {timeSlots.map((slot) => {
                const isFull = availableSlots[slot] === 0;
                const isSelected = timeSlot === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    className={`btn ${
                      isSelected ? "btn-success" : "btn-outline-primary"
                    } ${isFull ? "disabled btn-secondary" : ""}`}
                    onClick={() => !isFull && setTimeSlot(slot)}
                  >
                    {slot} ({availableSlots[slot] || 0})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-danger mt-3">
          Gửi đăng ký
        </button>
      </form>

      {message && (
        <div className={`alert alert-${messageType} mt-3`}>{message}</div>
      )}
    </div>
  );
};

export default DonationRegister;
