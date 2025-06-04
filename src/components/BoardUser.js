import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>

      <div className="btn-group-vertical mt-3 w-100">
        {/* Người hiến máu */}
        <button className="btn btn-primary mb-2" onClick={() => navigate("/donation/register")}>Đăng ký hiến máu</button>
        <button className="btn btn-secondary mb-2" onClick={() => navigate("/donation/history")}>Lịch sử hiến máu</button>
        <button className="btn btn-info mb-2" onClick={() => navigate("/donation/aftercare")}>Thông báo sau hiến máu</button>

        <hr />

        {/* Người nhận máu */}
        <button className="btn btn-danger mb-2" onClick={() => navigate("/requests/new")}>Gửi yêu cầu nhận máu</button>
        <button className="btn btn-warning mb-2" onClick={() => navigate("/requests/history")}>Lịch sử yêu cầu máu</button>
        <button className="btn btn-success mb-2" onClick={() => navigate("/transfusions/history")}>Lịch sử truyền máu</button>
      </div>
    </div>
  );
};

export default BoardUser;
