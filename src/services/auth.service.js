
import axios from 'axios';

const API_URL = '/api/auth/'; // Dùng URL tương đối để qua proxy

const login = (username, password) => {
  return axios
    .post(API_URL + 'login', { username, password })
    .then((response) => {
      if (response.data.username) {
        // Lưu cả password để dùng cho HTTP Basic (không an toàn, chỉ tạm thời)
        localStorage.setItem('user', JSON.stringify({ ...response.data, password }));
      }
      return response.data;
    });
};

const register = (username, email, password, profile) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
    ...profile,
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
  getCurrentUser,
};
