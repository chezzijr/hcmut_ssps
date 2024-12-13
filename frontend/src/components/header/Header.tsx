import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    title: string;
    id?: number;
    name?: string;
}

const Header: React.FC<HeaderProps> = ({ title, name, id }) => {
    const [showUserInfo, setShowUserInfo] = useState(false);
    const handleUserIconClick = () => {
        setShowUserInfo(!showUserInfo);
    };

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/");
    };

    return (
        <div className="header">
            <h1>{title}</h1>
            <FaUserCircle className="user-icon" onClick={handleUserIconClick} />
            {showUserInfo && (
                <div className="user-info">
                    {" "}
                    <div className="user-id">ID: {id}</div>{" "}
                    <div className="user-name">{name}</div>{" "}
                    <button className="logout-button" onClick={() => handleNavigation()}>
                        Thoát
                    </button>{" "}
                </div>
            )}
        </div>
    );
};

export default Header;
