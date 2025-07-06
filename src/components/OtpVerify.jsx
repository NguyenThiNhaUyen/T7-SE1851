import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Avatar,
  message
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { InputOTP } from 'antd-input-otp';


const { Title, Text } = Typography;

const OtpVerify = () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(60);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("recoveryEmail");
    if (email) {
      setRecoveryEmail(maskEmail(email));
    }
  }, []);

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (values) => {
    const { otp } = values;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success("Xác thực thành công!");
      window.location.href = "/change-password";
    } catch (error) {
      message.error("Mã OTP không chính xác");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setCountdown(60);
      form.resetFields();
      message.success("Mã OTP mới đã được gửi!");
    } catch (error) {
      message.error("Không thể gửi lại mã OTP");
    }
  };

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    const maskedName = name[0] + "*".repeat(Math.max(0, name.length - 2)) + (name.length > 1 ? name[name.length - 1] : "");
    const domainParts = domain.split(".");
    const maskedDomain = domainParts[0][0] + "*".repeat(Math.max(0, domainParts[0].length - 1)) + "." + domainParts.slice(1).join(".");
    return maskedName + "@" + maskedDomain;
  };

  return (
    <div className="regis-fullpage">
      <div className="form-wrapper" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '30px'
      }}>
        <Card className="login-card" bodyStyle={{ padding: 40 }} style={{ maxWidth: 600, width: '100%' }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div className="login-header">
              <Avatar
                src="/donor.png"
                icon={<UserOutlined />}
                className="profile-img-card"
              />
              <Title level={3} style={{ color: '#771813', marginBottom: '8px' }}>
                Xác thực OTP
              </Title>
              <Space direction="vertical" size="small">
                <Text type="secondary">
                  Nhập mã xác thực đã được gửi đến địa chỉ
                </Text>
                <Space>
                  <MailOutlined style={{ color: '#771813' }} />
                  <Text strong style={{ color: '#771813' }}>
                    {recoveryEmail}
                  </Text>
                </Space>
              </Space>
            </div>

            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="otp"
                label={<span>Mã OTP<span className="required"></span></span>}
                rules={[
                  { required: true, message: "Vui lòng nhập mã OTP!" },
                  { len: 6, message: "Mã OTP phải có đúng 6 số!" },
                  { pattern: /^\d+$/, message: "Mã OTP chỉ được chứa số!" }
                ]}
              >
                <Input.OTP
                  length={6}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="btn-gradient"
                >
                  Tiếp tục
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center' }}>
              <Button
                type="link"
                disabled={countdown > 0}
                onClick={handleResendOTP}
                style={{
                  color: countdown > 0 ? '#999' : '#771813',
                  padding: 0,
                  height: 'auto'
                }}
              >
                <Space>
                  <ClockCircleOutlined />
                  {countdown > 0 ? `Gửi lại mã OTP (${countdown}s)` : 'Gửi lại mã OTP'}
                </Space>
              </Button>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default OtpVerify;