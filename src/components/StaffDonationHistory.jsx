import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  Modal,
  Descriptions,
  Empty,
  DatePicker,
  Space,
  Card,
  Typography,
  Tag,
  Select,
  Row,
  Col,
  Statistic,
  Alert,
  Spin,
  message,
  Tooltip,
  Avatar,
  Badge,
  Layout,
  Divider,
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  ReloadOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  ExperimentOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;
const { Header, Content } = Layout;

// API service functions
const donationService = {
  // Get donation history by user ID
  async getHistoryByUserId(userId) {
    try {
      const response = await fetch(`/api/donations/history?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch donation history');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching donation history:', error);
      throw error;
    }
  },

  // Get all donations for staff overview
  async getAllDonations() {
    try {
      const response = await fetch('/api/donations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }
  },

  // Get donations by user ID
  async getDonationsByUserId(userId) {
    try {
      const response = await fetch(`/api/donations/by-user?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user donations');
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Error fetching user donations:', error);
      throw error;
    }
  }
};

const StaffDonationHistory = () => {
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [statistics, setStatistics] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    cancelled: 0
  });

  // Load data on component mount
  useEffect(() => {
    loadDonations();
  }, []);

  // Filter donations when filters change
  useEffect(() => {
    applyFilters();
  }, [donations, searchText, dateRange, statusFilter, locationFilter]);

  const loadDonations = async () => {
    setLoading(true);
    try {
      const data = await donationService.getAllDonations();

      // Transform data to match table structure
      const transformedData = data.map((donation, index) => ({
        key: donation.donationId || index + 1,
        id: donation.donationId,
        userId: donation.userId,
        name: donation.user?.fullName || 'Chưa có thông tin',
        bloodType: donation.bloodType?.description || 'Chưa xác định',
        status: donation.status || 'PENDING',
        location: donation.location || 'Chưa rõ',
        phone: donation.user?.phone || 'Chưa có SĐT',
        donationDate: donation.donationDate,
        volume: donation.volumeMl,
        component: donation.component?.name || 'Chưa tách',
        note: donation.note || '',
        registration: donation.registration,
        separationStatus: donation.component?.code ? 'Đã tách' : 'Chưa tách'
      }));

      setDonations(transformedData);
      calculateStatistics(transformedData);
    } catch (error) {
      message.error('Không thể tải dữ liệu lịch sử hiến máu');
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (data) => {
    const stats = {
      total: data.length,
      completed: data.filter(d => d.status === 'COMPLETED').length,
      pending: data.filter(d => d.status === 'PENDING').length,
      cancelled: data.filter(d => d.status === 'CANCELLED').length
    };
    setStatistics(stats);
  };

  const applyFilters = () => {
    let filtered = [...donations];

    // Search filter
    if (searchText) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase()) ||
        item.phone.includes(searchText)
      );
    }

    // Date range filter
    if (dateRange.length === 2) {
      filtered = filtered.filter(item => {
        const itemDate = dayjs(item.donationDate);
        return itemDate.isAfter(dateRange[0]) && itemDate.isBefore(dateRange[1]);
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredDonations(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PENDING': return 'processing';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'COMPLETED': return 'Đã hoàn thành';
      case 'PENDING': return 'Đang xử lý';
      case 'CANCELLED': return 'Đã hủy';
      default: return 'Không rõ';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircleOutlined />;
      case 'PENDING': return <ClockCircleOutlined />;
      case 'CANCELLED': return <CloseCircleOutlined />;
      default: return <ExclamationCircleOutlined />;
    }
  };

  const showDetail = async (record) => {
    if (record.userId) {
      setLoading(true);
      try {
        const history = await donationService.getHistoryByUserId(record.userId);
        setSelectedRecord({
          ...record,
          history: history
        });
        setIsModalOpen(true);
      } catch (error) {
        message.error('Không thể tải chi tiết lịch sử hiến máu');
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedRecord(record);
      setIsModalOpen(true);
    }
  };

  const resetFilters = () => {
    setSearchText('');
    setDateRange([]);
    setStatusFilter('all');
    setLocationFilter('all');
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      width: 60,
      align: 'center',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Người hiến',
      dataIndex: 'name',
      width: 150,
      render: (text, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.phone}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodType',
      width: 100,
      align: 'center',
      render: (text) => (
        <Tag color="red" icon={<ExperimentOutlined />}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      render: (status) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      width: 180,
      render: (text) => (
        <Space>
          <EnvironmentOutlined style={{ color: '#666' }} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Thời gian hiến',
      dataIndex: 'donationDate',
      width: 150,
      render: (date) => (
        <Space>
          <CalendarOutlined style={{ color: '#666' }} />
          <Text>{date ? dayjs(date).format('DD/MM/YYYY HH:mm') : 'Chưa có'}</Text>
        </Space>
      ),
    },
    {
      title: 'Thể tích',
      dataIndex: 'volume',
      width: 100,
      align: 'center',
      render: (volume) => (
        <Badge
          count={volume ? `${volume}ml` : 'Chưa có'}
          style={{ 
            backgroundColor: volume > 400 ? '#52c41a' : volume > 250 ? '#faad14' : '#f5222d' 
          }}
        />
      ),
    },
    {
      title: 'Thành phần',
      dataIndex: 'component',
      width: 120,
      render: (text) => (
        <Text type={text === 'Chưa tách' ? 'secondary' : 'primary'}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Hành động',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => showDetail(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <FileTextOutlined style={{ marginRight: 8 }} />
              Lịch sử Hiến máu
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
        {/* Statistics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Tổng số lần hiến"
                value={statistics.total}
                prefix={<HeartOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Đã hoàn thành"
                value={statistics.completed}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Đang xử lý"
                value={statistics.pending}
                prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Đã hủy"
                value={statistics.cancelled}
                prefix={<CloseCircleOutlined style={{ color: '#f5222d' }} />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filter Section */}
        <Card style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            <FilterOutlined style={{ marginRight: 8 }} />
            Bộ lọc tìm kiếm
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Input
                placeholder="Tìm theo tên, địa điểm, SĐT..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder={['Từ ngày', 'Đến ngày']}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: '100%' }}
                placeholder="Trạng thái"
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="COMPLETED">Đã hoàn thành</Option>
                <Option value="PENDING">Đang xử lý</Option>
                <Option value="CANCELLED">Đã hủy</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={4}>
              <Select
                value={locationFilter}
                onChange={setLocationFilter}
                style={{ width: '100%' }}
                placeholder="Khu vực"
              >
                <Option value="all">Tất cả khu vực</Option>
                <Option value="quận 1">Quận 1</Option>
                <Option value="quận 3">Quận 3</Option>
                <Option value="quận 10">Quận 10</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={4}>
              <Space>
                <Button
                  type="primary"
                  icon={<FilterOutlined />}
                  onClick={applyFilters}
                >
                  Lọc
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    resetFilters();
                    loadDonations();
                  }}
                >
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Main Table */}
        <Card>
          <div style={{ marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0 }}>
              <BarChartOutlined style={{ marginRight: 8 }} />
              Danh sách lịch sử hiến máu
            </Title>
            <Text type="secondary">
              Hiển thị {filteredDonations.length} / {donations.length} bản ghi
            </Text>
          </div>

          <Spin spinning={loading}>
            {filteredDonations.length > 0 ? (
              <Table
                columns={columns}
                dataSource={filteredDonations}
                pagination={{
                  total: filteredDonations.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} trong ${total} bản ghi`,
                }}
                scroll={{ x: 1200 }}
                size="middle"
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
              />
            ) : (
              <Empty
                description={
                  <div>
                    <p>Không tìm thấy lịch sử hiến máu</p>
                    <Button type="primary" onClick={loadDonations}>
                      Tải lại dữ liệu
                    </Button>
                  </div>
                }
              />
            )}
          </Spin>
        </Card>
      </Content>

      {/* Detail Modal */}
      {selectedRecord && (
        <Modal
          open={isModalOpen}
          title={
            <Space>
              <HeartOutlined style={{ color: '#dc2626' }} />
              <span>Chi tiết lần hiến máu - {selectedRecord.name}</span>
            </Space>
          }
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="close" onClick={() => setIsModalOpen(false)}>
              Đóng
            </Button>
          ]}
          width={800}
        >
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Người hiến máu" span={2}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <div>
                  <Text strong>{selectedRecord.name}</Text>
                  <br />
                  <Text type="secondary">{selectedRecord.phone}</Text>
                </div>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày hiến">
              {selectedRecord.donationDate
                ? dayjs(selectedRecord.donationDate).format('DD/MM/YYYY HH:mm')
                : 'Chưa có thông tin'
              }
            </Descriptions.Item>
            <Descriptions.Item label="Địa điểm">
              <Space>
                <EnvironmentOutlined />
                <Text>{selectedRecord.location}</Text>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Thể tích">
              <Badge
                count={selectedRecord.volume ? `${selectedRecord.volume}ml` : 'Chưa có'}
                style={{ 
                  backgroundColor: selectedRecord.volume > 400 ? '#52c41a' : selectedRecord.volume > 250 ? '#faad14' : '#f5222d' 
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Nhóm máu">
              <Tag color="red" icon={<ExperimentOutlined />}>
                {selectedRecord.bloodType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Thành phần">
              <Text type={selectedRecord.component === 'Chưa tách' ? 'secondary' : 'primary'}>
                {selectedRecord.component}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái tách">
              <Tag color={selectedRecord.separationStatus === 'Đã tách' ? 'green' : 'default'}>
                {selectedRecord.separationStatus}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái hiến">
              <Tag color={getStatusColor(selectedRecord.status)} icon={getStatusIcon(selectedRecord.status)}>
                {getStatusText(selectedRecord.status)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú" span={2}>
              <Text>{selectedRecord.note || 'Không có ghi chú'}</Text>
            </Descriptions.Item>
          </Descriptions>

          {selectedRecord.history && selectedRecord.history.length > 0 && (
            <>
              <Divider />
              <Title level={5}>
                <BarChartOutlined style={{ marginRight: 8 }} />
                Lịch sử hiến máu khác ({selectedRecord.history.length - 1} lần)
              </Title>
              {selectedRecord.history
                .filter(h => h.donationId !== selectedRecord.id)
                .length > 0 ? (
                <ul style={{ paddingLeft: 20 }}>
                  {selectedRecord.history
                    .filter(h => h.donationId !== selectedRecord.id)
                    .map((item, index) => (
                      <li key={index} style={{ marginBottom: 8 }}>
                        <Space>
                          <Text strong>{dayjs(item.donationDate).format('DD/MM/YYYY')}</Text>
                          <Text>-</Text>
                          <Badge count={`${item.volumeMl}ml`} color="#52c41a" />
                          <Text>-</Text>
                          <Text type="secondary">{item.component?.name || 'Chưa tách'}</Text>
                        </Space>
                      </li>
                    ))}
                </ul>
              ) : (
                <Text type="secondary">Chưa có lịch sử hiến máu khác</Text>
              )}
            </>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default StaffDonationHistory;