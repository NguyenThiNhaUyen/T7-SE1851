import React, { useState } from "react";
import axios from "axios"; // giả định bạn có axios để gửi dữ liệu lên server
import "../styles/VnPayForm.css"

const VnPayForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState(100000); // giá trị mặc định là 100000 VND
  const [status, setStatus] = useState("");

  const generateTransactionCode = () => {
    return "TXN" + Math.floor(100000 + Math.random() * 900000); // ví dụ TXN123456
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionCode = generateTransactionCode();
    const paymentData = {
      username,
      password,
      amount,
      transaction_code: transactionCode,
      status: "Success",
      payment_time: new Date().toISOString(),
    };

    console.log("Thanh toán gửi đi:", paymentData);

    try {
      // Giả định bạn có API để lưu thanh toán
      await axios.post("http://localhost:3000/api/vnpay/payments", paymentData);
      setStatus("Thanh toán thành công với mã giao dịch: " + transactionCode);
    } catch (err) {
      console.error(err);
      setStatus("Thanh toán thất bại. Vui lòng thử lại.");
    }

    setUsername("");
    setPassword("");
  };

  const qrData = username ? `THANHTOAN-${username}-${amount}` : "VNPAY-DEMO";
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="vnpay-form-wrapper split-layout">
      <div className="vnpay-left">
        <h4>Thanh toán bằng QR Code</h4>
        <img src={qrSrc} alt="QR Code" className="qr" />
        <div className="amount">{amount.toLocaleString()} VND</div>
        <small>Hướng dẫn thanh toán</small>
      </div>

      <div className="vnpay-right">
        <h4>Thanh toán qua Ngân hàng</h4>
        <form onSubmit={handleSubmit} className="vnpay-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Số tiền (VND)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1000"
              required
            />
          </div>

          <button type="submit">XÁC THỰC</button>
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default VnPayForm;
