import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Typography,
  Select,
  Divider,
  Row,
  Col,
  Checkbox,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import AuthService from "../services/auth.service";
import { CreditCardOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const VnPayPayment = ({ request }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const user = AuthService.getCurrentUser();

  const handleSubmit = async (values) => {
    if (!user) {
      return message.error("Bạn cần đăng nhập để thực hiện thanh toán.");
    }

    try {
      setLoading(true);
      const payload = {
        userId: user.userId,
        amount: values.amount,
        transactionCode: values.transactionCode,
        status: values.status,
        paymentTime: dayjs().toISOString(),
        bloodRequestId: request?.id || null,
        thietBi: values.thietBi || false,
        bhyt: values.bhyt || false,
      };

      await axios.post("http://localhost:8080/api/vnpay/create", payload, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      message.success("✅ Thanh toán thành công!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("❌ Thanh toán thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 800, margin: "auto", marginTop: 30 }}>
      <Title level={3} style={{ marginBottom: 20 }}>
        💳 Thanh toán
      </Title>

      <Divider orientation="left">HÌNH THỨC THANH TOÁN</Divider>
      <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
        <Col span={6}>
          <img src="/images/momo.png" alt="momo" style={{ width: "100%" }} />
        </Col>
        <Col span={6}>
          <img src="/images/atm.png" alt="atm" style={{ width: "100%" }} />
        </Col>
        <Col span={6}>
          <img src="/images/vietqr.png" alt="vietqr" style={{ width: "100%" }} />
        </Col>
        <Col span={6}>
          <img src="/images/momo-later.png" alt="momo later" style={{ width: "100%" }} />
        </Col>
      </Row>

      <Divider orientation="left">🧾 Thanh toán yêu cầu máu</Divider>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ status: "PENDING", thietBi: false, bhyt: false }}
      >
        <Form.Item
          label="Số tiền thanh toán"
          name="amount"
          rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
        >
          <InputNumber
            min={1}
            formatter={(value) => `${value} VNĐ`}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Mã giao dịch"
          name="transactionCode"
          rules={[{ required: true, message: "Nhập mã giao dịch" }]}
        >
          <Input placeholder="VD: VNP12345678" />
        </Form.Item>

        <Form.Item
          label="Trạng thái thanh toán"
          name="status"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="PENDING">Đang xử lý</Option>
            <Option value="SUCCESS">Thành công</Option>
            <Option value="FAILED">Thất bại</Option>
          </Select>
        </Form.Item>

        <Form.Item name="thietBi" valuePropName="checked">
          <Checkbox>Có sử dụng thiết bị hỗ trợ</Checkbox>
        </Form.Item>

        <Form.Item name="bhyt" valuePropName="checked">
          <Checkbox>Có BHYT</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            icon={<CreditCardOutlined />}
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Xác nhận thanh toán
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VnPayPayment;
