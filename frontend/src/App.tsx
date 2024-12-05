import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Import trang Dashboard
import Restore from "./pages/Restore"; // Import trang Khôi phục hệ thống
import Monitor from "./pages/Monitor"; // Import trang Giám sát hệ thống
import Access from "./pages/Access"; // Import trang Quản lý truy cập
import Maintenance from "./pages/Maintenance"; // Import trang Bảo trì hệ thống
import { Button } from "primereact/button"; // Nếu bạn muốn sử dụng nút "Thoát"
import { Card } from "primereact/card"; // Import Card từ PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; // Import PrimeIcons
import "./App.css"; // Import CSS tùy chỉnh (bao gồm sidebar CSS)
import SPSO_Dashboard from "./pages/SPSO_Dashboard"; // Trang Dashboard của SPSO
import SPSO_Management from "./pages/SPSO_Management"; // Quản lý hệ thống SPSO
import SPSO_Setting from "./pages/SPSO_Setting"; // Cài đặt hệ thống SPSO
import SPSO_History from "./pages/SPSO_History"; // Lịch sử thao tác SPSO

function App() {
  const [userType, setUserType] = useState<"Admin" | "Admin">("SPSO");

  if (userType === "Admin") {
    return (
      <Router>
        <div className="layout-wrapper">
          {/* Sidebar: Hiển thị duy nhất 1 lần */}
          <div className="sidebar">
            <h2>SSPS_Admin</h2>
            <Card className="user-info-card">
              <div className="user-info">
                <img src="https://via.placeholder.com/100" alt="Admin Avatar" />
                <p className="user-name">Admin name</p>
                <p className="user-id">Admin ID</p>
                <Button label="Thoát" className="p-button-danger" />
              </div>
            </Card>
            <ul className="sidebar-menu">
              <li>
                <Link to="/admin">
                  <i className="pi pi-home"></i> Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/restore">
                  <i className="pi pi-refresh"></i> Khôi phục hệ thống
                </Link>
              </li>
              <li>
                <Link to="/monitor">
                  <i className="pi pi-chart-bar"></i> Giám sát hệ thống
                </Link>
              </li>
              <li>
                <Link to="/access">
                  <i className="pi pi-user"></i> Quản lý truy cập
                </Link>
              </li>
              <li>
                <Link to="/maintenance">
                  <i className="pi pi-cog"></i> Bảo trì hệ thống
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="content">
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/restore" element={<Restore />} />
              <Route path="/monitor" element={<Monitor />} />
              <Route path="/access" element={<Access />} />
              <Route path="/maintenance" element={<Maintenance />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  } else if (userType == "SPSO") {
    return (
      <Router>
        <div className="layout-wrapper">
          {/* Sidebar SPSO */}
          <div className="sidebar">
            <h2>SSPS_SPSO</h2>
            <Card
              className="user-info-card"
              style={{ backgroundColor: "white" }}
            >
              <div className="user-info">
                <img src="https://via.placeholder.com/100" alt="SPSO Avatar" />
                <p className="user-name" style={{ color: "black" }}>
                  SPSO name
                </p>
                <p className="user-id" style={{ color: "black" }}>
                  SPSO ID
                </p>
                <Button label="Thoát" className="p-button-danger" />
              </div>
            </Card>
            <ul className="sidebar-menu">
              <li>
                <Link to="/spso">
                  <i className="pi pi-home"></i> Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/spsomanagement">
                  <i className="pi pi-print"></i> Quản lí máy in
                </Link>
              </li>
              <li>
                <Link to="/spsohistory">
                  <i className="pi pi-file"></i> Xem lịch sử in
                </Link>
              </li>
              <li>
                <Link to="/spsosetting">
                  <i className="pi pi-cog"></i> Cài đặt hệ thống SPSO
                </Link>
              </li>
            </ul>
          </div>

          {/* Main Content SPSO */}
          <div className="content">
            <Routes>
              <Route path="/" element={<SPSO_Dashboard />} />
              <Route path="/spsomanagement" element={<SPSO_Management />} />
              <Route path="/spsosetting" element={<SPSO_Setting />} />
              <Route path="/spsohistory" element={<SPSO_History />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
