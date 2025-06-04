import React, { useState } from "react";

const NotificationForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tạm thời hiển thị thông tin gửi thành công
    console.log("Submitted:", { title, message });
    setStatus("Notification sent successfully!");
    setTitle("");
    setMessage("");
  };

  return (
    <div className="notification-form-wrapper">
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit} className="notification-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default NotificationForm;