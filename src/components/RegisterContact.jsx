/* === src/pages/register/RegisterContact.jsx === */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterProgress from "../components/RegisterProgress";
import { FaUser, FaEnvelope, FaAddressCard, FaLock } from "react-icons/fa";

const RegisterContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(() => {
    const saved = localStorage.getItem("registerForm");
    return saved ? JSON.parse(saved) : { email: "", phone: "", address: "" };
  });
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    localStorage.setItem("registerForm", JSON.stringify(formData));
  }, [formData]);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.address.trim()) newErrors.address = "Vui lòng nhập địa chỉ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = () => {
    if (validate()) {
      localStorage.setItem("registerForm", JSON.stringify(formData));
      navigate("/register/account");
    }
  };

  const handleBack = () => navigate("/register/information");

  return (
    <div className="regis-fullpage">
      <div className="change-box">
        <RegisterProgress
          currentStep={1}
          steps={["Thông tin cá nhân", "Liên hệ", "Tài khoản", "Xác nhận"]}
          icons={[<FaUser />, <FaEnvelope />, <FaAddressCard />, <FaLock />]}
        />
        <h3 className="text-center mb-4">Thông tin liên hệ</h3>
        <div className="form-group">
          <label>Email<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={e => setField("email", e.target.value)}

            required
          />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Số điện thoại<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={formData.phone}
            onChange={e => setField("phone", e.target.value)}

            placeholder="0123456789"
            required
          />
          {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Địa chỉ liên hệ<span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            value={formData.address || ""}
            onChange={e => setField("address", e.target.value)}

            rows="4"
            required
          />
          <small className="form-text text-muted">Có thể khác với địa chỉ trên giấy tờ</small>
          {errors.address && <div className="invalid-feedback d-block">{errors.address}</div>}
        </div>

        <div className="mt-4 d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={handleBack}>
            Quay lại
          </button>
          <button className="btn btn-gradient-red" onClick={handleNext}>
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterContact;
