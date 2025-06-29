import React, { useState, useEffect } from "react";
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Card, 
  Row, 
  Col, 
  Avatar, 
  Typography, 
  Space,
  Empty,
  List,
  Tag,
  Divider,
  message
} from "antd";
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined,
  CalendarOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  HistoryOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [history, setHistory] = useState([]);

  // Mock data for history
  const mockHistory = [
    { id: 1, date: '2024-01-15', location: 'Bệnh viện Chợ Rẫy', status: 'completed' },
    { id: 2, date: '2023-10-20', location: 'Trung tâm Huyết học', status: 'completed' },
    { id: 3, date: '2023-07-12', location: 'Bệnh viện Đại học Y Dược', status: 'completed' }
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const initData = {
        username: storedUser.username,
        email: storedUser.email,
        firstName: "",
        lastName: "",
        dob: null,
        gender: "",
        bloodType: "",
        phone: "",
        address: "",
        lastDonation: null,
        recoveryTime: ""
      };
      
      form.setFieldsValue(initData);
      setInitialValues(initData);
      // Simulate loading history
      setHistory(mockHistory);
    }
  }, [form]);

  const handleSubmit = async (values) => {
    // Convert dayjs objects to strings for comparison
    const processedValues = {
      ...values,
      dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
      lastDonation: values.lastDonation ? values.lastDonation.format('YYYY-MM-DD') : null
    };

    const processedInitial = {
      ...initialValues,
      dob: initialValues.dob ? dayjs(initialValues.dob).format('YYYY-MM-DD') : null,
      lastDonation: initialValues.lastDonation ? dayjs(initialValues.lastDonation).format('YYYY-MM-DD') : null
    };

    if (JSON.stringify(processedValues) === JSON.stringify(processedInitial)) {
      message.warning("Không có thay đổi để lưu");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success("Hồ sơ đã được cập nhật thành công!");
      setInitialValues(processedValues);
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  const bloodTypeOptions = [
    { value: 'A+', label: 'A+', color: '#f50' },
    { value: 'A-', label: 'A-', color: '#2db7f5' },
    { value: 'B+', label: 'B+', color: '#87d068' },
    { value: 'B-', label: 'B-', color: '#108ee9' },
    { value: 'AB+', label: 'AB+', color: '#f50' },
    { value: 'AB-', label: 'AB-', color: '#2db7f5' },
    { value: 'O+', label: 'O+', color: '#87d068' },
    { value: 'O-', label: 'O-', color: '#108ee9' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'pending': return 'processing';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Hoàn thành';
      case 'pending': return 'Đang chờ';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="regis-fullpage" style={{ padding: '20px', minHeight: '100vh' }}>
      <Row gutter={[32, 32]} justify="center">
        {/* Profile Form */}
        <Col xs={24} lg={12} xl={10}>
          <Card
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(119, 24, 19, 0.15)'
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <Avatar
                  src="/donor.png"
                  icon={<UserOutlined />}
                  className="profile-img-card"
                />
                <Title level={3} style={{ color: '#771813', margin: 0 }}>
                  Hồ sơ cá nhân
                </Title>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
              >
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="username"
                      label="Username"
                    >
                      <Input
                        prefix={<UserOutlined style={{ color: '#999' }} />}
                        disabled
                        style={{ backgroundColor: '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="email"
                      label="Email"
                    >
                      <Input
                        prefix={<MailOutlined style={{ color: '#999' }} />}
                        disabled
                        style={{ backgroundColor: '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Họ"
                    >
                      <Input placeholder="Nhập họ" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="Tên"
                    >
                      <Input placeholder="Nhập tên" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="dob"
                      label="Ngày sinh"
                    >
                      <DatePicker
                        placeholder="Chọn ngày sinh"
                        style={{ width: '100%' }}
                        disabledDate={(current) => 
                          current && (current > dayjs() || current < dayjs('1900-01-01'))
                        }
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="Giới tính"
                    >
                      <Select placeholder="Chọn giới tính">
                        <Option value="Male">Nam</Option>
                        <Option value="Female">Nữ</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="bloodType"
                      label="Nhóm máu"
                    >
                      <Select placeholder="Chọn nhóm máu">
                        {bloodTypeOptions.map(option => (
                          <Option key={option.value} value={option.value}>
                            <Space>
                              <Tag color={option.color}>{option.label}</Tag>
                            </Space>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[
                        { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined style={{ color: '#999' }} />}
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="address"
                      label="Địa chỉ"
                    >
                      <Input
                        prefix={<HomeOutlined style={{ color: '#999' }} />}
                        placeholder="Nhập địa chỉ"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="lastDonation"
                      label="Ngày hiến máu gần nhất"
                    >
                      <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: '100%' }}
                        disabledDate={(current) => 
                          current && (current > dayjs() || current < dayjs('1900-01-01'))
                        }
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="recoveryTime"
                      label="Thời gian hồi phục (ngày)"
                    >
                      <Input
                        type="number"
                        min={0}
                        max={365}
                        placeholder="Số ngày"
                        suffix="ngày"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    size="large"
                    style={{
                      height: '48px',
                      background: 'linear-gradient(to right, #771813, #DD2D24)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    Cập nhật hồ sơ
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Card>
        </Col>

        {/* History Section */}
        <Col xs={24} lg={12} xl={10}>
          <Card
            title={
              <Space>
                <HistoryOutlined style={{ color: '#771813' }} />
                <span style={{ color: '#771813' }}>Lịch sử đăng ký hiến máu</span>
              </Space>
            }
            style={{ 
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(119, 24, 19, 0.15)'
            }}
          >
            {history.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Space direction="vertical">
                    <Text type="secondary">Chưa có lịch sử hiến máu</Text>
                    <Button
                      type="primary"
                      icon={<HeartOutlined />}
                      style={{
                        background: 'linear-gradient(to right, #771813, #DD2D24)',
                        border: 'none'
                      }}
                      onClick={() => window.location.href = '/user/register'}
                    >
                      Đăng ký ngay
                    </Button>
                  </Space>
                }
              />
            ) : (
              <List
                dataSource={history}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: '#771813' }}
                          icon={<CalendarOutlined />}
                        />
                      }
                      title={
                        <Space>
                          <Text strong>{item.location}</Text>
                          <Tag color={getStatusColor(item.status)}>
                            {getStatusText(item.status)}
                          </Tag>
                        </Space>
                      }
                      description={
                        <Space>
                          <ClockCircleOutlined style={{ color: '#999' }} />
                          <Text type="secondary">
                            {dayjs(item.date).format('DD/MM/YYYY')}
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;