import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8080/api/auth';

// ✅ Đăng nhập
const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    const userData = response.data?.data;
    if (userData?.accessToken) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.accessToken);
    }
    return userData;
  });
};

// ✅ Đăng ký
const register = (username, email, password, profile) => {
  return axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
    ...profile
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// ✅ Đăng xuất
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// ✅ Lấy user hiện tại
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// ✅ Tạo Authorization Header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Export tất cả
const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
  getAuthHeader
};

export default AuthService;
