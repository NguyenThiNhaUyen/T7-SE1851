// src/layouts/UserLayout.jsx

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Layout, Menu, Avatar, Typography, Spin, Button, Result,
  Drawer, Badge, Space, Grid, notification
} from "antd";
import {
  UserOutlined, HeartOutlined, HistoryOutlined,
  ExclamationCircleOutlined, InfoCircleOutlined, ProfileOutlined,
  PhoneOutlined, MenuOutlined, BellOutlined, LogoutOutlined
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { userRoutes } from "../routes/userRoutes";
import "../styles/user.css";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [direction, setDirection] = useState(1);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || !currentUser.userId) {
      setError("Vui lòng đăng nhập để truy cập.");
      setLoading(false);
      return;
    }

    UserService.getUserById(currentUser.userId)
      .then(res => setUserInfo(res.data))
      .catch(() => setError("Không thể tải thông tin người dùng."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setDirection(location.pathname > prevPath ? 1 : -1);
      setPrevPath(location.pathname);
    }
  }, [location.pathname]);

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    const match = userRoutes.find(r => r.path === path);
    return match ? match.title : "Trang người dùng";
  };

  const menuItems = [
    { key: "register", icon: <HeartOutlined />, label: "Đăng ký hiến máu" },
    { key: "/donate/urgent", icon: <ExclamationCircleOutlined />, label: "Hiến máu khẩn cấp" },
    { key: "donation-history", icon: <HistoryOutlined />, label: "Lịch sử hiến máu" },
    { type: "divider" },
    { key: "types", icon: <InfoCircleOutlined />, label: "Các loại máu" },
    { key: "receive", icon: <PhoneOutlined />, label: "Cách nhận máu" },
    { key: "roles", icon: <ProfileOutlined />, label: "Vai trò trong truyền máu" },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
    if (!screens.lg) setDrawerVisible(false);
  };

  const handleNotifyClick = () => {
    notification.open({
      message: "Thông báo",
      description: "Hiện chưa có thông báo mới.",
      duration: 2.5,
    });
  };

  const SidebarContent = (
    <div className="sidebar-user">
      <div className="sidebar-header">
        <Avatar size={64} icon={<UserOutlined />} className="sidebar-avatar" />
        <Title level={5} className="sidebar-title">
          {userInfo?.first_name} {userInfo?.last_name}
        </Title>
        <Text className="sidebar-subtext">Nhóm máu: {userInfo?.blood_type || "?"}</Text>
        <Text className="sidebar-subtext">{userInfo?.email}</Text>
        <Text className="sidebar-subtext">{userInfo?.phone}</Text>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname.split("/").pop()]}
        items={menuItems}
        onClick={handleMenuClick}
        className="sidebar-menu"
      />

      <Button
        type="text"
        danger
        icon={<LogoutOutlined />}
        onClick={() => {
          AuthService.logout();
          navigate("/login");
        }}
        className="sidebar-btn"
      >
        Đăng xuất
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spin size="large" tip="Đang tải thông tin..." />
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="403"
        title="Lỗi truy cập"
        subTitle={error}
        extra={<Button type="primary" onClick={() => navigate("/login")}>Đăng nhập</Button>}
      />
    );
  }

  return (
    <Layout className="user-layout">
      {!screens.lg ? (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }}
        >
          {SidebarContent}
        </Drawer>
      ) : (
        <Sider
          width={260}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className="user-sider"
        >
          {SidebarContent}
        </Sider>
      )}

      <Layout>
        <Header className="user-header">
          {!screens.lg && (
            <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />
          )}
          <Title level={4} className="page-title">{getPageTitle()}</Title>
          <Badge count={0}>
            <Button shape="circle" icon={<BellOutlined />} onClick={handleNotifyClick} />
          </Badge>
        </Header>

        <Content className="main-content-user">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
