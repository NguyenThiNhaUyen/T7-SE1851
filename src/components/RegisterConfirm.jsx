import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterProgress from "../components/RegisterProgress";
import { FaUser, FaEnvelope, FaAddressCard, FaLock } from "react-icons/fa";

const steps = ["Thông tin cá nhân", "Liên hệ", "Tài khoản", "Xác nhận"];
const icons = [<FaUser />, <FaEnvelope />, <FaAddressCard />, <FaLock />];

const RegisterConfirm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("registerForm");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        navigate("/register/information");
      }
    } else {
      navigate("/register/information");
    }
  }, [navigate]);

  const handleBack = () => navigate("/register/account");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      localStorage.removeItem("registerForm");
      alert("Đăng ký thành công! Vui lòng kiểm tra email.");
      navigate("/login");
    } catch {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="regis-fullpage">
      <div className="change-box">
        <RegisterProgress currentStep={3} steps={steps} icons={icons} />
        <h3 className="text-center mb-4">Xác nhận thông tin đăng ký</h3>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Họ tên:</strong> {formData.fullName}</p>
              <p><strong>Ngày sinh:</strong> {formData.dob}</p>
              <p><strong>Giới tính:</strong> {formData.gender}</p>
              <p><strong>{formData.docType}:</strong> {formData.docNumber}</p>
              <p><strong>Nghề nghiệp:</strong> {formData.occupation}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>SĐT:</strong> {formData.phone}</p>
              <p><strong>Username:</strong> {formData.username}</p>
            </div>
          </div>

          <div className="mt-3">
            <p><strong>Địa chỉ:</strong> {formData.address}</p>
          </div>

          <div className="alert alert-info">
            <small>
              <strong>Lưu ý:</strong> Vui lòng kiểm tra kỹ thông tin trước khi hoàn tất đăng ký.
              Một số thông tin có thể không thể thay đổi sau khi đăng ký.
            </small>
          </div>

          <div className="mt-4 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleBack}
              disabled={loading}
            >
              Quay lại
            </button>

            <button
              type="submit" className="btn btn-gradient-red" disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Đang xử lý...
                </>
              ) : (
                "Hoàn tất đăng ký"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterConfirm;