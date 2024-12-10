import "./UserHome.css";
import { FaFileAlt, FaPrint } from "react-icons/fa";
import Header from "../header/Header";
import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";

const UserHome = () => {
  const [showRemainingPages, setShowRemainingPages] = useState(false);
  const [showRecentPrints, setShowRecentPrints] = useState(false);
  const paperTypes = [
    { name: "Giấy A5 Double A", count: 20 },
    { name: "Giấy A4 Double A", count: 30 },
    { name: "Giấy A3 Double A", count: 20 },
    { name: "Giấy A1", count: 10 },
    { name: "Giấy A0", count: 10 },
    { name: "Giấy in ảnh", count: 10 },
  ];
  const recentPrints = Array(10).fill("Tài liệu.docx");
  return (
    <div className="userHome">
      <div className="userHomeTitle">
        <Header title="Trang chủ" />
      </div>

      <div className="userHomeContent">
        {/* <div className="dashBoard">
          <div className="card-content">
            <h3>Số trang còn lại</h3>
            <h1>100</h1>
          </div>
          <div className="card-icon">
            <FaFileAlt />
          </div>
        </div> */}
        <Card className="dashBoard">
          <div className="card-content">
            <h3>Số trang còn lại</h3>
            <h1>100</h1>
          </div>
          {showRemainingPages && (
            <ScrollPanel
              style={{ height: "100%", marginTop: "1rem", width: "100%" }}
            >
              <ul className="paper-list">
                {paperTypes.map((paper, index) => (
                  <li key={index} className="paper-item">
                    <span>{paper.name}</span>
                    <span>{paper.count}</span>
                  </li>
                ))}
              </ul>
            </ScrollPanel>
          )}
          <div
            className={`toggle-button ${showRemainingPages ? "right" : "left"}`}
          >
            <Button
              icon={`pi ${
                showRemainingPages ? "pi-chevron-up" : "pi-chevron-down"
              }`}
              className="p-button-text"
              onClick={() => setShowRemainingPages(!showRemainingPages)}
            />
          </div>
        </Card>

        {/* <div className="dashBoard">
          <div className="card-content">
            <h3>Đã in gần đây</h3>
            <h1>10</h1>
          </div>
          <div className="card-icon">
            <FaPrint />
          </div>
        </div> */}
        <Card className="dashBoard">
          <div className="card-content">
            <h3>Đã in gần đây</h3>
            <h1>10</h1>
          </div>
          {showRecentPrints && (
            <div className="recent-prints">
              {recentPrints.map((doc, index) => (
                <Button
                  key={index}
                  label={doc}
                  className="p-button-outlined p-button-secondary"
                />
              ))}
            </div>
          )}
          <div
            className={`toggle-button ${showRecentPrints ? "right" : "left"}`}
          >
            <Button
              icon={`pi ${
                showRecentPrints ? "pi-chevron-up" : "pi-chevron-down"
              }`}
              className="p-button-text"
              onClick={() => setShowRecentPrints(!showRecentPrints)}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
export default UserHome;
