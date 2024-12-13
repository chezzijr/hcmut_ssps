import React from "react";
import logo from "./logoBK.png";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="Login">
      <div className="LoginFrame">
        <div className="LoginContent">
          <div className="line1">XIN CHÀO</div>
          <div className="line2">
            <div>Chào mừng bạn đến với dịch vụ in ấn của chúng tôi.</div>
            <div>Rất cảm ơn bạn đã tin tưởng lựa chọn chúng tôi.</div>
            <div>Hãy đăng nhập để tiếp tục!</div>
          </div>
        </div>
        <div className="UserLogin">
          <form action="#">
            <div>
              <img src={logo} alt="Logo HCMUT" />
            </div>

            <hr />
            <div className="titleLogin">Đăng nhập với:</div>
            <div className="buttonLogin">
              <button
                type="button"
                onClick={() => handleNavigation("/hcmut-login")}
              >
                Tài khoản HCMUT (HCMUT account)
              </button>
              <button
                type="button"
                onClick={() => handleNavigation("/admin-login")}
              >
                {" "}
                Admin{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
