import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const isMounted = useRef(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const validatePassword = (value) => {
    if (!value) return "Mật khẩu không được để trống";
    if (value.length < 6) return "Mật khẩu phải từ 6 ký tự trở lên";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (!username || !password) {
      setMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
      setLoading(false);
      return;
    }

    const error = validatePassword(password);
    if (error) {
      setMessage(error);
      setLoading(false);
      return;
    }

    if (checkBtn.current.context._errors.length === 0) {
      try {
        const res = await AuthService.login(username, password);

        // Lưu user và token (nếu có)
        if (res?.accessToken) {
          localStorage.setItem("user", JSON.stringify(res));
          localStorage.setItem("token", res.accessToken);
        }

        // Điều hướng theo vai trò
        switch (res.role) {
          case "ADMIN":
            navigate("/admin");
            break;
          case "STAFF":
            navigate("/staff");
            break;
          default:
            navigate(`/user/${res.userId}`);
        }
      } catch (err) {
        if (isMounted.current) {
          const msg =
            err.response?.data?.message || err.message || "Đăng nhập thất bại.";
          setMessage(msg);
        }
      } finally {
        if (isMounted.current) setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login-fullpage">
      <div className="login-left">
        <div className="login-left-content">
          <h2>Hiến máu - Hành động nhỏ, ý nghĩa lớn</h2>
          <p style={{ lineHeight: 1.6 }}>
            Ở Việt Nam, cứ mỗi <strong>2 giây</strong> lại có một người cần truyền máu.<br />
            Sự đóng góp của bạn thật sự quan trọng!<br />
            Hãy tiếp tục đồng hành cùng mạng lưới hiến máu toàn quốc – nơi trái tim chung một nhịp yêu thương.
          </p>
        </div>
      </div>

      <div className="login-box">
        <img src="/donor.png" alt="profile-img" className="profile-img-card" />

        <Form onSubmit={handleLogin} ref={form}>
          <h4 className="text-center mb-3">Đăng nhập</h4>

          <div className="form-group">
            <label htmlFor="username">Username<span style={{ color: "red" }}>*</span></label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group position-relative">
            <label htmlFor="password">Password<span style={{ color: "red" }}>*</span></label>
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: "40px" }}
                required
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
              <div className="text-right mt-2">
                <a href="/forgot">Bạn quên mật khẩu?</a>
              </div>
            </div>
          </div>

          <div className="form-group mt-3">
            <button className="btn btn-block btn-gradient-red" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" />}
              Đăng nhập
            </button>
          </div>

          <div className="text-center mt-3">
            <span>Chưa có tài khoản? </span><a href="/register">Đăng ký</a>
          </div>

          {message && (
            <div className="form-group mt-3">
              <div className="alert alert-danger" role="alert">{message}</div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
