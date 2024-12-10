import React from "react";
import logo from "./logoBK.png";
import "./AdminLogin.css";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

interface SPSOLoginProps {
  setUserType: (type: "Admin" | "SPSO" | "User") => void;
}

const SPSOLogin: React.FC<SPSOLoginProps> = ({ setUserType }) => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    if (path === "/spso") {
      setUserType("SPSO");
    }
    navigate(path);
  };
  return (
    <div className="Login">
      <div className="LoginFrame">
        <div className="AdminLogin">
          <form action="#">
            <div>
              <img src={logo} alt="Logo HCMUT" style={{ paddingTop: "20px" }} />
            </div>
            <div className="adminTitleLogin">Đăng nhập</div>
            <div className="p-field">
              <InputText
                id="email"
                placeholder="Your Admin ID"
                style={{
                  backgroundColor: "#D9D9D9",
                  width: "100%",
                  padding: "20px 10px",
                }}
              />
              <InputText
                id="password"
                placeholder="Mật khẩu"
                style={{
                  backgroundColor: "#D9D9D9",
                  width: "100%",
                  padding: "20px 10px",
                }}
              />
            </div>
            <a
              href="/forgot-password"
              style={{
                display: "flex",
                justifyContent: "left",
                padding: "15px 60px",
              }}
            >
              Quên mật khẩu?
            </a>
            <div className="adminButtonLogin">
              <button type="button" onClick={() => handleNavigation("/spso")}>
                Đăng nhập
              </button>
              <button type="button" onClick={() => handleNavigation("/login")}>
                {" "}
                Quay lại{" "}
              </button>
            </div>
          </form>
        </div>

        <div className="adminLoginContent">
          <div className="line1">Đăng nhập với quyền Admin</div>
          <div className="line2">
            <div>Bạn đang đăng nhập vào hệ thống với quyền Admin.</div>
            <div>
              Nếu có sự nhầm lẫn vui lòng bấm quay lại để tiếp tục quá trình
              đăng nhập.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SPSOLogin;
