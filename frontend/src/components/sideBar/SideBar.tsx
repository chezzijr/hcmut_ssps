import React from "react";
import "./SideBar.css";

import {
  FaHome,
  FaPrint,
  FaHistory,
  FaCartPlus,
  FaCog,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className=" titleSidebar">SPSS</div>
      <div className="menuSidebar">
        <button onClick={() => handleNavigation("./home")}>
          <FaHome /> Trang chủ
        </button>
        <button onClick={() => handleNavigation("./user-printing")}>
          <FaPrint /> In tài liệu
        </button>
        <button>
          <FaHistory /> Lịch sử in
        </button>
        <button onClick={() => handleNavigation("./user-buying")}>
          <FaCartPlus /> Mua trang in
        </button>
        <button>
          <FaCog /> Cài đặt
        </button>
        <button>
          <FaPhone /> Hỗ trợ dịch vụ
        </button>
        <button>
          <FaInfoCircle /> Thông tin máy in
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
