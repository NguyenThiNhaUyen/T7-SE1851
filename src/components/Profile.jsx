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
  message,
  Spin
} from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  HistoryOutlined,
  EditOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile from database
  const fetchUserProfile = async () => {
    try {
      setDataLoading(true);
      // Simulate API call to get user profile
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockProfile = {
        id: 1,
        username: "user123",
        cccd: "123456789012",
        full_name: "Nguyễn Văn An",
        dob: "1990-05-15",
        gender: "Male",
        bloodType: "O+",
        phone: "0901234567",
        address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
        lastDonation: "2024-01-15",
        recoveryTime: "90",
        avatar: null,
        createdAt: "2023-01-01",
        updatedAt: "2024-01-15"
      };

      setUserProfile(mockProfile);

      // Set form values
      form.setFieldsValue({
        username: mockProfile.username,
        cccd: mockProfile.cccd,
        full_name: mockProfile.full_name,
        dob: mockProfile.dob ? dayjs(mockProfile.dob) : null,
        gender: mockProfile.gender,
        bloodType: mockProfile.bloodType,
        phone: mockProfile.phone,
        address: mockProfile.address,
        lastDonation: mockProfile.lastDonation ? dayjs(mockProfile.lastDonation) : null,
        recoveryTime: mockProfile.recoveryTime
      });

    } catch (error) {
      console.error('Error fetching profile:', error);
      message.error("Không thể tải thông tin hồ sơ");
    } finally {
      setDataLoading(false);
    }
  };

  // Fetch donation history from database
  const fetchDonationHistory = async () => {
    try {
      // Simulate API call to get donation history
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockHistory = [
        {
          id: 1,
          date: '2024-01-15',
          location: 'Bệnh viện Chợ Rẫy',
          status: 'completed',
          volume: 350,
          bloodType: 'O+',
          notes: 'Hiến máu định kỳ'
        },
        {
          id: 2,
          date: '2023-10-20',
          location: 'Trung tâm Huyết học',
          status: 'completed',
          volume: 450,
          bloodType: 'O+',
          notes: 'Hiến máu cấp cứu'
        },
        {
          id: 3,
          date: '2023-07-12',
          location: 'Bệnh viện Đại học Y Dược',
          status: 'completed',
          volume: 350,
          bloodType: 'O+',
          notes: 'Hiến máu tình nguyện'
        }
      ];

      setHistory(mockHistory);
    } catch (error) {
      console.error('Error fetching history:', error);
      message.error("Không thể tải lịch sử hiến máu");
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchDonationHistory();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Prepare data for API
      const updateData = {
        full_name: values.full_name,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
        gender: values.gender,
        bloodType: values.bloodType,
        phone: values.phone,
        address: values.address,
        lastDonation: values.lastDonation ? values.lastDonation.format('YYYY-MM-DD') : null,
        recoveryTime: values.recoveryTime
      };

      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update local state
      setUserProfile(prev => ({
        ...prev,
        ...updateData,
        dob: updateData.dob,
        lastDonation: updateData.lastDonation,
        updatedAt: new Date().toISOString()
      }));

      message.success("Cập nhật hồ sơ thành công!");
      setIsEditing(false);

    } catch (error) {
      console.error('Error updating profile:', error);
      message.error("Có lỗi xảy ra khi cập nhật hồ sơ. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      form.setFieldsValue({
        username: userProfile.username,
        cccd: userProfile.cccd,
        full_name: userProfile.full_name,
        dob: userProfile.dob ? dayjs(userProfile.dob) : null,
        gender: userProfile.gender,
        bloodType: userProfile.bloodType,
        phone: userProfile.phone,
        address: userProfile.address,
        lastDonation: userProfile.lastDonation ? dayjs(userProfile.lastDonation) : null,
        recoveryTime: userProfile.recoveryTime
      });
    }
    setIsEditing(false);
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
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'processing';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'pending': return 'Đang chờ';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  if (dataLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="regis-fullpage" style={{ padding: '20px', minHeight: '100vh' }}>
      <Row gutter={[32, 32]} justify="center">
        {/* Profile Form */}
        <Col xs={24} lg={12} xl={10}>
          <Card
            title={
              <Space>
                <UserOutlined style={{ color: '#771813' }} />
                <span style={{ color: '#771813' }}>Hồ sơ cá nhân</span>
              </Space>
            }
            extra={
              !isEditing ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setIsEditing(true)}
                  style={{
                    background: 'linear-gradient(to right, #771813, #DD2D24)',
                    border: 'none'
                  }}
                >
                  Chỉnh sửa
                </Button>
              ) : null
            }
            style={{
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(119, 24, 19, 0.15)'
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Avatar src="/donor.png" icon={<UserOutlined />} className="profile-img-card" />
                <Title level={4} style={{ color: '#771813', margin: 0 }}>
                  {userProfile?.full_name || 'Người dùng'}
                </Title>
                <Text type="secondary">
                  Thành viên từ {userProfile?.createdAt ? dayjs(userProfile.createdAt).format('DD/MM/YYYY') : 'N/A'}
                </Text>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                size="large"
                disabled={!isEditing}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="username"
                      label="Tên đăng nhập"
                    >
                      <Input
                        prefix={<UserOutlined style={{ color: '#999' }} />}
                        disabled
                        style={{ backgroundColor: '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="cccd"
                      label="CCCD/CMND"
                    >
                      <Input
                        prefix={<IdcardOutlined style={{ color: '#999' }} />}
                        disabled
                        style={{ backgroundColor: '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="full_name"
                      label="Họ và tên"
                      rules={[
                        { required: true, message: 'Vui lòng nhập họ và tên' },
                        { min: 2, message: 'Họ tên phải có ít nhất 2 ký tự' }
                      ]}
                    >
                      <Input
                        placeholder="Nhập họ và tên đầy đủ"
                        style={{ backgroundColor: isEditing ? '#fff' : '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="dob"
                      label="Ngày sinh"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                    >
                      <DatePicker
                        placeholder="Chọn ngày sinh"
                        style={{
                          width: '100%',
                          backgroundColor: isEditing ? '#fff' : '#f5f5f5'
                        }}
                        disabledDate={(current) =>
                          current && (current > dayjs().subtract(18, 'year') || current < dayjs('1900-01-01'))
                        }
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="gender"
                      label="Giới tính"
                      rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                    >
                      <Select
                        placeholder="Chọn giới tính"
                        style={{ backgroundColor: isEditing ? '#fff' : '#f5f5f5' }}
                      >
                        <Option value="Male">Nam</Option>
                        <Option value="Female">Nữ</Option>
                        <Option value="Other">Khác</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="bloodType"
                      label="Nhóm máu"
                      rules={[{ required: true, message: 'Vui lòng chọn nhóm máu' }]}
                    >
                      <Select
                        placeholder="Chọn nhóm máu"
                        style={{ backgroundColor: isEditing ? '#fff' : '#f5f5f5' }}
                      >
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
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined style={{ color: '#999' }} />}
                        placeholder="Nhập số điện thoại"
                        style={{ backgroundColor: isEditing ? '#fff' : '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="address"
                      label="Địa chỉ"
                      rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                      <Input
                        prefix={<HomeOutlined style={{ color: '#999' }} />}
                        placeholder="Nhập địa chỉ đầy đủ"
                        style={{ backgroundColor: isEditing ? '#fff' : '#f5f5f5' }}
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
                        style={{
                          width: '100%',
                          backgroundColor: isEditing ? '#fff' : '#f5f5f5'
                        }}
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
                        style={{ backgroundColor: isEditing ? '#fff' : '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {isEditing && (
                  <Form.Item>
                    <Space style={{ width: '100%' }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{
                          flex: 1,
                          height: '48px',
                          background: 'linear-gradient(to right, #771813, #DD2D24)',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '500'
                        }}
                      >
                        Lưu thay đổi
                      </Button>
                      <Button
                        onClick={handleCancel}
                        style={{
                          flex: 1,
                          height: '48px',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      >
                        Hủy
                      </Button>
                    </Space>
                  </Form.Item>
                )}
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
                <span style={{ color: '#771813' }}>Lịch sử hiến máu</span>
              </Space>
            }
            extra={
              <Text type="secondary">
                Tổng cộng: {history.length} lần
              </Text>
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
                        <Space direction="vertical" size="small">
                          <Space>
                            <ClockCircleOutlined style={{ color: '#999' }} />
                            <Text type="secondary">
                              {dayjs(item.date).format('DD/MM/YYYY')}
                            </Text>
                          </Space>
                          <Space>
                            <Text type="secondary">
                              Thể tích: {item.volume}ml
                            </Text>
                            <Divider type="vertical" />
                            <Text type="secondary">
                              Nhóm máu: {item.bloodType}
                            </Text>
                          </Space>
                          {item.notes && (
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {item.notes}
                            </Text>
                          )}
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