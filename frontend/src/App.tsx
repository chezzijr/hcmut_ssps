import React, { useState, useEffect } from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
} from "react-router-dom";
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
import Sidebar from "./components/sideBar/SideBar";
import UserHome from "./components/userHome/UserHome";
import UserPrinting from "./components/userPrinting/UserPrinting";
import UserBuying from "./components/userBuy/UserBuying";
import Body from "./components/firstPage/Body";
import Service from "./components/firstPage/Service";
import Footer from "./components/firstPage/Footer";
import AHeader from "./components/firstPage/AHeader";
import Login from "./components/loginPage/login";
import HcmutLogin from "./components/loginPage/HcmuLogin";
import AdminLogin from "./components/loginPage/AdminLogin";
import SPSOLogin from "./components/loginPage/SPSOLogin";
import SPSOSideBar from "./pages/spsoSideBar/SPSOSideBar";
import AdminSideBar from "./pages/adminSideBar/AdminSideBar";
import axios from "axios";
import Printers from "./pages/Printers"
import PrintingHistory from "./pages/PrintingHistory";

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

function App() {
    const [userType, setUserType] = useState<"admin" | "spso" | "student" | " ">(
        " "
    );

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/login" || location.pathname === "/") {
            setUserType(" ");
        }
    }, [location.pathname]);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <div className="top">
                                <AHeader />
                                <Body />
                            </div>
                            <Service />
                            <Footer />
                        </>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/hcmut-login"
                    element={<HcmutLogin setUserType={setUserType} />}
                />
                <Route
                    path="/admin-login"
                    element={<AdminLogin setUserType={setUserType} />}
                />
                <Route
                    path="/spso-login"
                    element={<SPSOLogin setUserType={setUserType} />}
                />
            </Routes>
            {userType === "admin" && <AdminRoutes />}
            {userType === "spso" && <SPSORoutes />}
            {userType === "student" && <UserRoutes />}
        </div>
    );
}

const AdminRoutes: React.FC = () => (
    <>
        <div className="layout-wrapper">
            {/* Sidebar: Hiển thị duy nhất 1 lần */}
            <AdminSideBar />
            {/* Main Content */}
            <div className="mainContent">
                <Routes>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin-restore" element={<Restore />} />
                    <Route path="/admin-monitor" element={<Monitor />} />
                    <Route path="/admin-access" element={<Access />} />
                    <Route path="/admin-maintenance" element={<Maintenance />} />
                </Routes>
            </div>
        </div>
    </>
);

const SPSORoutes: React.FC = () => (
    <>
        <div className="layout-wrapper">
            {/* Sidebar SPSO */}
            <SPSOSideBar />
            {/* Main Content SPSO */}
            <div className="spsoMainContent">
                <Routes>
                    <Route path="/spso" element={<SPSO_Dashboard />} />
                    <Route path="/spso-management" element={<SPSO_Management />} />
                    <Route path="/spso-setting" element={<SPSO_Setting />} />
                    <Route path="/spso-history" element={<SPSO_History />} />
                </Routes>
            </div>
        </div>
    </>
);

const UserRoutes: React.FC = () => (
    <>
        <div className="user">
            <Sidebar />
            <div className="userContent">
                <Routes>
                    <Route path="/home" element={<UserHome />} />
                    <Route path="/user-printing" element={<UserPrinting />} />
                    <Route path="/user-buying" element={<UserBuying />} />
                    <Route path="/printers" element={<Printers />} />
                    <Route path="/printing-history" element={<PrintingHistory />} />
                </Routes>
            </div>
        </div>
    </>
);

export default AppWrapper;
