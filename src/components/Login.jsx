import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/Login.css"; 
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Avatar,
  Row,
  Col,
  message
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  HeartOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await AuthService.login(values.username, values.password);
      localStorage.setItem("user", JSON.stringify(res));
      message.success("Đăng nhập thành công!");
      setTimeout(() => {
        if (res.role === "ADMIN") navigate("/admin");
        else if (res.role === "STAFF") navigate("/staff");
        else navigate(`/user/${res.userId}`);
      }, 800);
    } catch (err) {
      message.error(err.response?.data?.message || "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-fullpage">
      <Row className="login-row">
        {/* Hero bên trái */}
        <Col xs={0} md={12} lg={14} xl={12} className="hero-col">
          <div className="hero-inner">
            <Space direction="vertical" size="large">
              <div className="hero-header">
                <HeartOutlined className="hero-icon" />
                <Title level={2} className="hero-title">
                  Hiến máu - Hành động nhỏ, ý nghĩa lớn
                </Title>
              </div>
              <Paragraph className="hero-desc">
                Ở Việt Nam, cứ mỗi <Text strong className="highlight">2 giây</Text> lại có một người cần truyền máu.<br/>
                Sự đóng góp của bạn thật sự quan trọng!<br/>
                Hãy tiếp tục đồng hành cùng mạng lưới hiến máu toàn quốc.
              </Paragraph>
            </Space>
          </div>
        </Col>

        {/* Form bên phải */}
        <Col xs={24} md={12} lg={10} xl={12} className="form-col">
          <div className="form-wrapper">
            <Card className="login-card" styles={{ body: { padding: 16 } }}>
              <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div className="login-header">
                  <Avatar src="/donor.png" icon={<UserOutlined />} className="profile-img-card" />
                  <Title level={3} className="login-title">Đăng nhập</Title>
                  <Text type="secondary">Chào mừng bạn trở lại!</Text>
                </div>

                <Form form={form} onFinish={handleLogin} layout="vertical" size="large">
                  <Form.Item
                    name="username"
                    label={<span>Username <span className="required">*</span></span>}
                    rules={[{ required: true, message: "Vui lòng nhập username!" }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Nhập username" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={<span>Password <span className="required">*</span></span>}
                    rules={[
                      { required: true, message: "Vui lòng nhập password!" },
                      { min: 6, message: "Password phải từ 6 ký tự trở lên!" }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Nhập password"
                      iconRender={vis => vis ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                    />
                  </Form.Item>

                  <div className="forgot-wrapper">
                    <Button type="link" className="login-link" onClick={() => navigate("/forgot")}>
                      Bạn quên mật khẩu?
                    </Button>
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      className="btn-gradient"
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>

                  <div className="register-wrapper">
                    <Text type="secondary">Chưa có tài khoản? </Text>
                    <Button type="link" className="login-link" onClick={() => navigate("/register")}>
                      Đăng ký ngay
                    </Button>
                  </div>
                </Form>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
