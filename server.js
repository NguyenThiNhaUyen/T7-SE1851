console.log("🚀 Server đang khởi động...");

const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const dbConfig = require("./config/db.config");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/auth/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(`
        SELECT u.id, u.username, u.email, r.name AS role
        FROM Users u
        JOIN Roles r ON u.role_id = r.id
        WHERE u.username = @username AND u.password = @password
      `);

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: [`ROLE_${user.role.toUpperCase()}`],
        accessToken: "fake-jwt-token",
      });
    } else {
      res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
  } catch (err) {
    console.error("❌ Lỗi kết nối SQL:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend đang chạy tại http://localhost:${PORT}`));
