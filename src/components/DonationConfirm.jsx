import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../services/user.service";
import {
  Table,
  Button,
  Modal,
  Form,
  Layout,
  Select,
  InputNumber,
  Space,
  Tag,
  Popconfirm,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  notification,
  Badge,
  Tooltip,
  Alert,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  BulbOutlined,
  ReloadOutlined,
  HeartOutlined,
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import "../styles/staff.css";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const API_BASE = "http://localhost:8080";

const DonationConfirm = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  // // ===== DỮ LIỆU MẪU - XÓA SAU KHI TÍCH HỢP API =====
  // const SAMPLE_DATA = [
  //   {
  //     registrationId: 1,
  //     userId: 101,
  //     requestId: 501,
  //     bloodUnitId: "BU001",
  //     scheduledDate: "2024-01-15T08:00:00Z",
  //     status: "PENDING",
  //     donorName: "Nguyễn Văn An",
  //     phone: "0901234567",
  //     bloodType: "A+",
  //     weight: 65
  //   },
  //   {
  //     registrationId: 2,
  //     userId: 102,
  //     requestId: null,
  //     bloodUnitId: "BU002",
  //     scheduledDate: "2024-01-15T09:00:00Z",
  //     status: "CONFIRMED",
  //     donorName: "Trần Thị Bình",
  //     phone: "0912345678",
  //     bloodType: "O+",
  //     weight: 58
  //   },
  //   {
  //     registrationId: 3,
  //     userId: 103,
  //     requestId: 503,
  //     bloodUnitId: "BU003",
  //     scheduledDate: "2024-01-15T10:00:00Z",
  //     status: "DONATED",
  //     donorName: "Lê Hoàng Cường",
  //     phone: "0923456789",
  //     bloodType: "B+",
  //     weight: 72
  //   },
  //   {
  //     registrationId: 4,
  //     userId: 104,
  //     requestId: 504,
  //     bloodUnitId: "BU004",
  //     scheduledDate: "2024-01-15T11:00:00Z",
  //     status: "CANCELLED",
  //     donorName: "Phạm Thị Dung",
  //     phone: "0934567890",
  //     bloodType: "AB+",
  //     weight: 55
  //   },
  //   {
  //     registrationId: 5,
  //     userId: 105,
  //     requestId: 505,
  //     bloodUnitId: "BU005",
  //     scheduledDate: "2024-01-15T14:00:00Z",
  //     status: "CONFIRMED",
  //     donorName: "Võ Minh Hiếu",
  //     phone: "0945678901",
  //     bloodType: "O-",
  //     weight: 78
  //   }
  // ];
  // // ===== HẾT DỮ LIỆU MẪU =====

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = () => {
    setLoading(true);

    // // ===== SỬ DỤNG DỮ LIỆU MẪU THAY VÌ API - XÓA SAU KHI TÍCH HỢP =====
    // setTimeout(() => {
    //   setDonations(SAMPLE_DATA);
    //   setLoading(false);
    //   notification.success({
    //     message: 'Thành công',
    //     description: 'Tải danh sách hiến máu thành công',
    //     icon: <HeartOutlined style={{ color: '#ff4d4f' }} />
    //   });
    // }, 1000);

    // ===== CODE GỐC - BỎ COMMENT KHI TÍCH HỢP API =====
    axios
      .get(`${API_BASE}/api/donation`, {
        headers: getAuthHeader(),
      })
      .then((res) => {
        console.log("📦 Dữ liệu nhận được:", res.data);
        setDonations(res.data);
        setLoading(false);
        notification.success({
          message: 'Thành công',
          description: 'Tải danh sách hiến máu thành công',
          icon: <HeartOutlined style={{ color: '#ff4d4f' }} />
        });
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          if (err.response.status === 401) {
            notification.error({
              message: 'Lỗi xác thực',
              description: 'Chưa xác thực (401 Unauthorized)'
            });
          } else if (err.response.status === 403) {
            notification.error({
              message: 'Không có quyền',
              description: 'Không có quyền truy cập (403 Forbidden)'
            });
          } else {
            notification.error({
              message: 'Lỗi máy chủ',
              description: `Lỗi máy chủ: ${err.response.status}`
            });
          }
        } else {
          notification.error({
            message: 'Lỗi kết nối',
            description: 'Lỗi mạng hoặc không kết nối được đến server'
          });
        }
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [suggestModalVisible, setSuggestModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("edit");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [form] = Form.useForm();
  const [suggestForm] = Form.useForm();

  const [savedVolumes, setSavedVolumes] = useState(() => {
    const saved = localStorage.getItem("savedVolumes");
    return saved ? JSON.parse(saved) : {};
  });

  const [statusMap, setStatusMap] = useState(() => {
    const saved = localStorage.getItem("statusMap");
    return saved ? JSON.parse(saved) : {};
  });

  const getStatusInfo = (status, registrationId) => {
    let displayStatus = statusMap[registrationId] || status;

    const statusConfig = {
      'PENDING': { color: 'orange', text: 'Đang chờ', icon: <CalendarOutlined /> },
      'CONFIRMED': { color: 'blue', text: 'Đang xử lý', icon: <CheckCircleOutlined /> },
      'DONATED': { color: 'purple', text: 'Chưa nhập dữ liệu', icon: <MedicineBoxOutlined /> },
      'CANCELLED': { color: 'red', text: 'Đã hủy', icon: <CloseCircleOutlined /> },
      'DATA_ENTERED': { color: 'green', text: 'Đã nhập dữ liệu', icon: <CheckCircleOutlined /> }
    };

    // Override với statusMap nếu có
    if (statusMap[registrationId] === "Đang xử lý...") {
      return { color: 'blue', text: 'Đang xử lý', icon: <CheckCircleOutlined /> };
    } else if (statusMap[registrationId] === "Đã hủy") {
      return { color: 'red', text: 'Đã hủy', icon: <CloseCircleOutlined /> };
    } else if (statusMap[registrationId] === "Chưa nhập dữ liệu") {
      return { color: 'purple', text: 'Chưa nhập dữ liệu', icon: <MedicineBoxOutlined /> };
    } else if (statusMap[registrationId] === "Đã nhập dữ liệu") {
      return { color: 'green', text: 'Đã nhập dữ liệu', icon: <CheckCircleOutlined /> };
    }

    return statusConfig[displayStatus] || statusConfig['PENDING'];
  };

  const handleStatusChange = (id, newStatus) => {
    let statusEnum;
    if (newStatus === "Đang xử lý...") statusEnum = "CONFIRMED";
    else if (newStatus === "Đã hủy") statusEnum = "CANCELLED";
    else if (newStatus === "Chưa nhập dữ liệu") statusEnum = "DONATED";

    if (statusEnum === "CONFIRMED") {
      axios.put(`${API_BASE}/api/donation/confirm?register_id=${id}`, null, {
        headers: getAuthHeader(),
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error("❌ Không thể cập nhật trạng thái:", err);
        });
    } else {
      const updated = { ...statusMap, [id]: newStatus };
      setStatusMap(updated);
      localStorage.setItem("statusMap", JSON.stringify(updated));
    }
  };

  //     // ===== MÔ PHỎNG THÀNH CÔNG - XÓA SAU KHI TÍCH HỢP =====
  //     const updated = { ...statusMap, [id]: newStatus };
  //     setStatusMap(updated);
  //     localStorage.setItem("statusMap", JSON.stringify(updated));
  //     notification.success({
  //       message: 'Thành công',
  //       description: 'Cập nhật trạng thái thành công'
  //     });
  //   } else {
  //     const updated = { ...statusMap, [id]: newStatus };
  //     setStatusMap(updated);
  //     localStorage.setItem("statusMap", JSON.stringify(updated));

  //     notification.success({
  //       message: 'Thành công',
  //       description: 'Cập nhật trạng thái thành công'
  //     });
  //   }
  // };

  const handleOpenModal = (item, mode = "edit") => {
    setSelectedDonation(item);
    setModalMode(mode);
    const savedData = savedVolumes[item.registrationId] || {
      total: "",
      redCells: "",
      platelets: "",
      plasma: "",
      bloodType: ""
    };
    form.setFieldsValue(savedData);
    setModalVisible(true);
  };

  const handleSaveVolume = () => {
    form.validateFields().then(values => {
      const updated = { ...savedVolumes, [selectedDonation.registrationId]: values };
      setSavedVolumes(updated);
      localStorage.setItem("savedVolumes", JSON.stringify(updated));
      handleStatusChange(selectedDonation.registrationId, "Đã nhập dữ liệu");
      setModalVisible(false);

      // ===== GỌI API TÁCH MÁU - CODE GỐC =====

      let method = "CENTRIFUGE";
      const suggestData = suggestForm.getFieldsValue();
      if (suggestData.method === "gạn tách") method = "MACHINE";
      if (suggestData.method === "li tâm") method = "CENTRIFUGE";

      axios.post(
        `${API_BASE}/api/separation-orders/create-manual`,
        null,
        {
          headers: getAuthHeader(),
          params: {
            bloodBagId: 10,
            operatorId: selectedDonation.userId,
            machineId: 1,
            type: method,
            note: "Tách từ giao diện xác nhận hiến máu"
          }
        }
      ).then(res => {
        console.log("✅ Tạo lệnh tách máu thành công:", res.data);
        notification.success({
          message: 'Thành công',
          description: 'Tạo lệnh tách máu thành công'
        });
      }).catch(err => {
        console.error("❌ Tạo lệnh tách máu thất bại:", err);
        notification.error({
          message: 'Lỗi',
          description: 'Tạo lệnh tách máu thất bại'
        });
      });


      notification.success({
        message: 'Thành công',
        description: 'Lưu thông tin lượng máu thành công'
      });
    });
  };

  const handleResetAll = () => {
    Modal.confirm({
      title: 'Xác nhận reset',
      content: 'Bạn có chắc chắn muốn reset tất cả thao tác? Dữ liệu đã lưu sẽ bị xóa.',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk: () => {
        localStorage.removeItem("savedVolumes");
        localStorage.removeItem("statusMap");
        setSavedVolumes({});
        setStatusMap({});
        suggestForm.resetFields();
        notification.success({
          message: 'Thành công',
          description: 'Đã reset tất cả thao tác'
        });
      }
    });
  };

  const handleApplySuggestion = () => {
    suggestForm.validateFields().then(values => {
      // Logic tính toán gợi ý dựa trên cân nặng và giới tính
      let suggestedTotal = 0;
      if (values.weight && values.weight >= 50) {
        suggestedTotal = values.gender === 'Nam' ? 450 : 400;
      }

      form.setFieldsValue({ total: suggestedTotal });
      setSuggestModalVisible(false);

      notification.success({
        message: 'Đã áp dụng gợi ý',
        description: `Lượng máu được gợi ý: ${suggestedTotal}ml`
      });
    });
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'registrationId',
      key: 'registrationId',
      width: 70,
      align: 'center',
      render: (text) => <Badge count={text} style={{ backgroundColor: '#52c41a' }} />
    },
    {
      title: 'Thông tin người hiến',
      key: 'donorInfo',
      width: 200,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            {record.donorName || `User ${record.userId}`}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            ID: {record.userId} | SĐT: {record.phone || 'N/A'}
          </div>
          <Tag color="blue" size="small">{record.bloodType || 'N/A'}</Tag>
          <Tag color="green" size="small">{record.weight || 'N/A'}kg</Tag>
        </div>
      )
    },
    {
      title: 'Yêu cầu',
      dataIndex: 'requestId',
      key: 'requestId',
      align: 'center',
      width: 100,
      render: (text) => text ? <Tag color="orange">#{text}</Tag> : <Text type="secondary">-</Text>
    },
    {
      title: 'Mã túi máu',
      dataIndex: 'bloodUnitId',
      key: 'bloodUnitId',
      align: 'center',
      width: 120,
      render: (text) => text ? <Tag color="red">{text}</Tag> : <Text type="secondary">-</Text>
    },
    {
      title: 'Ngày hiến',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      width: 120,
      render: (text) => (
        <div style={{ textAlign: 'center' }}>
          <CalendarOutlined style={{ marginRight: 4, color: '#1890ff' }} />
          <div>{new Date(text).toLocaleDateString('vi-VN')}</div>
          <div style={{ fontSize: '11px', color: '#666' }}>
            {new Date(text).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 140,
      render: (_, record) => {
        const statusInfo = getStatusInfo(record.status, record.registrationId);
        return (
          <Tag
            color={statusInfo.color}
            icon={statusInfo.icon}
            style={{ minWidth: '120px', textAlign: 'center' }}
          >
            {statusInfo.text}
          </Tag>
        );
      }
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 180,
      render: (_, record) => {
        const statusInfo = getStatusInfo(record.status, record.registrationId);
        const hasVolume = savedVolumes[record.registrationId];
        const isCancelled = statusInfo.text === "Đã hủy";

        if (isCancelled) {
          return <Text type="secondary">Đã hủy</Text>;
        }

        const actions = [];

        if (statusInfo.text === "Đang chờ") {
          actions.push(
            <Button
              key="confirm"
              type="primary"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => handleStatusChange(record.registrationId, "Đang xử lý...")}
            >
              Xác nhận
            </Button>
          );
        } else if (statusInfo.text === "Đang xử lý") {
          actions.push(
            <Button
              key="complete"
              type="default"
              size="small"
              style={{ backgroundColor: '#faad14', borderColor: '#faad14', color: 'white' }}
              icon={<CheckCircleOutlined />}
              onClick={() => handleStatusChange(record.registrationId, "Chưa nhập dữ liệu")}
            >
              Hoàn thành
            </Button>
          );
        } else if (statusInfo.text === "Chưa nhập dữ liệu") {
          actions.push(
            <Button
              key="input"
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleOpenModal(record, "edit")}
            >
              Nhập máu
            </Button>
          );
        } else if (statusInfo.text === "Đã nhập dữ liệu") {
          actions.push(
            <Button
              key="view"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleOpenModal(record, "view")}
              style={{ marginRight: 4 }}
            >
              Xem
            </Button>
          );
          actions.push(
            <Button
              key="edit"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleOpenModal(record, "edit")}
            >
              Sửa
            </Button>
          );
        }

        return <Space size="small">{actions}</Space>;
      }
    },
    {
      title: 'Hủy',
      key: 'cancel',
      width: 80,
      align: 'center',
      render: (_, record) => {
        const statusInfo = getStatusInfo(record.status, record.registrationId);
        if (statusInfo.text === "Đã hủy") {
          return null;
        }

        return (
          <Popconfirm
            title="Xác nhận hủy"
            description="Bạn có chắc chắn muốn hủy đăng ký hiến máu này?"
            onConfirm={() => handleStatusChange(record.registrationId, "Đã hủy")}
            okText="Xác nhận"
            cancelText="Không"
          >
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        );
      }
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#ff4d4f' }}>
              <HeartOutlined style={{ marginRight: 8 }} />
              Quản lý hiến máu
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
          <Text type="secondary">Bảng điều khiển xác nhận và quản lý các đăng ký hiến máu</Text>
          <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
            <Col>
              <Space>
                <Tooltip title="Làm mới dữ liệu">
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={loadDonations}
                    loading={loading}
                  >
                    Làm mới
                  </Button>
                </Tooltip>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleResetAll}
                >
                  Reset thao tác
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Thống kê nhanh */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', backgroundColor: '#fff2e8' }}>
                <Text strong style={{ color: '#fa8c16' }}>Đang chờ</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                  {donations.filter(d => getStatusInfo(d.status, d.registrationId).text === 'Đang chờ').length}
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', backgroundColor: '#e6f7ff' }}>
                <Text strong style={{ color: '#1890ff' }}>Đang xử lý</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                  {donations.filter(d => getStatusInfo(d.status, d.registrationId).text === 'Đang xử lý').length}
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f6ffed' }}>
                <Text strong style={{ color: '#52c41a' }}>Hoàn thành</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                  {donations.filter(d => getStatusInfo(d.status, d.registrationId).text === 'Đã nhập dữ liệu').length}
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" style={{ textAlign: 'center', backgroundColor: '#fff1f0' }}>
                <Text strong style={{ color: '#ff4d4f' }}>Đã hủy</Text>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                  {donations.filter(d => getStatusInfo(d.status, d.registrationId).text === 'Đã hủy').length}
                </div>
              </Card>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={donations}
            rowKey="registrationId"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`
            }}
            scroll={{ x: 1200 }}
            rowClassName={(record) => {
              const statusInfo = getStatusInfo(record.status, record.registrationId);
              return statusInfo.text === 'Đã hủy' ? 'cancelled-row' : '';
            }}
          />
        </Card>

        {/* Modal nhập/xem lượng máu */}
        <Modal
          title={
            <div style={{ textAlign: 'center' }}>
              <MedicineBoxOutlined style={{ marginRight: 8, color: '#ff4d4f' }} />
              {modalMode === "view" ? "Xem thông tin lượng máu" : "Nhập thông tin lượng máu"}
            </div>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          width={600}
          footer={null}
        >
          {selectedDonation && (
            <>
              <Alert
                message={`Người hiến: ${selectedDonation.donorName || `User ${selectedDonation.userId}`}`}
                description={`Ngày hiến: ${new Date(selectedDonation.scheduledDate).toLocaleString('vi-VN')}`}
                type="info"
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSaveVolume}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Tổng lượng máu (ml)"
                      name="total"
                      rules={[{ required: true, message: 'Vui lòng nhập tổng lượng máu' }]}
                    >
                      <InputNumber
                        min={0}
                        max={650}
                        style={{ width: '100%' }}
                        placeholder="Nhập tổng lượng"
                        disabled={modalMode === "view"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Nhóm máu"
                      name="bloodType"
                      rules={[{ required: true, message: 'Vui lòng chọn nhóm máu' }]}
                    >
                      <Select placeholder="Chọn nhóm máu" disabled={modalMode === "view"}>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                          <Option key={type} value={type}>{type}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Divider orientation="left">Chi tiết thành phần</Divider>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item label="Hồng cầu (ml)" name="redCells">
                      <InputNumber
                        min={0}
                        max={650}
                        style={{ width: '100%' }}
                        disabled={modalMode === "view"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Tiểu cầu (ml)" name="platelets">
                      <InputNumber
                        min={0}
                        max={650}
                        style={{ width: '100%' }}
                        disabled={modalMode === "view"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Huyết tương (ml)" name="plasma">
                      <InputNumber
                        min={0}
                        max={650}
                        style={{ width: '100%' }}
                        disabled={modalMode === "view"}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider />

                <Row justify="end" gutter={8}>
                  {modalMode === "edit" && (
                    <>
                      <Col>
                        <Button
                          icon={<BulbOutlined />}
                          onClick={() => setSuggestModalVisible(true)}
                        >
                          Gợi ý
                        </Button>
                      </Col>
                      <Col>
                        <Button type="primary" htmlType="submit">
                          Lưu thông tin
                        </Button>
                      </Col>
                    </>
                  )}
                  <Col>
                    <Button onClick={() => setModalVisible(false)}>
                      Đóng
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Modal>

        {/* Modal gợi ý */}
        <Modal
          title={
            <div style={{ textAlign: 'center' }}>
              <BulbOutlined style={{ marginRight: 8, color: '#faad14' }} />
              Gợi ý lượng máu
            </div>
          }
          open={suggestModalVisible}
          onCancel={() => setSuggestModalVisible(false)}
          footer={null}
          width={400}
        >
          <Alert
            message="Thông tin gợi ý"
            description="Nhập thông tin cơ bản để hệ thống tính toán lượng máu phù hợp"
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Form
            form={suggestForm}
            layout="vertical"
            onFinish={handleApplySuggestion}
          >
            <Form.Item
              label="Cân nặng (kg)"
              name="weight"
              rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}
            >
              <InputNumber
                min={0}
                max={200}
                style={{ width: '100%' }}
                placeholder="Nhập cân nặng"
              />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
            >
              <Select placeholder="Chọn giới tính">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Phương pháp tách" name="method">
              <Select placeholder="Chọn phương pháp tách">
                <Option value="gạn tách">Gạn tách</Option>
                <Option value="li tâm">Li tâm</Option>
              </Select>
            </Form.Item>

            <Divider />

            <Row justify="end" gutter={8}>
              <Col>
                <Button onClick={() => setSuggestModalVisible(false)}>
                  Hủy
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Áp dụng gợi ý
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal>

        {/* CSS tùy chỉnh */}
        <style jsx>{`
        .cancelled-row {
          background-color: #f5f5f5 !important;
          opacity: 0.7;
        }
        
        .cancelled-row td {
          color: #999 !important;
        }

        .ant-table-tbody > tr:hover.cancelled-row > td {
          background-color: #f0f0f0 !important;
        }

        .ant-card {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border-radius: 8px;
        }

        .ant-table-thead > tr > th {
          background-color: #fafafa;
          font-weight: 600;
        }

        .ant-btn-primary {
          background-color: #ff4d4f;
          border-color: #ff4d4f;
        }

        .ant-btn-primary:hover {
          background-color: #ff7875;
          border-color: #ff7875;
        }

        .ant-tag {
          border-radius: 4px;
          font-weight: 500;
        }

        .ant-modal-header {
          border-radius: 8px 8px 0 0;
        }

        .ant-alert {
          border-radius: 6px;
        }

        .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
          background-color: #ff4d4f;
          border-color: #ff4d4f;
        }
      `}</style>
      </Content>
    </Layout>
    );
};

export default DonationConfirm;