// src/services/admin.service.js
import axios from "axios";

// ⚠️ Đảm bảo backend của bạn thực sự chạy ở PORT 3000, nếu không hãy thay đổi lại
const API_BASE = "http://localhost:3000/api";

// Các hàm gọi API
const getCompatibilityRules = () => axios.get(`${API_BASE}/compatibility-rules`);
const getUrgentRequests = () => axios.get(`${API_BASE}/urgent-requests`);
const getAllUsers = () => axios.get(`${API_BASE}/users`);
const getBloodTypes = () => axios.get(`${API_BASE}/blood-types`);

// Export dưới dạng object
const AdminService = {
  getCompatibilityRules,
  getUrgentRequests,
  getAllUsers,
  getBloodTypes,
};

export default AdminService;
