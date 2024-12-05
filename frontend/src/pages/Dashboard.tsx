// src/pages/Dashboard.tsx
import React from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../App.css"; // Import CSS của bạn

const Dashboard = () => {
  return (
    <div className="layout-wrapper">
      {/* Sidebar */}
      {/* <div className="sidebar">
        <h2>SPSS_Admin</h2>
        <div className="user-info">
          <img src="https://via.placeholder.com/100" alt="Admin Avatar" />
          <p>Admin name</p>
          <p>Admin ID</p>
          <Button label="Thoát" className="p-button-danger" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <i className="pi pi-home"></i> Trang chủ
          </li>
          <li>
            <i className="pi pi-refresh"></i> Khôi phục hệ thống
          </li>
          <li>
            <i className="pi pi-chart-bar"></i> Giám sát hệ thống
          </li>
          <li>
            <i className="pi pi-user"></i> Quản lý truy cập
          </li>
          <li>
            <i className="pi pi-cog"></i> Bảo trì hệ thống
          </li>
        </ul>
      </div>
 */}
      {/* Main Content */}
      <div className="content">
        <h1>Trang chủ</h1>
        <div className="dashboard">
          <div className="card">
            <h2>Trạng thái hệ thống</h2>
            <p style={{ color: "green" }}>Hoạt động</p>
          </div>
          <div className="card">
            <h2>Cảnh báo hệ thống</h2>
            <p style={{ color: "blue" }}>3</p>
          </div>
          <div className="card">
            <h2>Tải hệ thống</h2>
            <p style={{ color: "blue" }}>42%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
