import axios from "axios";

const API_URL = "/api/test/";

// 👥 Nội dung công khai
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

// 📋 Dữ liệu theo vai trò không cần ID
const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getBoardStaff = () => {
  return axios.get(API_URL + "staff");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

// 🔍 Lấy chi tiết người dùng theo ID
const getUserById = (id) => {
  return axios.get(`${API_URL}user/${id}`);
};

const getStaffById = (id) => {
  return axios.get(`${API_URL}staff/${id}`);
};

const getAdminById = (id) => {
  return axios.get(`${API_URL}admin/${id}`);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getBoardStaff,
  getAdminBoard,
  getUserById,
  getStaffById,
  getAdminById,
};

export default UserService;
