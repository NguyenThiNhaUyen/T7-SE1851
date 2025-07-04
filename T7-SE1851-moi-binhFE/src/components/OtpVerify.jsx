import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Space, message, Card } from "antd";
import { MailOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
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

  const handleChange = (value) => {
    // Chỉ cho phép số và giới hạn 6 ký tự
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      message.error("Vui lòng nhập đầy đủ 6 số");
      return;
    }

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
      setOtp("");
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
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <div>
            <img
              src="/donor.png"
              alt="profile-img"
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

          <div style={{ margin: '24px 0' }}>
            <Input.OTP
              length={6}
              size="large"
              value={otp}
              onChange={handleChange}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px'
              }}
            />
          </div>

          <Button
            type="primary"
            size="large"
            block
            loading={loading}
            disabled={otp.length !== 6}
            onClick={handleSubmit}
            style={{
              height: '48px',
              background: 'linear-gradient(to right, #771813, #DD2D24)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Tiếp tục
          </Button>

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
  );
};

export default OtpVerify;