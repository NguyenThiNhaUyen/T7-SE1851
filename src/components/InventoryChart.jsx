import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Layout,
  Row,
  Col,
  Select,
  Card,
  Typography,
  Button,
  Modal,
  Table,
  message,
  theme,
  Space,
} from "antd";
import {
  FileExcelOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  ExperimentOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../styles/staff.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const InventoryChart = () => {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [component, setComponent] = useState("");
  const [orientation, setOrientation] = useState("y");
  const [summary, setSummary] = useState({ totalBlood: 0, lowStockTypes: [] });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const { token } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryRes = await fetch("/api/inventory");
        const inventory = await inventoryRes.json();
        setRawData(inventory);
        setFilteredData(inventory);
        updateSummary(inventory);
      } catch (error) {
        message.error("Không thể tải dữ liệu kho máu.");
      }

      try {
        const historyRes = await fetch("/api/inventory-history");
        const history = await historyRes.json();
        setHistoryData(history);
      } catch (error) {
        message.warning("Không thể tải dữ liệu lịch sử kho.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = rawData.filter(
      (item) =>
        (!bloodType || item.blood_type === bloodType) &&
        (!component || item.component === component)
    );
    setFilteredData(filtered);
    updateSummary(filtered);
  }, [bloodType, component, rawData]);

  const updateSummary = (data) => {
    let total = 0;
    const lowStock = [];
    data.forEach((item) => {
      if (item.total_quantity_ml != null) {
        total += item.total_quantity_ml;
        if (item.total_quantity_ml < 500) lowStock.push(item);
      }
    });
    setSummary({ totalBlood: total, lowStockTypes: lowStock });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tồn kho máu");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "bao_cao_ton_kho_mau.xlsx"
    );
  };

  const openDetails = (data) => {
    setModalContent(data);
    setModalOpen(true);
  };

  const columns = [
    {
      title: "Nhóm máu",
      dataIndex: "blood_type",
    },
    {
      title: "Thành phần",
      dataIndex: "component",
    },
    {
      title: "Tổng lượng (ml)",
      dataIndex: "total_quantity_ml",
      render: (value) => <Text strong>{value}</Text>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <ExperimentOutlined style={{ marginRight: 8 }} />
              Kiểm tra tồn kho máu
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

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Select
                placeholder="Chọn nhóm máu"
                value={bloodType || undefined}
                onChange={(val) => setBloodType(val)}
                style={{ width: "100%" }}
                allowClear
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="Chọn thành phần máu"
                value={component || undefined}
                onChange={(val) => setComponent(val)}
                style={{ width: "100%" }}
                allowClear
              >
                {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map((c) => (
                  <Select.Option key={c} value={c}>
                    {c}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                value={orientation}
                onChange={setOrientation}
                style={{ width: "100%" }}
              >
                <Select.Option value="y">🔄 Biểu đồ ngang</Select.Option>
                <Select.Option value="x">⬆️ Biểu đồ dọc</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <Button
                icon={<FileExcelOutlined />}
                type="primary"
                block
                onClick={exportToExcel}
              >
                Xuất Excel
              </Button>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title="Tổng lượng máu trong kho" bordered>
                <Text strong>{summary.totalBlood} ml</Text>
                <Button
                  type="link"
                  icon={<InfoCircleOutlined />}
                  onClick={() => openDetails(rawData)}
                >
                  Xem tất cả
                </Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Nhóm máu thiếu hụt" bordered>
                <Text type="danger">{summary.lowStockTypes.length} nhóm</Text>
                <Button
                  type="link"
                  icon={<ExclamationCircleOutlined />}
                  onClick={() => openDetails(summary.lowStockTypes)}
                >
                  Xem chi tiết
                </Button>
              </Card>
            </Col>
          </Row>

          <div style={{ height: 400, marginTop: 32 }}>
            <Bar
              data={{
                labels: filteredData.map((item) => `${item.blood_type} - ${item.component}`),
                datasets: [
                  {
                    label: "Tồn kho (ml)",
                    data: filteredData.map((item) => item.total_quantity_ml),
                    backgroundColor: filteredData.map((item) =>
                      item.total_quantity_ml < 500
                        ? "#ff4d4f"
                        : item.total_quantity_ml < 2000
                        ? "#faad14"
                        : "#52c41a"
                    ),
                  },
                ],
              }}
              options={{
                indexAxis: orientation,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `Tồn kho: ${ctx.raw} ml`,
                    },
                  },
                },
              }}
            />
          </div>

          {historyData.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <Title level={4}>📈 Biến động tồn kho theo ngày</Title>
              <Line
                data={{
                  labels: historyData.map((h) => h.date),
                  datasets: [
                    {
                      label: "Hồng cầu",
                      data: historyData.map((h) => h.red_cells || 0),
                      borderColor: "#ff4d4f",
                      fill: false,
                    },
                    {
                      label: "Tiểu cầu",
                      data: historyData.map((h) => h.platelets || 0),
                      borderColor: "#1890ff",
                      fill: false,
                    },
                    {
                      label: "Huyết tương",
                      data: historyData.map((h) => h.plasma || 0),
                      borderColor: "#52c41a",
                      fill: false,
                    },
                  ],
                }}
              />
            </div>
          )}

          <Modal
            title="Chi tiết tồn kho máu"
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
            width={700}
          >
            <Table
              rowKey={(record, index) => index}
              columns={columns}
              dataSource={modalContent.sort(
                (a, b) => a.total_quantity_ml - b.total_quantity_ml
              )}
              pagination={false}
              bordered
            />
          </Modal>
        </Card>
      </Content>
    </Layout>
  );
};

export default InventoryChart;