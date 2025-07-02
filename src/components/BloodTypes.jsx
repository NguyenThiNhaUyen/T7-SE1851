import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Tag, Spin, Alert } from "antd";

const { Title, Text, Paragraph } = Typography;

const BloodTypes = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sampleData = [
      { id: 1, name: "A+", rh_factor: "+", compatible_donors: ["A+", "A-", "O+", "O-"], compatible_recipients: ["A+", "AB+"], description: "Nhóm máu phổ biến, có thể nhận từ A+, A-, O+, O-." },
      { id: 2, name: "A-", rh_factor: "-", compatible_donors: ["A-", "O-"], compatible_recipients: ["A+", "A-", "AB+", "AB-"], description: "Nhóm máu hiếm, an toàn cho phụ nữ mang thai Rh-." },
      { id: 3, name: "B+", rh_factor: "+", compatible_donors: ["B+", "B-", "O+", "O-"], compatible_recipients: ["B+", "AB+"], description: "Phổ biến ở một số khu vực châu Á." },
      { id: 4, name: "B-", rh_factor: "-", compatible_donors: ["B-", "O-"], compatible_recipients: ["B+", "B-", "AB+", "AB-"], description: "Ít gặp, cần bảo quản cẩn thận." },
      { id: 5, name: "AB+", rh_factor: "+", compatible_donors: ["Tất cả"], compatible_recipients: ["AB+"], description: "Nhóm nhận phổ thông, hiếm khi hiến cho người khác." },
      { id: 6, name: "AB-", rh_factor: "-", compatible_donors: ["AB-", "A-", "B-", "O-"], compatible_recipients: ["AB+", "AB-"], description: "Rất hiếm, cần ưu tiên bảo quản." },
      { id: 7, name: "O+", rh_factor: "+", compatible_donors: ["O+", "O-"], compatible_recipients: ["O+", "A+", "B+", "AB+"], description: "Nhóm hiến rộng rãi, phổ biến toàn cầu." },
      { id: 8, name: "O-", rh_factor: "-", compatible_donors: ["O-"], compatible_recipients: ["Tất cả"], description: "Nhóm hiến phổ thông, cứu sống trong khẩn cấp." },
    ];
    setTimeout(() => {
      setBloodTypes(sampleData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Spin tip="Đang tải dữ liệu..." size="large" style={{ display: "block", marginTop: 80 }} />;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>🩸 Các loại nhóm máu</Title>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Row gutter={[16, 16]}>
        {bloodTypes.map((type) => (
          <Col xs={24} sm={12} md={8} lg={6} key={type.id}>
            <Card
              title={<span>{type.name} <Tag color={type.rh_factor === "+" ? "volcano" : "blue"}>{type.rh_factor}</Tag></span>}
              bordered
              hoverable
            >
              <Text strong>Tính tương thích:</Text>
              <ul style={{ paddingLeft: 16, marginBottom: 12 }}>
                <li><Text type="secondary">Nhận từ:</Text> {type.compatible_donors.map(d => <Tag key={d}>{d}</Tag>)}</li>
                <li><Text type="secondary">Hiến cho:</Text> {type.compatible_recipients.map(r => <Tag key={r} color="green">{r}</Tag>)}</li>
              </ul>
              <Paragraph>{type.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BloodTypes;
