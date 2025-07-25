import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Typography,
  Tag,
  Descriptions,
  Row,
  Col,
  Input,
  Select,
  Badge,
  Statistic,
  Card,
  Timeline,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  TrophyOutlined,
  RiseOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useCurrentUser } from "../hooks/useCurrentUser";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

const getLevel = (count) => {
  if (count >= 10) return "🩸 Master Donor";
  if (count >= 5) return "💪 Regular Donor";
  if (count >= 1) return "🔰 New Donor";
  return "⚪ Chưa xác định";
};

const getAchievementBadge = (count) => {
  if (count >= 5) return <Tag color="gold">🌟 Người hiến tích cực</Tag>;
  if (count >= 3) return <Tag color="cyan">💪 Đã quen với việc hiến máu</Tag>;
  if (count >= 1) return <Tag color="green">🩸 Bắt đầu hành trình</Tag>;
  return <Tag color="gray">Chưa có</Tag>;
};

const DonationHistory = () => {
  const { user, isLoggedIn } = useCurrentUser();
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthlyStats, setMonthlyStats] = useState({});

  useEffect(() => {
    if (!isLoggedIn) return;

    const mockData = [
      {
        id: 1,
        donor_name: "Nguyễn Văn A",
        donation_date: "2025-01-10",
        location: "FPTU",
        volume_ml: 450,
        blood_type: "O+",
        status: "Đã tách",
        note: "Lần đầu hiến máu tại trường FPTU",
        blood_units: ["RBC-001", "PLT-001"],
      },
      {
        id: 2,
        donor_name: "Nguyễn Văn A",
        donation_date: "2025-03-12",
        location: "FPTU",
        volume_ml: 400,
        blood_type: "O+",
        status: "Đang xử lý",
        note: "Chờ kết quả xét nghiệm",
        blood_units: [],
      },
      {
        id: 3,
        donor_name: "Nguyễn Văn A",
        donation_date: "2025-06-05",
        location: "FPTU",
        volume_ml: 500,
        blood_type: "O+",
        status: "Đã tách",
        note: "Không có phản ứng phụ",
        blood_units: ["PLT-002"],
      },
    ];

    setHistory(mockData);
    setFiltered(mockData);
    calculateMonthlyStats(mockData);
  }, [isLoggedIn]);

  const calculateMonthlyStats = (data) => {
    const stats = {};
    data.forEach((item) => {
      const month = dayjs(item.donation_date).format("MM/YYYY");
      stats[month] = (stats[month] || 0) + 1;
    });
    setMonthlyStats(stats);
  };

  useEffect(() => {
    const filteredData = history.filter((item) => {
      const matchText =
        item.location.toLowerCase().includes(searchText.toLowerCase()) ||
        item.note?.toLowerCase().includes(searchText.toLowerCase());
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      return matchText && matchStatus;
    });
    setFiltered(filteredData);
  }, [searchText, statusFilter, history]);

  const columns = [
    {
      title: <><CalendarOutlined /> Ngày</>,
      dataIndex: "donation_date",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "📍 Địa điểm",
      dataIndex: "location",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "🩸 Thể tích",
      dataIndex: "volume_ml",
      render: (v) => <Badge color="red" text={`${v} ml`} />,
    },
    {
      title: "🧬 Nhóm máu",
      dataIndex: "blood_type",
      render: (type) => <Tag color="magenta">{type}</Tag>,
    },
    {
      title: "📦 Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Đã tách" ? "green" : "orange"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      {/* Tiêu đề */}
      <Title level={3} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <HistoryOutlined style={{ color: "#1677ff" }} />
        <span>Lịch sử hiến máu tại FPTU</span>
      </Title>

      {/* 3 phần thành tích đưa lên đầu */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card bordered hoverable size="small">
            <Statistic
              title="🎖 Thành tích hiến máu"
              value={history.length}
              suffix="lượt"
              prefix={<TrophyOutlined />}
              valueStyle={{ fontSize: 24 }}
            />
            <div style={{ marginTop: 8 }}>{getAchievementBadge(history.length)}</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered hoverable size="small">
            <Statistic
              title="📈 Số tháng đã hiến"
              value={Object.keys(monthlyStats).length}
              suffix="tháng"
              prefix={<RiseOutlined />}
              valueStyle={{ fontSize: 24 }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="🏅 Giấy chứng nhận hiến máu"
        style={{ marginBottom: 16, background: "#f6ffed", borderColor: "#b7eb8f" }}
        size="small"
      >
        <Text>
          Xin chúc mừng <strong>{user?.first_name} {user?.last_name}</strong> đã hoàn thành{" "}
          <strong>{history.length}</strong> lượt hiến máu 🎉.
        </Text>
      </Card>

      {/* <Card title="🌟 Cấp bậc hiến máu" style={{ marginBottom: 16 }} size="small">
        <Text strong style={{ fontSize: 16 }}>{getLevel(history.length)}</Text>
      </Card> */}

      {/* Bộ lọc */}
      <Row gutter={[16, 16]} style={{ marginBottom: 12 }}>
        <Col xs={24} sm={16} md={18}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm theo ghi chú hoặc địa điểm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={8} md={6}>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: "100%" }}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="Đã tách">Đã tách</Option>
            <Option value="Đang xử lý">Đang xử lý</Option>
          </Select>
        </Col>
      </Row>

      {/* Bảng hiển thị */}
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            setSelected(record);
            setModalVisible(true);
          },
        })}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
        locale={{ emptyText: "Không có lịch sử hiến máu." }}
        style={{ marginBottom: 32 }}
      />

      {/* Thống kê tháng */}
      <Card title="📅 Thống kê theo tháng" style={{ marginBottom: 24 }} size="small">
        <ul style={{ paddingLeft: 20 }}>
          {Object.entries(monthlyStats).map(([month, count]) => (
            <li key={month}><strong>{month}:</strong> {count} lượt</li>
          ))}
        </ul>
      </Card>

      {/* Timeline */}
      <Card title="🕒 Timeline các lần hiến máu" style={{ marginTop: 32 }} size="small">
        <Timeline>
          {history.map((h) => (
            <Timeline.Item key={h.id} color={h.status === "Đã tách" ? "green" : "orange"}>
              {dayjs(h.donation_date).format("DD/MM/YYYY")} - {h.location} ({h.volume_ml}ml)
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      {/* Gợi ý */}
      <Card style={{ marginTop: 24 }} size="small">
        <Text type="secondary">
          🧠 <strong>Lưu ý:</strong> Cứ mỗi 3 tháng, bạn có thể hiến máu lại!
        </Text>
      </Card>

      {/* Modal chi tiết */}
      <Modal
        title="📋 Chi tiết lần hiến máu tại FPTU"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selected && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="👤 Người hiến">
              {selected.donor_name || `${user.first_name} ${user.last_name}`}
            </Descriptions.Item>
            <Descriptions.Item label="🗓 Ngày hiến">
              {dayjs(selected.donation_date).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="📍 Địa điểm">{selected.location}</Descriptions.Item>
            <Descriptions.Item label="🧬 Nhóm máu">{selected.blood_type}</Descriptions.Item>
            <Descriptions.Item label="🩸 Thể tích">{selected.volume_ml} ml</Descriptions.Item>
            <Descriptions.Item label="📝 Ghi chú">
              {selected.note || "Không có"}
            </Descriptions.Item>
            <Descriptions.Item label="🧪 Đơn vị máu sinh ra">
              {selected.blood_units && selected.blood_units.length > 0
                ? selected.blood_units.join(", ")
                : "Chưa có"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default DonationHistory;
