import React, { useState, useEffect } from "react";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("recoveryEmail");
    if (email) {
      setRecoveryEmail(maskEmail(email));
    }
  }, []);

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.every(o => o)) {
      window.location.href = "/change-password";
    }
  };

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    const maskedName = name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    const maskedDomain = domain[0] + "*".repeat(domain.indexOf(".")) + domain.slice(domain.indexOf("."));
    return maskedName + "@" + maskedDomain;
  };

  return (
    <div className="change-fullpage">
      <div className="change-box">
        <h4 className="mb-3 fw-bold">Xác thực OTP</h4>
        <div className="mb-2" style={{ fontSize: 14, color: "#444" }}>
          Nhập mã xác thực đã được gửi đến địa chỉ<br />
          Email <strong>{recoveryEmail}</strong>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                className="text-center mx-1"
                style={{
                  width: "44px",
                  height: "48px",
                  borderRadius: "8px",
                  border: "2px solid #dd2d24",
                  fontSize: "20px",
                }}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
              
              />
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-block btn-gradient-red"
            disabled={!otp.every(o => o)}
          >
            Tiếp tục
          </button>
        </form>

        <div className="mt-3 text-muted text-center" style={{ fontSize: "13px" }}>
          Gửi lại mã OTP ({countdown}s)
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
