import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8080/api/auth';

// ✅ Đăng nhập
const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password }, {
    headers: { 'Content-Type': 'application/json' }
  });

  const userData = response?.data?.data; // 👈 CHỈ LẤY response.data
  if (!userData || !userData.accessToken) {
    throw new Error("Dữ liệu đăng nhập không hợp lệ.");
  }

  // Lưu token
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", userData.accessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${userData.accessToken}`;

  return userData;
};

// ✅ Đăng ký
const register = (username, email, password, profile) => {
  return axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
    ...profile
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// ✅ Đăng xuất
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  delete axios.defaults.headers.common["Authorization"];
};

// ✅ Lấy user hiện tại
const getCurrentUser = () => {
  const raw = localStorage.getItem('user');
  // Nếu không có gì hoặc bằng chuỗi "undefined" thì trả về null
  if (!raw || raw === 'undefined') {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('AuthService#getCurrentUser — Lỗi parse JSON:', err, raw);
    return null;
  }
};


// ✅ Tạo Authorization Header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ API mẫu có auth
const getInventory = () => {
  return axios.get("http://localhost:8080/api/blood/inventory", {
    headers: getAuthHeader()
  });
};

const AuthService = {
  login,
  register,
  logout,
  getInventory,
  getCurrentUser,
  getAuthHeader
};

export default AuthService;