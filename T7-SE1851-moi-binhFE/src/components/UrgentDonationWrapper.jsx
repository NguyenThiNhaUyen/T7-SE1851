import React, { useState } from "react";
import {
  Card, Typography, Divider, Button, Row, Checkbox
} from "antd";
import {
  SmileTwoTone, CheckCircleTwoTone, ExclamationCircleTwoTone
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import benefits from "../data/benefits.json";

const { Title, Paragraph, Text } = Typography;

const UrgentDonationWrapper = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const userId = user?.userId || user?.id;
  const [agree, setAgree] = useState(false);

  const handleAccept = () => {
    if (!userId) navigate("/login");
    else navigate(`/user/${userId}/urgent-register`);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "8px 12px",
        backgroundColor: "#fafafa",
        transition: "all 0.3s ease",
      }}
    >
      <Card
        bordered={false}
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          padding: "16px 24px",
          background: "#fff",
          transition: "all 0.3s ease",
        }}
      >
        {/* TIÊU ĐỀ */}
        <Title level={3} style={{ color: "#d32f2f", marginBottom: 10, marginTop: 4 }}>
          🩸 Tham gia nhóm hiến máu khẩn cấp – Hành động nhỏ, ý nghĩa lớn
        </Title>

        <Paragraph style={{ fontSize: "15.5px", marginBottom: 16 }}>
          Bạn có thể là người tạo nên điều kỳ diệu trong những khoảnh khắc sinh tử.
          Chúng tôi rất trân trọng nếu bạn sẵn sàng tham gia mạng lưới{" "}
          <strong>hiến máu khẩn cấp</strong> – nơi những giọt máu được trao đúng lúc, đúng người cần.
        </Paragraph>

        {/* QUYỀN LỢI */}
        <Divider orientation="left" plain style={{ margin: "12px 0" }}>
          🎁 Quyền lợi dành cho người hiến máu khẩn cấp
        </Divider>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 4, marginBottom: 16 }}>
          {benefits.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "start" }}>
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8, fontSize: 18 }} />
              <Text>{item.replace("✔ ", "")}</Text>
            </div>
          ))}
        </div>

        {/* CAM KẾT */}
        <Divider orientation="left" plain style={{ margin: "12px 0" }}>
          📜 Chính sách & Cam kết
        </Divider>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 4, marginBottom: 20 }}>
          <div style={{ display: "flex" }}>
            <ExclamationCircleTwoTone twoToneColor="#faad14" style={{ marginRight: 8, fontSize: 18 }} />
            <Text>Tôi xác nhận rằng tất cả thông tin cá nhân cung cấp là chính xác và đầy đủ.</Text>
          </div>
          <div style={{ display: "flex" }}>
            <ExclamationCircleTwoTone twoToneColor="#faad14" style={{ marginRight: 8, fontSize: 18 }} />
            <Text>Tôi hiểu rằng việc đăng ký là tự nguyện, có thể từ chối nếu không đủ sức khỏe tại thời điểm liên hệ.</Text>
          </div>
          <div style={{ display: "flex" }}>
            <ExclamationCircleTwoTone twoToneColor="#faad14" style={{ marginRight: 8, fontSize: 18 }} />
            <Text>Tôi đồng ý được liên hệ khẩn cấp qua điện thoại trong những trường hợp cần truyền máu phù hợp.</Text>
          </div>
        </div>

        {/* CHECKBOX */}
        <Checkbox
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          style={{ marginBottom: 24 }}
        >
          Tôi đã đọc và đồng ý với các quyền lợi & điều khoản trên
        </Checkbox>

        {/* NÚT TIẾP TỤC */}
        <Row justify="center">
          <Button
            type="primary"
            onClick={handleAccept}
            disabled={!agree}
            size="large"
            style={{
              backgroundColor: agree ? "#f44336" : "#f8d7da",     // ✅ màu mờ trước khi chọn
              borderColor: agree ? "#f44336" : "#f8d7da",
              color: agree ? "#fff" : "#a94442",                   // ✅ chữ tinh tế khi chưa chọn
              padding: "0 24px",
              borderRadius: 6,
              cursor: agree ? "pointer" : "not-allowed",
              transition: "all 0.3s ease"
            }}
          >
            Tiếp tục
          </Button>
        </Row>

        {/* CẢM ƠN */}
        <Divider style={{ margin: "24px 0 12px" }} />
        <Paragraph style={{ fontSize: "15px", textAlign: "center", marginTop: 8 }}>
          <SmileTwoTone twoToneColor="#fadb14" style={{ fontSize: 20 }} />{" "}
          <Text strong>Cảm ơn bạn vì trái tim nhân ái và tinh thần sẻ chia.</Text><br />
          Mỗi giọt máu bạn trao đi là một hy vọng bạn gửi lại cho cuộc đời.
        </Paragraph>
      </Card>
    </div>
  );
};

export default UrgentDonationWrapper;