import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Restore from "./pages/Restore";
import Monitor from "./pages/Monitor";
import Access from "./pages/Access";
import Maintenance from "./pages/Maintenance";
import SPSO_Dashboard from "./pages/SPSO_Dashboard";
import SPSO_Management from "./pages/SPSO_Management";
import SPSO_Setting from "./pages/SPSO_Setting";
import SPSO_History from "./pages/SPSO_History";
import Sidebar from "./components/sideBar/SideBar";  
import SPSO_Sidebar from "./components/sideBar/SPSO_Sidebar";  // Import SPSO_Sidebar mới
import UserHome from "./components/userHome/UserHome";
import UserPrinting from "./components/userPrinting/UserPrinting";
import UserBuy from "./components/userBuy/UserBuy";
import Body from "./components/firstPage/Body";
import Service from "./components/firstPage/Service";
import Footer from "./components/firstPage/Footer";
import AHeader from "./components/firstPage/AHeader";
import Login from "./components/loginPage/login";
import HcmutLogin from "./components/loginPage/HcmuLogin";
import AdminLogin from "./components/loginPage/AdminLogin";
import SPSOLogin from "./components/loginPage/SPSOLogin";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";

function App() {
  const [userType, setUserType] = useState<"Admin" | "SPSO" | "User" | "">("");

  return (
    <Router>
      <div className="App">
        {/* Các route cho màn hình chính và đăng nhập */}
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

        {/* Render các route cụ thể dựa trên loại người dùng */}
        {/* {userType === "Admin" && <AdminRoutes />} */}
        {userType === "SPSO" && <SPSORoutes />}
        {userType === "User" && <UserRoutes />}
      </div>
    </Router>
  );
}

/* const AdminRoutes: React.FC = () => (
  <div className="layout-wrapper">
   
    <div className="sidebar">
      <h2>SSPS_Admin</h2>
      <Card className="user-info-card">
        <div className="user-info">
          <img src="https://via.placeholder.com/100" alt="Admin Avatar" />
          <p className="user-name">Admin name</p>
          <p className="user-id">Admin ID</p>
          <Button label="Thoát" className="p-button-danger" />
        </div>
      </Card>
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin">
            <i className="pi pi-home"></i> Trang chủ
          </Link>
        </li>
        <li>
          <Link to="/admin-restore">
            <i className="pi pi-refresh"></i> Khôi phục hệ thống
          </Link>
        </li>
        <li>
          <Link to="/admin-monitor">
            <i className="pi pi-chart-bar"></i> Giám sát hệ thống
          </Link>
        </li>
        <li>
          <Link to="/admin-access">
            <i className="pi pi-user"></i> Quản lý truy cập
          </Link>
        </li>
        <li>
          <Link to="/admin-maintenance">
            <i className="pi pi-cog"></i> Bảo trì hệ thống
          </Link>
        </li>
      </ul>
    </div>

   
    <div className="content">
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin-restore" element={<Restore />} />
        <Route path="/admin-monitor" element={<Monitor />} />
        <Route path="/admin-access" element={<Access />} />
        <Route path="/admin-maintenance" element={<Maintenance />} />
      </Routes>
    </div>
  </div>
);
 */
const SPSORoutes: React.FC = () => (
  <div className="layout-wrapper">
    {/* Sidebar SPSO */}
    <SPSO_Sidebar />

    {/* Main Content SPSO */}
    <div className = "content1">
      <Routes>
        <Route path="/spso" element={<SPSO_Dashboard />} />
        <Route path="/spsomanagement" element={<SPSO_Management />} />
        <Route path="/spsosetting" element={<SPSO_Setting />} />
        <Route path="/spsohistory" element={<SPSO_History />} />
      </Routes>
    </div>
  </div>
);

const UserRoutes: React.FC = () => (
  <div className="user">
    <Sidebar />
    <div className="userContent">
      <Routes>
        <Route path="/user" element={<UserHome />} />
        <Route path="/user-printing" element={<UserPrinting />} />
        <Route path="/user-buying" element={<UserBuy />} />
      </Routes>
    </div>
  </div>
);

export default App;
