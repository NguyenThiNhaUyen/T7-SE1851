import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodType: "",
    phone: "",
    address: "",
    lastDonation: "",
    recoveryTime: ""
  });

  const [initialProfile, setInitialProfile] = useState(null);
  const [message, setMessage] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const initData = {
        username: storedUser.username,
        email: storedUser.email,
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        bloodType: "",
        phone: "",
        address: "",
        lastDonation: "",
        recoveryTime: ""
      };
      setProfile(initData);
      setInitialProfile(initData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(profile) === JSON.stringify(initialProfile)) {
      setMessage("Không có thay đổi để lưu");
      return;
    }

    setMessage("Hồ sơ đã được cập nhật");
  };

  return (
    <div className="regis-fullpage">
      <div className="change-box">
        <img
          src="/donor.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <h4 className="text-center mb-3">Hồ sơ cá nhân</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" value={profile.username} disabled />
          </div>

          <div className="form-group mt-2">
            <label>Email</label>
            <input className="form-control" value={profile.email} disabled />
          </div>

          <div className="form-group mt-2">
            <label>Họ</label>
            <input className="form-control" name="lastName" value={profile.lastName} onChange={handleChange} />
          </div>

          <div className="form-group mt-2">
            <label>Tên</label>
            <input className="form-control" name="firstName" value={profile.firstName} onChange={handleChange} />
          </div>

          <div className="form-group mt-2">
            <label>Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              min="1900-01-01"
              max={today}
            />
          </div>

          <div className="form-group mt-2">
            <label>Giới tính</label>
            <select className="form-control" name="gender" value={profile.gender} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>

          <div className="form-group mt-2">
            <label>Nhóm máu</label>
            <select className="form-control" name="bloodType" value={profile.bloodType} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-group mt-2">
            <label>Số điện thoại</label>
            <input className="form-control" name="phone" value={profile.phone} onChange={handleChange} />
          </div>

          <div className="form-group mt-2">
            <label>Địa chỉ</label>
            <input className="form-control" name="address" value={profile.address} onChange={handleChange} />
          </div>

          <div className="form-group mt-2">
            <label>Ngày hiến máu gần nhất</label>
            <input
              type="date"
              className="form-control"
              name="lastDonation"
              value={profile.lastDonation}
              onChange={handleChange}
              min="1900-01-01"
              max={today}
            />
          </div>

          <div className="form-group mt-2">
            <label>Thời gian hồi phục (ngày)</label>
            <input
              type="number"
              className="form-control"
              name="recoveryTime"
              value={profile.recoveryTime}
              onChange={handleChange}
              min={0}
            />
          </div>

          {message && (
            <div className="form-group mt-3">
              <div className="alert-custom-red" role="alert">{message}</div>
            </div>
          )}

          <button className="btn btn-block btn-gradient-red mt-3" type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
