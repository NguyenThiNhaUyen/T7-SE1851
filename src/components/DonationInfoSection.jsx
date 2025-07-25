import React from "react";
import { Row, Col, Typography } from "antd";
import {
  IdcardOutlined,
  ExperimentOutlined,
  WarningOutlined,
  HeartOutlined,
  DashboardOutlined,
  UserSwitchOutlined,
  GiftOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "../styles/DonationInfoSection.css";

const { Title } = Typography;

const eligibilityCriteria = [
  {
    icon: <IdcardOutlined />,
    text: "Mang theo chứng minh nhân dân/hộ chiếu",
  },
  {
    icon: <ExperimentOutlined />,
    text: "Không nghiện ma túy, rượu bia và các chất kích thích",
  },
  {
    icon: <WarningOutlined />,
    text: "Không mắc hoặc không có hành vi nguy cơ lây nhiễm HIV, viêm gan B, viêm gan C, và các virus truyền máu",
  },
  {
    icon: <HeartOutlined />,
    text: "Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô hấp, dạ dày…",
  },
  {
    icon: <DashboardOutlined />,
    text: "Chỉ số huyết sắc tố (Hb) ≥120g/l (≥125g/l nếu hiến từ 350ml trở lên)",
  },
  {
    icon: <UserSwitchOutlined />,
    text: "Cân nặng: Nam ≥ 45 kg, Nữ ≥ 45 kg",
  },
  {
    icon: <GiftOutlined />,
    text: "Người khỏe mạnh trong độ tuổi từ 18 đến 60 tuổi",
  },
  {
    icon: <CalendarOutlined />,
    text: "Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ",
  },
  {
    icon: <CheckCircleOutlined />,
    text: "Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B",
  },
];

const BloodInfoSection = () => {
  return (
    <div className="blood-antd-wrapper">
      <div className="section-card">
        <Title level={3} className="section-title gold">
          🧬 Tiêu chuẩn tham gia hiến máu
        </Title>
        <Row gutter={[16, 16]}>
          {eligibilityCriteria.map((item, i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <div className="eligibility-box">
                <div className="icon-circle">{item.icon}</div>
                <div className="eligibility-text">{item.text}</div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BloodInfoSection;
