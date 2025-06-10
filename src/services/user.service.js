import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

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

const UserService = {
  getPublicContent,
  getUserBoard,
  getBoardStaff,
  getAdminBoard,
}

export default UserService;