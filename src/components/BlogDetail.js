import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/BlogDetail.css"

const blogs = [
  {
    id: "1",
    title: "Vì sao bạn nên hiến máu?",
    content: `Hiến máu là một hành động nhân văn, giúp cứu sống người bệnh đang cần truyền máu khẩn cấp.
Chỉ với một đơn vị máu, bạn có thể cứu sống tới ba người thông qua việc chiết tách các thành phần như hồng cầu, huyết tương và tiểu cầu.

Ngoài ý nghĩa nhân đạo, hiến máu còn mang lại lợi ích sức khỏe cho người hiến. Việc này kích thích cơ thể sản sinh máu mới, giúp tuần hoàn máu tốt hơn.

Người hiến máu định kỳ thường có sức khỏe ổn định, đồng thời có cơ hội kiểm tra sức khỏe miễn phí trong mỗi lần hiến.

Quy trình hiến máu hiện đại, sử dụng dụng cụ vô trùng dùng một lần, đảm bảo an toàn tuyệt đối cho người hiến.

Hiến máu không làm bạn yếu đi mà ngược lại còn giúp tinh thần thoải mái, tạo cảm giác hạnh phúc vì đã giúp người khác.

Tại Việt Nam, nhu cầu về máu và các chế phẩm máu luôn ở mức cao, đặc biệt vào các dịp lễ Tết hoặc mùa dịch bệnh.

Vì vậy, nếu bạn đủ điều kiện sức khỏe, hãy tham gia hiến máu đều đặn 3 tháng/lần để góp phần cứu người. Hành động nhỏ, ý nghĩa lớn.`,
    published_at: "2025-06-03"
  },
  {
    id: "2",
    title: "Mẹo để hiến máu hiệu quả",
    content: `Trước ngày hiến máu, bạn nên ngủ đủ giấc, ăn bữa sáng nhẹ, tránh ăn quá nhiều chất béo hoặc đồ chiên rán.

Hãy uống nhiều nước từ 1–2 ngày trước đó để giữ cho cơ thể đủ nước, giúp việc lấy máu diễn ra suôn sẻ.

Tránh sử dụng chất kích thích như cà phê, bia rượu trước khi hiến máu vì chúng có thể ảnh hưởng đến huyết áp và nhịp tim.

Mặc áo tay ngắn hoặc dễ xắn để thuận tiện khi lấy máu. Mang theo giấy tờ tùy thân có ảnh khi đến điểm hiến.

Sau khi hiến, hãy ngồi nghỉ ít nhất 10–15 phút, uống nước, ăn bánh ngọt hoặc sữa để phục hồi nhanh.

Tránh mang vác vật nặng hoặc chơi thể thao ngay trong ngày hiến máu. Đừng quên theo dõi cơ thể và báo cho nhân viên y tế nếu cảm thấy mệt.

Nếu bạn cảm thấy khỏe mạnh sau 1–2 ngày, có thể tiếp tục sinh hoạt bình thường. Máu sẽ được tái tạo nhanh chóng trong vòng 48–72 giờ.

Hiến máu không đau như bạn tưởng – chỉ là một vết chích nhỏ và phần còn lại là niềm tự hào vì đã cứu giúp cộng đồng.`,
    published_at: "2025-06-01"
  },
  {
    id: "3",
    title: "Lợi ích khi hiến máu",
    content: `Hiến máu định kỳ không chỉ tốt cho cộng đồng mà còn mang lại nhiều lợi ích cho chính bản thân người hiến.

Cơ thể bạn sẽ kích thích tủy xương sản sinh hồng cầu mới, làm máu lưu thông tốt hơn và giúp cải thiện hệ tim mạch.

Mỗi lần hiến máu cũng là một dịp để kiểm tra sức khỏe miễn phí như đo huyết áp, nhịp tim, xét nghiệm các bệnh truyền nhiễm.

Tâm lý người hiến máu thường cảm thấy tích cực và tự hào vì đã làm một việc tử tế giúp đỡ người khác.

Một số nghiên cứu cho thấy người hiến máu định kỳ có nguy cơ mắc bệnh tim mạch và một số bệnh mãn tính thấp hơn.

Ngoài ra, việc này còn giúp điều chỉnh lượng sắt trong máu và giảm tình trạng máu đặc.

Bạn cũng sẽ nhận được giấy chứng nhận hiến máu và quà tặng từ các tổ chức.

Hành động nhỏ nhưng có sức lan tỏa lớn – vì vậy hãy bắt đầu từ hôm nay.`,
    published_at: "2025-06-03"
  },
  {
    id: "4",
    title: "Ai có thể hiến máu?",
    content: `Không phải ai cũng có thể hiến máu. Có những tiêu chí cơ bản mà người hiến phải đáp ứng.

Người hiến máu cần từ 18 đến 60 tuổi, có sức khỏe tốt và cân nặng từ 45kg trở lên đối với nữ, 50kg đối với nam.

Không được mắc các bệnh truyền nhiễm như viêm gan B, C, HIV/AIDS, sốt rét, giang mai…

Không nên hiến máu khi đang bị cảm cúm, sốt, hoặc đang điều trị bệnh cấp tính.

Phụ nữ đang trong kỳ kinh nguyệt, mang thai hoặc cho con bú không nên hiến máu.

Khoảng cách giữa hai lần hiến máu toàn phần tối thiểu là 3 tháng đối với nam và 4 tháng với nữ.

Trước khi hiến, bạn sẽ được kiểm tra sức khỏe, đo huyết áp, nhịp tim và trả lời bảng câu hỏi để đảm bảo an toàn.

Luôn trung thực trong khai báo y tế để bảo vệ chính mình và người nhận máu.`,
    published_at: "2025-06-02"
  },
  {
    id: "5",
    title: "Quy trình hiến máu",
    content: `Quy trình hiến máu hiện đại, đơn giản và an toàn. Dưới đây là các bước cơ bản:

1. Đăng ký thông tin cá nhân và nhận phiếu khám sức khỏe.
2. Đo huyết áp, cân nặng, nhịp tim, xét nghiệm máu nhanh để đảm bảo bạn đủ điều kiện.
3. Nếu đủ điều kiện, bạn sẽ được hướng dẫn vào khu vực lấy máu.
4. Toàn bộ dụng cụ đều vô trùng, dùng một lần nên hoàn toàn an toàn.
5. Quá trình lấy máu diễn ra trong khoảng 7–10 phút cho mỗi đơn vị.
6. Sau khi hiến, bạn được nghỉ ngơi và nhận quà tặng, bánh/sữa.
7. Nhận giấy chứng nhận hiến máu và có thể ra về nếu cảm thấy ổn.

Đừng lo lắng, đội ngũ y tế luôn hỗ trợ tận tình trong suốt quá trình.`,
    published_at: "2025-06-01"
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const selected = blogs.find((b) => b.id === id);
    setBlog(selected);
  }, [id]);

  if (!blog) return <p>Đang tải nội dung bài viết...</p>;

  return (
    <div className="blog-detail-wrapper">
      <h2>{blog.title}</h2>
      <p><strong>Ngày đăng:</strong> {blog.published_at}</p>
      <pre style={{ whiteSpace: "pre-line", fontSize: "1.1rem", lineHeight: "1.8" }}>
        {blog.content}
      </pre>
    </div>
  );
};

export default BlogDetail;
