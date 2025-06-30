import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Badge,
  Button,
  Space,
  Popover,
  List,
  Typography
} from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  HomeOutlined,
  ReadOutlined,
  QuestionCircleOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import "../styles/Navbar.css";

const { Header } = Layout;
const { Text } = Typography;

const Navbar = ({ currentUser, showAdminBoard, showStaffBoard, showUserBoard, logOut }) => {
    const navigate = useNavigate();
    const [notificationCount] = useState(2); // Mock notification count

    const handleLogout = () => {
        logOut();
        navigate("/login");
    };

    // Menu items cho navigation chính
    const navigationItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <NavLink to="/home">Trang chủ</NavLink>,
        },
        {
            key: 'blog',
            icon: <ReadOutlined />,
            label: <NavLink to="/blog">Tin tức</NavLink>,
        },
        {
            key: 'faq',
            icon: <QuestionCircleOutlined />,
            label: <NavLink to="/faq">Hỏi - Đáp</NavLink>,
        },
        {
            key: 'activities',
            icon: <CalendarOutlined />,
            label: <NavLink to="/activities">Hoạt động</NavLink>,
        }
    ];

    // Notification content
    const notificationContent = (
        <div style={{ width: 300 }}>
            <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '12px' }}>
                Thông báo
            </Text>
            <List
                size="small"
                dataSource={[
                    'Đây là thông báo 1',
                    'Thông báo 2 sẽ ở đây',
                    'Thông báo quan trọng khác'
                ]}
                renderItem={(item, index) => (
                    <List.Item style={{ padding: '8px 0', borderBottom: index < 2 ? '1px solid #f0f0f0' : 'none' }}>
                        <Text>{item}</Text>
                    </List.Item>
                )}
            />
        </div>
    );

    // User menu items
    const userMenuItems = [
        ...(showUserBoard && !showAdminBoard && !showStaffBoard ? [{
            key: 'profile',
            icon: <UserOutlined />,
            label: <NavLink to="/profile">Hồ sơ cá nhân</NavLink>,
        }] : []),
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
            onClick: handleLogout,
        }
    ];

    return (
        <Header 
            style={{ 
                background: '#d32f2f', // Blood red theme
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}
        >
            {/* Logo section */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src="/Logo-Blood-Donation.jpg" 
                    alt="Logo" 
                    style={{ 
                        height: '40px', 
                        marginRight: '24px',
                        borderRadius: '4px'
                    }} 
                />
            </div>

            {/* Navigation menu */}
            <Menu
                mode="horizontal"
                items={navigationItems}
                style={{
                    background: 'transparent',
                    border: 'none',
                    flex: 1,
                    justifyContent: 'center'
                }}
                theme="dark"
            />

            {/* User section */}
            <Space size="large">
                {currentUser && (
                    <Popover
                        content={notificationContent}
                        title={null}
                        trigger="click"
                        placement="bottomRight"
                    >
                        <Badge count={notificationCount} size="small">
                            <Button
                                type="text"
                                icon={<BellOutlined />}
                                style={{ 
                                    color: 'white',
                                    fontSize: '18px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            />
                        </Badge>
                    </Popover>
                )}

                {currentUser ? (
                    <Dropdown
                        menu={{ items: userMenuItems }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Space style={{ cursor: 'pointer', color: 'white' }}>
                            <Avatar 
                                icon={<UserOutlined />} 
                                size="small"
                                style={{ backgroundColor: '#fff', color: '#d32f2f' }}
                            />
                            <Text style={{ color: 'white', fontWeight: 500 }}>
                                {currentUser.username}
                            </Text>
                        </Space>
                    </Dropdown>
                ) : (
                    <Space>
                        <Button
                            type="ghost"
                            icon={<LoginOutlined />}
                            onClick={() => navigate('/login')}
                            style={{ 
                                borderColor: 'white',
                                color: 'white'
                            }}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            type="primary"
                            icon={<UserAddOutlined />}
                            onClick={() => navigate('/register/information')}
                            style={{ 
                                backgroundColor: 'white',
                                borderColor: 'white',
                                color: '#d32f2f'
                            }}
                        >
                            Đăng ký
                        </Button>
                    </Space>
                )}
            </Space>
        </Header>
    );
};

export default Navbar;