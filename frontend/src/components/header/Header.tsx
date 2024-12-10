import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleUserIconClick = () => {
    setShowUserInfo(!showUserInfo);
  };

  return (
    <div className="header">
      <h1>{title}</h1>
      <FaUserCircle className="user-icon" onClick={handleUserIconClick} />
      {showUserInfo && (
        <div className="user-info">
          {" "}
          <div className="user-name">USER NAME</div>{" "}
          <button className="logout-button">Thoát</button>{" "}
        </div>
      )}
    </div>
  );
};

export default Header;
