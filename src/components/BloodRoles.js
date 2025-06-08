import React, { useEffect, useState } from "react";
import "../styles/user.css";
const BloodRoles = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dữ liệu mẫu, có thể thay bằng API /users/blood/roles
    const sampleData = [
      { id: 1, role_name: "Người hiến máu (Chủ)", description: "Là người cung cấp máu, cần sức khỏe tốt và đủ điều kiện (tuổi 18-65, cân nặng >45kg). Nhóm O- là 'người hiến phổ thông'." },
      { id: 2, role_name: "Người nhận máu (Phụ)", description: "Là người cần truyền máu do phẫu thuật, tai nạn, hoặc bệnh lý. Nhóm AB+ là 'người nhận phổ thông'." },
      { id: 3, role_name: "Người hỗ trợ", description: "Gia đình hoặc bạn bè hỗ trợ người nhận, giúp liên hệ và theo dõi quá trình truyền máu." },
    ];
    setTimeout(() => {
      setRoles(sampleData);
      setLoading(false);
    }, 500); // Mô phỏng delay API
  }, []);

  if (loading) return <div className="loading-spinner">Đang tải dữ liệu...</div>;

  return (
    <div className="education-section">
      <h2>Chủ và phụ trong truyền máu</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="education-content">
        {roles.map((role) => (
          <div key={role.id} className="education-item">
            <h4>{role.role_name}</h4>
            <p>{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRoles;