import React, { useState, useEffect } from "react";
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
import AuthService from "../services/auth.service";
import { getAuthHeader } from "../services/user.service";

const { Title, Text } = Typography;
const { Option } = Select;

const API_BASE = "http://localhost:8080"; // Hoặc dùng proxy nếu có

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
  const [availableSlots, setAvailableSlots] = useState({});
  const currentUser = AuthService.getCurrentUser();
  const slots = generateSlots();

  // ✅ Fetch slot còn chỗ theo ngày (đúng API)
  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`${API_BASE}/api/slots/by-date?date=${selectedDate.format("YYYY-MM-DD")}`, {
          headers: getAuthHeader(),
        })
        .then((res) => {
          const available = {};
          res.data?.data?.forEach((slot) => {
            available[slot.time] = slot.availableCapacity > 0;
          });
          setAvailableSlots(available);
        })
        .catch(() => {
          setAvailableSlots({});
        });
    }
  }, [selectedDate]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot || !selectedLocation) {
      message.warning("Vui lòng chọn đầy đủ thông tin.");
      return;
    }

    if (!currentUser || !currentUser.userId) {
      message.error("Vui lòng đăng nhập trước khi đăng ký.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        scheduledDate: selectedDate.format("YYYY-MM-DD"),
        location: selectedLocation,
        // 👇 Bổ sung thêm các trường nếu BE yêu cầu (vd: bloodType, fullName, phone,...)
      };
      await axios.post(
        `${API_BASE}/api/slots/register/${currentUser.userId}`,
        payload,
        { headers: getAuthHeader() }
      );
      message.success("✅ Đăng ký hiến máu thành công!");
      setSelectedDate(null);
      setSelectedSlot(null);
      setSelectedLocation(null);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Đăng ký thất bại.";
      message.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card
        style={{ width: "100%", maxWidth: 800 }}
        bordered={false}
        className="shadow-md rounded-xl"
      >
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
              placeholder="VD: BV Chợ Rẫy, TP.HCM"
              value={selectedLocation}
              onChange={(value) => setSelectedLocation(value)}
            >
              <Option value="BV Chợ Rẫy">BV Chợ Rẫy</Option>
              <Option value="BV Huyết học TP.HCM">BV Huyết học TP.HCM</Option>
              <Option value="FPTU Campus">FPTU Campus</Option>
            </Select>
          </div>

          <div>
            <Text strong>📅 Chọn ngày</Text>
            <DatePicker
              style={{ width: "100%", marginTop: 8 }}
              value={selectedDate}
              onChange={setSelectedDate}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </div>

          <div>
            <Text strong>🕒 Chọn khung giờ</Text>
            <div
              className="overflow-x-auto"
              style={{
                maxHeight: 220,
                padding: 4,
                border: "1px solid #eee",
                borderRadius: 8,
              }}
            >
              <Row gutter={[8, 8]} wrap>
                {slots.map((slot) => {
                  const isAvailable =
                    availableSlots?.[slot] === true || !selectedDate;
                  return (
                    <Col key={slot} span={6} sm={4}>
                      <Button
                        block
                        size="middle"
                        type={selectedSlot === slot ? "primary" : "default"}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </Button>
                    </Col>
                  );
                })}
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
  );
};

export default DonationRegister;
