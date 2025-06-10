import axios from "axios";

// Cách 1: dùng URL tuyệt đối (không cần proxy)
const API_URL = "http://localhost:5000/api/auth/";

// Cách 2: dùng URL tương đối + cấu hình proxy (xem bên dưới)
// const API_URL = "/api/auth/";

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
