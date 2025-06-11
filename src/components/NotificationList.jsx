import React, { useState, useEffect } from "react";
import "../styles/NotificationList.css"; // Đừng quên tạo file CSS

const mockNotifications = [
  {
    id: 1,
    title: "Hiến máu cuối tuần này!",
    message: "Tham gia sự kiện hiến máu tại trung tâm thành phố.",
    date: "2025-06-01"
  },
  {
    id: 2,
    title: "Khẩn: Cần người hiến máu nhóm O+",
    message: "Ngân hàng máu đang thiếu nhóm O+. Nếu bạn phù hợp, hãy hiến máu ngay.",
    date: "2025-05-30"
  },
  {
    id: 3,
    title: "Cảm ơn bạn!",
    message: "Cảm ơn vì lần hiến máu gần đây của bạn. Bạn đã cứu được một mạng người.",
    date: "2025-05-28"
  }
];

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  return (
    <div className="notification-wrapper">
      <h2>Thông báo từ hệ thống</h2>
      <div className="notification-list">
        {notifications.map((note) => (
          <div className="notification-card" key={note.id}>
            <h4>{note.title}</h4>
            <p>{note.message}</p>
            <span className="date">{note.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
