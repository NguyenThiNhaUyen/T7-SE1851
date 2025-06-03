import React, { useState } from "react";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    setMessage("Mật khẩu của bạn đã được thay đổi thành công!");
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h4 className="text-center mb-3">Đổi mật khẩu</h4>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-2">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <button className="btn btn-primary btn-block" type="submit">
              Đổi mật khẩu
            </button>
          </div>

          {message && (
            <div className="alert alert-info mt-3">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
