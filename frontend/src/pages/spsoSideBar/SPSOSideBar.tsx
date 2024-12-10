import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./SPSOSideBar.css";
import avatarUser from "./100.png";
import { useNavigate } from "react-router-dom";

const SPSOSideBar = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <div className="spsoSideBar">
      <div className="spsoSideBarTitle"> SSPS_SPSO</div>
      <div className="spsoSideBarTag">
        <img
          src={avatarUser}
          alt="SPSOAvatar"
          style={{
            borderRadius: "100%",
            width: "80%",
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
        <div className="user-name" style={{ color: "black" }}>
          SPSO name
        </div>
        <div className="user-id" style={{ color: "black" }}>
          SPSO ID
        </div>
        <Button
          label="Thoát"
          className="p-button-danger"
          onClick={() => handleNavigation()}
        />
      </div>
      <div className="spsoSideBarMenu">
        <Link to="/spso">
          <i className="pi pi-home" style={{ fontSize: "28px" }}></i> Trang chủ
        </Link>
        <Link to="/spso-management">
          <i className="pi pi-refresh" style={{ fontSize: "28px" }}></i> Quản lý
          máy in
        </Link>
        <Link to="/spso-history">
          <i className="pi pi-chart-bar" style={{ fontSize: "28px" }}></i> Xem
          lịch sử
        </Link>
        <Link to="/spso-setting">
          <i className="pi pi-user" style={{ fontSize: "28px" }}></i> Cài đặt hệ
          thống
        </Link>
      </div>
    </div>
  );
};
export default SPSOSideBar;
