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
    address: "",
    lastDonation: ""
  });

  useEffect(() => {
    // Giả lập dữ liệu user từ localStorage (hoặc backend sau này)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setProfile({
        ...profile,
        username: storedUser.username,
        email: storedUser.email
        // các field khác nên lấy từ API nếu có
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hồ sơ đã được cập nhật (fake)");
    // gọi API cập nhật ở đây sau
  };

  return (
    <div className="col-md-8 offset-md-2">
      <div className="card card-container">
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
            <input type="date" className="form-control" name="dob" value={profile.dob} onChange={handleChange} />
          </div>

          <div className="form-group mt-2">
            <label>Giới tính</label>
            <select className="form-control" name="gender" value={profile.gender} onChange={handleChange}>
              <option value="">Chọn</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
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
            <label>SDT</label>
            <input className="form-control" name="phone" value={profile.phone} onChange={handleChange} />
          </div>
          
          <div className="form-group mt-2">
            <label>Địa chỉ</label>
            <input className="form-control" name="address" value={profile.address} onChange={handleChange} />
          </div>

          <div className="form-group mt-2">
            <label>Ngày hiến máu gần nhất</label>
            <input type="date" className="form-control" name="lastDonation" value={profile.lastDonation} onChange={handleChange} />
          </div>

          <button className="btn btn-primary btn-block mt-3" type="submit">Lưu</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
