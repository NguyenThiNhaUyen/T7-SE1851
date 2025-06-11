import axios from 'axios';

// import React from "react-router-dom"

const API_URL = 'http://localhost:8080/api/auth'; // Đường dẫn tương đối, sẽ được proxy qua Vite

// Đăng nhập
const login = (username, password) => {
  return axios
    .post(
      API_URL ,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json' // BẮT BUỘC cho Spring Boot
        },
        // body: JSON.stringify(login)
      }
    )
    .then((response) => {
      if (response.data.username) {
        // Tạm thời lưu password để dùng cho Basic Auth (nếu cần)
        localStorage.setItem('user', JSON.stringify({ ...response.data, password }));
      }
      return response.data;
    });
};


// const [user,setUser] = useStae("
  
//   ")

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   try {
//     const res = await fetch("http://localhost:8080/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type" : "application:json"
//       },
//       body: JSON.stringify()
//     })
//   } catch (error) {
    
//   }
// } 
// Đăng ký
const register = (username, email, password, profile) => {
  return axios.post(
    API_URL + 'register',
    {
      username,
      email,
      password,
      ...profile,
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};

// Đăng xuất
const logout = () => {
  localStorage.removeItem('user');
};

// Lấy thông tin người dùng hiện tại từ localStorage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
};
