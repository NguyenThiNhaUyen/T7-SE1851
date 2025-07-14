import React, { useState } from 'react';
import {
  Layout,
  Table,
  Tag,
  Button,
  Modal,
  Descriptions,
  Card,
  Input,
  Select,
  DatePicker,
  Space,
  Typography,
  Divider,
  Badge,
  Tooltip,
  Row,
  Col
} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  UserOutlined,
  CalendarOutlined,
  HeartOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  StarOutlined,
  WarningOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TransfusionHistory = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [timePeriod, setTimePeriod] = useState('custom');

  // Dữ liệu mẫu - sẽ được thay thế bằng API call
  const mockData = [];

  // Hàm xử lý chọn khoảng thời gian nhanh
  const handleTimePeriodChange = (value) => {
    setTimePeriod(value);

    const now = dayjs();
    let startDate, endDate;

    switch (value) {
      case '1week':
        startDate = now.subtract(1, 'week');
        endDate = now;
        setDateRange([startDate, endDate]);
        break;
      case '1month':
        startDate = now.subtract(1, 'month');
        endDate = now;
        setDateRange([startDate, endDate]);
        break;
      case '1year':
        startDate = now.subtract(1, 'year');
        endDate = now;
        setDateRange([startDate, endDate]);
        break;
      case 'custom':
        setDateRange(null);
        break;
      default:
        setDateRange(null);
    }
  };

  // Hàm xử lý thay đổi date range picker
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates) {
      setTimePeriod('custom');
    }
  };

  // Hàm reset filters
  const handleReset = () => {
    setSearchText('');
    setStatusFilter('all');
    setDateRange(null);
    setTimePeriod('custom');
    setDataSource(mockData);
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    const filtered = mockData.filter(item => {
      // 1) searchText
      const matchName = item.patientName.toLowerCase().includes(searchText.toLowerCase());
      // 2) statusFilter
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      // 3) dateRange: giả sử item.createdDate có format 'DD/MM/YYYY'
      let matchDate = true;
      if (dateRange) {
        const created = dayjs(item.createdDate, 'DD/MM/YYYY');
        matchDate = created.isBetween(dateRange[0], dateRange[1], 'day', '[]');
      }
      return matchName && matchStatus && matchDate;
    });
    setDataSource(filtered);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
    },
    {
      title: 'Bệnh nhân',
      dataIndex: 'patientName',
      key: 'patientName',
      width: 200,
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.patientName.toLowerCase().includes(value.toLowerCase()),
      render: (text) => (
        <div className="flex items-center">
          <UserOutlined className="mr-2 text-blue-500" />
          <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodType',
      key: 'bloodType',
      width: 100,
      render: (text) => (
        <Tag color="red" className="font-semibold">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Thành phần máu',
      dataIndex: 'bloodComponent',
      key: 'bloodComponent',
      width: 150,
      align: 'center',
      render: (text) => (
        <Tag color="blue" className="font-semibold">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      align: 'center',
    },
    {
      title: 'Lượng',
      dataIndex: 'volume',
      key: 'volume',
      width: 100,
      align: 'center',
      render: (text) => <Text strong className="text-red-600">{text}</Text>,
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      align: 'center',
      render: (priority) => {
        const config = {
          RED: { color: 'red', icon: <AlertOutlined />, text: 'KHẨN CẤP' },
          YELLOW: { color: 'orange', icon: <WarningOutlined />, text: 'CAO' },
          GREEN: { color: 'green', icon: <CheckCircleOutlined />, text: 'BÌNH THƯỜNG' }
        };
        const { color, icon, text } = config[priority] || config.GREEN;
        return (
          <Badge status="processing" color={color}>
            <Tag color={color} icon={icon} className="font-semibold">
              {text}
            </Tag>
          </Badge>
        );
      },
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 120,
      render: (text) => (
        <div className="flex items-center">
          <CalendarOutlined className="mr-1 text-gray-500" />
          {text}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Tooltip title="Xem chi tiết">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetail(record)}
            className="bg-blue-500 hover:bg-blue-600"
          />
        </Tooltip>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState(mockData);

  const handleViewDetail = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <HistoryOutlined style={{ marginRight: 8 }} />
              Lịch sử truyền máu
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
        <div className="bg-gray-50 min-h-screen">
          {/* Filters */}
          <Card className="mb-6 shadow-sm">
            <Row gutter={16} align="middle">
              <Col span={8}>
                <Input
                  placeholder="Tìm kiếm theo tên bệnh nhân..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col span={3}>
                <Select
                  placeholder="Lọc theo thời gian"
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                  className="w-full"
                  suffixIcon={<CalendarOutlined />}
                >
                  <Option value="custom">Tùy chỉnh</Option>
                  <Option value="1week">1 tuần qua</Option>
                  <Option value="1month">1 tháng qua</Option>
                  <Option value="1year">1 năm qua</Option>
                </Select>
              </Col>

              <Col span={7}>
                <RangePicker
                  placeholder={['Từ ngày', 'Đến ngày']}
                  className="w-full"
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  format="DD/MM/YYYY"
                  allowClear
                />
              </Col>

              <Col span={4}>
                <Button type="primary" icon={<SearchOutlined />} className="w-full" onClick={handleSearch}>
                  Tìm kiếm
                </Button>
              </Col>
              <Col span={2}>
                <Button
                  onClick={handleReset}
                  className="w-full"
                >
                  Đặt lại
                </Button>
              </Col>
            </Row>

            {/* Hiển thị khoảng thời gian đã chọn */}
            {dateRange && (
              <Row style={{ marginTop: 16 }}>
                <Col span={24}>
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                    <CalendarOutlined className="mr-2 text-blue-600" />
                    <Text strong>Lọc từ ngày:</Text> {dateRange[0].format('DD/MM/YYYY')}
                    <Text strong className="mx-2">đến</Text> {dateRange[1].format('DD/MM/YYYY')}
                    {timePeriod !== 'custom' && (
                      <Tag color="blue" className="ml-3">
                        {timePeriod === '1week' ? '1 tuần qua' :
                          timePeriod === '1month' ? '1 tháng qua' :
                            timePeriod === '1year' ? '1 năm qua' : ''}
                      </Tag>
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </Card>

          {/* Table */}
          <Card className="shadow-sm">
            <Table
              columns={columns}
              dataSource={dataSource}
              rowKey="id"
              pagination={{
                total: dataSource.length,
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} bản ghi`,
              }}
              scroll={{ x: 1000 }}
              className="custom-table"
            />
          </Card>

          {/* Detail Modal */}
          <Modal
            title={
              <div className="flex items-center">
                <Badge status="processing" color="green" />
                <Text strong className="text-lg ml-2">
                  Yêu cầu #{selectedRecord?.id} - Trạng thái: {selectedRecord?.status}
                </Text>
              </div>
            }
            open={modalVisible}
            onCancel={handleCloseModal}
            footer={[
              <Button key="close" onClick={handleCloseModal}>
                Đóng
              </Button>,
              <Button key="edit" type="primary">
                Chỉnh sửa
              </Button>,
            ]}
            width={800}
            className="detail-modal"
          >
            {selectedRecord && (
              <div className="space-y-6">
                {/* Request Header */}
                <Card size="small" className="bg-red-50 border-red-200">
                  <Title level={4} className="text-red-700 mb-3">
                    <AlertOutlined className="mr-2" />
                    Yêu cầu máu khẩn cấp cho bệnh nhân {selectedRecord.patientName} ({selectedRecord.bloodType})
                  </Title>
                </Card>

                {/* Request Details */}
                <Card title="Chi tiết yêu cầu" size="small">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Mã yêu cầu">
                          <Text strong>#{selectedRecord.id}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                          <Tag color="success" icon={<CheckCircleOutlined />}>
                            {selectedRecord.status}
                          </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mức độ khẩn cấp">
                          <Tag color="red" icon={<AlertOutlined />}>
                            KHẨN CẤP
                          </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mức ưu tiên làm sàng">
                          <Badge status="error" text="RED" />
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col span={12}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Lý do">
                          {selectedRecord.reason}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số túi yêu cầu">
                          <Text strong>{selectedRecord.bagCount} túi (200ml)</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Thành phần máu">
                          {selectedRecord.bloodComponent}
                        </Descriptions.Item>
                        <Descriptions.Item label="Loại máu">
                          {selectedRecord.bloodType}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>

                  <Divider />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Text strong>Cần định nhóm chéo:</Text>
                      <Tag color="success" className="ml-2">Có</Tag>
                    </Col>
                    <Col span={12}>
                      <Text strong>Có phù hợp nhóm máu?:</Text>
                      <Tag color="success" className="ml-2">Có</Tag>
                    </Col>
                  </Row>
                </Card>

                {/* Requester Information */}
                <Card title="Thông tin người phụ trách" size="small">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Họ tên">
                          <Text strong>{selectedRecord.requester?.name}</Text>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col span={12}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="SĐT bệnh nhân">
                          <Text copyable className="text-blue-600">
                            {selectedRecord.requester?.phone}
                          </Text>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>

                {/* Patient Information */}
                <Card title={<><UserOutlined className="mr-2" />Thông tin bệnh nhân</>} size="small">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Họ tên">
                          <Text strong>{selectedRecord.patientName}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tuổi/Giới tính">
                          {selectedRecord.age} / Nam
                        </Descriptions.Item>
                        <Descriptions.Item label="Cân nặng">
                          {selectedRecord.weight} kg
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col span={12}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Nhóm máu">
                          <Tag color="red" className="font-semibold">
                            {selectedRecord.bloodType}
                          </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="SĐT bệnh nhân">
                          <Text copyable className="text-blue-600">
                            {selectedRecord.phone}
                          </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mã bệnh nhân">
                          <Text strong>#{selectedRecord.donnorId}</Text>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>

                {/* Notes and Alerts */}
                <Card title="Ghi chú và tiền sử" size="small">
                  <Space direction="vertical" className="w-full">
                    <div>
                      <Tag color="orange" icon={<WarningOutlined />}>Warning Note:</Tag>
                      <Text className="ml-2">{selectedRecord.notes?.warning}</Text>
                    </div>
                    <div>
                      <Tag color="gold" icon={<StarOutlined />}>Special Note:</Tag>
                      <Text className="ml-2">{selectedRecord.notes?.special}</Text>
                    </div>
                    <div>
                      <Tag color="red" icon={<AlertOutlined />}>Emergency Note:</Tag>
                      <Text className="ml-2">{selectedRecord.notes?.emergency}</Text>
                    </div>
                  </Space>

                  <Divider />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Text strong>Tiền sử truyền máu:</Text>
                      <Tag color="red" className="ml-2">Không</Tag>
                    </Col>
                    <Col span={12}>
                      <Text strong>Phản ứng truyền máu:</Text>
                      <Tag color="red" className="ml-2">Không</Tag>
                    </Col>
                  </Row>
                  <Row gutter={16} className="mt-2">
                    <Col span={12}>
                      <Text strong>Kháng thể bất thường:</Text>
                      <Tag color="red" className="ml-2">Không</Tag>
                    </Col>
                    <Col span={12}>
                      <Text strong>Đang mang thai:</Text>
                      <Tag color="red" className="ml-2">Không</Tag>
                    </Col>
                  </Row>
                </Card>

                {/* Processing Timeline */}
                <Card title={<><CalendarOutlined className="mr-2" />Thời gian xử lý</>} size="small">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Thời điểm cấp máu">
                      {selectedRecord.processingTime?.requestTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo yêu cầu">
                      {selectedRecord.processingTime?.createdTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày được phê duyệt">
                      {selectedRecord.processingTime?.approvedTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian xử lý">
                      <Text strong className="text-green-600">
                        {selectedRecord.processingTime?.processingDuration}
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </div>
            )}
          </Modal>

          <style jsx global>{`
            .custom-table .ant-table-thead > tr > th {
              background-color: #f8fafc;
              font-weight: 600;
              border-bottom: 2px solid #e2e8f0;
            }
            
            .custom-table .ant-table-tbody > tr:hover > td {
              background-color: #f1f5f9;
            }
            
            .detail-modal .ant-modal-header {
              background: linear-gradient(90deg, #f8fafc 0%, #e2e8f0 100%);
              border-bottom: 2px solid #cbd5e1;
            }
            
            .ant-descriptions-item-label {
              font-weight: 600;
              color: #374151;
            }
          `}</style>
        </div>
      </Content>
    </Layout>
  );
};

export default TransfusionHistory;