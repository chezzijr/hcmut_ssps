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
// import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className=" titleSidebar">SPSS</div>
      <div className="menuSidebar">
        <button>
          <FaHome /> Trang chủ
        </button>
        <button>
          <FaPrint /> In tài liệu
        </button>
        <button>
          <FaHistory /> Lịch sử in
        </button>
        <button>
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
