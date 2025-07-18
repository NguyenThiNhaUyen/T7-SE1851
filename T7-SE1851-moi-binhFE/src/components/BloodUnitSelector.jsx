import React, { useEffect, useState } from 'react';
import { Table, Button, message, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;

// ✅ Hàm kiểm tra tương thích nhóm máu theo bloodTypeId
const isCompatible = (donorId, recipientId) => {
  const compatibilityMap = {
    1: [1, 2, 7, 8],          // A+
    2: [2, 8],                // A-
    3: [3, 4, 7, 8],          // B+
    4: [4, 8],                // B-
    5: [1, 2, 3, 4, 5, 6, 7, 8], // AB+
    6: [2, 4, 6, 8],          // AB-
    7: [7, 8],                // O+
    8: [8],                   // O-
  };
  return compatibilityMap[recipientId]?.includes(donorId);
};

const BloodUnitSelector = ({ id, onSelect }) => {
  const { componentId, bloodTypeId } = id || {};
  const [units, setUnits] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:8080/api/blood-units/available/filter`, {
          params: { componentId },
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Lọc đơn vị máu tương thích theo quy luật truyền máu
        const filtered = res.data.filter(unit =>
          isCompatible(unit.bloodTypeId, bloodTypeId)
        );

        setUnits(filtered);
      } catch (error) {
        console.error("❌ Lỗi khi load đơn vị máu:", error);
        message.error("Không thể tải đơn vị máu.");
      }
    };

    if (componentId && bloodTypeId) {
      fetchUnits();
    }
  }, [componentId, bloodTypeId]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
      ellipsis: true,
    },
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedItems) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedItems);
    },
  };

  const handleConfirm = () => {
    onSelect(selectedRows);
  };

  return (
    <div style={{ maxHeight: 400, overflowY: 'auto' }}>
      <Table
        rowKey={record => record.id ?? record.unitCode}
        dataSource={units}
        columns={columns}
        rowSelection={rowSelection}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
        size="small"
        locale={{ emptyText: 'Không có đơn vị máu phù hợp' }}
      />

      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={handleConfirm}
        disabled={selectedRows.length === 0}
      >
        Xác nhận chọn ({selectedRows.length})
      </Button>
    </div>
  );
};

export default BloodUnitSelector;
