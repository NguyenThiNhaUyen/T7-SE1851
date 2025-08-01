import React, { useEffect, useState } from "react";
import {
  App as AntdApp,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Row,
  Select,
  Space,
  Typography,
  Table,
  Tooltip,
  ConfigProvider,
  theme,
  message,
  Layout,
} from "antd";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { 
  DownloadOutlined, 
  ReloadOutlined, 
  SearchOutlined, 
  InfoCircleOutlined,
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined
} from "@ant-design/icons";
import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement);

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const mockStatisticsData = [
  {
    blood_type: "A+",
    component_name: "Hồng cầu",
    total_transfusions: 45,
    total_patients: 30,
    last_date: "2025-07-10",
  },
  {
    blood_type: "O-",
    component_name: "Tiểu cầu",
    total_transfusions: 25,
    total_patients: 20,
    last_date: "2025-07-09",
  },
  {
    blood_type: "B+",
    component_name: "Huyết tương",
    total_transfusions: 35,
    total_patients: 28,
    last_date: "2025-07-08",
  },
  {
    blood_type: "AB-",
    component_name: "Hồng cầu",
    total_transfusions: 15,
    total_patients: 12,
    last_date: "2025-07-07",
  },
];

const StaffStatistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const fetchStatisticsData = () => {
    const filteredData = mockStatisticsData.filter((item) => {
      const matchesBloodType = !selectedBloodType || item.blood_type === selectedBloodType;
      const matchesComponent = !selectedComponent || item.component_name === selectedComponent;
      const matchesDateRange = (!startDate || new Date(item.last_date) >= new Date(startDate)) &&
        (!endDate || new Date(item.last_date) <= new Date(endDate));
      return matchesBloodType && matchesComponent && matchesDateRange;
    });
    setStatistics(filteredData);
  };

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  const exportStatisticsToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(statistics);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ThongKeTruyenMau");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    
    // Tạo link download
    const url = URL.createObjectURL(fileData);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bao_cao_truyen_mau.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalTransfusions = statistics.reduce((sum, record) => sum + record.total_transfusions, 0);
  const totalPatients = statistics.reduce((sum, record) => sum + record.total_patients, 0);
  const mostCommonComponent = statistics.reduce((prev, curr) => prev.total_transfusions > curr.total_transfusions ? prev : curr, statistics[0])?.component_name || "N/A";
  const mostCommonBloodType = statistics.reduce((prev, curr) => prev.total_transfusions > curr.total_transfusions ? prev : curr, statistics[0])?.blood_type || "N/A";
  const latestTransfusionDate = statistics.map(item => new Date(item.last_date)).sort((a, b) => b - a)[0];

  const uniqueComponentList = [...new Set(statistics.map(item => item.component_name))];

  const statisticsColumns = [
    { title: "Nhóm máu", dataIndex: "blood_type", key: "blood_type" },
    { title: "Thành phần", dataIndex: "component_name", key: "component_name" },
    { title: "Số lượt truyền", dataIndex: "total_transfusions", key: "total_transfusions" },
    { title: "Số bệnh nhân", dataIndex: "total_patients", key: "total_patients" },
    { title: "Ngày gần nhất", dataIndex: "last_date", key: "last_date" },
  ];

  return (
    <ConfigProvider theme={{ algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                <BarChartOutlined style={{ marginRight: 8 }} />
                Thống kê truyền máu
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

            <Card style={{ marginBottom: 24 }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn nhóm máu"
                    value={selectedBloodType}
                    onChange={setSelectedBloodType}
                    allowClear
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((blood) => (
                      <Option key={blood} value={blood}>{blood}</Option>
                    ))}
                  </Select>
                </Col>

                <Col xs={24} md={6}>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Chọn thành phần"
                    value={selectedComponent}
                    onChange={setSelectedComponent}
                    allowClear
                  >
                    {["Hồng cầu", "Tiểu cầu", "Huyết tương"].map((component) => (
                      <Option key={component} value={component}>{component}</Option>
                    ))}
                  </Select>
                </Col>

                <Col xs={12} md={6}>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Từ ngày"
                    value={startDate}
                    onChange={setStartDate}
                    format="YYYY-MM-DD"
                  />
                </Col>

                <Col xs={12} md={6}>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Đến ngày"
                    value={endDate}
                    onChange={setEndDate}
                    format="YYYY-MM-DD"
                  />
                </Col>

                <Col xs={24} style={{ textAlign: "right" }}>
                  <Space wrap>
                    <Select value={selectedChartType} onChange={setSelectedChartType}>
                      <Option value="bar">📊 Biểu đồ cột</Option>
                      <Option value="pie">🧬 Biểu đồ tròn</Option>
                    </Select>
                    <Button icon={<SearchOutlined />} onClick={fetchStatisticsData}>Lọc</Button>
                    <Button icon={<DownloadOutlined />} onClick={exportStatisticsToExcel}>Xuất Excel</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => {
                      setSelectedBloodType("");
                      setSelectedComponent("");
                      setStartDate(null);
                      setEndDate(null);
                      fetchStatisticsData();
                    }}>Xoá lọc</Button>
                    <Button onClick={() => setIsDarkTheme(!isDarkTheme)}>{isDarkTheme ? "🌞 Giao diện sáng" : "🌙 Giao diện tối"}</Button>
                  </Space>
                </Col>
              </Row>
            </Card>

            {statistics.length === 0 ? (
              <Text type="danger">⚠️ Không tìm thấy dữ liệu phù hợp với bộ lọc hiện tại.</Text>
            ) : (
              <>
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                  <Col xs={24} sm={12} md={6}>
                    <Card>
                      <Text strong>Tổng lượt truyền:</Text>
                      <br />
                      <Text style={{ fontSize: '20px', color: '#1890ff' }}>{totalTransfusions}</Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Card>
                      <Text strong>Tổng bệnh nhân:</Text>
                      <br />
                      <Text style={{ fontSize: '20px', color: '#52c41a' }}>{totalPatients}</Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Card>
                      <Text strong>Thành phần phổ biến:</Text>
                      <br />
                      <Text style={{ fontSize: '16px', color: '#fa8c16' }}>{mostCommonComponent}</Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Card>
                      <Text strong>Nhóm máu phổ biến:</Text>
                      <br />
                      <Text style={{ fontSize: '16px', color: '#f5222d' }}>{mostCommonBloodType}</Text>
                    </Card>
                  </Col>
                </Row>

                <Divider orientation="left" style={{ marginTop: 40 }}>📈 Biểu đồ thống kê</Divider>

                <Card style={{ marginBottom: 24 }}>
                  {selectedChartType === "bar" ? (
                    <Bar
                      data={{
                        labels: statistics.map(record => `${record.blood_type} - ${record.component_name}`),
                        datasets: [{
                          label: "Số lượt truyền",
                          data: statistics.map(record => record.total_transfusions),
                          backgroundColor: "#1677ff"
                        }]
                      }}
                      options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
                    />
                  ) : (
                    <Pie
                      data={{
                        labels: uniqueComponentList,
                        datasets: [{
                          label: "Tỷ lệ",
                          data: uniqueComponentList.map(component =>
                            statistics.filter(record => record.component_name === component)
                              .reduce((total, record) => total + record.total_transfusions, 0)
                          ),
                          backgroundColor: ["#f87171", "#60a5fa", "#34d399"]
                        }]
                      }}
                    />
                  )}
                </Card>

                <Divider orientation="left">📋 Chi tiết thống kê</Divider>

                <Table 
                  columns={statisticsColumns} 
                  dataSource={statistics} 
                  rowKey={(record, index) => index} 
                  pagination={{ 
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bản ghi`,
                    pageSizeOptions: ['5', '10', '20', '50'],
                  }}
                  scroll={{ x: 800 }}
                />
              </>
            )}
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default StaffStatistics;