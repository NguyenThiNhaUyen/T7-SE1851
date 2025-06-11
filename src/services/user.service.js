import axios from "axios";

const API_URL = "http://localhost:5000/api/test/"; // dùng URL tuyệt đối

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getBoardStaff = () => {
  return axios.get(API_URL + "staff");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const getUserById = (id) => {
  return axios.get(`${API_URL}user/${id}`);
};

const getStaffById = (id) => {
  return axios.get(`${API_URL}staff/${id}`);
};

const getAdminById = (id) => {
  return axios.get(`${API_URL}admin/${id}`);
};

export default {
  getPublicContent,
  getUserBoard,
  getBoardStaff,
  getAdminBoard,
  getUserById,
  getStaffById,
  getAdminById,
};
