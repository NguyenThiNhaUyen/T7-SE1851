import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!newPassword || !confirmPassword) {
    setMessage("Điền hết đi!!!");
    return;
  }

  if (newPassword.length < 6) {
    setMessage("Mật khẩu phải từ 6 ký tự trở lên");
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage("Mật khẩu không khớp");
    return;
  }

  setMessage("Mật khẩu thay đổi thành công!");
};


  return (
    <div className="change-fullpage">
      <div className="change-box">
        <img
          src="/donor.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleSubmit}>
          <h4 className="text-center mb-3">Đổi mật khẩu</h4>

          <div className="form-group">
            <label>Mật khẩu mới<span style={{ color: "red" }}>*</span></label>
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
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
            </div>
          </div>

          <div className="form-group mt-2">
            <label>Xác nhận mật khẩu<span style={{ color: "red" }}>*</span></label>
            <div style={{ position: "relative" }}>
              <Input
                type={showConfirm ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingRight: "40px" }}
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
              >
                <img
                  src={showConfirm ? "/eye-open.png" : "/eye-close.png"}
                  alt="toggle"
                  width={20}
                />
              </span>
            </div>
          </div>

          <div className="form-group mt-3">
            <button className="btn btn-block btn-gradient-red" type="submit">
              Đổi mật khẩu
            </button>
          </div>

          {message && (
            <div className="alert alert-danger mt-3">{message}</div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
