import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthHeader } from "../services/user.service";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  Select,
  DatePicker,
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
  Steps,
  Alert
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
import { Descriptions } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const API_BASE = "http://localhost:8080";

const DonationConfirm = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [healthForm] = Form.useForm();
  useEffect(() => {
    loadDonations();
  }, [selectedDate]); // load lại khi đổi ngày

const loadDonations = () => {
  setLoading(true);
  axios
    .get(`${API_BASE}/api/donation`, {
      headers: getAuthHeader(),
    })
    .then((res) => {
      console.log("📦 Dữ liệu nhận được:", res.data);
      let data = res.data || [];

      // ✅ Sắp xếp theo ngày mới nhất → cũ nhất
      data.sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate));

      setDonations(data);

      // ✅ Lọc theo ngày nếu có selectedDate
      const selectedStr = selectedDate.format("YYYY-MM-DD");
      const filtered = data.filter(item => {
        if (Array.isArray(item.scheduledDate) && item.scheduledDate.length >= 3) {
          const [year, month, day] = item.scheduledDate;
          const itemStr = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
          return itemStr === selectedStr;
        }
        return false;
      });

      setFilteredDonations(filtered);
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
        notification.success({
          message: 'Thành công',
          description: 'Tải danh sách hiến máu thành công',
          icon: <HeartOutlined style={{ color: '#ff4d4f' }} />
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
  const [healthModalVisible, setHealthModalVisible] = useState(false);
  const [healthCheckForm, setHealthCheckForm] = useState(null); // dữ liệu từ API
  const [healthFormLoading, setHealthFormLoading] = useState(false);
  const [selectedRegisterId, setSelectedRegisterId] = useState(null);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  const [savedVolumes, setSavedVolumes] = useState(() => {
    const saved = localStorage.getItem("savedVolumes");
    return saved ? JSON.parse(saved) : {};
  });

  const [statusMap, setStatusMap] = useState(() => {
    const saved = localStorage.getItem("statusMap");
    return saved ? JSON.parse(saved) : {};
  });
  const updateStatusMap = (regId, value) => {
    const updated = { ...statusMap, [regId]: value };
    setStatusMap(updated);
    localStorage.setItem("statusMap", JSON.stringify(updated));
  };



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
    let apiUrl = "";

    if (newStatus === "Đang xử lý...") {
      apiUrl = `${API_BASE}/api/donation/confirm?register_id=${id}`;
    } else if (newStatus === "Chưa nhập dữ liệu") {
      apiUrl = `${API_BASE}/api/donation/mark-donated?register_id=${id}`;
    } else if (newStatus === "Đã hủy") {
      apiUrl = `${API_BASE}/api/donation/cancel?register_id=${id}`;
    }

    if (apiUrl) {
      axios
        .put(apiUrl, null, {
          headers: getAuthHeader(),
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error("❌ Không thể cập nhật trạng thái:", err);
        });
    } else {
      console.warn("⚠️ Trạng thái không hợp lệ:", newStatus);
    }
  };

  const { TextArea } = Input;

  const CreateBloodBagForm = (props) => {
    const { donorId, donationId, onSuccess } = props;


    const [form] = Form.useForm();

    const handleFinish = (values) => {
      console.log(donorId);
      const payload = {
        bloodBagId: null,
        bagCode: values.bagCode,
        bloodType: values.bloodType,
        rh: values.rh,
        volume: values.volume,
        hematocrit: values.hematocrit,
        collectedAt: values.collectedAt.format("YYYY-MM-DDTHH:mm:ss"),
        testStatus: values.testStatus,
        status: values.status,
        donorId: donorId?.toString(),
        registrationId: donationId,
        note: values.note,
      };

      axios
        .post("http://localhost:8080/api/blood-bags", payload, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          notification.success({ message: "Tạo túi máu thành công" });
          form.resetFields();
          onSuccess?.();
        })
        .catch(() => {
          notification.error({ message: "Lỗi khi tạo túi máu" });
        });
    };

    return (
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          status: "PENDING",
          rh: "+",
          collectedAt: dayjs(),
        }}
      >


        <Form.Item
          name="bagCode"
          label="Mã túi máu"
          rules={[{ required: true, message: "Bắt buộc nhập mã túi máu" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="bloodType"
          label="Nhóm máu"
          rules={[{ required: true, message: "Chọn nhóm máu" }]}
        >
          <Select placeholder="Chọn nhóm máu">
            <Option value="1">A+</Option>
            <Option value="2">A−</Option>
            <Option value="3">B+</Option>
            <Option value="4">B−</Option>
            <Option value="5">AB+</Option>
            <Option value="6">AB−</Option>
            <Option value="7">O+</Option>
            <Option value="8">O−</Option>
          </Select>

        </Form.Item>

        <Form.Item
          name="rh"
          label="Rh"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="D+">D+</Option>
            <Option value="D-">D-</Option>
          </Select>

        </Form.Item>

        <Form.Item
          name="volume"
          label="Thể tích (ml)"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        {/* <Form.Item name="hematocrit" label="Hematocrit (%)">
          <InputNumber step={0.01} style={{ width: "100%" }} />
        </Form.Item> */}

        <Form.Item
          name="collectedAt"
          label="Ngày lấy máu"
          rules={[{ required: true }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="testStatus" label="Trạng thái xét nghiệm">
          <Select>
            <Option value="PENDING">PENDING</Option>
            <Option value="PASSED">PASSED</Option>
            <Option value="FAILED">FAILED</Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Trạng thái túi máu">
          <Select>
            <Option value="COLLECTED">COLLECTED</Option>
            <Option value="SEPARATED">SEPARATED</Option>
            <Option value="USED">USED</Option>
          </Select>
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Tạo túi máu
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const bloodTypeOptions = [
    { id: 1, label: "A+" },
    { id: 2, label: "A-" },
    { id: 3, label: "B+" },
    { id: 4, label: "B-" },
    { id: 5, label: "AB+" },
    { id: 6, label: "AB-" },
    { id: 7, label: "O+" },
    { id: 8, label: "O-" }
  ];
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
      // ✅ 1. Lưu volume vào local state + localStorage
      const updated = { ...savedVolumes, [selectedDonation.registrationId]: values };
      setSavedVolumes(updated);
      localStorage.setItem("savedVolumes", JSON.stringify(updated));
      handleStatusChange(selectedDonation.registrationId, "Đã nhập dữ liệu");
      updateStatusMap(selectedDonation.registrationId, "Đã nhập dữ liệu");
      setModalVisible(false);

      // ✅ 2. Xác định phương pháp tách
      let method = "CENTRIFUGE";
      const suggestData = suggestForm.getFieldsValue();
      if (suggestData.method === "gạn tách") method = "MACHINE";
      if (suggestData.method === "li tâm") method = "CENTRIFUGE";

      const registrationId = selectedDonation.registrationId;

      // ✅ 3. Gọi API lấy túi máu
      axios.get(`${API_BASE}/api/blood-bags/by-registration`, {
        params: { registrationId },
        headers: getAuthHeader()
      }).then(res => {
        const bags = res.data;
        if (!bags || bags.length === 0) {
          notification.error({
            message: "Không tìm thấy túi máu",
            description: "Vui lòng kiểm tra lại túi máu đã được tạo hay chưa"
          });
          return;
        }

        const validBag = bags.find(b => b.testStatus === "PASSED" && b.status === "AVAILABLE") || bags[0];
        const bloodBagId = validBag.bloodBagId;

        // ✅ 4. Chuẩn bị params để gửi API
        const params = {
          bloodBagId,
          operatorId: selectedDonation?.userId,
          machineId: 1, // ✅ thêm dòng này
          type: method,
          redCellsMl: values.redCellsMl,
          plasmaMl: values.plasmaMl,
          plateletsMl: values.plateletsMl,
          note: "Tách từ giao diện xác nhận hiến máu",
          bagCode: validBag.bagCode,       // ✅ truyền lên cùng
          status: "AVAILABLE"
        };

        axios.post(`${API_BASE}/api/separation-orders/create-manual`, null, {
          params,
          headers: getAuthHeader()
        }).then(() => {
          notification.success({
            message: "Tạo lệnh tách máu thành công"
          });
        }).catch(err => {
          console.error("❌ Lỗi tạo lệnh:", err);
          notification.error({
            message: "Tạo lệnh thất bại",
            description: err?.response?.data?.message || "Vui lòng kiểm tra thông tin tách máu"
          });
        });

      }).catch(err => {
        console.error("❌ Lỗi lấy túi máu:", err);
        notification.error({
          message: "Không tìm thấy túi máu",
          description: "Không thể tìm túi máu theo đơn đăng ký"
        });
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
  const handleViewHealthCheck = (record) => {
    const regId = record.registrationId;
    setSelectedRegisterId(regId);
    setHealthFormLoading(true);

    axios
      .get(`${API_BASE}/api/health-check`, {
        headers: getAuthHeader(),
        params: { registrationId: regId }
      })
      .then((res) => {
        console.log("🎯 Dữ liệu trả về:", res.data);
        setHealthCheckForm(res.data);             // Gán dữ liệu vào state
        healthForm.setFieldsValue(res.data);           // Nếu dùng Form để nhập
        setHealthModalVisible(true);   
           // ✅ Mở modal sau khi có dữ liệu
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          notification.warning({
            message: "Chưa có phiếu khám",
            description: `Đơn đăng ký #${regId} chưa có phiếu khám.`
          });
        } else {
          notification.error({
            message: "Lỗi tải phiếu khám",
            description: "Không thể tải phiếu khám sức khỏe."
          });
        }
      })
      .finally(() => setHealthFormLoading(false));
  };

  const handleCreateHealthCheck = (record) => {
    const regId = record.registrationId;
    setHealthFormLoading(true);

    axios
      .get(`${API_BASE}/api/health-check/get-or-create`, {
        headers: getAuthHeader(),
        params: { registrationId: regId }
      })
      .then((res) => {
        setHealthCheckForm(res.data); // hoặc có thể mở modal tại đây nếu muốn
        notification.success({
          message: "Tạo phiếu thành công",
          description: `Đã tạo phiếu khám cho đơn đăng ký #${regId}`,
        });
      })
      .catch((err) => {
        notification.error({
          message: "Lỗi tạo phiếu",
          description: err?.response?.data?.message || "Không thể tạo phiếu khám.",
        });
      })
      .finally(() => setHealthFormLoading(false));
  };
  const handleUpdateHealthCheck = () => {
    healthForm.validateFields()
      .then(values => {
        const {
          total,
          redCellsMl,
          plateletsMl,
          plasmaMl,
          bloodType,
          ...cleanedValues
        } = values;

        const payload = {
          ...healthCheckForm,
          ...cleanedValues
        };

        axios.put(`${API_BASE}/api/health-check/update`, payload, {
          headers: getAuthHeader()
        })
          .then(() => {
            notification.success({
              message: "Cập nhật thành công",
              description: "Phiếu khám sức khỏe đã được cập nhật."
            });
            setHealthModalVisible(false);
          })
          .catch(() => {
            notification.error({
              message: "Lỗi cập nhật",
              description: "Không thể cập nhật phiếu khám sức khỏe."
            });
          });
      })
      .catch(err => {
        console.log("❌ Validation failed:", err);
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
          {/* <Tag color="blue" size="small">{record.bloodType || 'N/A'}</Tag>
          <Tag color="green" size="small">{record.weight || 'N/A'}kg</Tag> */}
        </div>
      )
    },
    {
      title: 'Khám Sức khỏe',
      dataIndex: 'requestId',
      key: 'requestId',
      align: 'center',
      width: 180,
      render: (text, record) => (
        <>
          {text ? (
            <Tag color="orange">#{text}</Tag>
          ) : (
            <Text type="secondary"> </Text>
          )}
          <br />
          <Button
            size="small"
            type="link"
            onClick={() => handleViewHealthCheck(record)}
          >
            Xem phiếu khám
          </Button>

        </>
      )
    }
    ,

    {
      title: 'Túi máu',
      dataIndex: 'bloodBagId',
      key: 'bloodBagId',
      align: 'center',
      width: 160,
      render: (_, record) => (
        <Button
          size="small"
          type="primary"
          onClick={() => {
            console.log("🧪 selectedDonation = ", record); // THÊM Ở ĐÂY
            setSelectedDonation(record); // record là 1 dòng trong bảng
            setSelectedDonationId(record.donationId);
            setCreateModalVisible(true);
          }}
        >
          Tạo
        </Button>
      )
    }


    ,
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
              onClick={() => {
                handleStatusChange(record.registrationId, "Đang xử lý...");
                handleCreateHealthCheck(record);
              }}
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
              onClick={() => {
                handleOpenModal(record, "edit");

                // Gán trạng thái tạm vào statusMap để UI chuyển sang "Đã nhập dữ liệu"
                setStatusMap(prev => ({
                  ...prev,
                  [record.registrationId]: "DATA_ENTERED"
                }));
              }}
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
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      }
    }

  ];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Title level={2} style={{ margin: 0, color: '#ff4d4f' }}>
              <HeartOutlined style={{ marginRight: 12 }} />
              Quản lý Hiến máu
            </Title>
            <Text type="secondary">Bảng điều khiển xác nhận và quản lý các đăng ký hiến máu</Text>
          </Col>
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
                      {bloodTypeOptions.map(type => (
                        <Option key={type.id} value={type.id}>{type.label}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">Chi tiết thành phần</Divider>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Hồng cầu (ml)" name="redCellsMl">
                    <InputNumber
                      min={0}
                      max={650}
                      style={{ width: '100%' }}
                      disabled={modalMode === "view"}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Tiểu cầu (ml)" name="plateletsMl">
                    <InputNumber
                      min={0}
                      max={650}
                      style={{ width: '100%' }}
                      disabled={modalMode === "view"}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Huyết tương (ml)" name="plasmaMl">
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
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <MedicineBoxOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            Phiếu Khám Sức Khỏe
          </div>
        }
        open={healthModalVisible}
        onCancel={() => setHealthModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setHealthModalVisible(false)}>
            Hủy
          </Button>,
          <Button key="update" type="primary" onClick={handleUpdateHealthCheck}>
            Cập nhật
          </Button>
        ]}
        width={800}
      >
        {healthFormLoading ? (
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <Text>Đang tải dữ liệu...</Text>
          </div>
        ) : (
          <Form form={healthForm} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="heightCm" label="Chiều cao (cm)">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="weightKg" label="Cân nặng (kg)">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Huyết áp tâm thu / trương" style={{ marginBottom: 0 }}>
                  <Input.Group compact>
                    <Form.Item name="bloodPressureSys" noStyle>
                      <InputNumber placeholder="Tâm thu" style={{ width: '50%' }} />
                    </Form.Item>
                    <Form.Item name="bloodPressureDia" noStyle>
                      <InputNumber placeholder="Tâm trương" style={{ width: '50%' }} />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="bodyTemperature" label="Nhiệt độ (°C)">
                  <InputNumber style={{ width: '100%' }} step={0.1} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="heartRate" label="Mạch (bpm)">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="isEligible"
                  label="Đủ điều kiện hiến máu?"
                  valuePropName="checked"
                >
                  <Switch checkedChildren="Có" unCheckedChildren="Không" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="hasChronicIllness" label="Có bệnh mãn tính" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="hasFever" label="Đang bị sốt" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="isPregnantOrBreastfeeding" label="Mang thai / Cho con bú" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="hadRecentTattooOrSurgery" label="Xăm / phẫu thuật gần đây" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="hasRiskySexualBehavior" label="Quan hệ rủi ro" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="tookAntibioticsRecently" label="Dùng kháng sinh gần đây" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="notesByStaff" label="Ghi chú">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Modal
        title="Tạo túi máu mới"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <CreateBloodBagForm
          donorId={selectedDonation?.userId}               // Vì userId nằm trực tiếp trong selectedDonation
          donationId={selectedDonation?.registrationId}    // Vì registrationId nằm trực tiếp trong selectedDonation
          onSuccess={() => {
            setCreateModalVisible(false);
            loadDonations();
          }}
        />

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
    </div>
  );
};

export default DonationConfirm;