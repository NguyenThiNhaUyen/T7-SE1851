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
  Row,message ,
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
import axios from 'axios';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const UrgentList = () => {
  const [data, setData] = useState([]);  // Dữ liệu từ API
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gọi API lấy danh sách người hiến máu khẩn cấp
  const fetchUrgentDonors = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/admin/urgent-donors/list');
      setData(res.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrgentDonors();
  }, []);

  // Lọc dữ liệu khi thay đổi tìm kiếm hoặc filter hoặc data
  useEffect(() => {
    let filtered = data;

    if (searchText) {
      filtered = filtered.filter(item =>
        (item.fullName || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (item.phone || '').includes(searchText) ||
        (item.location || '').toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (bloodTypeFilter !== 'all') {
      filtered = filtered.filter(item => item.bloodType === bloodTypeFilter);
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(item => item.readinessLevel === levelFilter);
    }

    setFilteredData(filtered);
  }, [searchText, bloodTypeFilter, levelFilter, data]);

  // Các hàm helper
  const getLevelConfig = (level) => {
    const configs = {
      'URGENT': { color: 'red', text: 'Khẩn cấp', icon: <ExclamationCircleOutlined /> },
      'FLEXIBLE': { color: 'orange', text: 'Linh hoạt', icon: <ClockCircleOutlined /> }
    };
    return configs[level] || { color: 'gray', text: level || '', icon: null };
  };

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': 'blue', 'A-': 'cyan', 'B+': 'green', 'B-': 'lime',
      'AB+': 'purple', 'AB-': 'magenta', 'O+': 'orange', 'O-': 'red'
    };
    return colors[bloodType] || 'default';
  };

  const calculateDaysSinceLastDonation = (lastDonate) => {
    if (!lastDonate || lastDonate === '--') return '--';
    const today = new Date();
    const lastDonateDate = new Date(lastDonate);
    const diffTime = Math.abs(today - lastDonateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

 const columns = [
  {
    title: 'STT',
    width: 60,
    align: 'center',
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Thông tin người hiến',
    dataIndex: 'fullName',
    render: (name, record) => (
      <Space>
        <Avatar 
          size="large" 
          icon={<UserOutlined />}
          style={{ backgroundColor: '#52c41a' }}
        />
        <div>
          <div style={{ fontWeight: 'bold' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <PhoneOutlined style={{ marginRight: 4 }} />
            {record.phone}
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
    title: 'Mức sẵn sàng',
    dataIndex: 'readinessDescription',
    width: 150,
    align: 'center',
  },
  {
    title: 'Ngày hiến gần nhất',
    dataIndex: 'lastDonationDate',
    width: 120,
    align: 'center',
    render: (date) => date === '--' ? '--' : date,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    render: (note) => (
      <Tooltip title={note}>
        <div style={{ 
          maxWidth: '150px', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {note}
        </div>
      </Tooltip>
    ),
    width: 150,
  },
  {
    title: 'Hành động',
    width: 100,
    align: 'center',
    render: (_, record) => (
      <Button
        type="primary"
        size="small"
        onClick={async () => {
          try {
            // Gọi API lấy chi tiết người hiến
            const res = await axios.get(`http://localhost:8080/api/urgent-donors/detail/${record.donorId}`);
            // Set dữ liệu chi tiết trả về
            setSelected(res.data);
            setIsModalOpen(true);
          } catch (error) {
            console.error("Lỗi khi lấy chi tiết:", error);
            message.error("Không thể tải chi tiết người hiến");
          }
        }}
      >
        Chi tiết
      </Button>
    ),
  },
];


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
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người hiến`,
            pageSizeOptions: ['5', '10', '20', '50'],
            defaultPageSize: 10,
          }}
          scroll={{ x: 1200 }}
          size="middle"
          rowKey="donorId"
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
          {selected.fullName}
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
      message={`Mức sẵn sàng: ${getLevelConfig(selected.readinessLevel).text}`}
      description={`Thời gian phản hồi dự kiến: ${selected.readinessDescription || ''}`}
      type={selected.readinessLevel === 'URGENT' ? 'error' : 'warning'}
      showIcon
      style={{ marginBottom: '16px' }}
    />

    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="Họ tên" span={2}>
        <strong>{selected.fullName}</strong>
      </Descriptions.Item>
      <Descriptions.Item label="Ngày sinh">
        {selected.dateOfBirth || selected.detail?.dob || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Giới tính">
        {selected.gender || selected.detail?.gender || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Số CCCD">
        {selected.citizenId || selected.detail?.cccd || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Nghề nghiệp">
        {selected.occupation || selected.detail?.job || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Cân nặng">
        {selected.detail?.weight || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Chiều cao">
        {selected.detail?.height || '--'}
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
        {selected.email || selected.detail?.email || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Địa chỉ">
        {selected.address || selected.detail?.address || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Liên hệ khẩn cấp">
        {selected.detail?.emergencyContact || '--'}
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
        {selected.lastDonationDate || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Tình trạng hồi phục">
        <Progress
          percent={selected.recovery || 0}
          size="small"
          status={selected.recovery >= 90 ? 'success' : selected.recovery >= 70 ? 'active' : 'exception'}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Số lần hiến">
        <Badge count={selected.donationCount || 0} style={{ backgroundColor: '#52c41a' }} />
      </Descriptions.Item>
      <Descriptions.Item label="Tiền sử bệnh" span={2}>
        {selected.detail?.medicalHistory || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Khám sức khỏe gần nhất">
        {selected.detail?.lastHealthCheck || '--'}
      </Descriptions.Item>
      <Descriptions.Item label="Vị trí hiện tại">
        {(selected.location || '--') + (selected.distance ? ` (Cách ${selected.distance})` : '')}
      </Descriptions.Item>
    </Descriptions>

    <Divider orientation="left">Ghi chú</Divider>
    <div style={{ 
      padding: '12px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '6px',
      border: '1px solid #d9d9d9'
    }}>
      {selected.note || '--'}
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
