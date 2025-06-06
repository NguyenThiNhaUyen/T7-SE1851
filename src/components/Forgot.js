import React, { useState } from "react";

const Forgot = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); 

  const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!email) {
    setMessage("Vui lòng nhập email");
    return;
  }

  if (!isValidEmail(email)) {
    setMessage("Email không hợp lệ");
    return;
  }

  setLoading(true);
  localStorage.setItem("recoveryEmail", email);
  setTimeout(() => {
    window.location.href = "verify-otp";
  }, 1000);
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
            />
          </div>

          <button
            type="submit"
            className="btn btn-block btn-gradient-red"
            disabled={loading}
          >
            Tiếp tục
          </button>


          {message && (
            <div className="form-group mt-3">
              <div className="alert-custom-red" role="alert">
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
