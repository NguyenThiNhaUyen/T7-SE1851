console.log("\u{1F680} Server đang khởi động...");

const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const dbConfig = require("./config/db.config");

const app = express();

// ✅ CORS config
const corsOptions = {
  origin: "http://localhost:5173", // cập nhật cho Vite
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

/** ----------------------- LOGIN ----------------------- */
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(">>> [Login] Username:", username);

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query(`
        SELECT u.id, u.username, u.email, u.password, r.name AS role
        FROM Users u
        JOIN Roles r ON u.role_id = r.id
        WHERE u.username = @username
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const user = result.recordset[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: [`ROLE_${user.role.toUpperCase()}`],
      accessToken: "fake-jwt-token",
    });
  } catch (err) {
    console.error("❌ Lỗi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

/** ----------------------- REGISTER ----------------------- */
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password, first_name, last_name, dob, gender } = req.body;
  try {
    const pool = await sql.connect(dbConfig);

    const check = await pool.request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .query(`SELECT * FROM Users WHERE username = @username OR email = @email`);

    if (check.recordset.length > 0) {
      return res.status(400).json({ message: "Username hoặc email đã được sử dụng" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .query(`
        INSERT INTO Users (username, email, password, role_id, enable, created_at, updated_at)
        VALUES (@username, @email, @password, 3, 1, GETDATE(), GETDATE());
        SELECT SCOPE_IDENTITY() AS id;
      `);

    const userId = userResult.recordset[0].id;

    await pool
      .request()
      .input("user_id", sql.Int, userId)
      .input("first_name", sql.VarChar, first_name)
      .input("last_name", sql.VarChar, last_name)
      .input("dob", sql.Date, dob)
      .input("gender", sql.VarChar, gender)
      .query(`
        INSERT INTO UserProfile (user_id, first_name, last_name, dob, gender)
        VALUES (@user_id, @first_name, @last_name, @dob, @gender);
      `);

    res.json({ message: "Đăng ký thành công!" });
  } catch (err) {
    console.error("❌ Lỗi khi đăng ký:", err);
    res.status(500).json({ message: "Đăng ký thất bại!" });
  }
});

/** ----------------------- GET USER BY ROLE ----------------------- */
app.get("/api/test/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT u.id, u.username, u.email, r.name AS role,
               p.first_name, p.last_name, p.blood_type, p.address, p.phone
        FROM Users u
        JOIN Roles r ON u.role_id = r.id
        LEFT JOIN UserProfile p ON u.id = p.user_id
        WHERE u.id = @id AND r.name = 'User'
      `);
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: "Không tìm thấy người dùng." });
    }
  } catch (err) {
    console.error("❌ Lỗi user:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.get("/api/test/staff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT u.id, u.username, u.email, r.name AS role
        FROM Users u
        JOIN Roles r ON u.role_id = r.id
        WHERE u.id = @id AND r.name = 'Staff'
      `);
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: "Không tìm thấy nhân viên." });
    }
  } catch (err) {
    console.error("❌ Lỗi staff:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.get("/api/test/admin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT u.id, u.username, u.email, r.name AS role
        FROM Users u
        JOIN Roles r ON u.role_id = r.id
        WHERE u.id = @id AND r.name = 'Admin'
      `);
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ message: "Không tìm thấy admin." });
    }
  } catch (err) {
    console.error("❌ Lỗi admin:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

/** ----------------------- START SERVER ----------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`)
);