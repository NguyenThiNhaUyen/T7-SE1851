import React, { useEffect, useState } from "react";
import { Card, Descriptions, Typography, Alert, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const { Title } = Typography;

const BoardUser = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || !currentUser.userId) {
      setError("Vui lòng đăng nhập để truy cập.");
      return;
    }

    UserService.getUserById(currentUser.userId)
      .then((res) => setUserDetail(res.data))
      .catch(() => setError("Không thể tải thông tin người dùng."));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-start">
      <Card
        style={{ width: "100%", maxWidth: 700 }}
        bordered={false}
        className="shadow-md rounded-xl"
      >
        <Title level={3} className="mb-4">
          <UserOutlined /> Thông tin cá nhân
        </Title>

        {error && <Alert message={error} type="error" showIcon />}

        {!userDetail && !error && (
          <div className="text-center mt-4">
            <Spin tip="Đang tải thông tin người dùng..." />
          </div>
        )}

        {userDetail && (
          <Descriptions
            bordered
            column={1}
            size="middle"
            labelStyle={{ fontWeight: 600, width: "30%" }}
          >
            <Descriptions.Item label="Họ tên">
              {userDetail.first_name} {userDetail.last_name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{userDetail.email}</Descriptions.Item>
            <Descriptions.Item label="Nhóm máu">{userDetail.blood_type || "Chưa cập nhật"}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{userDetail.address}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{userDetail.phone}</Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </div>
  );
};

export default BoardUser;
