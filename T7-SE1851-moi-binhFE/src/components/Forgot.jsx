import React, { useState } from "react";
import { Input, Button, Typography, Space, message, Card, Form } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { email } = values;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("recoveryEmail", email);
      message.success("Mã OTP đã được gửi đến email của bạn!");
      
      setTimeout(() => {
        window.location.href = "/verify-otp";
      }, 1500);
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="change-fullpage">
      <Card 
        className="change-box"
        style={{ 
          maxWidth: 500, 
          padding: '20px',
          boxShadow: '0 8px 32px rgba(119, 24, 19, 0.15)',
          borderRadius: '16px'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <img
              src="/donor.png"
              alt="profile-img"
              className="profile-img-card"
            />
            <Title level={3} style={{ color: '#771813', marginBottom: '8px' }}>
              Đặt lại mật khẩu
            </Title>
            <Text type="secondary">
              Nhập địa chỉ email để nhận mã xác thực
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
          >
            <Form.Item
              name="email"
              label={
                <span>
                  Email <span style={{ color: 'red' }}>*</span>
                </span>
              }
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: '#999' }} />}
                placeholder="Nhập địa chỉ email của bạn"
                style={{
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: '16px' }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{
                  height: '48px',
                  background: 'linear-gradient(to right, #771813, #DD2D24)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                Gửi mã xác thực
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Button
                type="link"
                icon={<ArrowLeftOutlined />}
                onClick={handleBackToLogin}
                style={{ 
                  color: '#771813',
                  padding: 0,
                  height: 'auto'
                }}
              >
                Quay lại đăng nhập
              </Button>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Forgot;