import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Input,
  Select,
  Button,
  Table,
  Tag,
  Space,
  Row,
  Col,
  Alert,
  Modal,
  Descriptions,
  Badge,
  Progress,
  Avatar,
  Typography,
  Divider,
  Form,
  Radio,
  Slider,
  Tooltip,
  message,
  Spin,
  Empty,
  Statistic
} from 'antd';
import {
  SearchOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  ReloadOutlined,
  FireOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ThunderboltOutlined,
  HourglassOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Sample data - trong thực tế sẽ lấy từ API
const mockData = [
  {
    key: '1',
    name: 'Nguyễn Văn Hùng',
    phone: '0987654321',
    bloodType: 'A+',
    location: 'PRC',
    city: 'Hồng Cầu (PRC)',
    distance: 2.4,
    availability: 'NOW',
    verified: true,
    donationCount: 15,
    lastDonate: '2025-06-12',
    recovery: 95,
    responseTime: '< 15 phút',
    note: 'Sẵn sàng 24/7',
    detail: {
      dob: '01/01/1990',
      gender: 'Nam',
      cccd: '123456789012',
      email: 'hungvn@gmail.com',
      address: '123 Lê Lợi, P. Bến Thành, Q.1, TP.HCM',
      job: 'Kỹ sư phần mềm',
      weight: '70 kg',
      height: '175 cm',
      medicalHistory: 'Không có tiền sử bệnh lý',
      lastHealthCheck: '2025-06-01',
      emergencyContact: '0987654322 (Người thân)',
    },
  },
  {
    key: '2',
    name: 'Lê Thị Hồng',
    phone: '0909123456',
    bloodType: 'O-',
    location: 'PRC',
    city: 'Hồng Cầu (PRC)',
    distance: 5.1,
    availability: 'FLEXIBLE',
    verified: true,
    donationCount: 8,
    lastDonate: '2025-05-01',
    recovery: 100,
    responseTime: '< 2 giờ',
    note: 'Gọi trước 30 phút',
    detail: {
      dob: '10/10/1995',
      gender: 'Nữ',
      cccd: '987654321000',
      email: 'hongle@gmail.com',
      address: '456 Lý Thường Kiệt, Q.10, TP.HCM',
      job: 'Giáo viên',
      weight: '55 kg',
      height: '160 cm',
      medicalHistory: 'Không có tiền sử bệnh lý',
      lastHealthCheck: '2025-05-15',
      emergencyContact: '0909123457 (Người thân)',
    },
  },
  {
    key: '3',
    name: 'Trần Cường',
    phone: '0123456789',
    bloodType: 'B+',
    location: 'PRC',
    city: 'Hồng Cầu (PRC)',
    distance: 1.8,
    availability: 'NOW',
    verified: false,
    donationCount: 22,
    lastDonate: '2025-04-20',
    recovery: 85,
    responseTime: '< 30 phút',
    note: 'Người hiến tích cực',
    detail: {
      dob: '15/03/1988',
      gender: 'Nam',
      cccd: '456789123000',
      email: 'cuongtran@gmail.com',
      address: '789 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
      job: 'Bác sĩ',
      weight: '75 kg',
      height: '170 cm',
      medicalHistory: 'Không có tiền sử bệnh lý',
      lastHealthCheck: '2025-04-01',
      emergencyContact: '0123456790 (Người thân)',
    },
  }
];

const bloodCompatibility = {
  'A+': ['O-', 'O+', 'A-', 'A+'],
  'A-': ['O-', 'A-'],
  'B+': ['O-', 'O+', 'B-', 'B+'],
  'B-': ['O-', 'B-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'O+': ['O-', 'O+'],
  'O-': ['O-']
};

const UrgentSearch = () => {
  const [searchForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [compatibilityInfo, setCompatibilityInfo] = useState('');

  // Form values
  const [patientBloodType, setPatientBloodType] = useState('A+');
  const [searchRadius, setSearchRadius] = useState(10);
  const [city, setCity] = useState('Hồng Cầu (PRC)');

  const handleSearch = async (values) => {
    setLoading(true);
    setSearchPerformed(true);

    // Simulate API call
    setTimeout(() => {
      const compatible = bloodCompatibility[patientBloodType] || [];
      const filtered = mockData.filter(donor =>
        compatible.includes(donor.bloodType) &&
        donor.distance <= searchRadius &&
        donor.city === city
      );

      // Sort by priority: NOW availability first, then by distance
      const sorted = filtered.sort((a, b) => {
        if (a.availability === 'NOW' && b.availability !== 'NOW') return -1;
        if (a.availability !== 'NOW' && b.availability === 'NOW') return 1;
        return a.distance - b.distance;
      });

      setSearchResults(sorted);
      setCompatibilityInfo(`Người nhận nhóm máu ${patientBloodType} có thể nhận từ: ${compatible.join(', ')}`);
      setLoading(false);

      if (sorted.length > 0) {
        message.success(`Tìm thấy ${sorted.length} người hiến phù hợp!`);
      } else {
        message.warning('Không tìm thấy người hiến phù hợp trong khu vực này');
      }
    }, 1500);
  };

  const getAvailabilityConfig = (availability) => {
    const configs = {
      'NOW': {
        color: 'red',
        text: 'Sẵn sàng ngay',
        icon: <ThunderboltOutlined />,
        bgColor: '#fff2f0',
        borderColor: '#ffccc7'
      },
      'FLEXIBLE': {
        color: 'orange',
        text: 'Linh hoạt',
        icon: <HourglassOutlined />,
        bgColor: '#fff7e6',
        borderColor: '#ffd591'
      }
    };
    return configs[availability] || configs['FLEXIBLE'];
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': '#1890ff', 'A-': '#13c2c2', 'B+': '#52c41a', 'B-': '#a0d911',
      'AB+': '#722ed1', 'AB-': '#eb2f96', 'O+': '#fa8c16', 'O-': '#f5222d'
    };
    return colors[bloodType] || '#666';
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      width: 50,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Thông tin người hiến',
      dataIndex: 'name',
      render: (name, record) => (
        <Space>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{
              backgroundColor: record.verified ? '#52c41a' : '#faad14',
              color: 'white'
            }}
          />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <PhoneOutlined style={{ marginRight: 4 }} />
              {record.phone}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <HeartOutlined style={{ marginRight: 4, color: '#ff4d4f' }} />
              {record.donationCount} lần hiến
            </div>
          </div>
        </Space>
      ),
      width: 180,
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodType',
      render: (bloodType) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            backgroundColor: getBloodTypeColor(bloodType),
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            minWidth: '50px'
          }}>
            {bloodType}
          </div>
        </div>
      ),
      width: 80,
      align: 'center',
    },
    {
      title: 'Thành phần máu cần',
      dataIndex: 'city',
      render: (city) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', color: '#1890ff' }}>{city}</div>
        </div>
      ),
      width: 120,
    },
    {
      title: 'Khoảng cách',
      dataIndex: 'distance',
      render: (distance) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: distance <= 3 ? '#52c41a' : distance <= 5 ? '#faad14' : '#ff4d4f'
          }}>
            {distance} km
          </div>
        </div>
      ),
      width: 80,
      align: 'center',
      sorter: (a, b) => a.distance - b.distance,
    },
    {
      title: 'Sẵn sàng',
      dataIndex: 'availability',
      render: (availability, record) => {
        const config = getAvailabilityConfig(availability);
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              backgroundColor: config.bgColor,
              border: `1px solid ${config.borderColor}`,
              borderRadius: '6px',
              padding: '8px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {config.icon} {config.text}
            </div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
              {record.responseTime}
            </div>
          </div>
        );
      },
      width: 100,
      align: 'center',
    },
    {
      title: 'Xác minh',
      dataIndex: 'verified',
      render: (verified) => (
        <div style={{ textAlign: 'center' }}>
          {verified ? (
            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
          ) : (
            <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '20px' }} />
          )}
        </div>
      ),
      width: 80,
      align: 'center',
    },
    {
      title: 'Tương tác',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Button
            type="primary"
            size="small"
            icon={<PhoneOutlined />}
            onClick={() => handleCall(record.phone)}
            style={{ width: '100%' }}
          >
            Gọi ngay
          </Button>
          <Button
            type="default"
            size="small"
            icon={<InfoCircleOutlined />}
            onClick={() => showDetail(record)}
            style={{ width: '100%' }}
          >
            Chi tiết
          </Button>
        </Space>
      ),
      width: 100,
      align: 'center',
    }
  ];

  const showDetail = (record) => {
    setSelectedDonor(record);
    setDetailModalVisible(true);
  };

  const handleCall = (phone) => {
    Modal.confirm({
      title: 'Xác nhận gọi điện',
      content: `Bạn có chắc chắn muốn gọi cho số ${phone}?`,
      okText: 'Gọi ngay',
      cancelText: 'Hủy',
      onOk: () => {
        window.open(`tel:${phone}`);
        message.success('Đang thực hiện cuộc gọi...');
      }
    });
  };

  const resetSearch = () => {
    searchForm.resetFields();
    setSearchResults([]);
    setSearchPerformed(false);
    setCompatibilityInfo('');
    message.info('Đã reset form tìm kiếm');
  };

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <FireOutlined style={{ marginRight: 8 }} />
              Tìm người hiến máu khẩn cấp
            </Title>
          </Col>
          <Col>
            <Space>
              <Text style={{ color: 'white' }}>
                <CalendarOutlined style={{ marginRight: 4 }} />
                {new Date().toLocaleDateString('vi-VN')}
              </Text>
              <Text style={{ color: 'white' }}>
                <UserOutlined style={{ marginRight: 4 }} />
                SOS Emergency
              </Text>
            </Space>
          </Col>
          <Col>
            <Space>
              <Text type="secondary">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {new Date().toLocaleDateString('vi-VN')}
              </Text>
              <Text type="secondary">
                <UserOutlined style={{ marginRight: 4 }} />
                Quản trị viên
              </Text>
            </Space>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              title={
                <Space>
                  <SearchOutlined style={{ color: '#1890ff' }} />
                  <span>Tìm kiếm người hiến máu khẩn cấp</span>
                </Space>
              }
              extra={
                <Button icon={<ReloadOutlined />} onClick={resetSearch}>
                  Reset
                </Button>
              }
              style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <Form
                form={searchForm}
                layout="vertical"
                onFinish={handleSearch}
                initialValues={{
                  bloodType: 'A+',
                  city: 'Hồng Cầu (PRC)',
                  radius: 10
                }}
              >
                <Alert
                  message="Điều kiện tìm kiếm"
                  description="Hệ thống sẽ tự động tìm kiếm những người hiến máu tương thích và sẵn sàng trong khu vực bạn chọn"
                  type="info"
                  showIcon
                  style={{ marginBottom: '16px' }}
                />

                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Nhóm máu người nhận"
                      name="bloodType"
                      rules={[{ required: true, message: 'Vui lòng chọn nhóm máu!' }]}
                    >
                      <Select
                        size="large"
                        placeholder="Chọn nhóm máu"
                        onChange={setPatientBloodType}
                      >
                        <Option value="A+">A+</Option>
                        <Option value="A-">A-</Option>
                        <Option value="B+">B+</Option>
                        <Option value="B-">B-</Option>
                        <Option value="AB+">AB+</Option>
                        <Option value="AB-">AB-</Option>
                        <Option value="O+">O+</Option>
                        <Option value="O-">O-</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Thành phần máu cần"
                      name="city"
                      rules={[{ required: true, message: 'Vui lòng chọn thành phần!' }]}
                    >
                      <Select
                        size="large"
                        placeholder="Chọn thành phần máu"
                        onChange={setCity}
                      >
                        <Option value="Hồng Cầu (PRC)">Hồng Cầu (PRC)</Option>
                        <Option value="Tiểu cầu (PC)">Tiểu cầu (PC)</Option>
                        <Option value="Huyết tương (FFP)">Huyết tương (FFP)</Option>
                        <Option value="Toàn phần (WB)">Toàn phần (WB)</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label={`Bán kính tìm kiếm: ${searchRadius} km`}
                      name="radius"
                    >
                      <Slider
                        min={1}
                        max={50}
                        value={searchRadius}
                        onChange={setSearchRadius}
                        marks={{ 1: '1km', 10: '10km', 25: '25km', 50: '50km' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loading}
                      icon={<SearchOutlined />}
                      style={{ minWidth: '120px' }}
                    >
                      Tìm kiếm
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {compatibilityInfo && (
            <Col span={24}>
              <Alert
                message="Kết quả tương thích"
                description={compatibilityInfo}
                type="success"
                showIcon
                style={{ borderRadius: '8px' }}
              />
            </Col>
          )}

          <Col span={24}>
            <Card
              title={
                <Space>
                  <UserOutlined style={{ color: '#52c41a' }} />
                  <span>Danh sách người hiến máu phù hợp</span>
                  {searchResults.length > 0 && (
                    <Badge count={searchResults.length} style={{ backgroundColor: '#52c41a' }} />
                  )}
                </Space>
              }
              style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <Spin size="large" />
                  <div style={{ marginTop: '16px', fontSize: '16px' }}>
                    Đang tìm kiếm người hiến máu...
                  </div>
                </div>
              ) : searchPerformed ? (
                searchResults.length > 0 ? (
                  <>
                    <div style={{ marginBottom: '16px' }}>
                      <Row gutter={16}>
                        <Col span={8}>
                          <Statistic
                            title="Tổng số người hiến"
                            value={searchResults.length}
                            prefix={<UserOutlined />}
                          />
                        </Col>
                        <Col span={8}>
                          <Statistic
                            title="Sẵn sàng ngay"
                            value={searchResults.filter(r => r.availability === 'NOW').length}
                            prefix={<ThunderboltOutlined />}
                            valueStyle={{ color: '#cf1322' }}
                          />
                        </Col>
                        <Col span={8}>
                          <Statistic
                            title="Đã xác minh"
                            value={searchResults.filter(r => r.verified).length}
                            prefix={<CheckCircleOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                          />
                        </Col>
                      </Row>
                    </div>
                    <Table
                      columns={columns}
                      dataSource={searchResults}
                      pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người hiến`,
                        pageSizeOptions: ['5', '10', '20'],
                        defaultPageSize: 10,
                      }}
                      scroll={{ x: 1000 }}
                      size="middle"
                      rowClassName={(record) => record.availability === 'NOW' ? 'urgent-row' : ''}
                    />
                  </>
                ) : (
                  <Empty
                    description="Không tìm thấy người hiến máu phù hợp"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )
              ) : (
                <Empty
                  description="Vui lòng thực hiện tìm kiếm để xem kết quả"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </Card>
          </Col>
        </Row>

        {/* Detail Modal */}
        {selectedDonor && (
          <Modal
            open={detailModalVisible}
            title={
              <Space>
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{ backgroundColor: selectedDonor.verified ? '#52c41a' : '#faad14' }}
                />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {selectedDonor.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {selectedDonor.verified ? (
                      <Badge status="success" text="Đã xác minh" />
                    ) : (
                      <Badge status="warning" text="Chưa xác minh" />
                    )}
                  </div>
                </div>
              </Space>
            }
            onCancel={() => setDetailModalVisible(false)}
            width={800}
            footer={[
              <Button key="cancel" onClick={() => setDetailModalVisible(false)}>
                Đóng
              </Button>,
              <Button
                key="call"
                type="primary"
                icon={<PhoneOutlined />}
                onClick={() => handleCall(selectedDonor.phone)}
              >
                Gọi ngay: {selectedDonor.phone}
              </Button>,
            ]}
          >
            <div style={{ padding: '16px 0' }}>
              <Alert
                message={`Mức sẵn sàng: ${getAvailabilityConfig(selectedDonor.availability).text}`}
                description={`Thời gian phản hồi dự kiến: ${selectedDonor.responseTime} | Khoảng cách: ${selectedDonor.distance} km`}
                type={selectedDonor.availability === 'NOW' ? 'error' : 'warning'}
                showIcon
                style={{ marginBottom: '16px' }}
              />

              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="Họ tên" span={2}>
                  <strong>{selectedDonor.name}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Nhóm máu">
                  <Tag color={getBloodTypeColor(selectedDonor.bloodType)} style={{ fontSize: '14px' }}>
                    {selectedDonor.bloodType}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Số lần hiến">
                  <Badge count={selectedDonor.donationCount} style={{ backgroundColor: '#52c41a' }} />
                </Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">
                  {selectedDonor.detail.dob}
                </Descriptions.Item>
                <Descriptions.Item label="Giới tính">
                  {selectedDonor.detail.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Cân nặng">
                  {selectedDonor.detail.weight}
                </Descriptions.Item>
                <Descriptions.Item label="Chiều cao">
                  {selectedDonor.detail.height}
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Thông tin liên hệ</Divider>
              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Số điện thoại">
                  <Space>
                    {selectedDonor.phone}
                    <Button
                      type="link"
                      icon={<PhoneOutlined />}
                      onClick={() => handleCall(selectedDonor.phone)}
                    >
                      Gọi
                    </Button>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selectedDonor.detail.email}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">
                  {selectedDonor.detail.address}
                </Descriptions.Item>
                <Descriptions.Item label="Liên hệ khẩn cấp">
                  {selectedDonor.detail.emergencyContact}
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Thông tin y tế</Divider>
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="Lần hiến gần nhất">
                  {selectedDonor.lastDonate}
                </Descriptions.Item>
                <Descriptions.Item label="Tình trạng hồi phục">
                  <Progress
                    percent={selectedDonor.recovery}
                    size="small"
                    status={selectedDonor.recovery >= 90 ? 'success' : selectedDonor.recovery >= 70 ? 'active' : 'exception'}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Tiền sử bệnh" span={2}>
                  {selectedDonor.detail.medicalHistory}
                </Descriptions.Item>
                <Descriptions.Item label="Khám sức khỏe gần nhất">
                  {selectedDonor.detail.lastHealthCheck}
                </Descriptions.Item>
                <Descriptions.Item label="Vị trí hiện tại">
                  {selectedDonor.location} (Cách {selectedDonor.distance} km)
                </Descriptions.Item>
              </Descriptions>

              <Divider orientation="left">Ghi chú</Divider>
              <div style={{
                padding: '12px',
                backgroundColor: '#f5f5f5',
                borderRadius: '6px',
                border: '1px solid #d9d9d9'
              }}>
                {selectedDonor.note}
              </div>
            </div>
          </Modal>
        )}
      </Content>

      <style jsx>{`
        .urgent-row {
          background-color: #fff2f0 !important;
          border-left: 4px solid #ff4d4f !important;
        }
        
        .urgent-row:hover {
          background-color: #ffebe6 !important;
        }
        
        .ant-table-tbody > tr.urgent-row > td {
          border-bottom: 1px solid #ffccc7 !important;
        }
        
        .ant-progress-bg {
          transition: all 0.3s ease;
        }
        
        .ant-card {
          transition: all 0.3s ease;
        }
        
        .ant-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        
        .ant-btn-primary {
          background: linear-gradient(135deg, #ff4d4f 0%, #b81212ff 100%);
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .ant-btn-primary:hover {
          background: linear-gradient(135deg, #ff4d4f 0%, #b81212ff 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .ant-select-selector {
          border-radius: 6px !important;
        }
        
        .ant-input {
          border-radius: 6px !important;
        }
        
        .ant-slider-track {
          background: linear-gradient(135deg, #ff4d4f 0%, #b81212ff 100%);
        }
        
        .ant-slider-handle {
          border-color: #ff4d4f;
        }
        
        .ant-badge-count {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .ant-statistic-title {
          font-size: 14px;
          color: #8c8c8c;
        }
        
        .ant-statistic-content {
          font-size: 20px;
          font-weight: bold;
        }
        
        .ant-descriptions-item-label {
          font-weight: 600;
          color: #262626;
        }
        
        .ant-descriptions-item-content {
          color: #595959;
        }
        
        .ant-modal-header {
          border-bottom: 1px solid #f0f0f0;
          padding: 16px 24px;
        }
        
        .ant-modal-footer {
          border-top: 1px solid #f0f0f0;
          padding: 10px 16px;
        }
        
        .ant-empty-description {
          color: #8c8c8c;
          font-size: 14px;
        }
        
        .ant-alert-info {
          border-radius: 6px;
        }
        
        .ant-alert-success {
          border-radius: 6px;
        }
        
        .ant-form-item-label > label {
          font-weight: 600;
          color: #262626;
        }
        
        .ant-table-thead > tr > th {
          background: #fafafa;
          font-weight: 600;
          color: #262626;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .ant-table-tbody > tr:hover > td {
          background-color: #fafafa;
        }
        
        .ant-spin-dot {
          font-size: 20px;
        }
        
        .ant-spin-text {
          color: #595959;
        }
        
        @media (max-width: 768px) {
          .ant-card {
            margin: 8px;
          }
          
          .ant-table-scroll {
            overflow-x: auto;
          }
          
          .ant-modal {
            margin: 16px;
          }
          
          .ant-descriptions {
            font-size: 12px;
          }
        }
        
        // @keyframes pulse {
        //   0% { transform: scale(1); }
        //   50% { transform: scale(1.05); }
        //   100% { transform: scale(1); }
        // }
        
        // .urgent-row {
        //   animation: pulse 2s infinite;
        // }
        
        .ant-tag {
          border-radius: 4px;
          font-weight: 500;
        }
        
        .ant-progress-line {
          border-radius: 4px;
        }
        
        .ant-avatar {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .ant-divider-horizontal {
          margin: 16px 0;
        }
        
        .ant-divider-inner-text {
          font-weight: 600;
          color: #262626;
        }
      `}</style>
    </Layout>
  );
};

export default UrgentSearch;