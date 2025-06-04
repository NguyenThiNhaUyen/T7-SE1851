import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: "1",
    title: "Why You Should Donate Blood",
    summary: "Donating blood can save lives. Here's why it's important...",
    published_at: "2025-06-03"
  },
  {
    id: "2",
    title: "Blood Donation Tips",
    summary: "Stay hydrated, eat well, and relax before donating blood...",
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

const BlogList = () => {
  return (
    <div className="blog-list-wrapper container mt-5">
      <h2 className="mb-4">Bài viết nổi bật</h2>
      {blogs.map((b) => (
        <div className="blog-card mb-4" key={b.id}>
          <Link to={`/blog/${b.id}`}>
            <h4>{b.title}</h4>
          </Link>
          <p>{b.summary}</p>
          <small>Ngày đăng: {b.published_at}</small>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
