const sql = require("mssql");
const config = require("./db.config");

sql.connect(config)
  .then(() => {
    console.log("✅ SQL Server connected");
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });

module.exports = sql;

