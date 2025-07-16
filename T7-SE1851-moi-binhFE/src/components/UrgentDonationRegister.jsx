import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Modal,
  Typography,
  Select,
  Button,
  Tooltip,
  Spin,
  message,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "../styles/staff.css";
import { getAuthHeader } from "../services/user.service";

const { Title, Text } = Typography;
const { Option } = Select;

const statusColor = {
  PENDING: "orange",
  APPROVED: "green",
  WAITING_DONOR: "blue",
  REJECTED: "red",
  "CHỜ XÁC MINH": "orange",
  "ĐÃ XÁC MINH": "green",
  "TỪ CHỐI": "red",
};

const UrgentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchBloodType, setSearchBloodType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingIds, setLoadingIds] = useState(new Set());

  useEffect(() => {
    fetchUrgentRequests();
  }, []);

  const fetchUrgentRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/staff/verify-donors", {
        headers: getAuthHeader(),
      });
      setRequests(res.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      message.error("Không thể tải danh sách yêu cầu khẩn cấp");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDonor = async (donorRegistryId) => {
    setLoadingIds((prev) => new Set(prev).add(donorRegistryId));
    try {
      await axios.put(
        `http://localhost:8080/api/staff/verify-donors/${donorRegistryId}/verify`,
        null,
        { headers: getAuthHeader() }
      );
      message.success("Xác nhận thành công");
      fetchUrgentRequests();
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);
      message.error("Xác nhận thất bại");
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(donorRegistryId);
        return newSet;
      });
    }
  };

  const handleRejectDonor = async (donorRegistryId) => {
    setLoadingIds((prev) => new Set(prev).add(donorRegistryId));
    try {
      await axios.delete(
        `http://localhost:8080/api/staff/verify-donors/${donorRegistryId}/reject`,
        { headers: getAuthHeader() }
      );
      message.success("Từ chối thành công");
      fetchUrgentRequests();
    } catch (error) {
      console.error("Lỗi khi từ chối:", error);
      message.error("Từ chối thất bại");
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(donorRegistryId);
        return newSet;
      });
    }
  };

  const filteredData = requests.filter((r) => {
    return (
      (!searchBloodType || r.bloodType === searchBloodType) &&
      (!searchStatus || r.status === searchStatus)
    );
  });

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      render: (name) => name || "Ẩn danh",
    },
    {
      title: "Nhóm máu",
      dataIndex: "bloodType",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag color={statusColor[status] || "default"}>{status}</Tag>
          {(status === "CHỜ XÁC MINH" || status === "PENDING") && (
            <>
              <Button
                type="primary"
                size="small"
                loading={loadingIds.has(record.donorRegistryId)}
                onClick={() => handleVerifyDonor(record.donorRegistryId)}
              >
                Xác nhận
              </Button>
              <Button
                danger
                size="small"
                loading={loadingIds.has(record.donorRegistryId)}
                onClick={() => handleRejectDonor(record.donorRegistryId)}
              >
                Từ chối
              </Button>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Chi tiết",
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
      <Title level={3}>📢 Danh sách xác minh người hiến</Title>

      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <Select
          placeholder="Chọn nhóm máu"
          allowClear
          style={{ width: 200 }}
          value={searchBloodType || undefined}
          onChange={setSearchBloodType}
        >
          <Option value="O+">O+</Option>
          <Option value="A">A</Option>
          <Option value="B">B</Option>
          <Option value="AB">AB</Option>
        </Select>
        <Select
          placeholder="Chọn trạng thái"
          allowClear
          style={{ width: 200 }}
          value={searchStatus || undefined}
          onChange={setSearchStatus}
        >
          <Option value="CHỜ XÁC MINH">Chờ xác minh</Option>
          <Option value="ĐÃ XÁC MINH">Đã xác minh</Option>
          <Option value="TỪ CHỐI">Từ chối</Option>
        </Select>
        <Button
          onClick={() => {
            setSearchBloodType("");
            setSearchStatus("");
          }}
        >
          🔄 Reset
        </Button>
      </div>

      {loading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : (
        <Table
          rowKey="donorRegistryId"
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}

      <Modal
        title="Chi tiết người hiến"
        open={!!selectedRequest}
        onCancel={() => setSelectedRequest(null)}
        footer={null}
      >
        {selectedRequest && (
          <div>
            <Text strong>Họ tên:</Text> {selectedRequest.fullName} <br />
            <Text strong>Số điện thoại:</Text> {selectedRequest.phone} <br />
            <Text strong>Nhóm máu:</Text> {selectedRequest.bloodType} <br />
            <Text strong>Giới tính:</Text> {selectedRequest.gender} <br />
            <Text strong>Ngày sinh:</Text> {selectedRequest.dob} <br />
            <Text strong>Địa chỉ:</Text> {selectedRequest.addressFull || "N/A"} <br />
            <Text strong>Trạng thái:</Text>{" "}
            <Tag color={statusColor[selectedRequest.status]}>
              {selectedRequest.status}
            </Tag>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UrgentRequests;
