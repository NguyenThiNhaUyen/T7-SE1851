import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const validatePassword = (value) => {
    if (!value) return "Mật khẩu không được để trống";
    if (value.length < 5) return "Mật khẩu phải từ 6 ký tự trở lên";
    return null;
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username) {
      setMessage("Username không được để trống");
      setLoading(false);
      return;
    }

    const error = validatePassword(password);
    if (error) {
      setMessage(error);
      setLoading(false);
      return;
    }


    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        (data) => {
          if (data && data.accessToken) {
            const roles = data.roles || [];
            if (roles.includes("ROLE_ADMIN")) {
              navigate("/admin");
            } else if (roles.includes("ROLE_STAFF")) {
              navigate("/staff");
            } else {
              navigate("/user");
            }
            window.location.reload();
          } else {
            setLoading(false);
            setMessage("Invalid login response");
          }
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="/donor.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <h4 className="text-center mb-3">Đăng nhập</h4>
            <label htmlFor="username">
              Username<span style={{ color: "red" }}>*</span>
            </label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
          </div>


          <div className="form-group position-relative">
            <label htmlFor="password">
              Password<span style={{ color: "red" }}>*</span>
            </label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="text-right mt-2">
              <a href="/forgot">Bạn quên mật khẩu?</a>
            </div>
          </div>


          <div className="form-group">
            <button className="btn btn-block btn-gradient-red" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Đăng nhập</span>
            </button>
          </div>

          <div className="text-center mt-3">
            <span>Chưa có tài khoản? </span>
            <a href="/register">Đăng ký</a>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div >
    </div >
  );
};

export default Login;
