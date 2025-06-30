import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  ConfigProvider,
  Layout,
  Menu,
  Typography,
  Tooltip,
} from 'antd';
import {
  DashboardOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  TeamOutlined,
  ExperimentOutlined,
  ShareAltOutlined,
  BarChartOutlined,
  MedicineBoxOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;
const { Title } = Typography;

// AdminLayout Component
const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const adminMenuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Tổng quan', path: '/admin/dashboard' },
    { key: 'urgent', icon: <ExclamationCircleOutlined />, label: 'Yêu cầu khẩn cấp', path: '/admin/urgent' },
    { key: 'donation-history', icon: <HistoryOutlined />, label: 'Lịch sử hiến máu', path: '/admin/donation-history' },
    { key: 'transfusion-history', icon: <MedicineBoxOutlined />, label: 'Lịch sử truyền máu', path: '/admin/transfusion-history' },
    { key: 'staff', icon: <TeamOutlined />, label: 'Nhân viên y tế', path: '/admin/staff' },
    { key: 'blood', icon: <ExperimentOutlined />, label: 'Nhóm máu & Thành phần', path: '/admin/blood' },
    { key: 'compatibility', icon: <ShareAltOutlined />, label: 'Quy tắc tương thích', path: '/admin/compatibility' },
    { key: 'report', icon: <BarChartOutlined />, label: 'Báo cáo & Thống kê', path: '/admin/report' },
  ];

  useEffect(() => {
    const current = adminMenuItems.find(item => location.pathname.startsWith(item.path));
    setSelectedKey(current?.key || "");
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    const item = adminMenuItems.find(i => i.key === key);
    if (item) navigate(item.path);
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={280}
          trigger={
            <MenuOutlined
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? 'Mở sidebar' : 'Đóng sidebar'}
              style={{ color: 'white', fontSize: 18, padding: '0 24px', cursor: 'pointer' }}
            />
          }
          style={{ background: '#b91c1c', position: 'fixed', height: '100vh', left: 0, top: 0, zIndex: 100 }}
        >
          <div style={{ padding: '20px 16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Title level={4} style={{ color: 'white', margin: 0, fontSize: collapsed ? 14 : 16 }}>
              {collapsed ? 'ADMIN' : 'BẢNG QUẢN TRỊ'}
            </Title>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            style={{ background: 'transparent', border: 'none' }}
          >
            {adminMenuItems.map(item => (
              <Menu.Item key={item.key} icon={item.icon} aria-label={item.label}>
                {/* Always show label next to icon; use Tooltip for extra hint */}
                <span style={{ marginLeft: 8 }}>{item.label}</span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'margin-left 0.2s' }}>
          <Content style={{ padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
