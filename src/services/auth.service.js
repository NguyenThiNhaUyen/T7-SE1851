// ✅ auth.service.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/"; // dùng URL tuyệt đối

const login = (username, password) => {
  return axios
    .post(API_URL + "login", { username, password }, { withCredentials: true })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const register = (username, email, password, profile) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
    ...profile,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
};
