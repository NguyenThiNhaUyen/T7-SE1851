import React, { useState, useEffect } from 'react';
import { 
  Layout,
  Table, 
  Tag, 
  Button, 
  Modal, 
  Descriptions, 
  Space, 
  Input, 
  Select, 
  Card,
  Avatar,
  Typography,
  Badge,
  Tooltip,
  Alert,
  Divider,
  Progress,
  Row,
  Col
} from 'antd';
import { 
  SearchOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  UserOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  FireOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const data = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    phone: '0987654321',
    bloodType: 'A+',
    location: 'Bệnh viện Chợ Rẫy',
    level: 'URGENT',
    lastDonate: '2025-06-12',
    recovery: 85, // phần trăm hồi phục
    responseTime: '< 30 phút',
    distance: '2.5 km',
    donationCount: 15,
    note: 'Có mặt trong 15 phút',
    verified: true,
    detail: {
      dob: '01/01/1990',
      gender: 'Nam',
      cccd: '123456789012',
      email: 'nguyenvana@gmail.com',
      address: '123 Lê Lợi, P. Bến Thành, Q.1, TP.HCM',
      job: 'Kỹ sư phần mềm',
      status: 'Sẵn sàng hiến máu',
      weight: '70 kg',
      height: '175 cm',
      medicalHistory: 'Không có tiền sử bệnh lý',
      lastHealthCheck: '2025-06-01',
      emergencyContact: '0987654322 (Người thân)',
    },
  },
  {
    key: '2',
    name: 'Trần Thị B',
    phone: '0909123456',
    bloodType: 'O-',
    location: 'BV 115',
    level: 'FLEXIBLE',
    lastDonate: '2025-05-01',
    recovery: 100,
    responseTime: '< 2 giờ',
    distance: '5.2 km',
    donationCount: 8,
    note: 'Gọi sau 18h',
    verified: true,
    detail: {
      dob: '10/10/1995',
      gender: 'Nữ',
      cccd: '987654321000',
      email: 'tranb@gmail.com',
      address: '456 Lý Thường Kiệt, Q.10, TP.HCM',
      job: 'Giáo viên',
      status: 'Sẵn sàng hiến máu',
      weight: '55 kg',
      height: '160 cm',
      medicalHistory: 'Không có tiền sử bệnh lý',
      lastHealthCheck: '2025-05-15',
      emergencyContact: '0909123457 (Người thân)',
    },
  },
  {
    key: '3',
    name: 'Lê Minh C',
    phone: '0123456789',
    bloodType: 'AB+',
    location: 'BV Đại học Y Dược',
    level: 'URGENT',
    lastDonate: '2025-04-20',
    recovery: 95,
    responseTime: '< 45 phút',
    distance: '3.8 km',
    donationCount: 22,
    note: 'Người hiến tích cực',
    verified: true,
    detail: {
      dob: '15/03/1988',
      gender: 'Nam',
      cccd: '456789123000',
      email: 'leminc@gmail.com',
      address: '789 Nguyễn Thị Minh Khai, Q.3, TP.HCM',
      job: 'Bác sĩ',
      status: 'Sẵn sàng hiến máu',
      weight: '75 kg',
      height: '170 cm',
      medicalHistory: 'Không có tiền sử bệnh lý',
      lastHealthCheck: '2025-04-01',
      emergencyContact: '0123456790 (Người thân)',
    },
  }
];

