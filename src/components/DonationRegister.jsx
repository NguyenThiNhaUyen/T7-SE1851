import React, { useState } from "react";
import {
  Typography,
  DatePicker,
  Card,
  Button,
  Divider,
  message,
  Select,
  Row,
  Col,
  Space,
} from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const generateSlots = () => {
  const slots = [];
  for (let hour = 7; hour <= 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

const DonationRegister = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const slots = generateSlots();

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot || !selectedLocation) {
      message.warning("Vui lòng chọn đầy đủ thông tin.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        date: selectedDate.format("YYYY-MM-DD"),
        time: selectedSlot,
        location: selectedLocation,
      };
      await axios.post("/api/registrations/create", payload);
      message.success("✅ Đăng ký hiến máu thành công!");
      setSelectedDate(null);
      setSelectedSlot(null);
      setSelectedLocation(null);
    } catch (err) {
      message.error("❌ Đăng ký thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        padding: "24px 0",
        minHeight: "calc(100vh - 64px)",
        overflowX: "hidden", // ✅ CHẶN DƯ SCROLL NGANG
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
        <Card bordered={false} className="shadow-md rounded-xl">
          <Title level={3}>
            <ScheduleOutlined /> Đăng ký hiến máu
          </Title>
          <Text type="secondary">
            Vui lòng chọn ngày và giờ phù hợp để tham gia hiến máu
          </Text>
          <Divider />

          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <div>
              <Text strong>📍 Chọn địa điểm hiến máu</Text>
              <Select
                style={{ width: "100%", marginTop: 8 }}
                placeholder="VD: FPTU"
                value={selectedLocation}
                onChange={(value) => setSelectedLocation(value)}
              >
                <Option value="FPTU Campus">FPTU Campus</Option>
              </Select>
            </div>

            <div>
              <Text strong>📅 Chọn ngày</Text>
              <DatePicker
                style={{ width: "100%", marginTop: 8 }}
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>

            <div>
              <Text strong>🕒 Chọn khung giờ</Text>
              <div
                style={{
                  maxHeight: 220,
                  padding: 4,
                  border: "1px solid #eee",
                  borderRadius: 8,
                  overflowX: "hidden", // 👈 nếu dài thì cuộn theo chiều dọc
                }}
              >
                <Row gutter={[8, 8]} wrap justify="start">
                  {slots.map((slot) => (
                    <Col key={slot} span={6} sm={4} xs={6}>
                      <Button
                        block
                        size="middle"
                        type={selectedSlot === slot ? "primary" : "default"}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={loading}
              disabled={!selectedDate || !selectedSlot || !selectedLocation}
            >
              Gửi đăng ký
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default DonationRegister;
