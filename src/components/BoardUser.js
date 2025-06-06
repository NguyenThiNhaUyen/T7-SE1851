import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import "../styles/user.css"; // đảm bảo đã tạo và import file user.css

const BoardUser = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container mt-4">
      <header className="jumbotron mb-4">
        <h3>{content}</h3>
      </header>

      <div className="user-main-columns">
        {/* Người hiến máu */}
        <div className="user-card">
          <h4> Người hiến máu</h4>
          <div className="user-button-group">
            <button className="btn" onClick={() => navigate("/donation/register")}>
               <span>Đăng ký hiến máu</span>
            </button>
            <button className="btn" onClick={() => navigate("/donation/history")}>
               <span>Lịch sử hiến máu</span>
            </button>
            <button className="btn" onClick={() => navigate("/donation/aftercare")}>
               <span>Thông báo sau hiến máu</span>
            </button>
          </div>
        </div>

        {/* Người nhận máu */}
        <div className="user-card">
          <h4> Người nhận máu</h4>
          <div className="user-button-group">
            <button className="btn" onClick={() => navigate("/requests/new")}>
               <span>Gửi yêu cầu nhận máu</span>
            </button>
            <button className="btn" onClick={() => navigate("/requests/history")}>
               <span>Lịch sử yêu cầu máu</span>
            </button>
            <button className="btn" onClick={() => navigate("/transfusions/history")}>
               <span>Lịch sử truyền máu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
