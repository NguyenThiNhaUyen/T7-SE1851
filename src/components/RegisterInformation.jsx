/* === src/pages/register/RegisterInformation.jsx === */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterProgress from "../components/RegisterProgress";
import { FaUser, FaEnvelope, FaAddressCard, FaLock } from "react-icons/fa";

const steps = ["Thông tin cá nhân", "Liên hệ", "Tài khoản", "Xác nhận"];
const icons = [<FaUser />, <FaEnvelope />, <FaAddressCard />, <FaLock />];

const RegisterInformation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState(() => {
    const saved = localStorage.getItem("registerForm");
    return saved
      ? JSON.parse(saved)
      : {
        fullName: "",
        dob: "",
        gender: "",
        docType: "CCCD",
        docNumber: "",
        province: "",
        district: "",
        ward: "",
        street: "",
        occupation: ""
      };
  });
  const [errors, setErrors] = React.useState({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    localStorage.setItem("registerForm", JSON.stringify(formData));
  }, [formData]);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.docNumber.trim()) newErrors.docNumber = "Vui lòng nhập số giấy tờ";
    else if (formData.docType === "CCCD" && formData.docNumber.length !== 12) {
      newErrors.docNumber = "Số CCCD phải có 12 chữ số";
    }
    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
    if (!formData.dob) newErrors.dob = "Vui lòng chọn ngày sinh";
    else if (new Date(formData.dob) >= new Date()) {
      newErrors.dob = "Ngày sinh không hợp lệ";
    }
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!formData.province.trim()) newErrors.province = "Vui lòng nhập tỉnh/thành phố";
    if (!formData.district.trim()) newErrors.district = "Vui lòng nhập quận/huyện";
    if (!formData.ward.trim()) newErrors.ward = "Vui lòng nhập phường/xã";
    if (!formData.street.trim()) newErrors.street = "Vui lòng nhập số nhà, tên đường";
    if (!formData.occupation.trim()) newErrors.occupation = "Vui lòng nhập nghề nghiệp";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      // Auto-generate full address
      const address = `${formData.street}, ${formData.ward}, ${formData.district}, ${formData.province}`;
      const updated = { ...formData, address };
      localStorage.setItem("registerForm", JSON.stringify(updated));
      navigate("/register/contact");
    }
  };

  return (
    <div className="regis-fullpage">
      <div className="regis-container">
        <div className="change-box">
          <RegisterProgress currentStep={0} steps={steps} icons={icons} />
          <h3 className="text-center mb-4">Thông tin cá nhân</h3>

          <div className="form-group">
            <label>Chọn loại giấy tờ<span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="form-control"
              value={formData.docType}
              onChange={(e) => setField("docType", e.target.value)}
              required
            >
              <option value="CCCD">Căn cước công dân</option>
              <option value="CMND">Chứng minh nhân dân</option>
              <option value="hộ chiếu">Hộ chiếu</option>
            </select>
          </div>

          <div className="form-group">
            <label>Số {formData.docType}<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.docNumber ? "is-invalid" : ""}`}
              value={formData.docNumber}
              onChange={(e) => setField("docNumber", e.target.value.replace(/\D/g, ""))}
              required
            />
            <small className="form-text text-muted">
              {formData.docType === "CCCD" ? "Nhập đầy đủ 12 chữ số" : "Nhập số trên giấy tờ"}
            </small>
            {errors.docNumber && <div className="invalid-feedback d-block">{errors.docNumber}</div>}
          </div>

          <div className="form-group">
            <label>Họ và tên<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
              value={formData.fullName}
              onChange={(e) => setField("fullName", e.target.value)}
              required
            />
            <small className="form-text text-muted">Theo giấy tờ tùy thân</small>
            {errors.fullName && <div className="invalid-feedback d-block">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label>Ngày sinh<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
              value={formData.dob}
              onChange={(e) => setField("dob", e.target.value)}
              max={today}
              required
            />
            {errors.dob && <div className="invalid-feedback d-block">{errors.dob}</div>}
          </div>

          <div className="form-group">
            <label>Giới tính<span style={{ color: "red" }}>*</span>
            </label>
            <div className="form-check-container mt-2">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === "Nam"}
                  onChange={(e) => setField("gender", e.target.value)}
                />
                <label className="form-check-label">Nam</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === "Nữ"}
                  onChange={(e) => setField("gender", e.target.value)}
                />
                <label className="form-check-label">Nữ</label>
              </div>
            </div>
            {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
          </div>

          <div className="form-group">
            <label>Nghề nghiệp<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.occupation ? "is-invalid" : ""}`}
              value={formData.occupation}
              onChange={(e) => setField("occupation", e.target.value)}
            />
            {errors.occupation && <div className="invalid-feedback d-block">{errors.occupation}</div>}
          </div>

          <div className="form-group">
            <label>Tỉnh/Thành phố<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.province ? "is-invalid" : ""}`}
              value={formData.province}
              onChange={(e) => setField("province", e.target.value)}
              required
            />
            {errors.province && <div className="invalid-feedback d-block">{errors.province}</div>}
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Quận/Huyện<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.district ? "is-invalid" : ""}`}
                value={formData.district}
                onChange={(e) => setField("district", e.target.value)}
                required
              />
              {errors.district && <div className="invalid-feedback d-block">{errors.district}</div>}
            </div>
            <div className="form-group col-md-6">
              <label>Phường/Xã<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.ward ? "is-invalid" : ""}`}
                value={formData.ward}
                onChange={(e) => setField("ward", e.target.value)}
                required
              />
              {errors.ward && <div className="invalid-feedback d-block">{errors.ward}</div>}
            </div>
          </div>

          <div className="form-group">
            <label>Số nhà, tên đường<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.street ? "is-invalid" : ""}`}
              value={formData.street}
              onChange={(e) => setField("street", e.target.value)}
              required
            />
            {errors.street && <div className="invalid-feedback d-block">{errors.street}</div>}
          </div>

          <div className="form-group">
            <label>Địa chỉ đầy đủ</label>
            <input
              className="form-control"
              value={`${formData.street}${formData.street && formData.ward ? ', ' : ''}${formData.ward}${formData.ward && formData.district ? ', ' : ''}${formData.district}${formData.district && formData.province ? ', ' : ''}${formData.province}`}
              disabled
            />
          </div>

          <div className="mt-4 d-flex justify-content-end">
            <button className="btn btn-gradient-red" onClick={handleNext}>
              Tiếp theo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterInformation;