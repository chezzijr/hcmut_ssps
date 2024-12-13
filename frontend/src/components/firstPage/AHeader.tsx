import React from "react";
import "./AHeader.css";
import { Link } from "react-router-dom";
import BlueButton from "./BlueButton";

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">SPSS</div>

      <div className="right">
        <div className="menu">
          <Link to="/">Trang chủ</Link>
          <Link to="/services">Dịch vụ</Link>
          <Link to="/contact">Liên hệ</Link>
        </div>

        <BlueButton to="./login" />
      </div>
    </header>
  );
};

export default Header;
