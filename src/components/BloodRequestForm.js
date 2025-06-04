// src/components/BloodRequestForm.js
import React, { useState } from "react";
import axios from "axios";

const BloodRequestForm = () => {
  const [form, setForm] = useState({
    blood_type: "",
    component_id: "",
    quantity_ml: "",
    urgency_level: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Giả định user đang đăng nhập và có sẵn token
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:3000/api/requests", {
        ...form,
        requester_id: user.id,
      });

      alert("Gửi yêu cầu máu thành công!");
    } catch (err) {
      alert("Gửi yêu cầu thất bại.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h3>Gửi yêu cầu nhận máu</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label>Nhóm máu</label>
          <select className="form-control" name="blood_type" onChange={handleChange} required>
            <option value="">--Chọn nhóm máu--</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="form-group mt-2">
          <label>Thành phần máu</label>
          <select className="form-control" name="component_id" onChange={handleChange} required>
            <option value="">--Chọn thành phần--</option>
            <option value="1">Hồng cầu</option>
            <option value="2">Tiểu cầu</option>
            <option value="3">Huyết tương</option>
          </select>
        </div>

        <div className="form-group mt-2">
          <label>Số lượng (ml)</label>
          <input type="number" name="quantity_ml" className="form-control" onChange={handleChange} required />
        </div>

        <div className="form-group mt-2">
          <label>Mức độ khẩn cấp</label>
          <select className="form-control" name="urgency_level" onChange={handleChange} required>
            <option value="">--Chọn mức độ--</option>
            <option value="Thấp">Thấp</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khẩn cấp">Khẩn cấp</option>
          </select>
        </div>

        <button type="submit" className="btn btn-danger mt-3">
          Gửi yêu cầu
        </button>
      </form>
    </div>
  );
};

export default BloodRequestForm;
