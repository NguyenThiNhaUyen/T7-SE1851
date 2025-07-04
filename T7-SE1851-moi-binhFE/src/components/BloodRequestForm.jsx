import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Checkbox,
  DatePicker,
  Form,
  Row,
  Col,
  Card,
  message,
  Space,
  Divider,
  Typography
} from "antd";
import {
  PrinterOutlined,
  FilePdfOutlined,
  SaveOutlined
} from "@ant-design/icons";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import AuthService from '../services/auth.service';
const currentUser = AuthService.getCurrentUser();
const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const token = localStorage.getItem('token');



const BloodRequestForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    // requesterId: currentUser.userId, // giả lập user đang đăng nhập, bạn có thể cập nhật động sau
    doctorId: 11, // ✅ Gán mặc định bác sĩ ID 11
    patientName: "",
    patientPhone: "",
    patientAge: "",
    patientGender: "",
    patientWeight: "",
    patientBloodGroup: "",
    bloodTypeId: null,
    componentId: null,
    quantityBag: "",
    quantityMl: "",
    urgencyLevel: "",
    triageLevel: "RED", // Có thể cho phép chọn RED/YELLOW/GREEN
    reason: "",
    neededAt: "",
    crossmatchRequired: false,
    hasTransfusionHistory: false,
    hasReactionHistory: false,
    isPregnant: false,
    hasAntibodyIssue: false,
    warningNote: "",
    specialNote: "",
    isUnmatched: false,
    codeRedId: null,

    // Thông tin hiển thị nhưng không gửi API
    medical_record_id: "",
    hospital_name: "BỆNH VIỆN NGỌC HUYẾT",
    department: "KHOA TRUYỀN MÁU - HÓA SINH",
    doctor_signature: "",
    lab_signature: "",
    requester_name: ""
  });


useEffect(() => {
  const currentUser = AuthService.getCurrentUser();

  if (currentUser) {
    const generatedCode = `BA${new Date().getFullYear()}${currentUser.userId.toString().padStart(4, '0')}`;
    
    setFormData(prev => ({
      ...prev,
      requesterId: currentUser.userId,
      medical_record_id: generatedCode
    }));

    form.setFieldsValue({
      medical_record_id: generatedCode
    });
  }
}, [form]);


  const handleFormChange = (changedValues, allValues) => {
    setFormData(prev => ({ ...prev, ...allValues }));
  };

  const validateForm = (values) => {
    const age = parseInt(values.age);
    const weight = parseFloat(values.weight);
    const quantity = parseInt(values.quantity_ml);
    const units = parseInt(values.unit_count);

    if (!(age > 0 && age <= 120)) return "Tuổi phải trong khoảng 1 - 120.";
    if (!(weight >= 3 && weight <= 300)) return "Cân nặng phải từ 3kg đến 300kg.";
    if (!(units > 0 && Number.isInteger(units))) return "Số túi phải là số nguyên dương.";
    if (!(quantity === units * 250 || quantity === units * 500)) return "Thể tích phải khớp với số túi.";
    if (values.contact && !/^0\d{9}$/.test(values.contact)) return "Số điện thoại không hợp lệ.";
    return null;
  };

