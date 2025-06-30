import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Spin, Alert } from "antd";

const { Title, Text, Paragraph } = Typography;

const BloodRoles = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        role_name: "🩸 Người hiến máu (Chủ)",
        description: "Là người cung cấp máu, cần sức khỏe tốt và đủ điều kiện (tuổi 18-65, cân nặng >45kg). Nhóm O- là 'người hiến phổ thông'."
      },
      {
        id: 2,
        role_name: "❤️ Người nhận máu (Phụ)",
        description: "Là người cần truyền máu do phẫu thuật, tai nạn, hoặc bệnh lý. Nhóm AB+ là 'người nhận phổ thông'."
      },
      {
        id: 3,
        role_name: "🤝 Người hỗ trợ",
        description: "Gia đình hoặc bạn bè hỗ trợ người nhận, giúp liên hệ và theo dõi quá trình truyền máu."
      },
    ];
    setTimeout(() => {
      setRoles(sampleData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Spin tip="Đang tải dữ liệu..." size="large" style={{ display: "block", marginTop: 80 }} />;
  if (error) return <Alert message={error} type="error" showIcon style={{ margin: 16 }} />;

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>👥 Chủ và phụ trong truyền máu</Title>
      <Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Trong quy trình truyền máu, các vai trò đều quan trọng nhằm đảm bảo an toàn và hiệu quả.
      </Paragraph>

      <Row gutter={[16, 16]}>
        {roles.map((role) => (
          <Col xs={24} sm={12} md={8} key={role.id}>
            <Card title={role.role_name} bordered hoverable>
              <Text>{role.description}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BloodRoles;
