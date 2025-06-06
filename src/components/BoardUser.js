import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import "../styles/user.css"; // Đảm bảo đã tạo và import file user.css

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
      {/* Header */}
      <header className="header">
        <h1>Hiến máu - Cứu người</h1>
        <p>Mọi giọt máu cho đi là một lần ta hóa thân trong yêu thương</p>
        <button className="btn" onClick={() => navigate("/donation/register")}>
          Hiến máu ngay
        </button>
      </header>

      <div className="user-main-columns">
        {/* Người hiến máu */}
        <div className="user-card">
          <h4>Người hiến máu</h4>
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
          <h4>Người nhận máu</h4>
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

      {/* Phần Tìm hiểu thêm */}
      <div className="additional-section">
        <h3>Tìm hiểu thêm</h3>
        <div className="user-main-columns">
          <div className="user-card">
            <h4>Các loại máu</h4>
            <div className="user-button-group1">
              <button className="btn" onClick={() => navigate("/blood/types")}>
                <span>Các loại máu</span>
              </button>
            </div>
          </div>
          <div className="user-card">
            <h4>Cách nhận máu</h4>
            <div className="user-button-group1">
              <button className="btn" onClick={() => navigate("/blood/receive")}>
                <span>Tòan phần</span>
              </button>
              <button className="btn" onClick={() => navigate("/blood/receive")}>
                <span>Tế bào</span>
              </button>
            </div>
          </div>
          <div className="user-card">
            <h4>Chủ & phụ</h4>
            <div className="user-button-group1">
              <button className="btn" onClick={() => navigate("/blood/roles")}>
                <span>Cần chủ & phụ</span>
              </button>
              <button className="btn" onClick={() => navigate("/blood/roles")}>
                <span>Quy trình</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;