import React, { useState } from "react";

const Forgot = () => {
  const [idNumber, setIdNumber] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("Nếu thông tin hợp lệ, hệ thống sẽ gửi hướng dẫn đặt lại mật khẩu.");
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit}>
          <h4 className="text-center mb-3">Đặt lại mật khẩu</h4>

          <div className="form-group">
            <label htmlFor="idNumber">
              Số CMND/CCCD/Hộ chiếu<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />

            <label htmlFor="phone">
              Số điện thoại<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => window.location.href = "/verify-otp"}
            >
              Tiếp tục
            </button>
          </div>

          {message && (
            <div className="form-group mt-3">
              <div className="alert alert-info" role="alert">
                {message}
              </div>
            </div>

          )}
        </form>
      </div >
    </div >
  );
};

export default Forgot;
