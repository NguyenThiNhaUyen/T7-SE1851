/* === src/pages/register/RegisterAccount.jsx === */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterProgress from "../components/RegisterProgress";
import { FaUser, FaEnvelope, FaAddressCard, FaLock } from "react-icons/fa";

const RegisterAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(() => {
    const saved = localStorage.getItem("registerForm");
    return saved
      ? JSON.parse(saved)
      : {
        username: "",
        password: "",
        confirmPassword: "",
        otp: ""
      };
  });
  const [errors, setErrors] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  useEffect(() => {
    localStorage.setItem("registerForm", JSON.stringify(formData));
  }, [formData]);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Vui lòng nhập username";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username phải có ít nhất 3 ký tự";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    if (!formData.otp) {
      newErrors.otp = "Vui lòng nhập mã OTP";
    } else if (!/^\d{6}$/.test(formData.otp)) {
      newErrors.otp = "Mã OTP phải gồm 6 chữ số";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = () => {
    if (validate()) {
      localStorage.setItem("registerForm", JSON.stringify(formData));
      navigate("/register/confirm");
    }
  };

  const handleBack = () => {
    navigate("/register/contact");
  };

  return (
    <div className="regis-fullpage">
      <div className="change-box">
        <RegisterProgress
          currentStep={2}
          steps={["Thông tin cá nhân", "Liên hệ", "Tài khoản", "Xác nhận"]}
          icons={[<FaUser />, <FaEnvelope />, <FaAddressCard />, <FaLock />]}
        />
        <h3 className="text-center mb-4">Tạo tài khoản</h3>

        <div className="form-group">
          <label>Tên đăng nhập<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={formData.username}
            onChange={(e) => setField("username", e.target.value)}
          />
          {errors.username && <div className="invalid-feedback d-block">{errors.username}</div>}
        </div>

        <div className="form-group" style={{ position: "relative" }}>
          <label>Mật khẩu<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={(e) => setField("password", e.target.value)}
            style={{ paddingRight: "40px" }}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "70%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            <img
              src={showPassword ? "/eye-open.png" : "/eye-close.png"}
              alt="toggle"
              width={20}
            />
          </span>
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
        </div>

        <div className="form-group" style={{ position: "relative" }}>
          <label>Nhập lại mật khẩu<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            value={formData.confirmPassword}
            onChange={(e) => setField("confirmPassword", e.target.value)}
            style={{ paddingRight: "40px" }}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              top: "70%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            <img
              src={showConfirmPassword ? "/eye-open.png" : "/eye-close.png"}
              alt="toggle"
              width={20}
            />
          </span>
          {errors.confirmPassword && (
            <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="form-group">
          <label>Nhập mã OTP<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.otp ? "is-invalid" : ""}`}
            value={formData.otp}
            onChange={(e) => setField("otp", e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            placeholder="Nhập mã gồm 6 chữ số"
          />
          {errors.otp && <div className="invalid-feedback d-block">{errors.otp}</div>}
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

export default RegisterAccount;
