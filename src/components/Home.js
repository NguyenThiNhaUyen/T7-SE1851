import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import "../styles/Home.css";

const Home = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="home-wrapper">
      {/* Nội dung từ server */}
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>

      {/* Khu vực tiêu đề chính */}
      <section className="hero">
        <h1>Hiến máu - Cứu người</h1>
        <p>Mỗi giọt máu cho đi là một cuộc đời ở lại</p>
        <button className="cta-button" onClick={() => navigate("/login")}>
          Hiến máu ngay
        </button>
      </section>

      {/* Thẻ thông tin nhanh */}
      <section className="info-section">
        <div className="info-card">
          <h3>Lợi ích khi hiến máu</h3>
          <p>
            Hiểu rõ về tác động tích cực và lợi ích sức khỏe khi hiến máu thường xuyên.
          </p>
        </div>
        <div className="info-card">
          <h3>Ai có thể hiến máu?</h3>
          <p>
            Kiểm tra điều kiện để biết bạn có đủ điều kiện tham gia hiến máu không.
          </p>
        </div>
        <div className="info-card">
          <h3>Quy trình hiến máu</h3>
          <p>
            Tìm hiểu các bước cơ bản trong quy trình hiến máu an toàn và hiệu quả.
          </p>
        </div>
      </section>

      {/* Khu vực kiến thức bổ sung */}
      <section className="grid-section">
        <h2 className="section-title">Tìm hiểu thêm</h2>
        <div className="grid-cards">
          <div className="grid-card">
            <h4>Câu hỏi thường gặp</h4>
            <ul>
              <li>Tôi có đủ điều kiện hiến máu không?</li>
              <li>Hiến máu bao lâu một lần?</li>
              <li>Việc hiến máu có an toàn không?</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Các hình thức hiến máu</h4>
            <ul>
              <li>Toàn phần</li>
              <li>Tiểu cầu</li>
              <li>Huyết tương</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Chuẩn bị & phục hồi</h4>
            <ul>
              <li>Cần chuẩn bị gì trước khi hiến?</li>
              <li>Quy trình hiến như thế nào?</li>
              <li>Chăm sóc sau hiến máu ra sao?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accordion thông tin mở rộng */}
      <section className="accordion-section">
        <h2 className="section-title">Thông tin quan trọng</h2>
        <details>
          <summary>Hiến máu có an toàn không?</summary>
          <p>
            Có. Quy trình hiến máu được thực hiện với thiết bị vô trùng, dùng một lần.
          </p>
        </details>
        <details>
          <summary>Thời gian hiến mất bao lâu?</summary>
          <p>
            Khoảng 10–15 phút cho quá trình hiến, thêm vài phút để nghỉ ngơi sau đó.
          </p>
        </details>
        <details>
          <summary>Cần làm gì trước khi hiến máu?</summary>
          <p>
            Uống đủ nước, ăn nhẹ trước khi hiến và mang theo giấy tờ tùy thân.
          </p>
        </details>
      </section>

      {/* Gợi ý bài viết blog */}
      <section className="blog-preview-section">
        <h2 className="section-title">Từ Blog của chúng tôi</h2>
        <div className="grid-cards">
          <div className="grid-card">
            <h4>
              <Link to="/blog/1">Vì sao nên hiến máu?</Link>
            </h4>
            <p>Khám phá tác động tích cực từ việc bạn cho đi giọt máu quý giá.</p>
          </div>
          <div className="grid-card">
            <h4>
              <Link to="/blog/2">Mẹo nhỏ trước khi hiến máu</Link>
            </h4>
            <p>Làm thế nào để quá trình hiến máu an toàn và nhẹ nhàng hơn?</p>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/blog" className="cta-button">
            Xem tất cả bài viết
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © 2025 Sáng kiến Hiến Máu Việt Nam | Chung tay cứu người với lòng nhân ái.
        </p>
      </footer>
    </div>
  );
};

export default Home;
