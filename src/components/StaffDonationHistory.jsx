import React, { useState } from 'react';
import { Table, Input, Button, Modal, Descriptions, Empty, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const data = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    bloodType: 'O+',
    status: 'Đã hoàn thành',
    location: 'Quận 1, TP.HCM',
    phone: '0912 123 456',
    time: '30/06/2025 10:05',
    note: 'Đã hiến lần trước',
    detail: {
      date: '15/06/2025',
      location: 'Bệnh viện Huyết học Trung ương',
      volume: '350ml',
      bloodType: 'O+',
      component: 'Máu toàn phần / Huyết tương / Tiểu cầu',
      separateStatus: 'Đã tách'
    }
  },
  // Thêm dữ liệu mẫu khác nếu cần
];

const StaffDonationHistory = () => {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { title: 'STT', dataIndex: 'key' },
    { title: 'Họ tên', dataIndex: 'name' },
    { title: 'Nhóm máu', dataIndex: 'bloodType' },
    { title: 'Trạng thái hiến máu', dataIndex: 'status' },
    { title: 'Khu vực', dataIndex: 'location' },
    { title: 'Số điện thoại', dataIndex: 'phone' },
    { title: 'Thời gian hiến', dataIndex: 'time' },
    { title: 'Ghi chú', dataIndex: 'note' },
    {
      title: 'Xem chi tiết',
      render: (_, record) => (
        <Button type="link" onClick={() => showDetail(record)}>
          Xem
        </Button>
      )
    }
  ];

  const showDetail = (record) => {
    setSelected(record);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Bộ lọc */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input.Search placeholder="Tìm kiếm theo địa điểm hoặc trạng thái" />
        <RangePicker />
        <Button type="primary">Lọc</Button>
      </div>

      {/* Bảng */}
      {data.length > 0 ? (
        <Table columns={columns} dataSource={data} pagination={false} />
      ) : (
        <Empty description="Không có lịch sử hiến máu" />
      )}

      {/* Modal chi tiết */}
      {selected && (
        <Modal
          open={isModalOpen}
          title={`Chi tiết lần hiến máu - Ngày ${selected.detail.date}`}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Ngày hiến">{selected.detail.date}</Descriptions.Item>
            <Descriptions.Item label="Địa điểm">{selected.detail.location}</Descriptions.Item>
            <Descriptions.Item label="Thể tích">{selected.detail.volume}</Descriptions.Item>
            <Descriptions.Item label="Nhóm máu">{selected.detail.bloodType}</Descriptions.Item>
            <Descriptions.Item label="Thành phần">{selected.detail.component}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{selected.detail.separateStatus}</Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </div>
  );
};

export default StaffDonationHistory;
