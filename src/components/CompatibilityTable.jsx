// src/components/CompatibilityTable.jsx
import React, { useEffect, useState } from "react";
import AdminService from "../services/admin.service";
import "../styles/admin.css";

const CompatibilityTable = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    AdminService.getCompatibilityRules()
      .then((res) => {
        setRules(res.data);
      })
      .catch((err) => {
        console.error("❌ Lỗi khi lấy quy tắc tương thích:", err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>🔗 Quy tắc tương thích máu</h2>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-danger">
          <tr>
            <th>ID</th>
            <th>Thành phần</th>
            <th>Người cho</th>
            <th>Người nhận</th>
            <th>Tương thích</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.compatibilityRuleId}>
              <td>{rule.compatibilityRuleId}</td>
              <td>{rule.component}</td>
              <td>{rule.donorType}</td>
              <td>{rule.recipientType}</td>
              <td>{rule.compatible ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompatibilityTable;
