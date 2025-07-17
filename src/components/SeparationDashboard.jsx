import React, { useEffect, useState } from 'react';
import { 
  Layout,
  Card, 
  Table, 
  Spin, 
  Row, 
  Col, 
  Typography,
  Space,
  Alert
} from 'antd';
import { 
  BarChartOutlined,
  CalendarOutlined,
  UserOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import SeparationDetailTable from './BloodSeparationDetailsTable';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const SeparationDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lowVolumeData, setLowVolumeData] = useState([]);
  const [rejectedStats, setRejectedStats] = useState([]);
  const [qualityData, setQualityData] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // 🧪 MOCK DATA
      const mockBarData = [
        { date: '2025-07-01', count: 12 },
        { date: '2025-07-02', count: 15 },
        { date: '2025-07-03', count: 10 },
        { date: '2025-07-04', count: 8 },
        { date: '2025-07-05', count: 17 },
      ];

      const mockPieData = [
        { bloodType: 'O+', count: 45 },
        { bloodType: 'A+', count: 30 },
        { bloodType: 'B+', count: 20 },
        { bloodType: 'AB-', count: 5 },
      ];

      const mockLowVolume = [
        { componentType: 'Tiểu cầu', total: 100, lowCount: 20, percent: 20 },
        { componentType: 'Huyết tương', total: 80, lowCount: 5, percent: 6.25 },
      ];

      const mockRejected = [
        { componentType: 'Hồng cầu', total: 100, rejected: 10, percent: 10 },
        { componentType: 'Tiểu cầu', total: 80, rejected: 12, percent: 15 },
      ];

      const mockQuality = [
        { componentType: 'Hồng cầu', averageScore: 3.8 },
        { componentType: 'Tiểu cầu', averageScore: 3.2 },
        { componentType: 'Huyết tương', averageScore: 2.5 },
      ];

      setBarData(mockBarData);
      setPieData(mockPieData);
      setLowVolumeData(mockLowVolume);
      setRejectedStats(mockRejected);
      setQualityData(mockQuality);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#FFBB28', '#00C49F', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              <DeploymentUnitOutlined style={{ marginRight: 8 }} />
              Dashboard Tách Máu
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
        <Spin spinning={loading} tip="Đang tải dữ liệu...">
          <Card>
            <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
              Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
            </Text>
            
            <Alert
              message="Thống kê tách máu"
              description="Báo cáo tổng hợp về quá trình tách máu, chất lượng thành phần và hiệu suất hoạt động."
              type="info"
              showIcon
              style={{ margin: '16px 0' }}
            />

            <Row gutter={16}>
              <Col span={24}>
                <SeparationDetailTable />
                <Card 
                  title={
                    <Space>
                      <BarChartOutlined />
                      1. Số lần tách máu theo ngày (Bar Chart + Table)
                    </Space>
                  }
                  style={{ marginBottom: 16 }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#f39c12" />
                    </BarChart>
                  </ResponsiveContainer>
                  <Table
                    dataSource={barData}
                    columns={[
                      { title: 'Ngày', dataIndex: 'date', key: 'date' },
                      { title: 'Số lần tách', dataIndex: 'count', key: 'count' },
                    ]}
                    pagination={false}
                    rowKey="date"
                    style={{ marginTop: 16 }}
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card 
                  title="2. Tổng số lần tách theo nhóm máu (Pie Chart + Table)"
                  style={{ marginBottom: 16 }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="count"
                        nameKey="bloodType"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {Array.isArray(pieData) && pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Table
                    dataSource={pieData}
                    columns={[
                      { title: 'Nhóm máu', dataIndex: 'bloodType', key: 'bloodType' },
                      { title: 'Lần tách', dataIndex: 'count', key: 'count' },
                    ]}
                    pagination={false}
                    rowKey="bloodType"
                    style={{ marginTop: 16 }}
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card 
                  title="3. Tỉ lệ thể tích thấp (Donut Chart + Bảng màu)"
                  style={{ marginBottom: 16 }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={lowVolumeData}
                        dataKey="percent"
                        nameKey="componentType"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        label
                      >
                        {Array.isArray(lowVolumeData) && lowVolumeData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <Table
                    dataSource={lowVolumeData}
                    columns={[
                      { title: 'Thành phần', dataIndex: 'componentType', key: 'componentType' },
                      { title: 'Tổng', dataIndex: 'total', key: 'total' },
                      { title: 'Số lượng thấp', dataIndex: 'lowCount', key: 'lowCount' },
                      { title: 'Tỉ lệ (%)', dataIndex: 'percent', key: 'percent', render: (val) => `${val.toFixed(2)}%` },
                    ]}
                    pagination={false}
                    rowKey="componentType"
                    style={{ marginTop: 16 }}
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card 
                  title="4. Tỉ lệ bị loại do thể tích thấp hoặc chất lượng kém"
                  style={{ marginBottom: 16 }}
                >
                  <Table
                    dataSource={rejectedStats}
                    columns={[
                      { title: 'Thành phần', dataIndex: 'componentType', key: 'componentType' },
                      { title: 'Tổng', dataIndex: 'total', key: 'total' },
                      { title: 'Bị loại', dataIndex: 'rejected', key: 'rejected' },
                      { title: 'Tỉ lệ (%)', dataIndex: 'percent', key: 'percent', render: (val) => `${val.toFixed(2)}%` },
                    ]}
                    pagination={false}
                    rowKey="componentType"
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card 
                  title="5. Trung bình đánh giá chất lượng (A=4 → D=1)"
                  style={{ marginBottom: 16 }}
                >
                  <Table
                    dataSource={qualityData}
                    columns={[
                      { title: 'Thành phần', dataIndex: 'componentType', key: 'componentType' },
                      { title: 'Điểm trung bình', dataIndex: 'averageScore', key: 'averageScore', render: (val) => val.toFixed(2) },
                    ]}
                    pagination={false}
                    rowKey="componentType"
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Spin>
      </Content>
    </Layout>
  );
};

export default SeparationDashboard;