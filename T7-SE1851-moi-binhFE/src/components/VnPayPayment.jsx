import React, { useState, useEffect } from "react";
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

const VnPayPayment = ({ request, selectedUnits = [] }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const user = AuthService.getCurrentUser();

  const pricePerMl = {
    "Hồng cầu": 2600,
    "Huyết tương": 1400,
    "Tiểu cầu": 4800,
  };

  const SUPPORT_DEVICE_FEE = 200000;
  const BHYT_DISCOUNT_PERCENT = 0.8;

  const calculateAmount = (units, bhyt, thietBi) => {
    const basePrice = units.reduce((sum, unit) => {
      const price = pricePerMl[unit.componentName] || 0;
      return sum + price * (unit.quantityMl || unit.volume || 0);
    }, 0);

    let total = basePrice;
    if (thietBi) total += SUPPORT_DEVICE_FEE;
    if (bhyt) total *= (1 - BHYT_DISCOUNT_PERCENT);

    return Math.round(total);
  };

  const updateAmount = () => {
    const values = form.getFieldsValue();
    const amount = calculateAmount(selectedUnits, values.bhyt, values.thietBi);
    form.setFieldsValue({ amount });
  };

  useEffect(() => {
    updateAmount();
  }, [selectedUnits]);

  const handleValuesChange = () => {
    updateAmount();
  };

  const markUnitsAsUsed = async () => {
    const token = localStorage.getItem("token");
    for (const unit of selectedUnits) {
      try {
        await axios.put(`http://localhost:8080/api/blood-units/${unit.bloodUnitId}/mark-used`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`✅ Marked unit ${unit.bloodUnitId} as USED`);
      } catch (err) {
        console.error(`❌ Failed to mark unit ${unit.bloodUnitId} as USED`, err);
      }
    }
  };

  const handleSubmit = async (values) => {
    if (!user) {
      return message.error("Bạn cần đăng nhập để thực hiện thanh toán.");
    }

    try {
      setLoading(true);

      const payload = {
        user: { userId: user.userId },
        amount: values.amount,
        transactionCode: values.transactionCode,
        status: values.status,
        paymentTime: dayjs().toISOString(),
        bloodRequest: { id: request?.id },
        // bhyt: values.bhyt || false,
        // thietBi: values.thietBi || false,
      };

      await axios.post("http://localhost:8080/api/vnpay/create", payload, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      // ✅ Đánh dấu đơn vị máu là đã sử dụng
      await markUnitsAsUsed();

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
        <Col span={6}><img src="/images/momo.png" alt="momo" style={{ width: "100%" }} /></Col>
        <Col span={6}><img src="/images/atm.png" alt="atm" style={{ width: "100%" }} /></Col>
        <Col span={6}><img src="/images/vietqr.png" alt="vietqr" style={{ width: "100%" }} /></Col>
        <Col span={6}><img src="/images/momo-later.png" alt="momo later" style={{ width: "100%" }} /></Col>
      </Row>

      <Divider orientation="left">🩸 Các đơn vị máu đã chọn</Divider>
      {selectedUnits.length === 0 ? (
        <p style={{ color: "gray" }}>Không có đơn vị máu nào được chọn.</p>
      ) : (
        <ul style={{ paddingLeft: 20 }}>
          {selectedUnits.map((unit) => (
            <li key={unit.bloodUnitId}>
              ✅ <strong>{unit.unitCode || unit.bloodUnitCode}</strong> – {unit.bloodTypeName} / {unit.componentName} / {unit.quantityMl || unit.volume}ml
            </li>
          ))}
        </ul>
      )}

      <Divider orientation="left">🧾 Thông tin thanh toán</Divider>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        initialValues={{ status: "PENDING", thietBi: false, bhyt: false }}
      >
        <Form.Item label="Số tiền thanh toán" name="amount" rules={[{ required: true }]}>
          <InputNumber formatter={(value) => `${value} VNĐ`} style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item label="Mã giao dịch" name="transactionCode" rules={[{ required: true, message: "Nhập mã giao dịch" }]}>
          <Input placeholder="VD: VNP12345678" />
        </Form.Item>

        <Form.Item label="Trạng thái thanh toán" name="status" rules={[{ required: true }]}>
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
          <Button icon={<CreditCardOutlined />} type="primary" htmlType="submit" block loading={loading} disabled={selectedUnits.length === 0}>
            Xác nhận thanh toán
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default VnPayPayment;
