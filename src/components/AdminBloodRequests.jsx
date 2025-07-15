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
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  WarningOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminBloodRequests = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [timePeriod, setTimePeriod] = useState('custom');

  // Cấu hình hiển thị trạng thái
  const statusConfig = {
    PENDING: { color: 'warning', text: 'CHỜ DUYỆT', icon: <ExclamationCircleOutlined /> },
    APPROVED: { color: 'success', text: 'ĐÃ DUYỆT', icon: <CheckCircleOutlined /> },
    REJECTED: { color: 'error', text: 'TỪ CHỐI', icon: <ExclamationCircleOutlined /> },
    WAITING: { color: 'processing', text: 'CHỜ MÁU', icon: <ClockCircleOutlined /> }
  };

  // TODO: MOCK DATA -- XÓA KHI TÍCH HỢP API
  // Dữ liệu mẫu: Đơn từ staff gửi lên, mặc định là CHỜ DUYỆT
  const [mockData, setMockData] = useState([
    {
      id: 101,                              // ID yêu cầu
      patientName: 'Nguyễn Văn A',         // Tên bệnh nhân
      bloodType: 'A+',                     // Nhóm máu
      age: 35,                             // Tuổi
      volume: '400ml',                     // Lượng máu yêu cầu
      priority: 'RED',                     // Mức ưu tiên: RED, YELLOW, GREEN
      status: 'PENDING',                   // Trạng thái: PENDING (mặc định từ staff)
      createdDate: '01/07/2025',           // Ngày tạo yêu cầu
      requester: {
        name: 'Bác sĩ Trần Thị B',         // Người gửi yêu cầu
        phone: '0909123456',               // SĐT người gửi
      },
      reason: 'Mổ cấp cứu',                // Lý do yêu cầu
      bagCount: 2,                         // Số túi
      bloodComponent: 'Toàn phần',         // Thành phần máu
      notes: {
        warning: 'Không dị ứng thành phần nào',      // Ghi chú warning
        special: 'Chuyển viện nội thành',           // Ghi chú đặc biệt
        emergency: 'Ưu tiên đầu mối cấp cứu',        // Ghi chú khẩn cấp
      },
      processingTime: {
        requestTime: '01/07/2025 08:30',  // Thời gian yêu cầu
        createdTime: '01/07/2025 09:00',  // Thời gian hệ thống tạo
        approvedTime: '',                 // Chưa duyệt
        processingDuration: '—',          // Chưa xử lý xong
      },
      patientInfo: {
        weight: 60,                       // Cân nặng (kg)
        phone: '0912233445',              // SĐT bệnh nhân
        donnorId: 555,                    // Mã bệnh nhân
      }
    },
    {
      id: 102,
      patientName: 'Lê Thị C',
      bloodType: 'B−',
      age: 28,
      volume: '200ml',
      priority: 'YELLOW',
      status: 'PENDING',                   // Mặc định chờ duyệt
      createdDate: '30/06/2025',
      requester: { name: 'BS. Nguyễn D', phone: '0918765432' },
      reason: 'Thiếu máu mãn tính',
      bagCount: 1,
      bloodComponent: 'Hồng cầu',
      notes: { warning: '', special: '', emergency: '' },
      processingTime: {
        requestTime: '30/06/2025 14:00',
        createdTime: '30/06/2025 14:30',
        approvedTime: '',
        processingDuration: '—',
      },
      patientInfo: { weight: 52, phone: '0987654321', donnorId: 556 }
    },
    {
      id: 103,
      patientName: 'Phạm Văn E',
      bloodType: 'O+',
      age: 42,
      volume: '300ml',
      priority: 'GREEN',
      status: 'PENDING',                   // Mặc định chờ duyệt
      createdDate: '29/06/2025',
      requester: { name: 'BS. Trần F', phone: '0903344556' },
      reason: 'Theo dõi sau phẫu thuật',
      bagCount: 1,
      bloodComponent: 'Huyết tương',
      notes: { warning: 'Tiền sử dị ứng thuốc', special: '', emergency: '' },
      processingTime: {
        requestTime: '29/06/2025 10:00',
        createdTime: '29/06/2025 10:20',
        approvedTime: '',
        processingDuration: '—',
      },
      patientInfo: { weight: 70, phone: '0932123456', donnorId: 557 }
    },
    {
      id: 104,
      patientName: 'Trần Văn G',
      bloodType: 'AB+',
      age: 45,
      volume: '500ml',
      priority: 'RED',
      status: 'PENDING',                   // Mặc định chờ duyệt
      createdDate: '28/06/2025',
      requester: { name: 'BS. Lê H', phone: '0901122334' },
      reason: 'Phẫu thuật tim',
      bagCount: 2,
      bloodComponent: 'Toàn phần',
      notes: { warning: 'Cần theo dõi huyết áp', special: 'Ca phẫu thuật phức tạp', emergency: 'Ưu tiên cấp 1' },
      processingTime: {
        requestTime: '28/06/2025 07:00',
        createdTime: '28/06/2025 07:30',
        approvedTime: '',
        processingDuration: '—',
      },
      patientInfo: { weight: 75, phone: '0945678901', donnorId: 558 }
    }
  ]);

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
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    console.log({
      searchText,
      statusFilter,
      dateRange,
      timePeriod
    });
    // Thực hiện logic tìm kiếm ở đây
  };

  // Hàm xử lý thay đổi trạng thái
  const handleStatusChange = (recordId, newStatus) => {
    const now = dayjs();
    setMockData(prevData =>
      prevData.map(record =>
        record.id === recordId
          ? {
            ...record,
            status: newStatus,
            processingTime: {
              ...record.processingTime,
              approvedTime: newStatus === 'APPROVED' || newStatus === 'WAITING'
                ? now.format('DD/MM/YYYY HH:mm')
                : (newStatus === 'REJECTED' ? '' : record.processingTime.approvedTime),
              processingDuration: newStatus !== 'PENDING'
                ? now.diff(dayjs(record.processingTime.createdTime, 'DD/MM/YYYY HH:mm'), 'minute') + 'm'
                : '—'
            }
          }
          : record
      )
    );

    // Cập nhật selectedRecord nếu đang xem chi tiết record này
    if (selectedRecord?.id === recordId) {
      setSelectedRecord(prev => ({
        ...prev,
        status: newStatus,
        processingTime: {
          ...prev.processingTime,
          approvedTime: newStatus === 'APPROVED' || newStatus === 'WAITING'
            ? now.format('DD/MM/YYYY HH:mm')
            : (newStatus === 'REJECTED' ? '' : prev.processingTime.approvedTime),
          processingDuration: newStatus !== 'PENDING'
            ? now.diff(dayjs(prev.processingTime.createdTime, 'DD/MM/YYYY HH:mm'), 'minute') + 'm'
            : '—'
        }
      }));
    }
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
      align: 'center',
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
          YELLOW: { color: 'orange', icon: <WarningOutlined />, text: 'GẤP' },
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      filteredValue: statusFilter === 'all' ? null : [statusFilter],
      onFilter: (value, record) => record.status === value,
      render: (status, record) => {
        const { color, text, icon } = statusConfig.PENDING;

        // // Nếu trạng thái là PENDING, hiển thị dropdown để admin chọn
        // if (status === 'PENDING') {
        //   return (
        //     <Select
        //       size="middle"
        //       value={statusConfig[status].text}
        //       onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
        //       className="w-full"
        //       placeholder="Chọn trạng thái"
        //     >
        //       <Option value="PENDING" disabled>
        //         <Tag color="warning" icon={<ClockCircleOutlined />} className="font-semibold m-0">
        //           CHỜ DUYỆT
        //         </Tag>
        //       </Option>
        //       <Option value="APPROVED">
        //         <Tag color="success" icon={<CheckCircleOutlined />} className="font-semibold m-0">
        //           ĐÃ DUYỆT
        //         </Tag>
        //       </Option>
        //       <Option value="REJECTED">
        //         <Tag color="error" icon={<ExclamationCircleOutlined />} className="font-semibold m-0">
        //           TỪ CHỐI
        //         </Tag>
        //       </Option>
        //       <Option value="WAITING">
        //         <Tag color="processing" icon={<ClockCircleOutlined />} className="font-semibold m-0">
        //           CHỜ MÁU
        //         </Tag>
        //       </Option>
        //     </Select>
        //   );
        // }

        // // Nếu trạng thái là WAITING, chỉ cho chọn APPROVED hoặc REJECTED
        // if (status === 'WAITING') {
        //   return (
        //     <Select
        //       size="middle"
        //       value={statusConfig[status].text}
        //       onChange={newStatus => handleStatusChange(record.id, newStatus)}
        //       className="w-full"
        //       placeholder="Chọn hành động"
        //     >
        //       <Option value="APPROVED">
        //         <Tag color="success" icon={<CheckCircleOutlined />} className="font-semibold m-0">
        //           ĐÃ DUYỆT
        //         </Tag>
        //       </Option>
        //       <Option value="REJECTED">
        //         <Tag color="error" icon={<ExclamationCircleOutlined />} className="font-semibold m-0">
        //           TỪ CHỐI
        //         </Tag>
        //       </Option>
        //     </Select>
        //   );
        // }

        // Nếu đã có trạng thái khác PENDING, chỉ hiển thị tag
        return (
          <Tag color={color} icon={icon} className="font-semibold">
            {text}
          </Tag>
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

  const handleViewDetail = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  // Hàm render footer của modal
const renderModalFooter = () => {
  if (!selectedRecord) return null;

  const footerButtons = [
    <Button key="close" onClick={handleCloseModal} className="ml-2">
      Đóng
    </Button>
  ];

  if (selectedRecord.status === 'PENDING') {
    // Hiển thị 3 nút cho trạng thái PENDING với style có background màu
    footerButtons.unshift(
      <Button
        key="approve"
        type="default"
        icon={<CheckCircleOutlined />}
        onClick={() => handleStatusChange(selectedRecord.id, 'APPROVED')}
        className="bg-green-50 hover:bg-green-100 border-green-300 text-green-700 font-semibold"
        style={{ 
          backgroundColor: '#f0f9ff', 
          borderColor: '#52c41a',
          color: '#52c41a'
        }}
      >
        ĐÃ DUYỆT
      </Button>,
      <Button
        key="waiting"
        type="default"
        icon={<ClockCircleOutlined />}
        onClick={() => handleStatusChange(selectedRecord.id, 'WAITING')}
        className="bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-700 font-semibold"
        style={{ 
          backgroundColor: '#e6f7ff', 
          borderColor: '#1890ff',
          color: '#1890ff'
        }}
      >
        CHỜ MÁU
      </Button>,
      <Button
        key="reject"
        type="default"
        icon={<ExclamationCircleOutlined />}
        onClick={() => handleStatusChange(selectedRecord.id, 'REJECTED')}
        className="bg-red-50 hover:bg-red-100 border-red-300 text-red-700 font-semibold"
        style={{ 
          backgroundColor: '#fff1f0', 
          borderColor: '#ff4d4f',
          color: '#ff4d4f'
        }}
      >
        TỪ CHỐI
      </Button>
    );
  } else if (selectedRecord.status === 'WAITING') {
    // Hiển thị 2 nút cho trạng thái WAITING với style có background màu
    footerButtons.unshift(
      <Button
        key="approve"
        type="default"
        icon={<CheckCircleOutlined />}
        onClick={() => handleStatusChange(selectedRecord.id, 'APPROVED')}
        className="bg-green-50 hover:bg-green-100 border-green-300 text-green-700 font-semibold"
        style={{ 
          backgroundColor: '#f0f9ff', 
          borderColor: '#52c41a',
          color: '#52c41a'
        }}
      >
        <CheckCircleOutlined className="mr-1" />
        ĐÃ DUYỆT
      </Button>,
      <Button
        key="reject"
        type="default"
        icon={<ExclamationCircleOutlined />}
        onClick={() => handleStatusChange(selectedRecord.id, 'REJECTED')}
        className="bg-red-50 hover:bg-red-100 border-red-300 text-red-700 font-semibold"
        style={{ 
          backgroundColor: '#fff1f0', 
          borderColor: '#ff4d4f',
          color: '#ff4d4f'
        }}
      >
        <ExclamationCircleOutlined className="mr-1" />
        TỪ CHỐI
      </Button>
    );
  }

  return footerButtons;
};

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <HeartOutlined style={{ marginRight: 8 }} />
              Quản lý lịch sử truyền máu
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

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
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
            <Col span={4}>
              <Select
                placeholder="Lọc theo trạng thái"
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-full"
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="PENDING">Chờ duyệt</Option>
                <Option value="APPROVED">Đã duyệt</Option>
                <Option value="REJECTED">Từ chối</Option>
                <Option value="WAITING">Chờ máu</Option>
              </Select>
            </Col>
            <Col span={4}>
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
            <Col span={4}>
              <DatePicker placeholder="Chọn ngày" className="w-full" />
            </Col>
            <Col span={2}>
              <Button type="primary" icon={<SearchOutlined />} className="w-full">
                Tìm kiếm
              </Button>
            </Col>
          </Row>
          {/* Hàng thứ hai - Date Range Picker */}
          <Row gutter={16} align="middle" className="mt-2">
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
            <Col span={5}>
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
            <Row>
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
            dataSource={mockData}
            rowKey="id"
            pagination={{
              total: mockData.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} trong ${total} bản ghi`,
            }}
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Detail Modal */}
        <Modal
          title={
            <div className="flex items-center">
              <Badge status="processing" color="green" />
              <Text strong className="text-lg ml-2">
                Yêu cầu #{selectedRecord?.id} - Trạng thái: {statusConfig[selectedRecord?.status]?.text || selectedRecord?.status}
              </Text>
            </div>
          }
          open={modalVisible}
          onCancel={handleCloseModal}
          footer={renderModalFooter()}
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
                        {(() => {
                          const { color, text, icon } = statusConfig[selectedRecord.status] || statusConfig.PENDING;
                          return (
                            <Tag color={color} icon={icon}>
                              {text}
                            </Tag>
                          );
                        })()}
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
                      <Descriptions.Item label="SĐT người phụ trách">
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
      
            </Content>
    </Layout>
  );
};

export default AdminBloodRequests;