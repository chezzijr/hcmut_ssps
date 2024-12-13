import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/api";

interface UserLoginProps {
  setUserType: (type: "admin" | "spso" | "student" | " ") => void;
}

const HcmutLogin: React.FC<UserLoginProps> = ({ setUserType }) => {
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
    <div className="login-page">
      <h1>Central Authentication Service</h1>
      <div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Warn me before logging me into other sites
          </label>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default HcmutLogin;
