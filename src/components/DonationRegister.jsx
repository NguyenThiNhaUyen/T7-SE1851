import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { getAuthHeader } from "../services/user.service";

const API_BASE = "http://localhost:8080";

const DonationRegister = () => {
  const [readyDate, setReadyDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState({});
  const [location, setLocation] = useState("FPTU");
  const [status] = useState("PENDING");
  const [bloodType, setBloodType] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const currentUser = AuthService.getCurrentUser();
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00"];

  useEffect(() => {
    if (readyDate && currentUser?.userId) {
      axios
        .get(`${API_BASE}/api/donation`, {
          headers: getAuthHeader(),
        })
        .then((res) => {
          setAvailableSlots(res.data);
          setTimeSlot("");
        })
        .catch(() => {
          setAvailableSlots({});
        });
    }
  }, [readyDate, currentUser?.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.userId) {
      setMessage("Vui lòng đăng nhập trước khi đăng ký.");
      setMessageType("danger");
      return;
    }

    if (!readyDate || !timeSlot) {
      setMessage("Vui lòng chọn ngày và khung giờ.");
      setMessageType("warning");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn đăng ký hiến máu?")) {
      const data = {
        scheduledDate: readyDate,
        timeSlot,
        location,
        bloodType,
        status,
      };

      try {
        await axios.post(`${API_BASE}/api/donation/register/${currentUser.userId}`, data, {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
        });

        setMessage("Đăng ký thành công!");
        setMessageType("success");
      } catch (error) {
        const statusCode = error.response?.status;
        if (statusCode === 409 || statusCode === 400) {
          setMessage("Bạn đã đăng ký khung giờ này rồi.");
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

        <div className="form-group mb-3">
          <label>Địa điểm hiến máu</label>
          <select
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="FPTU">FPTU</option>
          </select>
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
                    title={isFull ? "Đã đầy" : "Sẵn sàng đăng ký"}
                    className={`btn ${isSelected ? "btn-success" : "btn-outline-primary"} ${
                      isFull ? "disabled btn-secondary" : ""
                    }`}
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
