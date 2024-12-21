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
                <button onClick={() => handleNavigation("./printing-history")}>
                    <FaHistory /> Lịch sử in
                </button>
                <button onClick={() => handleNavigation("./user-buying")}>
                    <FaCartPlus /> Mua trang in
                </button>
                <button onClick={() => handleNavigation("./printing-queue")}>
                    <FaCog /> Hàng đợi in
                </button>
                <button onClick={() => handleNavigation("./printers")}>
                    <FaInfoCircle /> Thông tin máy in
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
