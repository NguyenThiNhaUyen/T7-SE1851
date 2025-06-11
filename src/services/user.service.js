
import axios from 'axios';

const API_URL = '/api/'; // Dùng URL tương đối để qua proxy

// Hàm lấy thông tin xác thực từ localStorage
// const getAuthHeader = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user && user.username) {
//     // Tạm thời giả định mật khẩu được lưu (thực tế nên dùng session hoặc token)
//     // Đây là cách dùng HTTP Basic, cần username:password
//     const credentials = btoa(`${user.username}:${user.password || ''}`);
//     return { Authorization: `Basic ${credentials}` };
//   }
//   return {};
// };

const getAuthHeader = () => {
  return {}; // Tắt toàn bộ phần quyền
};

const getPublicContent = () => {
  return axios.get(API_URL + 'public/content');
};

const getUserProfile = () => {
  return axios.get(API_URL + 'profile', { headers: getAuthHeader() });
};

const getUserDetails = (id) => {
  return axios.get(API_URL + `user/${id}`, { headers: getAuthHeader() });
};

const getDonationHistory = () => {
  return axios.get(API_URL + 'donation/history', { headers: getAuthHeader() });
};

const getBloodRequest = () => {
  return axios.get(API_URL + 'request/list', { headers: getAuthHeader() });
};

const getTransfusionHistory = () => {
  return axios.get(API_URL + 'transfusion/history', { headers: getAuthHeader() });
};

const getStaffDashboard = () => {
  return axios.get(API_URL + 'staff/dashboard', { headers: getAuthHeader() });
};

const getAdminDashboard = () => {
  return axios.get(API_URL + 'admin', { headers: getAuthHeader() });
};

const getAllUsers = () => {
  return axios.get(API_URL + 'users/list', { headers: getAuthHeader() });
};

const getAllRoles = () => {
  return axios.get(API_URL + 'roles/list', { headers: getAuthHeader() });
};

const getNotifications = () => {
  return axios.get(API_URL + 'notifications/list', { headers: getAuthHeader() });
};

export default {
  getPublicContent,
  getUserProfile,
  getUserDetails,
  getDonationHistory,
  getBloodRequest,
  getTransfusionHistory,
  getStaffDashboard,
  getAdminDashboard,
  getAllUsers,
  getAllRoles,
  getNotifications,
};
