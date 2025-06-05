import React, { useState } from "react";

const Forgot = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
localStorage.setItem("recoveryEmail", email);
    setMessage("Nếu thông tin hợp lệ, hệ thống sẽ gửi hướng dẫn đặt lại mật khẩu.");
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="/donor.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit}>
          <h4 className="text-center mb-3">Đặt lại mật khẩu</h4>

          <div className="form-group">
            <label htmlFor="email">
              Email<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block btn-gradient-red"
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