const UrgentList = () => {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [filteredData, setFilteredData] = useState(data);

  // Lọc dữ liệu theo tìm kiếm và filter
  useEffect(() => {
    let filtered = data;

    // Lọc theo tìm kiếm
    if (searchText) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.phone.includes(searchText) ||
        item.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Lọc theo nhóm máu
    if (bloodTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.bloodType === bloodTypeFilter);
    }

    // Lọc theo mức độ sẵn sàng
    if (levelFilter !== 'all') {
      filtered = filtered.filter(item => item.level === levelFilter);
    }

    setFilteredData(filtered);
  }, [searchText, bloodTypeFilter, levelFilter]);

  const getLevelConfig = (level) => {
    const configs = {
      'URGENT': { color: 'red', text: 'Khẩn cấp', icon: <ExclamationCircleOutlined /> },
      'FLEXIBLE': { color: 'orange', text: 'Linh hoạt', icon: <ClockCircleOutlined /> }
    };
    return configs[level] || configs['FLEXIBLE'];
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'blue', 'A-': 'cyan', 'B+': 'green', 'B-': 'lime',
      'AB+': 'purple', 'AB-': 'magenta', 'O+': 'orange', 'O-': 'red'
    };
    return colors[bloodType] || 'default';
  };

  const calculateDaysSinceLastDonation = (lastDonate) => {
    const today = new Date();
    const lastDonateDate = new Date(lastDonate);
    const diffTime = Math.abs(today - lastDonateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      width: 60,
      align: 'center',
    },
    {
      title: 'Thông tin người hiến',
      dataIndex: 'name',
      render: (name, record) => (
        <Space>
          <Avatar 
            size="large" 
            icon={<UserOutlined />}
            style={{ backgroundColor: record.verified ? '#52c41a' : '#faad14' }}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <PhoneOutlined style={{ marginRight: 4 }} />
              {record.phone}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <HeartOutlined style={{ marginRight: 4 }} />
              {record.donationCount} lần hiến
            </div>
          </div>
        </Space>
      ),
      width: 200,
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodType',
      render: (bloodType) => (
        <Tag color={getBloodTypeColor(bloodType)} style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {bloodType}
        </Tag>
      ),
      width: 100,
      align: 'center',
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      render: (location, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>
            <EnvironmentOutlined style={{ marginRight: 4 }} />
            {location}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Cách {record.distance}
          </div>
        </div>
      ),
      width: 150,
    },
    {
      title: 'Mức sẵn sàng',
      dataIndex: 'level',
      render: (level, record) => {
        const config = getLevelConfig(level);
        return (
          <div>
            <Tag color={config.color} icon={config.icon}>
              {config.text}
            </Tag>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.responseTime}
            </div>
          </div>
        );
      },
      width: 120,
      align: 'center',
    },
    {
      title: 'Tình trạng sức khỏe',
      dataIndex: 'recovery',
      render: (recovery, record) => (
        <div>
          <Progress
            percent={recovery}
            size="small"
            status={recovery >= 90 ? 'success' : recovery >= 70 ? 'active' : 'exception'}
            showInfo={false}
          />
          <div style={{ fontSize: '12px', color: '#666' }}>
            {calculateDaysSinceLastDonation(record.lastDonate)} ngày từ lần hiến cuối
          </div>
        </div>
      ),
      width: 150,
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      render: (note) => (
        <Tooltip title={note}>
          <div style={{ 
            maxWidth: '120px', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {note}
          </div>
        </Tooltip>
      ),
      width: 120,
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Button 
            type="primary" 
            size="small"
            icon={<PhoneOutlined />}
            onClick={() => window.open(`tel:${record.phone}`)}
          >
            Gọi ngay
          </Button>
          <Button 
            type="default" 
            size="small"
            onClick={() => showDetail(record)}
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
    setSelected(record);
    setIsModalOpen(true);
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <FireOutlined style={{ marginRight: 8 }} />
              Danh sách người hiến máu khẩn cấp
            </Title>
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
        <Card>
          <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
            Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
          </Text>
          
          <Alert
            message="Lưu ý quan trọng"
            description="Vui lòng xác minh thông tin sức khỏe trước khi liên hệ. Ưu tiên những người có mức sẵn sàng 'Khẩn cấp' và tình trạng sức khỏe tốt."
            type="warning"
            showIcon
            style={{ margin: '16px 0' }}
          />

          <div style={{ marginBottom: '16px' }}>
            <Space wrap>
              <Input
                placeholder="Tìm kiếm theo tên, số điện thoại, địa điểm..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
              <Select
                placeholder="Lọc theo nhóm máu"
                value={bloodTypeFilter}
                onChange={setBloodTypeFilter}
                style={{ width: 150 }}
              >
                <Option value="all">Tất cả nhóm máu</Option>
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
              </Select>
              <Select
                placeholder="Lọc theo mức độ"
                value={levelFilter}
                onChange={setLevelFilter}
                style={{ width: 150 }}
              >
                <Option value="all">Tất cả mức độ</Option>
                <Option value="URGENT">Khẩn cấp</Option>
                <Option value="FLEXIBLE">Linh hoạt</Option>
              </Select>
            </Space>
          </div>

          <Table 
            columns={columns} 
            dataSource={filteredData} 
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người hiến`,
              pageSizeOptions: ['5', '10', '20', '50'],
              defaultPageSize: 10,
            }}
            scroll={{ x: 1200 }}
            size="middle"
          />

          {selected && (
            <Modal
              open={isModalOpen}
              title={
                <Space>
                  <Avatar 
                    size="large" 
                    icon={<UserOutlined />}
                    style={{ backgroundColor: selected.verified ? '#52c41a' : '#faad14' }}
                  />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {selected.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {selected.verified ? (
                        <Badge status="success" text="Đã xác minh" />
                      ) : (
                        <Badge status="warning" text="Chưa xác minh" />
                      )}
                    </div>
                  </div>
                </Space>
              }
              onCancel={() => setIsModalOpen(false)}
              width={700}
              footer={[
                <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                  Đóng
                </Button>,
                <Button 
                  key="call" 
                  type="primary" 
                  icon={<PhoneOutlined />}
                  onClick={() => handleCall(selected.phone)}
                >
                  Gọi ngay: {selected.phone}
                </Button>,
              ]}
            >
              <div style={{ padding: '16px 0' }}>
                <Alert
                  message={`Mức sẵn sàng: ${getLevelConfig(selected.level).text}`}
                  description={`Thời gian phản hồi dự kiến: ${selected.responseTime}`}
                  type={selected.level === 'URGENT' ? 'error' : 'warning'}
                  showIcon
                  style={{ marginBottom: '16px' }}
                />

                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Họ tên" span={2}>
                    <strong>{selected.name}</strong>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày sinh">
                    {selected.detail.dob}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giới tính">
                    {selected.detail.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số CCCD">
                    {selected.detail.cccd}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nghề nghiệp">
                    {selected.detail.job}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cân nặng">
                    {selected.detail.weight}
                  </Descriptions.Item>
                  <Descriptions.Item label="Chiều cao">
                    {selected.detail.height}
                  </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Thông tin liên hệ</Divider>
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Số điện thoại">
                    <Space>
                      {selected.phone}
                      <Button 
                        type="link" 
                        icon={<PhoneOutlined />}
                        onClick={() => handleCall(selected.phone)}
                      >
                        Gọi
                      </Button>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {selected.detail.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ">
                    {selected.detail.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Liên hệ khẩn cấp">
                    {selected.detail.emergencyContact}
                  </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Thông tin y tế</Divider>
                <Descriptions column={2} bordered size="small">
                  <Descriptions.Item label="Nhóm máu">
                    <Tag color={getBloodTypeColor(selected.bloodType)} style={{ fontSize: '14px' }}>
                      {selected.bloodType}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Lần hiến gần nhất">
                    {selected.lastDonate}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tình trạng hồi phục">
                    <Progress
                      percent={selected.recovery}
                      size="small"
                      status={selected.recovery >= 90 ? 'success' : selected.recovery >= 70 ? 'active' : 'exception'}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Số lần hiến">
                    <Badge count={selected.donationCount} style={{ backgroundColor: '#52c41a' }} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Tiền sử bệnh" span={2}>
                    {selected.detail.medicalHistory}
                  </Descriptions.Item>
                  <Descriptions.Item label="Khám sức khỏe gần nhất">
                    {selected.detail.lastHealthCheck}
                  </Descriptions.Item>
                  <Descriptions.Item label="Vị trí hiện tại">
                    {selected.location} (Cách {selected.distance})
                  </Descriptions.Item>
                </Descriptions>

                <Divider orientation="left">Ghi chú</Divider>
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: '6px',
                  border: '1px solid #d9d9d9'
                }}>
                  {selected.note}
                </div>
              </div>
            </Modal>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default UrgentList;