import React, { useEffect, useState } from "react";

const BloodReceive = () => {
  const [receiveMethods, setReceiveMethods] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dữ liệu dựa trên hình ảnh, có thể thay bằng API /users/blood/receive
    const sampleData = [
      { 
        id: 1, 
        method_name: "Đăng ký trực tuyến", 
        steps: [
          "Truy cập mục 'Gửi yêu cầu nhận máu' trên website.",
          "Chọn nhóm máu và số lượng cần.",
          "Xác nhận và nhận thông báo qua email hoặc SMS."
        ],
        note: "Vui lòng đảm bảo thông tin chính xác để quá trình xử lý nhanh chóng."
      },
      { 
        id: 2, 
        method_name: "Liên hệ hotline", 
        steps: [
          "Gọi số 1900-123-456 (24/7).",
          "Cung cấp thông tin cá nhân và yêu cầu khẩn cấp.",
          "Đợi nhân viên liên hệ lại trong 15 phút."
        ],
        note: "Hotline hỗ trợ 24/7, ưu tiên trường hợp khẩn cấp."
      },
      { 
        id: 3, 
        method_name: "Đến trung tâm y tế", 
        steps: [
          "Mang CMND/CCCD đến trung tâm y tế gần nhất.",
          "Điền biểu mẫu yêu cầu.",
          "Nhận máu sau khi được bác sĩ phê duyệt (thường trong 1-2 giờ)."
        ],
        note: "Đảm bảo sức khỏe ổn định trước khi đến nhận máu."
      },
    ];
    setTimeout(() => {
      setReceiveMethods(sampleData);
      setLoading(false);
    }, 500); // Mô phỏng delay API
  }, []);

  if (loading) return <div className="loading-spinner">Đang tải dữ liệu...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="education-section">
      <h2>Cách nhận máu</h2>
      <div className="education-content">
        {receiveMethods.map((method) => (
          <div key={method.id} className="education-item">
            <h4>{method.method_name}</h4>
            <ul>
              {method.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            {method.note && <p className="note">{method.note}</p>}
          </div>
        ))}
      </div>
      <div className="contact-info">
        <p><strong>Liên hệ hỗ trợ:</strong></p>
        <p>Hotline: <a href="tel:1900123456">1900-123-456</a></p>
        <p>Email: <a href="mailto:support@bloodbank.com">support@bloodbank.com</a></p>
        <p>Website: <a href="https://bloodbank.com" target="_blank" rel="noopener noreferrer">https://bloodbank.com</a></p>
      </div>
    </div>
  );
};

export default BloodReceive;