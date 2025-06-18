import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8080/api/auth'; 

// Đăng nhập
const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true, // ⚠️ Nếu server cần cookie/token sau này
  })
    .then((response) => {
      if (response.data.userId) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

// Đăng ký
const register = (username, email, password, profile) => {
  return axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
    ...profile,
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    // withCredentials: true
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  register,
  logout,
  getCurrentUser
};
