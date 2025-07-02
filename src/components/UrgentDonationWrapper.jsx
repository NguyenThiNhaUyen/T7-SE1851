import React, { useState } from "react";
import { Card, Typography, Divider, Button, Row, Col, Checkbox } from "antd";
import { SmileTwoTone, CheckCircleTwoTone, HeartTwoTone, ExclamationCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import benefits from "../data/benefits.json"; // Danh sách quyền lợi từ file JSON

const { Title, Paragraph, Text } = Typography;

const UrgentDonationWrapper = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const userId = user?.userId || user?.id;

  const [agree, setAgree] = useState(false);

  const handleAccept = () => {
    if (!userId) {
      navigate("/login");
    } else {
      navigate(`/user/${userId}/urgent-register`);
    }
  };

  const handleDecline = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", marginTop: 40, padding: 20 }}>
      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          padding: "32px"
        }}
      >
        <Title level={3} style={{ color: "#d32f2f" }}>
          🩸 Tham gia nhóm hiến máu khẩn cấp – Hành động nhỏ, ý nghĩa lớn
        </Title>

        <Paragraph style={{ fontSize: "15.5px" }}>
          Bạn có thể là người tạo nên điều kỳ diệu trong những khoảnh khắc sinh tử. Chúng tôi rất trân trọng nếu bạn sẵn sàng tham gia mạng lưới <strong>hiến máu khẩn cấp</strong> – nơi những giọt máu được trao đúng lúc, đúng người cần.
        </Paragraph>

        {/* QUYỀN LỢI */}
        <Divider orientation="left" plain>
          🎁 Quyền lợi dành cho người hiến máu khẩn cấp
        </Divider>
        <ul style={{ paddingLeft: 24, lineHeight: 1.9 }}>
          {benefits.map((item, index) => (
            <li key={index}>
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />
              <Text>{item.replace("✔ ", "")}</Text>
            </li>
          ))}
        </ul>

        {/* CHÍNH SÁCH & CAM KẾT */}
        <Divider orientation="left" plain>
          📜 Chính sách & Cam kết
        </Divider>
        <ul style={{ paddingLeft: 24, lineHeight: 1.9 }}>
          <li>
            <ExclamationCircleTwoTone twoToneColor="#faad14" style={{ marginRight: 8 }} />
            Tôi xác nhận rằng tất cả thông tin cá nhân cung cấp là chính xác và đầy đủ.
          </li>
          <li>
            <ExclamationCircleTwoTone twoToneColor="#faad14" style={{ marginRight: 8 }} />
            Tôi hiểu rằng việc đăng ký là tự nguyện, có thể từ chối nếu không đủ sức khỏe tại thời điểm liên hệ.
          </li>
          <li>
            <ExclamationCircleTwoTone twoToneColor="#faad14" style={{ marginRight: 8 }} />
            Tôi đồng ý được liên hệ khẩn cấp qua điện thoại trong những trường hợp cần truyền máu phù hợp.
          </li>
        </ul>

        {/* CHECKBOX XÁC NHẬN */}
        <Divider />
        <Checkbox
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          style={{ marginBottom: 24 }}
        >
          Tôi đã đọc và đồng ý với các quyền lợi & điều khoản trên
        </Checkbox>

        {/* NÚT ĐIỀU HƯỚNG */}
        <Row justify="space-between">
          <Col>
            <Button onClick={handleDecline} size="large">
              ← Quay lại
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={handleAccept}
              disabled={!agree}
              size="large"
            >
              Tiếp tục
            </Button>
          </Col>
        </Row>

        {/* LỜI CẢM ƠN */}
        <Divider />
        <Paragraph style={{ fontSize: "15px", textAlign: "center", marginTop: 20 }}>
          <SmileTwoTone twoToneColor="#fadb14" style={{ fontSize: 20 }} />{" "}
          <Text strong>Cảm ơn bạn vì trái tim nhân ái và tinh thần sẻ chia.</Text><br />
          Mỗi giọt máu bạn trao đi là một hy vọng bạn gửi lại cho cuộc đời.
        </Paragraph>
      </Card>
    </div>
  );
};

export default UrgentDonationWrapper;
