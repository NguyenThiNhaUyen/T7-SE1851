import React, { useState } from 'react';
import { Table, Tag, Button, Modal, Descriptions } from 'antd';

const data = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    phone: '0987xxxxxx',
    bloodType: 'A+',
    location: 'Bệnh viện Chợ Rẫy',
    level: 'NOW',
    lastDonate: '2025-06-12',
    recovery: '10 ngày',
    note: 'Có mặt 15’',
    detail: {
      dob: '01/01/1990',
      gender: 'Nam',
      cccd: '123456789012',
      email: 'nguyenvana@gmail.com',
      address: '123 Lê Lợi, P. Bến Thành, Q.1, TP.HCM',
      job: 'Kỹ sư phần mềm',
      status: 'Đang sẵn sàng (Đã xác minh)',
    },
  },
  {
    key: '2',
    name: 'Trần Thị B',
    phone: '0909xxxxxx',
    bloodType: 'O-',
    location: 'BV 115',
    level: 'FLEXIBLE',
    lastDonate: '2025-05-01',
    recovery: '20 ngày',
    note: 'Gọi sau 18h',
    detail: {
      dob: '10/10/1995',
      gender: 'Nữ',
      cccd: '987654321000',
      email: 'tranb@gmail.com',
      address: '456 Lý Thường Kiệt, Q.10, TP.HCM',
      job: 'Giáo viên',
      status: 'Đang sẵn sàng (Đã xác minh)',
    },
  }
];

const UrgentList = () => {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const levelTag = (level) => {
    const color = level === 'NOW' ? 'red' : 'orange';
    return <Tag color={color}>{level}</Tag>;
  };

  const columns = [
    { title: 'STT', dataIndex: 'key' },
    { title: 'Họ tên', dataIndex: 'name' },
    { title: 'SĐT', dataIndex: 'phone' },
    { title: 'Nhóm máu', dataIndex: 'bloodType' },
    { title: 'Địa điểm', dataIndex: 'location' },
    {
      title: 'Mức sẵn sàng',
      dataIndex: 'level',
      render: (level) => levelTag(level)
    },
    { title: 'Hiến gần nhất', dataIndex: 'lastDonate' },
    { title: 'Hồi phục', dataIndex: 'recovery' },
    { title: 'Ghi chú', dataIndex: 'note' },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Button type="link" onClick={() => showDetail(record)}>👁️ Chi tiết</Button>
      )
    }
  ];

  const showDetail = (record) => {
    setSelected(record);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />

      {selected && (
        <Modal
          open={isModalOpen}
          title="📒 Hồ sơ người hiến máu khẩn cấp"
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Họ tên">{selected.name}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">{selected.detail.dob}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{selected.detail.gender}</Descriptions.Item>
            <Descriptions.Item label="CCCD">{selected.detail.cccd}</Descriptions.Item>
            <Descriptions.Item label="SĐT">{selected.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{selected.detail.email}</Descriptions.Item>
            <Descriptions.Item label="Vị trí hiện tại">{selected.location}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{selected.detail.address}</Descriptions.Item>
            <Descriptions.Item label="Nhóm máu">{selected.bloodType}</Descriptions.Item>
            <Descriptions.Item label="Mức độ sẵn sàng">{selected.level}</Descriptions.Item>
            <Descriptions.Item label="Hiến gần nhất">{selected.lastDonate}</Descriptions.Item>
            <Descriptions.Item label="Thời gian hồi phục">{selected.recovery}</Descriptions.Item>
            <Descriptions.Item label="Nghề nghiệp">{selected.detail.job}</Descriptions.Item>
            <Descriptions.Item label="Tình trạng">{selected.detail.status}</Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </>
  );
};

export default UrgentList;
