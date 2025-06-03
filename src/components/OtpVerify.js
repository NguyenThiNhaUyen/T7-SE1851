// src/components/OtpVerify.jsx
import React, { useState } from "react";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động chuyển focus sang ô tiếp theo
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mã OTP: " + otp.join(""));
    // TODO: gửi lên backend xác thực OTP
  };

  return (
    <div className="container">
      <h3 className="text-center mb-4">Xác thực OTP</h3>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
        <div className="d-flex gap-2 justify-content-center mb-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              className="form-control text-center"
              style={{ width: "40px", height: "40px" }}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>
        <button className="btn btn-primary" type="submit">
          Tiếp tục
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
