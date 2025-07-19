import React, { useEffect, useState } from 'react';
import { Table, Button, message, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;

const BloodUnitList = () => {
  const [units, setUnits] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

useEffect(() => {
  const fetchUnits = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8080/api/blood-units`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = (res.data || []).filter(unit => unit.status === 'AVAILABLE');
      setUnits(filtered);
    } catch (error) {
      console.error("❌ Lỗi khi load đơn vị máu:", error);
      message.error("Không thể tải đơn vị máu.");
    }
  };

  fetchUnits();
}, []);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'bloodUnitId', // Đảm bảo đúng key từ DTO
      key: 'bloodUnitId',
      width: 80,
    },
    {
      title: 'Mã đơn vị',
      dataIndex: 'unitCode',
      key: 'unitCode',
      width: 140,
      ellipsis: true,
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodTypeName',
      key: 'bloodTypeName',
      width: 80,
    },
    {
      title: 'Thành phần',
      dataIndex: 'componentName',
      key: 'componentName',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Dung tích (ml)',
      dataIndex: 'quantityMl',
      key: 'quantityMl',
      width: 100,
    },
    {
  title: 'Ngày tạo',
  dataIndex: 'createdAt',
  key: 'createdAt',
  width: 180,
  render: (val) => {
    try {
      if (!Array.isArray(val) || val.length < 6) return 'Không xác định';
      const [year, month, day, hour, minute, second] = val;
      const date = new Date(year, month - 1, day, hour, minute, second); // Lưu ý: month - 1
      return date.toLocaleString('vi-VN');
    } catch {
      return 'Không xác định';
    }
  }
}

,
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: status => (
        <Text type={status === 'AVAILABLE' ? 'success' : 'danger'}>
          {status}
        </Text>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3}>📋 Danh sách đơn vị máu</Typography.Title>
      <Table
        rowKey={record => record.bloodUnitId ?? record.unitCode}
        dataSource={units}
        columns={columns}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không có dữ liệu đơn vị máu' }}
      />
    </div>
  );
};

export default BloodUnitList; 
