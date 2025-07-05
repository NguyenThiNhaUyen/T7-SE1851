import React, { useState } from "react";
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
  ArrowLeftOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Forgot = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
              <Title level={3} className="login-title">Đặt lại mật khẩu</Title>
              <Text type="secondary">
                Nhập địa chỉ email để nhận mã xác thực
              </Text>
            </div>

            <Form 
              form={form} 
              onFinish={handleSubmit} 
              layout="vertical" 
              size="large"
            >
              <Form.Item
                name="email"
                label={<span>Email <span className="required">*</span></span>}
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" }
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Nhập địa chỉ email của bạn"
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
                  Gửi mã xác thực
                </Button>
              </Form.Item>
            </Form>

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
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Forgot;