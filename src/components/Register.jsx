import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return <div className="invalid-feedback d-block">*Bat buoc</div>;
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return <div className="invalid-feedback d-block">This is not a valid email.</div>;
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return <div className="invalid-feedback d-block">Username must be between 3 and 20 characters.</div>;
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return <div className="invalid-feedback d-block">Password must be between 6 and 40 characters.</div>;
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ← thêm dòng này

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, {
        first_name: firstName,
        last_name: lastName,
        dob,
        gender
      }).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="regis-fullpage">
      <div className="change-box">
        <img
          src="/donor.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <h4 className="text-center mb-3">Đăng ký tài khoản</h4>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group position-relative">
                <label htmlFor="password">Password</label>
                <div style={{ position: "relative" }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    validations={[required, vpassword]}
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
              </div>


              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <Input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  min="1900-01-01"
                  max={today}
                />

              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <button className="btn btn-block btn-gradient-red">Đăng ký</button>
              </div>

              <div className="text-center mt-3">
                <span>Đã có tài khoản? </span>
                <a href="/login">Đăng nhập</a>
              </div>

            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={`alert ${successful ? "alert-success" : "alert-custom-red"}`} role="alert">
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
