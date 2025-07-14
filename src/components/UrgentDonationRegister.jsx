import React, { useEffect, useState } from "react";
import {
  Form, Input, Button, Card, message, Select, DatePicker,
  Typography, Divider, Row, Col
} from "antd";
import axios from "axios";
import AuthService from "../services/auth.service";
import dayjs from "dayjs";
import { HeartOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const UrgentDonationRegister = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      form.setFieldsValue({
        userId: user.userId,
        fullName: `${user.first_name || ""} ${user.last_name || ""}`,
        phone: user.phone || "",
        bloodTypeId: user.blood_type_id || 1,
        dob: user.dob ? dayjs(user.dob) : null,
        gender: user.gender || "OTHER",
      });
    }
  }, [form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        dob: values.dob.format("YYYY-MM-DD"),
        addressRequest: {
          city: values.city,
          district: values.district,
          ward: values.ward,
          detail: values.detail,
        },
      };
      await axios.post("/api/urgent-donors", payload);
      message.success("✅ Đăng ký hiến máu khẩn cấp thành công!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("❌ Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={
        <Title level={3} style={{ margin: 0 }}>
          <HeartOutlined style={{ color: "#f44336", marginRight: 8 }} />
          Đăng ký hiến máu khẩn cấp
        </Title>
      }
      style={{ maxWidth: 950, margin: "auto", marginTop: 30 }}
      bordered
    >
      <Text type="secondary">
        Hãy điền thông tin chính xác để chúng tôi có thể liên hệ và điều phối kịp thời trong các tình huống khẩn cấp.
      </Text>

      <Divider />

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {/* HIDDEN */}
        <Form.Item name="userId" hidden><Input type="hidden" /></Form.Item>
        <Form.Item name="bloodTypeId" hidden><Input type="hidden" /></Form.Item>

        <Row gutter={24}>
          {/* CỘT 1: Thông tin người hiến */}
          <Col xs={24} md={12}>
            <Title level={4}>1. Thông tin người hiến</Title>

            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nhập họ và tên của bạn" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                { pattern: /^\d{9,11}$/, message: "Số điện thoại không hợp lệ" }
              ]}
            >
              <Input placeholder="Ví dụ: 0912345678" />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Chọn giới tính" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Option value="MALE">Nam</Option>
                <Option value="FEMALE">Nữ</Option>
                <Option value="OTHER">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="dob"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* CỘT 2: Thông tin địa điểm */}
          <Col xs={24} md={12}>
            <Title level={4}>2. Địa điểm hiện tại</Title>

            <Form.Item
              label="Bạn đang ở đâu? (ghi rõ địa điểm hiện tại)"
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập địa điểm cụ thể" }]}
            >
              <Input placeholder="VD: Gần BV 115, Quận 10" />
            </Form.Item>

            <Form.Item label="Địa chỉ hành chính">
              <Input.Group compact>
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: "Nhập tỉnh/thành phố" }]}
                  style={{ width: "32%", marginRight: "2%" }}
                >
                  <Input placeholder="Tỉnh/TP" />
                </Form.Item>
                <Form.Item
                  name="district"
                  rules={[{ required: true, message: "Nhập quận/huyện" }]}
                  style={{ width: "32%", marginRight: "2%" }}
                >
                  <Input placeholder="Quận/Huyện" />
                </Form.Item>
                <Form.Item
                  name="ward"
                  rules={[{ required: true, message: "Nhập phường/xã" }]}
                  style={{ width: "32%" }}
                >
                  <Input placeholder="Phường/Xã" />
                </Form.Item>
              </Input.Group>
              <Form.Item
                name="detail"
                rules={[{ required: true, message: "Nhập địa chỉ cụ thể" }]}
              >
                <Input placeholder="Số nhà, tên đường, hẻm nếu có..." />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ backgroundColor: "#f44336", borderColor: "#f44336" }}
          >
            🚑 Gửi đăng ký hiến máu khẩn cấp
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UrgentDonationRegister;
