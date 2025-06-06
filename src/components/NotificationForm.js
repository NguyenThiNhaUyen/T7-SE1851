import React, { useState } from "react";
import "./NotificationForm.css";

const NotificationForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đã gửi:", { title, message });
    setStatus("Thông báo đã được gửi thành công!");
    setTitle("");
    setMessage("");
  };

  return (
    <div className="notification-form-wrapper">
      <h2>Gửi thông báo</h2>
      <form onSubmit={handleSubmit} className="notification-form">
        <div className="form-group">
          <label>Tiêu đề</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Nhập tiêu đề thông báo..."
          />
        </div>
        <div className="form-group">
          <label>Nội dung</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Nhập nội dung thông báo..."
          ></textarea>
        </div>
        <button type="submit">Gửi thông báo</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default NotificationForm;
