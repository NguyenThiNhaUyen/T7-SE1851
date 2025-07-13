import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Typography,
  Input,
  Select,
  Button,
  Tooltip,
  Badge,
} from "antd";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import "../styles/staff.css";

const { Title, Text } = Typography;
const { Option } = Select;

// 🩸 MOCK DATA
const mockUrgentRequests = [
  {
    id: 1,
    requester_name: "Nguyễn Văn A",
    blood_type: "O+",
    component_name: "Hồng cầu",
    quantity_ml: 500,
    status: "PENDING",
    created_at: "2025-07-12T10:15:00",
  },
  {
    id: 2,
    requester_name: "Trần Thị B",
    blood_type: "A-",
    component_name: "Tiểu cầu",
    quantity_ml: 250,
    status: "APPROVED",
    created_at: "2025-07-12T12:30:00",
  },
  {
    id: 3,
    requester_name: null,
    blood_type: "AB+",
    component_name: "Huyết tương",
    quantity_ml: 300,
    status: "WAITING_DONOR",
    created_at: "2025-07-12T14:00:00",
  },
];

const statusColor = {
  PENDING: "orange",
  APPROVED: "green",
  WAITING_DONOR: "blue",
  REJECTED: "red",
};

const UrgentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchBloodType, setSearchBloodType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    // Giả lập gọi API
    setRequests(mockUrgentRequests);
  }, []);

  // 📌 Lọc dữ liệu
  const filteredData = requests.filter((r) => {
    return (
      (!searchBloodType || r.blood_type === searchBloodType) &&
      (!searchStatus || r.status === searchStatus)
    );
  });

  const columns = [
    {
      title: "Người yêu cầu",
      dataIndex: "requester_name",
      render: (name) => name || "Ẩn danh",
    },
    {
      title: "Nhóm máu",
      dataIndex: "blood_type",
    },
    {
      title: "Thành phần",
      dataIndex: "component_name",
    },
    {
      title: "Số lượng (ml)",
      dataIndex: "quantity_ml",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <Tag color={statusColor[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Thời gian yêu cầu",
      dataIndex: "created_at",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "",
      render: (_, record) => (
        <Tooltip title="Xem chi tiết">
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => setSelectedRequest(record)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <Title level={3}>📢 Danh sách yêu cầu khẩn cấp</Title>

      {/* 🔍 Bộ lọc */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <Select
          placeholder="Chọn nhóm máu"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setSearchBloodType(value)}
        >
          <Option value="O+">O+</Option>
          <Option value="A-">A-</Option>
          <Option value="AB+">AB+</Option>
        </Select>
        <Select
          placeholder="Chọn trạng thái"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => setSearchStatus(value)}
        >
          <Option value="PENDING">Đang chờ</Option>
          <Option value="APPROVED">Đã duyệt</Option>
          <Option value="WAITING_DONOR">Đợi người hiến</Option>
          <Option value="REJECTED">Từ chối</Option>
        </Select>
        <Button onClick={() => {
          setSearchBloodType("");
          setSearchStatus("");
        }}>🔄 Reset</Button>
      </div>

      {/* 🧾 Bảng danh sách */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* 📋 Modal chi tiết */}
      <Modal
        title="Chi tiết yêu cầu khẩn cấp"
        open={!!selectedRequest}
        onCancel={() => setSelectedRequest(null)}
        footer={null}
      >
        {selectedRequest && (
          <div>
            <Text strong>Người yêu cầu:</Text>{" "}
            {selectedRequest.requester_name || "Ẩn danh"} <br />
            <Text strong>Nhóm máu:</Text> {selectedRequest.blood_type} <br />
            <Text strong>Thành phần:</Text> {selectedRequest.component_name} <br />
            <Text strong>Số lượng:</Text> {selectedRequest.quantity_ml} ml <br />
            <Text strong>Trạng thái:</Text>{" "}
            <Tag color={statusColor[selectedRequest.status]}>
              {selectedRequest.status}
            </Tag>{" "}
            <br />
            <Text strong>Thời gian yêu cầu:</Text>{" "}
            {new Date(selectedRequest.created_at).toLocaleString()}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UrgentRequests;
