import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DemoAccount {
  username: string;
  password: string;
}
interface HcmutLoginLoginProps {
  setUserType: (type: "Admin" | "SPSO" | "User") => void;
}

const HcmutLogin: React.FC<HcmutLoginLoginProps> = ({ setUserType }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const demoAccounts: DemoAccount[] = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "user3", password: "password3" },
  ];

  const navigate = useNavigate();

  /* const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password);
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ 'login': username, 'password': password
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          data = await response.json();
          role = data.role;
          console.log(data);
        } else {
          // toast
        }
      })
      .catch((error) => {
        // toast
      });
  }; */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchingAccount = demoAccounts.find(
      (account) =>
        account.username === username && account.password === password
    );

    if (matchingAccount) {
      // Chuyển hướng người dùng đến trang tiếp theo
      navigateToNextPage();
    } else {
      console.log("Thông tin đăng nhập không hợp lệ");
    }
  };
  const navigateToNextPage = () => {
    setUserType("User");
    navigate("/home");
  };

  return (
    <div className="login-page">
      <h1>Central Authentication Service</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default HcmutLogin;
