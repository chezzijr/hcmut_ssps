import React from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./SPSO_Sidebar.css"; // Import CSS của Sidebar

const SPSO_Sidebar = () => {
  return (
    <div className="sidebar-spso">
      <h2 className="titleSidebar">SSPS_SPSO</h2>
      
      {/* Thông tin người dùng */}
      <Card className="spso-info-card" style={{ backgroundColor: "white" }}>
          <img
            src="https://via.placeholder.com/100"
            alt="SPSO Avatar"
            className="user-avatar"
            style={{
              width: "100px",        // Chiều rộng ảnh
              height: "100px",       // Chiều cao ảnh
              borderRadius: "50%",   // Tạo hình tròn
              objectFit: "cover"     // Đảm bảo ảnh không bị méo
            }}
          />
          <p className="spso-name" style={{ color: "black" , fontWeight: "bold" }}>
            SPSO 
          </p>
          <p className="spso-id" style={{ color: "black", fontWeight: "bold"  }}>
            SPSO ID
          </p>
          <Button label="Thoát" className="p-button-danger" />
        
      </Card>

      {/* Menu */}
      <ul className="sidebar-menu-spso">
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
  );
};

export default SPSO_Sidebar;
