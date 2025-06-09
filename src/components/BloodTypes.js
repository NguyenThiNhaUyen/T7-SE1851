import React, { useEffect, useState } from "react";

const BloodTypes = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dữ liệu mẫu, có thể thay bằng API /users/blood/types
    const sampleData = [
      { id: 1, name: "A+", rh_factor: "+", compatible_donors: ["A+", "A-", "O+", "O-"], compatible_recipients: ["A+", "AB+"], description: "Nhóm máu phổ biến, có thể nhận từ A+, A-, O+, O-." },
      { id: 2, name: "A-", rh_factor: "-", compatible_donors: ["A-", "O-"], compatible_recipients: ["A+", "A-", "AB+", "AB-"], description: "Nhóm máu hiếm, an toàn cho phụ nữ mang thai Rh-." },
      { id: 3, name: "B+", rh_factor: "+", compatible_donors: ["B+", "B-", "O+", "O-"], compatible_recipients: ["B+", "AB+"], description: "Phổ biến ở một số khu vực châu Á." },
      { id: 4, name: "B-", rh_factor: "-", compatible_donors: ["B-", "O-"], compatible_recipients: ["B+", "B-", "AB+", "AB-"], description: "Ít gặp, cần bảo quản cẩn thận." },
      { id: 5, name: "AB+", rh_factor: "+", compatible_donors: ["Tất cả"], compatible_recipients: ["AB+"], description: "Nhóm nhận phổ thông, hiếm khi hiến cho người khác." },
      { id: 6, name: "AB-", rh_factor: "-", compatible_donors: ["AB-", "A-", "B-", "O-"], compatible_recipients: ["AB+", "AB-"], description: "Rất hiếm, cần ưu tiên bảo quản." },
      { id: 7, name: "O+", rh_factor: "+", compatible_donors: ["O+", "O-"], compatible_recipients: ["O+", "A+", "B+", "AB+"], description: "Nhóm hiến rộng rãi, phổ biến toàn cầu." },
      { id: 8, name: "O-", rh_factor: "-", compatible_donors: ["O-"], compatible_recipients: ["Tất cả"], description: "Nhóm hiến phổ thông, cứu sống trong khẩn cấp." },
    ];
    setTimeout(() => {
      setBloodTypes(sampleData);
      setLoading(false);
    }, 500); // Mô phỏng delay API
  }, []);

  if (loading) return <div className="loading-spinner">Đang tải dữ liệu...</div>;

  return (
    <div className="education-section">
      <h2>Các loại nhóm máu</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="education-content">
        {bloodTypes.map((type) => (
          <div key={type.id} className="education-item">
            <h4>{type.name} ({type.rh_factor})</h4>
            <p><strong>Tính tương thích:</strong></p>
            <ul>
              <li><em>Nhận từ:</em> {type.compatible_donors.join(", ")}</li>
              <li><em>Hiến cho:</em> {type.compatible_recipients.join(", ")}</li>
            </ul>
            <p>{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodTypes;