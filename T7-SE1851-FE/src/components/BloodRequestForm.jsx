import React, { useState } from "react";
import axios from "axios";
import "../styles/user.css";

const BloodRequestForm = () => {
  const [form, setForm] = useState({
    blood_type: "",
    component_id: "",
    quantity_ml: "",
    urgency_level: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" | "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("/staff/requests", {
        ...form,
        requester_id: user.id,
      });
      setStatusMessage("Gửi yêu cầu máu thành công!");
      setStatusType("success");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Gửi yêu cầu thất bại. Vui lòng thử lại.";
      setStatusMessage(errorMsg);
      setStatusType("error");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h3 className="text-danger mb-4">📝 Gửi yêu cầu nhận máu</h3>

      {statusMessage && (
        <div
          className={`alert ${statusType === "success" ? "alert-success" : "alert-danger"}`}
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group mt-3">
          <label>Nhóm máu</label>
          <select
            className="form-control"
            name="blood_type"
            onChange={handleChange}
            required
          >
            <option value="">--Chọn nhóm máu--</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3">
          <label>Thành phần máu</label>
          <select
            className="form-control"
            name="component_id"
            onChange={handleChange}
            required
          >
            <option value="">--Chọn thành phần--</option>
            <option value="1">Hồng cầu</option>
            <option value="2">Tiểu cầu</option>
            <option value="3">Huyết tương</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label>Số lượng (ml)</label>
          <input
            type="number"
            name="quantity_ml"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label>Mức độ khẩn cấp</label>
          <select
            className="form-control"
            name="urgency_level"
            onChange={handleChange}
            required
          >
            <option value="">--Chọn mức độ--</option>
            <option value="Thấp">Thấp</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khẩn cấp">Khẩn cấp</option>
          </select>
        </div>

        <button type="submit" className="btn btn-danger mt-4">
          Gửi yêu cầu
        </button>
      </form>
    </div>
  );
};

export default BloodRequestForm;