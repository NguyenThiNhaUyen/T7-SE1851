import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import BenefitCarousel from "./BenefitCarousel";
import "../styles/Home.css";

const images = ["/banner1.jpg", "/banner2.jpg"];

const infoSections = [
  {
    title: "Lợi ích khi hiến máu",
    summary: "Hiểu rõ về tác động tích cực và lợi ích sức khỏe khi hiến máu thường xuyên.",
    blogId: "3"
  },
  {
    title: "Ai có thể hiến máu?",
    summary: "Kiểm tra điều kiện để biết bạn có đủ điều kiện tham gia hiến máu không.",
    blogId: "4"
  },
  {
    title: "Quy trình hiến máu",
    summary: "Tìm hiểu các bước cơ bản trong quy trình hiến máu an toàn và hiệu quả.",
    blogId: "5"
  }
];

const Home = () => {
  const [content, setContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getPublicContent().then(
      (res) => setContent(res.data),
      (err) => setContent(err?.response?.data || err.message || "Lỗi tải nội dung.")
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      {/* Banner Slider */}
      <div className="fade-slider">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Banner ${index + 1}`}
            className={`fade-img ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h1>Hiến máu - Cứu người</h1>
        <p>Mỗi giọt máu cho đi là một cuộc đời ở lại</p>
        <div className="cta-buttons-vertical">
          <button className="cta-button donate" onClick={() => navigate("/login")}>
            Hiến máu ngay
          </button>
        </div>
      </section>

      {/* Benefit Carousel Section */}
      <BenefitCarousel />

      <div className="section-divider" />

      {/* Info Cards – chuyển động động qua Blog */}
      <section className="info-section">
        {infoSections.map((item, index) => (
          <div
            key={index}
            className="info-card"
            onClick={() => navigate(`/blog/${item.blogId}`)}
            role="button"
          >
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </div>
        ))}
      </section>

      {/* Learn More Section */}
      <section className="grid-section">
        <h2 className="section-title">Tìm hiểu thêm</h2>
        <div className="grid-cards">
          <div className="grid-card">
            <h4>Câu hỏi thường gặp</h4>
            <ul>
              <li>Điều kiện hiến máu</li>
              <li>Thời gian giữa các lần hiến</li>
              <li>Hiến máu có an toàn?</li>
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
              <li>Chuẩn bị kỹ trước khi hiến</li>
              <li>Chăm sóc sau khi hiến</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-section">
        <h2 className="section-title">Chia sẻ từ người hiến máu</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Cảm giác sau khi hiến máu thật tuyệt. Tôi cảm thấy mình đã giúp được ai đó!"</p>
            <span>— Anh Dũng, 28 tuổi</span>
          </div>
          <div className="testimonial-card">
            <p>"Tôi hiến máu định kỳ 3 tháng 1 lần. Vừa khỏe mạnh, vừa có ích."</p>
            <span>— Chị Linh, giáo viên</span>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="blog-preview-section">
        <h2 className="section-title">Từ Blog của chúng tôi</h2>
        <div className="grid-cards">
          <div className="blog-card no-left-border" onClick={() => navigate("/blog/1")}>
            <img src="/banner1.jpg" alt="Blog 1" />
            <h4>Vì sao nên hiến máu?</h4>
            <p>Khám phá tác động tích cực từ việc bạn cho đi giọt máu quý giá.</p>
          </div>
          <div className="blog-card no-left-border" onClick={() => navigate("/blog/2")}>
            <img src="/banner2.jpg" alt="Blog 2" />
            <h4>Mẹo nhỏ trước khi hiến máu</h4>
            <p>Những lưu ý giúp bạn cảm thấy thoải mái và an toàn khi hiến máu.</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button className="cta-button" onClick={() => navigate("/blog")}>
            Xem tất cả bài viết
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Sáng kiến Hiến Máu Việt Nam | Chung tay cứu người với lòng nhân ái.</p>
      </footer>
    </div>
  );
};

export default Home;
