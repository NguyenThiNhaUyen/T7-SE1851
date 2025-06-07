import React from "react";
import { Link } from "react-router-dom";
import "../styles/BlogList.css"
// Danh sách các bài viết blog
const blogs = [
  {
    id: "1",
    title: "Vì sao bạn nên hiến máu?",
    summary: "Hiến máu có thể cứu sống nhiều người. Đây là lý do vì sao hành động này lại quan trọng...",
    published_at: "2025-06-03"
  },
  {
    id: "2",
    title: "Mẹo để hiến máu hiệu quả",
    summary: "Hãy uống đủ nước, ăn đầy đủ và giữ tâm lý thoải mái trước khi hiến máu...",
    published_at: "2025-06-01"
  },
  {
    id: "3",
    title: "Lợi ích khi hiến máu",
    summary:
      "Hiến máu không chỉ là nghĩa cử cao đẹp mà còn mang lại nhiều lợi ích sức khỏe cho người hiến...",
    published_at: "2025-06-03"
  },
  {
    id: "4",
    title: "Ai có thể hiến máu?",
    summary:
      "Hiểu rõ điều kiện để bạn biết mình có đủ điều kiện tham gia hiến máu hay không...",
    published_at: "2025-06-02"
  },
  {
    id: "5",
    title: "Quy trình hiến máu",
    summary:
      "Tìm hiểu các bước chuẩn bị, xét nghiệm, lấy máu và phục hồi sau hiến...",
    published_at: "2025-06-01"
  }
];

const DanhSachBaiViet = () => {
  return (
    <div className="blog-list-wrapper container mt-5">
      <h2 className="mb-4">Bài viết nổi bật</h2>
      {blogs.map((baiViet) => (
        <div className="blog-card mb-4" key={baiViet.id}>
          <Link to={`/blog/${baiViet.id}`}>
            <h4>{baiViet.title}</h4>
          </Link>
          <p>{baiViet.summary}</p>
          <small>Ngày đăng: {baiViet.published_at}</small>
        </div>
      ))}
    </div>
  );
};

export default DanhSachBaiViet;
