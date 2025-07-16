import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;

/**
 * Component chọn đơn vị máu từ API theo componentId và bloodTypeId
 *
 * @param {number} componentId - ID thành phần máu
 * @param {number} bloodTypeId - ID nhóm máu
 * @param {function} onSelect - Callback trả về danh sách đơn vị máu đã chọn
 */
const BloodUnitSelector = ({ componentId, bloodTypeId, onSelect }) => {
  const [units, setUnits] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [selectedComponentId, setSelectedComponentId] = useState(null); // 👉 lưu component_id đã chọn
  const [selectedUnitIds, setSelectedUnitIds] = useState([]); // 👉 lưu danh sách ID các đơn vị máu đã chọn

  // Gọi API khi componentId hoặc bloodTypeId thay đổi
  useEffect(() => {
    if (componentId && bloodTypeId) {
      axios
        .get(`/api/blood-units/available/filter?componentId=${componentId}&bloodTypeId=${bloodTypeId}`)
        .then((res) => {
          setUnits(res.data);
          setSelectedComponentId(componentId); // Gán lại component_id
        })
        .catch((err) => console.error('Lỗi khi lấy đơn vị máu:', err));
    }
  }, [componentId, bloodTypeId]);

  // Xử lý chọn đơn vị máu
  const handleChange = (keys, selectedRows) => {
    setSelectedRowKeys(keys);
    const total = selectedRows.reduce((sum, unit) => sum + (unit.quantityMl || 0), 0);
    setTotalQuantity(total);
    setSelectedUnitIds(keys); // 👉 lưu lại ID để truyền sang form cha
    onSelect?.(selectedRows); // Gọi callback nếu có
  };

  // Cột bảng đơn vị máu
  const columns = [
    {
      title: 'Mã đơn vị',
      dataIndex: 'unitCode',
      key: 'unitCode',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Thể tích',
      dataIndex: 'quantityMl',
      key: 'quantityMl',
      render: (ml) => <Text>{ml} ml</Text>,
    },
    {
      title: 'Nhóm máu',
      dataIndex: 'bloodTypeName',
      key: 'bloodTypeName',
      render: (val) => <Tag color="red">{val}</Tag>,
    },
    {
      title: 'Thành phần',
      dataIndex: 'componentName',
      key: 'componentName',
      render: (val) => <Tag color="blue">{val}</Tag>,
    },
  ];

  return (
    <div>
      <Table
        rowKey="bloodUnitId"
        dataSource={units}
        columns={columns}
        size="small"
        pagination={false}
        bordered
        rowSelection={{
          selectedRowKeys,
          onChange: handleChange,
        }}
      />
      <div style={{ marginTop: 8 }}>
        <Text strong>Tổng thể tích:</Text> {totalQuantity} ml
        <br />
        <Text type="secondary">Số lượng đơn vị đã chọn: {selectedUnitIds.length}</Text>
        <br />
        <Text type="secondary">ID thành phần: {selectedComponentId}</Text> {/* // component_id */}
      </div>
    </div>
  );
};

export default BloodUnitSelector;
