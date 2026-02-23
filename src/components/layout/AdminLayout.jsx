import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // (Tuỳ chọn) map title theo pathname
  const titleMap = {
    "/dashboard": "Tổng quan",
    "/vocabulary": "Quản lý Từ vựng",
    "/topics": "Quản lý Chủ đề",
    "/questions": "Quản lý Câu hỏi",
    "/users": "Quản lý Người dùng",
    "/inventory": "Quản lý Vật phẩm",
    "/feedback": "Góp ý & Bảo trì",
  };
  const title = titleMap[location.pathname] || "Admin";

  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <Sidebar collapsed={collapsed} />

      <div className="main-content">
        <header className="header" style={{ display: "flex", width: "100%" }}>
          <div className="header-left">
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setCollapsed((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>

            <h1 className="page-title">{title}</h1>
          </div>

          <div className="header-right" style={{ marginLeft: "auto" }}>
            <div className="user-info">
              <p className="user-name">Admin</p>
              <p className="user-email">admin@itvocab.com</p>
            </div>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}