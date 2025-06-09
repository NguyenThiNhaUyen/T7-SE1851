import React from "react";
import { Link } from "react-router-dom";
import "../styles/BlogList.css";

// Danh sách bài viết mẫu
const blogs = [
  {
    id: "1",
    title: "Lý do khiến hiến máu trở thành nghĩa cử cao đẹp",
    summary: "Mỗi giọt máu bạn trao đi là một tia hy vọng cho người khác. Hiến máu không chỉ cứu người mà còn lan tỏa yêu thương và sự sống trong cộng đồng",
    published_at: "2025-06-03"
  },
  {
    id: "2",
    title: "Chuẩn bị đúng cách để hiến máu nhẹ nhàng hơn",
    summary: "Chỉ với vài bước đơn giản như nghỉ ngơi đủ giấc, ăn uống hợp lý và giữ tinh thần lạc quan, bạn có thể trải nghiệm buổi hiến máu thoải mái và suôn sẻ",
    published_at: "2025-06-01"
  },
  {
    id: "3",
    title: "Hiến máu – Trao đi sức khỏe, nhận lại yêu thương",
    summary: "Không chỉ là sự sẻ chia, hiến máu còn mang lại lợi ích sức khỏe như tái tạo máu, phát hiện sớm bệnh lý và cảm giác mãn nguyện khi giúp đỡ người khác",
    published_at: "2025-06-03"
  },
  {
    id: "4",
    title: "Điều kiện để trở thành người hiến máu",
    summary: "Bạn có biết rằng chỉ cần đủ 18 tuổi, sức khỏe tốt và đủ cân nặng là bạn đã có thể trở thành một người hùng thầm lặng qua việc hiến máu tình nguyện",
    published_at: "2025-06-02"
  },
  {
    id: "5",
    title: "Toàn bộ quy trình hiến máu an toàn và chuyên nghiệp",
    summary: "Từ khâu đăng ký đến chăm sóc sau hiến, mọi bước đều được thực hiện cẩn trọng, đảm bảo sự an tâm tuyệt đối cho mỗi người tham gia hiến máu",
    published_at: "2025-06-01"
  }
];


const BlogList = () => {
  return (
    <div className="blog-list-wrapper">
      <h2>Bài viết nổi bật</h2>
      <div className="blog-list-column">
        {blogs.map((blog) => (
          <div className="blog-list-card" key={blog.id}>
            <Link to={`/blog/${blog.id}`}>
              <h4>{blog.title}</h4>
            </Link>
            <p>{blog.summary}</p>
            <small>Ngày đăng: {blog.published_at}</small>
          </div>
        ))}
      </div>
    </div>

  );
};

export default BlogList;
