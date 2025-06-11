import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

const DonationAftercare = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    let isMounted = true;

    if (!currentUser) {
      setError("Người dùng chưa đăng nhập.");
      return;
    }

    axios.get(`/api/users/notifications/aftercare/${currentUser.id}`)
      .then((res) => {
        if (isMounted) {
          const data = Array.isArray(res.data) ? res.data : [];
          setNotifications(data);
        }
      })
      .catch(() => {
        if (isMounted) setError("Không thể tải thông báo.");
      });

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  return (
    <div className="container">
      <h3>Thông báo sau hiến máu</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {notifications.length === 0 ? (
        <p>Không có thông báo nào.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((n, i) => (
            <li key={i} className="list-group-item">
              <strong>{new Date(n.sent_at).toLocaleString()}:</strong> {n.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DonationAftercare;