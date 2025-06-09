import axios from "axios";

// ✅ Đảm bảo dùng đúng URL backend
const API_URL = "/api/auth/"; // dùng proxy


const login = (username, password) => {
  return axios.post(API_URL + "login", {
    username,
    password
  }, {
    withCredentials: true   // ✅ Thêm dòng này để gửi kèm cookie (JSESSIONID)
  })
    .then((response) => {
    if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