const handleSubmit = async (values) => {
  const error = validateForm(values);
  if (error) {
    message.error(error);
    return;
  }

  try {
    const payload = {
      requesterId: formData.requesterId,
      doctorId: formData.doctorId,
      patientName: values.patient_name,
      patientPhone: values.contact,
      patientAge: Number(values.age),
      patientGender: values.gender,
      patientWeight: Number(values.weight),
      patientBloodGroup: values.blood_type || "", // nếu có tên nhóm máu
      bloodTypeId: values.bloodTypeId,
      componentId: values.bloodComponentId,
      quantityBag: Number(values.unit_count),
      quantityMl: Number(values.quantity_ml),
      urgencyLevel: values.urgency_level?.toUpperCase(),
      triageLevel: formData.triageLevel || "RED",
      reason: values.clinical_indication,
      neededAt: values.required_time?.toISOString?.() || values.required_time,
      crossmatchRequired: values.crossmatch_required || false,
      hasTransfusionHistory: values.previous_transfusion || false,
      hasReactionHistory: values.previous_reaction || false,
      isPregnant: values.is_pregnant || false,
      hasAntibodyIssue: values.abnormal_antibody || false,
      warningNote: values.warning_factor,
      specialNote: values.special_notes,
      isUnmatched: false,
      codeRedId: null
    };

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8080/api/blood-requests",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    message.success("✅ Gửi yêu cầu máu thành công!");
    setFormData(prev => ({ ...prev, ...values, submitted_at: new Date() }));
  } catch (err) {
    console.error(err);
    message.error("❌ Lỗi khi gửi yêu cầu máu.");
  }
};


  const requiredMessage = (label) => [{ required: true, message: `Vui lòng nhập ${label}` }];

  const generatePDF = async () => {
    const element = document.getElementById('printable-form');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Phieu_yeu_cau_truyen_mau_${formData.medical_record_id}.pdf`);
    message.success('Đã xuất PDF thành công!');
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-form');
    const winPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    winPrint.document.write(`
      <html>
        <head>
          <title>Phiếu Yêu Cầu Truyền Máu</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 0; padding: 20px; }
            .hospital-header { text-align: center; margin-bottom: 30px; }
            .hospital-name { color: #d32f2f; font-size: 24px; font-weight: bold; margin: 0; }
            .department { color: #1976d2; font-size: 18px; margin: 5px 0; }
            .form-title { font-size: 20px; font-weight: bold; text-decoration: underline; margin: 15px 0; }
            .patient-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .field { margin: 8px 0; font-size: 14px; }
            .signatures { display: flex; justify-content: space-between; margin-top: 50px; }
            .signature-box { text-align: center; width: 200px; }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    winPrint.document.close();
    winPrint.focus();
    winPrint.print();
    winPrint.close();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Form nhập liệu */}
      <Card title="Phiếu Yêu Cầu Truyền Máu" style={{ marginBottom: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleFormChange}
          initialValues={formData}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Mã bệnh án" name="medical_record_id" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Liên hệ" name="contact" rules={requiredMessage('liên hệ')}>
                <Input placeholder="0xxxxxxxxx" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Người phụ trách" name="requester_name" rules={requiredMessage('người yêu cầu')}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ tên bệnh nhân" name="patient_name" rules={requiredMessage('họ tên bệnh nhân')}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Tuổi" name="age" rules={requiredMessage('tuổi')}>
                <Input type="number" min={1} max={120} />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="Giới tính" name="gender" rules={requiredMessage('giới tính')}>
                <Select>
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="Cân nặng (kg)" name="weight" rules={requiredMessage('cân nặng')}>
                <Input type="number" min={3} max={300} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Nhóm máu" name="bloodTypeId" rules={requiredMessage('nhóm máu')}>
                <Select placeholder="Chọn nhóm máu">
                  <Option value={null}>Chưa biết</Option>
                  <Option value={1}>A+</Option>
                  <Option value={2}>A-</Option>
                  <Option value={3}>B+</Option>
                  <Option value={4}>B-</Option>
                  <Option value={5}>AB+</Option>
                  <Option value={6}>AB-</Option>
                  <Option value={7}>O+</Option>
                  <Option value={8}>O-</Option>
                </Select>

              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Loại chế phẩm" name="bloodComponentId" rules={requiredMessage('loại chế phẩm')}>
                <Select placeholder="Chọn chế phẩm máu" allowClear>
                  <Option value={1}>Hồng cầu (PRBC)</Option>
                  <Option value={2}>Huyết tương</Option>
                  <Option value={3}>Tiểu cầu</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="Số túi" name="unit_count" rules={requiredMessage('số túi')}>
                <Input type="number" min={1} />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="Thể tích (ml)" name="quantity_ml" rules={requiredMessage('thể tích')}>
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="Mức độ" name="urgency_level" rules={requiredMessage('mức độ')}>
                <Select>
                  <Option value="Bình thường">Bình thường</Option>
                  <Option value="Khẩn cấp">Khẩn cấp</Option>
                  <Option value="Cấp cứu">Cấp cứu</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Chẩn đoán lâm sàng" name="clinical_indication" rules={requiredMessage('chẩn đoán lâm sàng')}>
                <TextArea rows={2} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Thời gian cần máu" name="required_time" rules={requiredMessage('thời gian cần máu')}>
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Space wrap>
                <Form.Item name="crossmatch_required" valuePropName="checked">
                  <Checkbox>Yêu cầu Crossmatch</Checkbox>
                </Form.Item>
                <Form.Item name="previous_transfusion" valuePropName="checked">
                  <Checkbox>Từng truyền máu</Checkbox>
                </Form.Item>
                <Form.Item name="previous_reaction" valuePropName="checked">
                  <Checkbox>Có phản ứng trước đây</Checkbox>
                </Form.Item>
                <Form.Item name="is_pregnant" valuePropName="checked">
                  <Checkbox>Có thai</Checkbox>
                </Form.Item>
                <Form.Item name="abnormal_antibody" valuePropName="checked">
                  <Checkbox>Phát hiện kháng thể bất thường</Checkbox>
                </Form.Item>
              </Space>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Yếu tố cảnh báo" name="warning_factor">
                <TextArea placeholder="Chia túi nhỏ, chống chỉ định dị ứng, thuốc lợi tiểu..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ghi chú đặc biệt" name="special_notes">
                <TextArea placeholder="Truyền nhóm O-, bệnh lý nền..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" danger htmlType="submit" icon={<SaveOutlined />}>
                Gửi yêu cầu
              </Button>
              <Button onClick={handlePrint} icon={<PrinterOutlined />}>
                In phiếu
              </Button>
              <Button onClick={generatePDF} icon={<FilePdfOutlined />}>
                Xuất PDF
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* Khối xem trước A4 */}
      <Card title="Xem trước phiếu in" className="no-print">
        <div
          id="printable-form"
          style={{
            width: '210mm',
            minHeight: '297mm',
            margin: '0 auto',
            padding: '20mm',
            backgroundColor: 'white',
            fontFamily: 'Times New Roman, serif',
            fontSize: '14px',
            lineHeight: '1.5',
            border: '1px solid #ddd'
          }}
        >
          {/* Header */}
          <div className="hospital-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div className="hospital-name" style={{ color: '#d32f2f', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {formData.hospital_name}
            </div>
            <div className="department" style={{ color: '#1976d2', fontSize: '18px', textDecoration: 'underline', margin: '5px 0' }}>
              {formData.department}
            </div>
            <div className="form-title" style={{ fontSize: '16px', fontWeight: 'bold', margin: '15px 0' }}>
              PHIẾU YÊU CẦU TRUYỀN MÁU
            </div>
          </div>

          {/* Patient Info */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div><strong>Mã bệnh án:</strong> {formData.medical_record_id}</div>
              <div><strong>Ngày:</strong> {new Date().toLocaleDateString('vi-VN')}</div>
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
              <div className="field"><strong>Họ tên bệnh nhân:</strong> {formData.patient_name}</div>
              <div className="field"><strong>Liên hệ:</strong> {formData.contact}</div>
            </div>

            <div style={{ display: 'flex', gap: '30px' }}>
              <div className="field"><strong>Tuổi:</strong> {formData.age}</div>
              <div className="field"><strong>Giới tính:</strong> {formData.gender}</div>
              <div className="field"><strong>Cân nặng:</strong> {formData.weight} kg</div>
              <div className="field"><strong>Nhóm máu:</strong> {formData.blood_type}</div>
            </div>

          </div>

          <Divider />

          {/* Medical Info */}
          <div style={{ marginBottom: '20px' }}>
            <div className="field"><strong>Chẩn đoán lâm sàng:</strong> {formData.clinical_indication}</div>
            <div className="field"><strong>Loại chế phẩm máu:</strong> {formData.blood_component}</div>
            <div className="field"><strong>Số lượng:</strong> {formData.unit_count} túi - {formData.quantity_ml} ml</div>
            <div className="field"><strong>Mức độ yêu cầu:</strong> {formData.urgency_level}</div>
            <div className="field">
              <strong>Thời gian cần máu:</strong>{" "}
              {formData.required_time ? new Date(formData.required_time).toLocaleString("vi-VN") : ""}
            </div>
          </div>

          <Divider />

          {/* Checkboxes */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>☐ Yêu cầu Crossmatch {formData.crossmatch_required && '✓'}</div>
              <div>☐ Từng truyền máu {formData.previous_transfusion && '✓'}</div>
              <div>☐ Có phản ứng trước đây {formData.previous_reaction && '✓'}</div>
              <div>☐ Có thai {formData.is_pregnant && '✓'}</div>
              <div style={{ gridColumn: 'span 2' }}>☐ Phát hiện kháng thể bất thường {formData.abnormal_antibody && '✓'}</div>
            </div>
          </div>

          <Divider />

          {/* Additional Info */}
          <div style={{ marginBottom: '20px' }}>
            <div className="field"><strong>Yếu tố cảnh báo:</strong> {formData.warning_factor}</div>
            <div className="field"><strong>Ghi chú đặc biệt:</strong> {formData.special_notes}</div>
          </div>

          {/* Signatures */}
          <div className="signatures" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
            <div className="signature-box" style={{ textAlign: 'center', width: '200px' }}>
              <div><strong>Bác sĩ yêu cầu</strong></div>
              <div style={{ height: '60px' }}></div>
              <div>{formData.requester_name}</div>
            </div>
            <div className="signature-box" style={{ textAlign: 'center', width: '200px' }}>
              <div><strong>Người điền phiếu</strong></div>
              <div style={{ height: '60px' }}></div>
              <div>________________</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BloodRequestForm;