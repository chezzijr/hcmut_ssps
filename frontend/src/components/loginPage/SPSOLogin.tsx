import React, { useState } from "react";
import logo from "./logoBK.png";
import "./AdminLogin.css";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/api";

interface SPSOLoginProps {
  setUserType: (type: "admin" | "spso" | "student" | " ") => void;
}

const SPSOLogin: React.FC<SPSOLoginProps> = ({ setUserType }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleNavigation = (role: string) => {
    setUserType(role as "admin" | "spso" | "student" | " ");
    if (role === "student") {
      navigate("/home");
    } else {
      navigate("/spso");
    }
  };
  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      console.log("Login successful", data);

      if (data?.token && data?.role) {
        localStorage.setItem("authorization", data.token);
        handleNavigation(data.role);
      } else {
        setErrorMessage("Invalid response from server.");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="Login">
      <div className="LoginFrame">
        <div className="SPSOLogin">
          <form action="#">
            <div>
              <img src={logo} alt="Logo HCMUT" style={{ paddingTop: "20px" }} />
            </div>
            <div className="adminTitleLogin">Đăng nhập</div>
            <div className="p-field">
              <InputText
                id="email"
                placeholder="Your SPSO ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  backgroundColor: "#D9D9D9",
                  width: "100%",
                  padding: "20px 10px",
                }}
              />
              <InputText
                id="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="spsoButtonLogin">
              <button type="button" onClick={handleLogin}>
                Đăng nhập
              </button>
              <button type="button" onClick={() => handleNavigation("/login")}>
                {" "}
                Quay lại{" "}
              </button>
            </div>
          </form>
        </div>

        <div className="spsoLoginContent">
          <div className="line1">Đăng nhập với quyền SPSO</div>
          <div className="line2">
            <div>Bạn đang đăng nhập vào hệ thống với quyền SPSO.</div>
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
