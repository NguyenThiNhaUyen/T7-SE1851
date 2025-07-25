import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Tag, Typography, Breadcrumb } from "antd";
import { HomeOutlined, FileTextOutlined, CalendarOutlined } from "@ant-design/icons";
import "../styles/BlogDetail.css";

const { Title, Paragraph } = Typography;

const blogs = [
  {
    id: "1",
    title: "Lý do khiến hiến máu trở thành nghĩa cử cao đẹp",
    content: `Hiến máu là một hành động tình nguyện mang tính nhân đạo sâu sắc, góp phần cứu sống những người bệnh đang cần truyền máu. Mỗi giọt máu cho đi không chỉ mang lại sự sống mà còn lan tỏa sự sẻ chia và tình người trong cộng đồng.

Trong thời đại hiện nay, nhu cầu máu luôn ở mức cao do số lượng bệnh nhân gia tăng, tai nạn giao thông, phẫu thuật lớn và các bệnh lý nguy hiểm. Một đơn vị máu có thể giúp tới ba người nếu được tách thành các chế phẩm như hồng cầu, tiểu cầu và huyết tương. Chính vì vậy, việc hiến máu không chỉ đơn thuần là giúp một người – mà là đang giúp cả ba sinh mệnh có cơ hội sống tiếp.

Bên cạnh giá trị nhân văn, hiến máu còn mang lại lợi ích sức khỏe cho chính người hiến. Việc lấy máu kích thích tủy xương sản sinh máu mới, giúp máu lưu thông tốt hơn và làm sạch hệ tuần hoàn. Người hiến máu định kỳ còn có cơ hội phát hiện sớm các vấn đề sức khỏe thông qua xét nghiệm và kiểm tra huyết học miễn phí.

Hành động nhỏ – nhưng có sức lan tỏa lớn. Hãy tưởng tượng, ở đâu đó trong bệnh viện, có người đang nắm lấy sự sống nhờ vào chính giọt máu bạn từng cho đi.`,
    published_at: "2025-06-03"
  },
  {
    id: "2",
    title: "Chuẩn bị đúng cách để hiến máu nhẹ nhàng hơn",
    content: `Chuẩn bị kỹ lưỡng trước khi hiến máu là điều cần thiết để buổi hiến máu diễn ra suôn sẻ, an toàn và thoải mái cho người hiến.

Trước hết, bạn cần ngủ đủ giấc vào đêm trước khi hiến máu. Bữa sáng nên nhẹ nhàng, hạn chế đồ ăn nhiều dầu mỡ vì có thể ảnh hưởng đến chất lượng máu. Uống đủ nước trong 1–2 ngày trước đó cũng giúp quá trình lấy máu diễn ra dễ dàng hơn.

Hãy mang theo giấy tờ tùy thân, mặc áo ngắn tay hoặc dễ xắn tay. Tinh thần cũng rất quan trọng – hãy giữ tâm lý thoải mái, vì quy trình hiến máu diễn ra chỉ trong khoảng 7–10 phút và hoàn toàn an toàn.

Sau khi hiến, bạn nên ngồi nghỉ 10–15 phút, uống nước và ăn nhẹ để phục hồi năng lượng. Trong vòng 24 giờ sau đó, nên tránh vận động mạnh hoặc thức khuya.

Với sự chuẩn bị đúng cách, hiến máu không chỉ dễ dàng mà còn là một trải nghiệm ý nghĩa và tích cực.`,
    published_at: "2025-06-01"
  },
  {
    id: "3",
    title: "Hiến máu – Trao đi sức khỏe, nhận lại yêu thương",
    content: `Hiến máu không chỉ mang lại sự sống cho người khác mà còn là món quà sức khỏe dành cho chính bạn.

Khi hiến máu, cơ thể bạn sẽ tự động kích thích sản sinh máu mới để bù đắp lượng máu đã hiến. Quá trình này giúp tăng cường hệ tuần hoàn, làm sạch máu và giảm lượng sắt dư thừa trong cơ thể – một trong những yếu tố làm giảm nguy cơ mắc bệnh tim mạch.

Thêm vào đó, việc kiểm tra sức khỏe định kỳ khi hiến máu cũng giúp bạn theo dõi huyết áp, nhịp tim, và phát hiện sớm các bệnh truyền nhiễm.

Không thể không nhắc đến yếu tố tinh thần – cảm giác mãn nguyện, tự hào khi biết rằng hành động của mình đã cứu được một sinh mạng là điều không gì sánh được. Nhiều người hiến máu lần đầu đã trở thành người hiến máu định kỳ vì chính cảm giác đó.

Hiến máu là hành trình yêu thương mà bạn nhận lại nhiều hơn cả những gì đã cho đi.`,
    published_at: "2025-06-03"
  },
  {
    id: "4",
    title: "Điều kiện để trở thành người hiến máu",
    content: `Hiến máu là một hoạt động có điều kiện nhằm đảm bảo an toàn cho cả người hiến và người nhận.

Người hiến máu cần trong độ tuổi từ 18–60, nặng ít nhất 45kg với nữ và 50kg với nam. Không mắc các bệnh truyền nhiễm như HIV, viêm gan B, C, sốt rét... Không nên hiến máu khi đang ốm, sốt, đang uống thuốc điều trị, hoặc sau khi phẫu thuật, tiêm vaccine, xăm hình (trong vòng 6 tháng).

Phụ nữ đang mang thai, cho con bú, hoặc trong kỳ kinh nguyệt cũng không nên hiến máu.

Khoảng cách giữa hai lần hiến máu toàn phần là tối thiểu 3 tháng với nam và 4 tháng với nữ. Trước khi hiến, người tham gia sẽ được khám lâm sàng và làm xét nghiệm máu nhanh.

Tuân thủ đúng các điều kiện giúp đảm bảo buổi hiến máu an toàn, hiệu quả và đầy trách nhiệm.`,
    published_at: "2025-06-02"
  },
  {
    id: "5",
    title: "Toàn bộ quy trình hiến máu an toàn và chuyên nghiệp",
    content: `Quy trình hiến máu hiện nay được thực hiện rất chuyên nghiệp, khoa học và an toàn tuyệt đối.

Bắt đầu từ khâu tiếp đón, người hiến sẽ điền phiếu thông tin cá nhân và khai báo y tế. Sau đó là kiểm tra cân nặng, huyết áp, mạch và lấy máu xét nghiệm nhanh để đảm bảo đủ điều kiện hiến.

Nếu đủ điều kiện, bạn sẽ được đưa đến khu vực hiến máu. Toàn bộ dụng cụ lấy máu đều vô trùng và sử dụng một lần, đảm bảo an toàn tuyệt đối. Việc lấy máu thường kéo dài khoảng 7–10 phút.

Sau khi hiến, bạn được nghỉ ngơi, ăn nhẹ tại chỗ, nhận giấy chứng nhận và phần quà từ đơn vị tổ chức.

Toàn bộ quá trình có sự hỗ trợ nhiệt tình từ đội ngũ nhân viên y tế, đảm bảo trải nghiệm dễ chịu và an toàn nhất cho người tham gia.

Một quy trình chuyên nghiệp để bạn yên tâm đóng góp cho cộng đồng.`,
    published_at: "2025-06-01"
  }
];

