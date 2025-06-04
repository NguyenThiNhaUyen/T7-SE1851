import React, { useState, useEffect } from "react";

const mockNotifications = [
  {
    id: 1,
    title: "Blood Drive this Saturday!",
    message: "Join our community donation event at the city center.",
    date: "2025-06-01"
  },
  {
    id: 2,
    title: "Urgent Need for O+ Donors",
    message: "Our inventory is low. If you're O+, please consider donating.",
    date: "2025-05-30"
  },
  {
    id: 3,
    title: "Thank You!",
    message: "We appreciate your generous donation last week. You made a difference.",
    date: "2025-05-28"
  }
];

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Giả lập gọi API
    setNotifications(mockNotifications);
  }, []);

  return (
    <div className="notification-wrapper">
      <h2>Notifications</h2>
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