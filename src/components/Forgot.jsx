import React, { useState } from "react";

const Forgot = () => {
  const [idNumber, setIdNumber] = useState("");
  const [message, setMessage] = useState("");
  const [resentMessage, setResentMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);


 const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    window.location.href = "/verify-otp";
  }, 1000); // mô phỏng delay gửi OTP
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
            <label htmlFor="idNumber">Số CMND/CCCD/Hộ chiếu</label>
            <input
              type="text"
              className="form-control"
              name="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />

            <label htmlFor="phone">Số điện thoại</label>
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
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Tiep tuc</span>
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
