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
  Input,
  Space,
} from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import AuthService from "../services/auth.service";
import { getAuthHeader } from "../services/user.service";

const { Title, Text } = Typography;
const { Option } = Select;

const API_BASE = "http://localhost:8080";

const generateSlots = () => {
  const slots = [];
  for (let hour = 7; hour <= 20; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};
const checkSlotFull = async (date, slotId) => {
  try {
    const res = await axios.get(
      `${API_BASE}/api/donation/check-slot`,
      {
        params: {
          date: date.format("YYYY-MM-DD"),
          slot_id: slotId,
        },
        headers: getAuthHeader(),
      }
    );
    return res.data === true;
  } catch {
    return true; // mặc định là full nếu lỗi
  }
};

const DonationRegister = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null); // slot.time
  const [selectedSlotId, setSelectedSlotId] = useState(null); // slot.slotId
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState({});
  const currentUser = AuthService.getCurrentUser();
  const slots = generateSlots();

  useEffect(() => {
  const fetchSlotsStatus = async () => {
    if (!selectedDate) return;

    const updated = {};
    await Promise.all(
      slots.map(async (time) => {
        const slotId = slotIdMap[time];
        if (!slotId) return;

        try {
          const res = await axios.get(`${API_BASE}/api/donation/check-slot`, {
            params: {
              date: selectedDate.format("YYYY-MM-DD"),
              slot_id: slotId,
            },
            headers: getAuthHeader(),
          });

          updated[time] = {
            available: res.data === false,
            slotId: slotId,
          };
        } catch {
          updated[time] = {
            available: false,
            slotId: slotId,
          };
        }
      })
    );

    setAvailableSlots(updated);
  };

  fetchSlotsStatus();
}, [selectedDate]);

const slotIdMap = {
  "07:00": 1,
  "07:30": 2,
  "08:00": 3,
  "08:30": 4,
  "09:00": 5,
  "09:30": 6,
  "10:00": 7,
  "10:30": 8,
  "11:00": 9,
  "11:30": 10,
  "12:00": 11,
  "12:30": 12,
  "13:00": 13,
  "13:30": 14,
  "14:00": 15,
  "14:30": 16,
  "15:00": 17,
  "15:30": 18,
  "16:00": 19,
  "16:30": 20,
  "17:00": 21,
  "17:30": 22,
  "18:00": 23,
  "18:30": 24,
  "19:00": 25,
  "19:30": 26,
  "20:00": 27,
  "20:30": 28,
};

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot || !selectedSlotId || !selectedLocation) {
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
  readyDate: dayjs().format("YYYY-MM-DD"), // thêm dòng này
  slotId: selectedSlotId,
  location: selectedLocation,
};

      await axios.post(
        `${API_BASE}/api/donation/register/${currentUser.userId}`,
        payload,
        { headers: getAuthHeader() }
      );
      message.success("✅ Đăng ký hiến máu thành công!");
      setSelectedDate(null);
      setSelectedSlot(null);
      setSelectedSlotId(null);
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
      <Card style={{ width: "100%", maxWidth: 800 }} bordered={false} className="shadow-md rounded-xl">
        <Title level={3}>
          <ScheduleOutlined /> Đăng ký hiến máu
        </Title>
        <Text type="secondary">
          Vui lòng chọn ngày và giờ phù hợp để tham gia hiến máu
        </Text>
        <Divider />
        <Space direction="vertical" style={{ width: "100%" }} size="large">

<div>
  <Text strong>📍 Địa điểm hiến máu</Text>
  <Input
    value="FPTU Campus"
    readOnly
    style={{ width: "100%", marginTop: 8 }}
  />
</div>

          <div>
            <Text strong>📅 Chọn ngày</Text>
            <DatePicker
              style={{ width: "100%", marginTop: 8 }}
              value={selectedDate}
              onChange={setSelectedDate}
              disabledDate={(current) => current && current < dayjs().startOf("day")}
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
                  const slotData = availableSlots?.[slot];
                  const isAvailable = slotData?.available;
                  return (
                    <Col key={slot} span={6} sm={4}>
                      <Button
                        block
                        size="middle"
                        type={selectedSlot === slot ? "primary" : "default"}
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setSelectedSlotId(slotData?.slotId || null);
                        }}
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
