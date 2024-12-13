import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./AdminSideBar.css";
import avatarUser from "./100.png";
import { useNavigate } from "react-router-dom";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <div className="adminSideBar">
      <div className="adminSideBarTitle"> SSPS_Admin</div>
      <div className="adminSideBarTag">
        <img
          src={avatarUser}
          alt="adminAvatar"
          style={{
            borderRadius: "100%",
            width: "80%",
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
        <div className="user-name" style={{ color: "black" }}>
          Admin name
        </div>
        <div className="user-id" style={{ color: "black" }}>
          Admin ID
        </div>
        <Button
          label="Thoát"
          className="p-button-danger"
          onClick={() => handleNavigation()}
        />
      </div>
      <div className="adminSideBarMenu">
        <Link to="/admin">
          <i className="pi pi-home" style={{ fontSize: "28px" }}></i> Trang chủ
        </Link>
        <Link to="/admin-restore">
          <i className="pi pi-refresh" style={{ fontSize: "28px" }}></i> Khôi
          phục hệ thống
        </Link>
        <Link to="/admin-monitor">
          <i className="pi pi-chart-bar" style={{ fontSize: "28px" }}></i> Giám
          sát hệ thống
        </Link>
        <Link to="/admin-access">
          <i className="pi pi-user" style={{ fontSize: "28px" }}></i> Quản lý
          truy cập
        </Link>
        <Link to="/admin-maintenance">
          <i className="pi pi-cog" style={{ fontSize: "28px" }}></i> Bảo trì hệ
          thống
        </Link>
      </div>
    </div>
  );
};
export default AdminSideBar;