const categoryColorMap = {
  "Truyền cảm hứng": "magenta",
  "Hướng dẫn": "green",
  "Thông tin": "blue",
  "Quy trình": "volcano",
};

const formatDate = (dateStr) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateStr).toLocaleDateString("vi-VN", options);
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const found = blogs.find((b) => b.id === id);
    setBlog(found);
  }, [id]);

  useEffect(() => {
    if (blog) document.title = blog.title;
  }, [blog]);

  if (!blog) return <p className="loading-text">Đang tải bài viết...</p>;

  return (
    <div className="blog-modern-wrapper">
      <div className="blog-banner">
        <img src={blog.image} alt={blog.title} className="blog-banner-img" />
      </div>

      <div className="blog-modern-content">
        <Breadcrumb className="blog-breadcrumb">
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/blog">
            <FileTextOutlined />
            <span>Blog</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{blog.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Title level={2} className="blog-modern-title">{blog.title}</Title>

        <div className="blog-meta">
          <Tag color={categoryColorMap[blog.category] || "default"}>
            {blog.category}
          </Tag>
          <span>
            <CalendarOutlined /> {formatDate(blog.published_at)}
          </span>
        </div>

        <div className="blog-body">
          {blog.content.split("\n").map((p, idx) => (
            <Paragraph key={idx}>{p.trim()}</Paragraph>
          ))}
        </div>

        {/* Related posts */}
        <div className="related-posts">
          <Title level={4} style={{ marginTop: 48 }}>📰 Bài viết liên quan</Title>
          <div className="related-posts-grid">
            {blogs
              .filter((b) => b.id !== blog.id && b.category === blog.category)
              .slice(0, 3)
              .map((rel) => (
                <Link to={`/blog/${rel.id}`} key={rel.id} className="related-post-card">
                  <img src={rel.image} alt={rel.title} />
                  <p>{rel.title}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
